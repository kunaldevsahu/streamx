import React from "react";
import { Home, Compass, Disc, Mic2, Clock, PlayCircle, Heart, List, Settings, LogOut } from "lucide-react";
import "../styles/Layout.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="brand" style={{ color: "#d946ef" }}>
        Melodies
      </div>

      <div className="nav-group">
        <div style={{ paddingLeft: 16, fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase" }}>Menu</div>
        <div className="nav-link">
          <Home size={20} />
          <span>Home</span>
        </div>
        <div className="nav-link">
          <Compass size={20} />
          <span>Discover</span>
        </div>
        <div className="nav-link active-pill">
          <Disc size={20} />
          <span>Albums</span>
        </div>
        <div className="nav-link">
          <Mic2 size={20} />
          <span>Artists</span>
        </div>
      </div>

      <div className="nav-group">
        <div style={{ paddingLeft: 16, fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase" }}>Library</div>
        <div className="nav-link">
          <Clock size={20} />
          <span>Recently Added</span>
        </div>
        <div className="nav-link">
          <PlayCircle size={20} />
          <span>Most played</span>
        </div>
      </div>

      <div className="nav-group">
        <div style={{ paddingLeft: 16, fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase" }}>Playlist and favorite</div>
        <div className="nav-link">
          <Heart size={20} />
          <span>Your favorites</span>
        </div>
        <div className="nav-link">
          <List size={20} />
          <span>Your playlist</span>
        </div>
      </div>

      <div className="nav-group" style={{ marginTop: "auto" }}>
        <div style={{ paddingLeft: 16, fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 8, textTransform: "uppercase" }}>General</div>
        <div className="nav-link">
          <Settings size={20} />
          <span>Setting</span>
        </div>
        <div className="nav-link" style={{ color: "#f43f5e" }}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
