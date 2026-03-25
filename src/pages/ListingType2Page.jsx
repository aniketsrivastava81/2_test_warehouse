export default function ListingType2Page({ openLeadModal }) {
  return (
    <main id="main" className="section listingtype2-page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">ListingType2</div>
            <h1 style={{ marginTop: '8px' }}>Warehouse animation + interactive game</h1>
          </div>
          <p>This page wraps the working warehouse experience inside the full Megha Mehta website so it becomes a dedicated listing format, not a standalone experiment.</p>
        </div>
        <div className="grid grid-2 listingtype2-grid" style={{ alignItems: 'start' }}>
          <div className="card glow">
            <div className="badges" style={{ marginBottom: '12px' }}>
              <span className="pill"><strong>Animation</strong></span>
              <span className="pill">Camera presets</span>
              <span className="pill">Game mode</span>
            </div>
            <h2 style={{ marginBottom: '10px' }}>What this listing type adds</h2>
            <div className="table-like">
              <div className="row"><b>Longer dwell time</b><span>The warehouse page invites users to explore views and engage with the logistics mini-game.</span></div>
              <div className="row"><b>Richer storytelling</b><span>Interior capacity, loading flow, aisle logic, and storage style become easier to visualize.</span></div>
              <div className="row"><b>Future-ready</b><span>The working warehouse build lives in the same React project and can later move into a cleaner in-page integration.</span></div>
            </div>
            <div className="hero-actions" style={{ marginTop: '16px' }}>
              <button className="btn btn-primary" type="button" onClick={openLeadModal}>Get the checklist</button>
              <a className="btn btn-secondary" href="/warehouse-game/index.html" target="_blank" rel="noreferrer">Open full warehouse tab</a>
            </div>
          </div>
          <div className="card soft">
            <div className="warehouse-page-shell">
                    <iframe
                      className="warehouse-embed"
                      title="ListingType2 warehouse animation and game"
                      src="/warehouse-game/index.html"
                      loading="eager"
                    />
            </div>
          </div>
        </div>
        <section className="section tight">
          <div className="grid grid-3">
            <div className="card soft">
              <div className="kicker">Use case</div>
              <h3>Premium industrial marketing</h3>
              <p className="muted">Use this format for a hero warehouse listing, a featured campaign landing page, or a gated subscription-style showcase later.</p>
            </div>
            <div className="card soft">
              <div className="kicker">Current structure</div>
              <h3>Embedded from the same repo</h3>
              <p className="muted">The working warehouse build is shipped from the React app’s public folder, so deployment stays simple and self-contained.</p>
            </div>
            <div className="card soft">
              <div className="kicker">Next step</div>
              <h3>Upgrade from iframe later</h3>
              <p className="muted">Once the page architecture is locked, the scene can be moved closer into React component form without breaking the marketing site.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
