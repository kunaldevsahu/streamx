import { usePlayer } from "../../context/PlayerContext";

function formatTime(time = 0) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
    <div style={{ width: "100%", padding: "8px 0" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 12 }}>
          {formatTime(currentTime)}
        </span>

        <input
          type="range"
          min="0"
          max={duration}
          step="0.5"
          value={currentTime}
          onChange={(e) => seekTo(Number(e.target.value))}
          disabled={!isHost}
          style={{
            flex: 1,
            cursor: isHost ? "pointer" : "not-allowed",
          }}
        />

        <span style={{ fontSize: 12 }}>
          {formatTime(duration)}
        </span>
      </div>

      {!isHost && (
        <p
          style={{
            fontSize: 11,
            opacity: 0.6,
            marginTop: 4,
          }}
        >
          Only host can control playback
        </p>
      )}
    </div>
  );
}
