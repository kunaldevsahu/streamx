import { usePlayer } from "../../context/PlayerContext";

export default function Controls() {
  const {
    isPlaying,
    togglePlay,
    playNext,
    playPrev,
    isHost,
    currentTrack,
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div style={{ opacity: isHost ? 1 : 0.5 }}>
      <button onClick={playPrev} disabled={!isHost}>
        ⏮
      </button>

      <button onClick={togglePlay} disabled={!isHost}>
        {isPlaying ? "⏸" : "▶"}
      </button>

      <button onClick={playNext} disabled={!isHost}>
        ⏭
      </button>

      {!isHost && (
        <p style={{ fontSize: 12, marginTop: 4 }}>
          Waiting for host…
        </p>
      )}
    </div>
  );
}
