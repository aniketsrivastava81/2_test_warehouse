import React from "react";

const details = [
  "Solar Ready Structural Verification: Yes",
  "ESFR sprinkler system confirmed",
  "32' clear height band",
  "Cross-dock shipping configuration",
  "LED high-bay lighting upgrade",
  "Trailer parking capacity in place",
  "Client-facing office finish in good condition",
  "Concrete shipping apron in strong shape",
  "Column spacing supportive of modern racking",
];

export default function PremiumWarehouseTool() {
  return (
    <section id="tool-premium-warehouse" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 8 · Premium Warehouse Readiness</span>
          <h2>White-background style information block with premium green emphasis.</h2>
          <p>
            This section is intentionally fuller and more visual. It should feel like a premium warehouse checklist that helps the user quickly understand whether a building is operationally impressive or just superficially clean.
          </p>
        </div>
      </div>

      <div className="tools-v2-premium-box">
        <div className="tools-v2-premium-state">Green (Premium)</div>
        <div className="tools-v2-premium-grid">
          {details.map((detail) => (
            <div className="tools-v2-premium-item" key={detail}>{detail}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
