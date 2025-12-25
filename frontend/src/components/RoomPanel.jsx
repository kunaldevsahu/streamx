import { useState } from "react";
import axios from "axios";
import { usePlayer } from "../context/PlayerContext";

const API = import.meta.env.VITE_API_URL;

export default function RoomPanel() {
  const { joinRoom, roomCode, isHost } = usePlayer();
  const [codeInput, setCodeInput] = useState("");

  const createRoom = async () => {
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API}/rooms/create`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    joinRoom(res.data.room.roomCode, true);
  };

  const joinExistingRoom = () => {
    if (!codeInput) return;
    joinRoom(codeInput.toUpperCase(), false);
  };

  return (
    <div style={{ padding: 16, borderBottom: "1px solid #333" }}>
      {!roomCode ? (
        <>
          <button onClick={createRoom}>🎧 Create Room</button>

          <div style={{ marginTop: 10 }}>
            <input
              placeholder="Enter Room Code"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
            <button onClick={joinExistingRoom}>Join</button>
          </div>
        </>
      ) : (
        <div>
          <strong>Room:</strong> {roomCode}{" "}
          {isHost && <span>👑 Host</span>}
        </div>
      )}
    </div>
  );
}
