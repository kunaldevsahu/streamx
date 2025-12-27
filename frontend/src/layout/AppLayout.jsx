import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import MainContent from "./MainContent";

import RoomPanel from "../components/RoomPanel";
import Participants from "../components/Participants";
import RoomChat from "../components/RoomChat";
import EmojiBar from "../components/EmojiBar";
import EmojiOverlay from "../components/EmojiOverlay";

function AppLayout({ songs }) {
  return (
    <div className="app-layout">
      {/* ================= TOP BAR ================= */}
      <TopBar />

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="sidebar">
        <Sidebar />
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="main-content">
        <MainContent songs={songs} />
      </main>

      {/* ================= RIGHT COLLAB PANEL ================= */}
      <aside className="right-panel">
        {/* Room header */}
        <div className="room-header">
          <div className="room-title">Listening Room</div>
          <div className="room-code">Code: X7A9</div>
        </div>

        {/* Participants */}
        <Participants />

        {/* Chat */}
        <RoomChat />
      </aside>

      {/* ================= FLOATING UI ================= */}
      <EmojiOverlay />
      <EmojiBar />
    </div>
  );
}

export default AppLayout;
