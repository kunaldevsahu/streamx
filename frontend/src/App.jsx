import { useEffect, useState } from "react";
import { PlayerProvider } from "./context/PlayerContext";
import SongList from "./components/SongList";
import AudioPlayer from "./components/Player/AudioPlayer";
import Controls from "./components/Player/Controls";
import ProgressBar from "./components/Player/ProgressBar";
import NowPlaying from "./components/Player/NowPlaying";
import { getTrending } from "./services/musicApi";
import "./components/Player/Player.css";
import RoomPanel from "./components/RoomPanel";
import RoomChat from "./components/RoomChat";



function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getTrending().then(setSongs);
  }, []);

  return (
    <PlayerProvider>
      <h1>🎧 StreamX</h1>
      <RoomPanel />
      <RoomChat />


      <SongList songs={songs} />

      <div className="player-bar">
        <NowPlaying />
        <Controls />
        <ProgressBar />
      </div>

      <AudioPlayer />
    </PlayerProvider>
  );
}

export default App;
