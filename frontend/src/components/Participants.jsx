import { usePlayer } from "../context/PlayerContext";

export default function Participants() {
  const { participants, roomCode } = usePlayer();

  if (!roomCode) return null;

  return (
    <div
      style={{
        padding: 10,
        borderTop: "1px solid #333",
      }}
    >
      <h4>👥 Participants</h4>

      {participants.length === 0 && <p>No users</p>}

      {participants.map((p, i) => (
        <div key={i}>
          {p.role === "Host" ? "👑 Host" : "👤 Listener"}
        </div>
      ))}
    </div>
  );
}
