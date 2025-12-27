import { usePlayer } from "../context/PlayerContext";

export default function EmojiOverlay() {
  const { reactions } = usePlayer();

  return (
    <div
      style={{
        position: "fixed",
        bottom: 120,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: 40,
        pointerEvents: "none",
      }}
    >
      {reactions.map((r, i) => (
        <div key={i}>{r.emoji}</div>
      ))}
    </div>
  );
}
