import { usePlayer } from "../../context/PlayerContext";

export default function NowPlaying() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div>
      <strong>{currentTrack.title}</strong> – {currentTrack.artist}
    </div>
  );
}
