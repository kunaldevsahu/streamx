import { usePlayer } from "../../context/PlayerContext";

export default function Controls() {
  const { isPlaying, togglePlay, playNext, playPrev, currentTrack } =
    usePlayer();

  if (!currentTrack) return null;

  return (
    <div>
      <button onClick={playPrev}>⏮</button>
      <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶"}</button>
      <button onClick={playNext}>⏭</button>
    </div>
  );
}
