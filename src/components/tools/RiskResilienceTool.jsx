import React, { useMemo, useState } from "react";

function band(score) {
  if (score >= 82) return { label: "Resilient", tone: "high" };
  if (score >= 64) return { label: "Watch closely", tone: "medium" };
  return { label: "Higher risk", tone: "low" };
}

export default function RiskResilienceTool() {
  const [form, setForm] = useState({
    flood: 82,
    powerRedundancy: 76,
    labourDepth: 71,
    zoningFlex: 84,
    shippingRecovery: 73,
    ageCondition: 69,
    climatePreparedness: 78,
    insuranceComfort: 66,
  });

  const output = useMemo(() => {
    const values = Object.values(form).map((value) => Number(value) || 0);
    const score = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    return { score, band: band(score) };
  }, [form]);

  const rows = [
    ["Flood exposure", "flood"],
    ["Power redundancy", "powerRedundancy"],
    ["Labour depth", "labourDepth"],
    ["Zoning flexibility", "zoningFlex"],
    ["Shipping recovery", "shippingRecovery"],
    ["Asset condition", "ageCondition"],
    ["Climate readiness", "climatePreparedness"],
    ["Insurance comfort", "insuranceComfort"],
  ];

  return (
    <section id="tool-risk-resilience" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 7 · Risk & Resilience</span>
          <h2>Risk score in a visibly different colour state.</h2>
          <p>
            This block is meant to feel different from the other calculators: more like an at-a-glance resilience signal that makes the user stop and think about downside, not just fit.
          </p>
        </div>
      </div>

      <div className="tools-v2-split tools-v2-split-risk">
        <div className="tools-v2-panel tools-v2-form-grid">
          {rows.map(([label, key]) => (
            <div className="tools-v2-field tools-v2-field-span-2" key={key}>
              <label htmlFor={`risk-${key}`}>{label}</label>
              <input id={`risk-${key}`} type="range" min="20" max="100" value={form[key]} onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))} />
            </div>
          ))}
        </div>
        <aside className={`tools-v2-panel tools-v2-risk-panel tools-v2-risk-panel-${output.band.tone}`}>
          <div className="tools-v2-risk-score">{output.score}</div>
          <strong>{output.band.label}</strong>
          <p>Use this to show whether the property still makes sense once resilience, continuity, and insurability are part of the conversation.</p>
          <div className="tools-v2-chart">
            {rows.slice(0, 4).map(([label, key]) => (
              <div className="tools-v2-chart-row" key={key}>
                <span>{label}</span>
                <div className="tools-v2-chart-track"><i style={{ width: `${form[key]}%` }} /></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
