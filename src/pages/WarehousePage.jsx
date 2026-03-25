import React from "react";

export default function WarehousePage() {
  return (
    <section className="section warehouse-page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Warehouse Experience</div>
            <h1 style={{ marginTop: "8px" }}>3D Warehouse + Pallet Stack Game</h1>
          </div>
          <p>
            This route preserves the approved one-file Three.js warehouse scene and the integrated
            pallet game inside the React project.
          </p>
        </div>

        <div className="card soft" style={{ marginBottom: "18px" }}>
          <div className="table-like">
            <div className="row">
              <b>View controls</b>
              <span>Interior, wide shot, aisle, overhead, dock, street, and site-bird presets</span>
            </div>
            <div className="row">
              <b>Game mode</b>
              <span>Enter the pallet stack challenge directly from the toolbar</span>
            </div>
            <div className="row">
              <b>Why iframe here</b>
              <span>It keeps the approved camera, toolbar, and gameplay logic intact while routing through React</span>
            </div>
          </div>
        </div>

        <div className="warehouse-page-shell">
            <iframe
              className="warehouse-embed"
              src="/warehouse.html"
              title="3D warehouse experience"
              loading="lazy"
            ></iframe>
        </div>
      </div>
    </section>
  );
}
