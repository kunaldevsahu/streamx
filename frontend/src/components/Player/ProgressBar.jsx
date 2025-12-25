import { usePlayer } from "../../context/PlayerContext";

function formatTime(time = 0) {
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

export default function ProgressBar() {
  const {
    currentTime,
    duration,
    seekTo,
    isHost,
  } = usePlayer();

  if (!duration) return null;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span>{formatTime(currentTime)}</span>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={(e) => seekTo(Number(e.target.value))}
        disabled={!isHost}   // 🔒 listeners can’t drag
        style={{ flex: 1 }}
      />

      <span>{formatTime(duration)}</span>
    </div>
  );
}
