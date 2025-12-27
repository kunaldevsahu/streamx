import { useEffect, useState } from "react";
import { PlayerProvider } from "./context/PlayerContext";
import { getTrending } from "./services/musicApi";
import AppLayout from "./layout/AppLayout";
import AudioPlayer from "./components/Player/AudioPlayer";
import "./styles/reset.css";
import "./styles/variables.css";
import "./styles/layout.css";
import "./styles/topbar.css";
import "./styles/sidebar.css";
import "./styles/mainpanel.css";
import "./styles/participants.css";
import "./styles/chat.css";
import "./styles/roompanel.css";
import "./styles/bottomplayer.css";
import "./styles/nowplaying.css";
import "./styles/controls.css";
import "./styles/progress.css";
import "./styles/emojis.css";
import "./styles/hierarchy.css";
import "./styles/demo.css"




function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getTrending().then(setSongs);
  }, []);

  return (
    <PlayerProvider>
      <AppLayout songs={songs} />
      <AudioPlayer />
    </PlayerProvider>
  );
}

export default App;
