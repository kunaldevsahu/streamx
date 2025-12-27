import {
  createContext,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";
import { socket } from "../services/socket";

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  /* ================= MUSIC STATE ================= */
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = queue[currentIndex] || null;

  /* ================= ROOM STATE ================= */
  const [roomCode, setRoomCode] = useState(null);
  const [isHost, setIsHost] = useState(false);

  /* ================= CHAT ================= */
  const [messages, setMessages] = useState([]);

  /* ================= PARTICIPANTS ================= */
  const [participants, setParticipants] = useState([]);

  /* ================= EMOJI REACTIONS ================= */
  const [reactions, setReactions] = useState([]);

  /* ================= SOCKET LISTENERS ================= */
  useEffect(() => {
    // playback sync
    socket.on("RECEIVE_STATE", (state) => {
      setQueue(state.queue || []);
      setCurrentIndex(state.currentIndex ?? -1);
      setIsPlaying(state.isPlaying ?? false);
    });

    // seek sync
    socket.on("RECEIVE_SEEK", ({ time }) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    });

    // chat
    socket.on("RECEIVE_CHAT", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // participants
    socket.on("PARTICIPANTS_UPDATE", (users) => {
      setParticipants(users || []);
    });

    // emoji reactions
    socket.on("RECEIVE_EMOJI", (data) => {
      setReactions((prev) => [...prev, data]);

      // auto remove after 2s
      setTimeout(() => {
        setReactions((prev) => prev.slice(1));
      }, 2000);
    });


    return () => {
      socket.off("RECEIVE_STATE");
      socket.off("RECEIVE_SEEK");
      socket.off("RECEIVE_CHAT");
      socket.off("PARTICIPANTS_UPDATE");
      socket.off("RECEIVE_EMOJI");
    };
  }, []);

  useEffect(() => {
    const handleReconnect = () => {
      if (roomCode) {
        socket.emit("JOIN_ROOM", {
          roomCode,
          role: isHost ? "Host" : "Listener",
        });
      }
    };

    socket.on("connect", handleReconnect);

    return () => {
      socket.off("connect", handleReconnect);
    };
  }, [roomCode, isHost]);


  /* ================= SOCKET EMITTER ================= */
  const emitState = (override = {}) => {
    if (!roomCode || !isHost) return;

    socket.emit("SYNC_STATE", {
      roomCode,
      state: {
        queue,
        currentIndex,
        isPlaying,
        ...override,
      },
    });
  };

  /* ================= PLAYER ACTIONS ================= */
  const playFromList = (songs, index) => {
    setQueue(songs);
    setCurrentIndex(index);
    setIsPlaying(true);

    emitState({
      queue: songs,
      currentIndex: index,
      isPlaying: true,
    });
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();

    setIsPlaying(!isPlaying);
    emitState({ isPlaying: !isPlaying });
  };

  const playNext = () => {
    if (currentIndex < queue.length - 1) {
      const next = currentIndex + 1;
      setCurrentIndex(next);
      setIsPlaying(true);
      emitState({ currentIndex: next, isPlaying: true });
    }
  };

  const playPrev = () => {
    if (currentIndex > 0) {
      const prev = currentIndex - 1;
      setCurrentIndex(prev);
      setIsPlaying(true);
      emitState({ currentIndex: prev, isPlaying: true });
    }
  };

  /* ================= SEEK ================= */
  const seekTo = (time) => {
    if (!audioRef.current) return;

    audioRef.current.currentTime = time;

    if (roomCode && isHost) {
      socket.emit("SEEK", { roomCode, time });
    }
  };

  /* ================= ROOM ================= */
  const joinRoom = (code, host = false) => {
    setRoomCode(code);
    setIsHost(host);
    setMessages([]);
    setParticipants([]);
    setReactions([]);

    socket.connect();
    socket.emit("JOIN_ROOM", {
      roomCode: code,
      role: host ? "Host" : "Listener",
    });
  };

  /* ================= CHAT ================= */
  const sendMessage = (text) => {
    if (!roomCode || !text) return;

    const user = isHost ? "Host" : "Listener";

    const msg = {
      user,
      message: text,
      time: Date.now(),
    };

    setMessages((prev) => [...prev, msg]);

    socket.emit("CHAT_MESSAGE", {
      roomCode,
      message: text,
      user,
    });
  };

  /* ================= EMOJI ================= */
  const sendReaction = (emoji) => {
    if (!roomCode) return;

    setReactions((prev) => [...prev, { emoji, time: Date.now() }]);

    socket.emit("EMOJI_REACT", {
      roomCode,
      emoji,
    });
  };

  /* ================= PROVIDER ================= */
  return (
    <PlayerContext.Provider
      value={{
        /* audio */
        audioRef,

        /* music */
        queue,
        currentIndex,
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        setCurrentTime,
        setDuration,
        playFromList,
        togglePlay,
        playNext,
        playPrev,
        seekTo,

        /* room */
        joinRoom,
        roomCode,
        isHost,

        /* chat */
        messages,
        sendMessage,

        /* participants */
        participants,

        /* emoji */
        reactions,
        sendReaction,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
