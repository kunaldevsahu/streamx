import { useEffect } from "react";
import { usePlayer } from "../../context/PlayerContext";

export default function AudioPlayer() {
  const {
    audioRef,
    currentTrack,
    isPlaying,
    playNext,
    setCurrentTime,
    setDuration,
  } = usePlayer();

  // LOAD NEW TRACK
  useEffect(() => {
    if (!audioRef.current) return;
    if (!currentTrack?.stream?.url) return;

    audioRef.current.src = currentTrack.stream.url;

    // play only if state says playing
    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => {

          console.warn("Autoplay blocked by browser");
        });
    }
  }, [currentTrack]);

  // PLAY / PAUSE SYNC
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .catch(() => {
          console.warn("Play blocked, user interaction required");
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);


  // NO TRACK → NO AUDIO

  if (!currentTrack) return null;

  return (
    <audio
      ref={audioRef}
      preload="metadata"
      onEnded={playNext}
      onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
      onLoadedMetadata={(e) => setDuration(e.target.duration)}
      onError={(e) => console.error("Audio error:", e)}
    />
  );
}
