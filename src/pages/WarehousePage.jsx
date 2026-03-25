import React from "react";

export default function WarehousePage() {
  return (
    <section className="section warehouse-page">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Warehouse demo</div>
            <h1 style={{ marginTop: "8px" }}>Interactive warehouse walkthrough</h1>
          </div>
          <p>
            Explore the warehouse scene and pallet-stack challenge as a supporting showcase while the core website stays focused on listings, tools, and lead generation.
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
              <span>Launch the pallet-stack challenge directly from the toolbar</span>
            </div>
            <div className="row">
              <b>Purpose on the site</b>
              <span>A secondary interactive showcase that stays separate from the main commercial search and contact flow</span>
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
