import { usePlayer } from "../context/PlayerContext";

const EMOJIS = ["🔥", "🎵", "💃", "❤️", "👏"];

export default function EmojiBar() {
  const { roomCode, sendReaction } = usePlayer();

  if (!roomCode) return null;

  return (
    <div style={{ padding: 10 }}>
      {EMOJIS.map((emoji) => (
        <button
          key={emoji}
          style={{ fontSize: 20, marginRight: 6 }}
          onClick={() => sendReaction(emoji)}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
