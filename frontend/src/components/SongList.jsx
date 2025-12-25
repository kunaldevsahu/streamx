import { usePlayer } from "../context/PlayerContext";

export default function SongList({ songs }) {
  const { playFromList } = usePlayer();

  if (!songs || songs.length === 0) {
    return <p>No songs found</p>;
  }

  return (
    <div>
      {songs.map((song, index) => (
        <div
          key={song.id}
          style={{ cursor: "pointer", marginBottom: 8 }}
          onClick={() => playFromList(songs, index)}
        >
          <strong>{song.title}</strong> – {song.artist}
        </div>
      ))}
    </div>
  );
}
