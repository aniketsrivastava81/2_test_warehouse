import React from "react";
import { Link } from "react-router-dom";
import { SUBMARKET_SNAPSHOTS } from "../../data/siteData";

export default function SubmarketComparator() {
  return (
    <section id="submarket-comparison" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Submarket comparison</div>
          <h2 style={{ marginTop: "8px" }}>Compare the corridors before the shortlist gets anchored too early.</h2>
        </div>
        <p>Use this section to compare how different GTA submarkets support visibility, operations, commuting, and customer access.</p>
      </div>

      <div className="grid grid-2 submarket-grid">
        {SUBMARKET_SNAPSHOTS.map((market) => (
          <article className="card soft compact-card" key={market.name}>
            <div className="kicker">Submarket</div>
            <h3 style={{ marginTop: "8px" }}>{market.name}</h3>
            <p className="muted"><strong>Best for:</strong> {market.bestFor}</p>
            <div className="table-like" style={{ marginTop: "12px" }}>
              <div className="row"><b>Strengths</b><span>{market.strengths.join(" • ")}</span></div>
              <div className="row"><b>Watch for</b><span>{market.watchouts.join(" • ")}</span></div>
            </div>
          </article>
        ))}
      </div>

      <div className="inline-callout" style={{ marginTop: "14px" }}>
        <div>
          <div className="kicker">Decision lens</div>
          <div><strong>Do not compare only the buildings.</strong> Compare the corridors the buildings live in.</div>
        </div>
        <Link className="btn btn-secondary btn-sm" to="/guides/richmond-hill-spotlight">Read a submarket guide</Link>
      </div>
    </section>
  );
}
