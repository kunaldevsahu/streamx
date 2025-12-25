import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

export default function RoomChat() {
  const { messages, sendMessage, roomCode } = usePlayer();
  const [text, setText] = useState("");

  if (!roomCode) return null;

  const handleSend = () => {
    sendMessage(text);
    setText("");
  };

  return (
    <div
      style={{
        borderTop: "1px solid #333",
        padding: 10,
        maxHeight: 250,
        overflowY: "auto",
      }}
    >
      <h4>💬 Room Chat</h4>

      <div style={{ marginBottom: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <strong>{m.user}:</strong> {m.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
