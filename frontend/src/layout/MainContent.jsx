function MainContent() {
  return (
    <section className="main-content">
      <h2 className="section-title">Trending Now</h2>

      <div className="card-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="music-card" key={i}>
            <div className="card-art" />
            <div className="card-info">
              <div className="card-title">Track Name</div>
              <div className="card-subtitle">Artist Name</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MainContent;
