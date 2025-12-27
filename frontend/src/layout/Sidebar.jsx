function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-top">
        <button className="sidebar-btn active">🏠</button>
        <button className="sidebar-btn">🔍</button>
        <button className="sidebar-btn">📚</button>
        <button className="sidebar-btn">➕</button>
      </div>

      <div className="sidebar-bottom">
        <button className="sidebar-btn">❤️</button>
      </div>
    </nav>
  );
}

export default Sidebar;
