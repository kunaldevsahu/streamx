function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <div className="logo">StreamX</div>

        <div className="search-box">
          <input placeholder="What do you want to play?" />
        </div>
      </div>

      <div className="topbar-right">
        <button className="session-btn">
          Collaborate
        </button>

        <button className="icon-btn">🔔</button>
        <button className="icon-btn avatar">K</button>
      </div>
    </header>
  );
}

export default TopBar;
