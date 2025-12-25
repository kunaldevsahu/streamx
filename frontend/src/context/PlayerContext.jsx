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

  /* ================= PLAYER STATE ================= */
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const currentTrack = queue[currentIndex] || null;

  /* ================= ROOM STATE ================= */
  const [roomCode, setRoomCode] = useState(null);
  const [isHost, setIsHost] = useState(false);

  /* ================= CHAT STATE ================= */
  const [messages, setMessages] = useState([]);

  /* ================= SOCKET LISTENERS ================= */

  // Receive synced player state
  useEffect(() => {
    socket.on("RECEIVE_STATE", (state) => {
      setQueue(state.queue);
      setCurrentIndex(state.currentIndex);
      setIsPlaying(state.isPlaying);
    });

    socket.on("RECEIVE_SEEK", ({ time }) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time;
      }
    });

    socket.on("RECEIVE_CHAT", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("RECEIVE_STATE");
      socket.off("RECEIVE_SEEK");
      socket.off("RECEIVE_CHAT");
    };
  }, []);

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

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

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

    socket.connect();
    socket.emit("JOIN_ROOM", { roomCode: code });
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

  /* ================= CONTEXT PROVIDER ================= */

  return (
    <PlayerContext.Provider
      value={{
        audioRef,

        /* player */
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
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
