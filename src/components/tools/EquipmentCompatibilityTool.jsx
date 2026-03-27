import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const USE_CASES = {
  logistics: { label: "Distribution / logistics", power: 600, clear: 32, truck: 6, driveIn: 1, sprinkler: true },
  manufacturing: { label: "Light manufacturing", power: 1200, clear: 24, truck: 3, driveIn: 1, sprinkler: false },
  food: { label: "Food / cold chain prep", power: 1600, clear: 32, truck: 4, driveIn: 1, sprinkler: true },
  fleet: { label: "Fleet / service operations", power: 800, clear: 20, truck: 2, driveIn: 2, sprinkler: false },
};

function check(pass, label, detail) {
  return { pass, label, detail };
}

export default function EquipmentCompatibilityTool() {
  const [form, setForm] = useState({
    useCase: "logistics",
    amperage: 1200,
    voltage: 600,
    phase: "3 phase",
    clearHeight: 30,
    esfr: "yes",
    suppressionType: "ESFR sprinkler",
    truckDoors: 5,
    driveInDoors: 2,
    trailerParking: 16,
    yardDepth: 130,
    slabThickness: 7,
  });

  const output = useMemo(() => {
    const profile = USE_CASES[form.useCase];
    const checks = [
      check((Number(form.amperage) || 0) >= profile.power, "Power service", `${profile.power}A target`),
      check((Number(form.clearHeight) || 0) >= profile.clear, "Clear height", `${profile.clear}' target`),
      check((Number(form.truckDoors) || 0) >= profile.truck, "Truck doors", `${profile.truck}+ target`),
      check((Number(form.driveInDoors) || 0) >= profile.driveIn, "Drive-in doors", `${profile.driveIn}+ target`),
      check((form.esfr === "yes") || !profile.sprinkler, "ESFR / sprinkler", profile.sprinkler ? "Required or strongly preferred" : "Helpful but not mandatory"),
      check((Number(form.yardDepth) || 0) >= 120, "Truck court depth", "120'+ preferred"),
      check((Number(form.trailerParking) || 0) >= 10, "Trailer parking", "10+ stalls helpful"),
      check((Number(form.slabThickness) || 0) >= 6, "Slab thickness", "6 in.+ for heavier use"),
    ];
    const score = checks.filter((item) => item.pass).length;
    return { profile, checks, score, tone: score >= 7 ? "Ready" : score >= 5 ? "Needs review" : "Weak fit" };
  }, [form]);

  return (
    <section id="tool-warehouse-fit" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 6 · Warehouse Fit</span>
          <h2>Operational systems, loading, and utility match.</h2>
          <p>
            This is the fuller warehouse screening layer. It surfaces suppression, power, loading, yard depth, slab, and operational fit before the shortlist gets visually biased.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/listings">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field"><label htmlFor="fit-use">Use case</label><select id="fit-use" value={form.useCase} onChange={(e) => setForm((s) => ({ ...s, useCase: e.target.value }))}>{Object.entries(USE_CASES).map(([key, item]) => <option value={key} key={key}>{item.label}</option>)}</select></div>
          <div className="tools-v2-field"><label htmlFor="fit-amp">Amperage</label><input id="fit-amp" type="number" value={form.amperage} onChange={(e) => setForm((s) => ({ ...s, amperage: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-voltage">Voltage</label><input id="fit-voltage" type="number" value={form.voltage} onChange={(e) => setForm((s) => ({ ...s, voltage: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-phase">Phase</label><input id="fit-phase" type="text" value={form.phase} onChange={(e) => setForm((s) => ({ ...s, phase: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-clear">Clear height</label><input id="fit-clear" type="number" value={form.clearHeight} onChange={(e) => setForm((s) => ({ ...s, clearHeight: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-esfr">ESFR verified</label><select id="fit-esfr" value={form.esfr} onChange={(e) => setForm((s) => ({ ...s, esfr: e.target.value }))}><option value="yes">Yes</option><option value="no">No</option></select></div>
          <div className="tools-v2-field"><label htmlFor="fit-suppression">Suppression / sprinkler</label><input id="fit-suppression" type="text" value={form.suppressionType} onChange={(e) => setForm((s) => ({ ...s, suppressionType: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-truck">Truck-level doors</label><input id="fit-truck" type="number" value={form.truckDoors} onChange={(e) => setForm((s) => ({ ...s, truckDoors: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-drive">Drive-in doors</label><input id="fit-drive" type="number" value={form.driveInDoors} onChange={(e) => setForm((s) => ({ ...s, driveInDoors: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-trailer">Trailer parking</label><input id="fit-trailer" type="number" value={form.trailerParking} onChange={(e) => setForm((s) => ({ ...s, trailerParking: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-yard">Yard depth</label><input id="fit-yard" type="number" value={form.yardDepth} onChange={(e) => setForm((s) => ({ ...s, yardDepth: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="fit-slab">Slab thickness</label><input id="fit-slab" type="number" step="0.5" value={form.slabThickness} onChange={(e) => setForm((s) => ({ ...s, slabThickness: e.target.value }))} /></div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Fit checks</span><strong>{output.score}/8</strong></div>
            <div className="tools-v2-metric"><span>Profile tone</span><strong>{output.tone}</strong></div>
            <div className="tools-v2-metric"><span>Profile</span><strong>{output.profile.label}</strong></div>
            <div className="tools-v2-metric"><span>Suppression</span><strong>{form.suppressionType}</strong></div>
          </div>
          <div className="tools-v2-table">
            {output.checks.map((item) => (
              <div key={item.label}><b>{item.label}</b><span>{item.pass ? "Pass" : `Gap · ${item.detail}`}</span></div>
            ))}
          </div>
          <div className="tools-v2-chart">
            {output.checks.map((item) => (
              <div className="tools-v2-chart-row" key={item.label}>
                <span>{item.label}</span>
                <div className="tools-v2-chart-track"><i style={{ width: item.pass ? "100%" : "42%" }} /></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article><h3>What this protects against</h3><p>Shortlisting buildings that look fine in photos but quietly fail the actual operating profile.</p></article>
        <article><h3>How to use it</h3><p>Use it as a hard-screen before tours, then take only the near-passes into deeper review or negotiation.</p></article>
        <article><h3>Why it matters</h3><p>Power, loading, slab, and suppression failures are expensive to fix after the wrong building already feels emotionally chosen.</p></article>
      </div>
    </section>
  );
}
