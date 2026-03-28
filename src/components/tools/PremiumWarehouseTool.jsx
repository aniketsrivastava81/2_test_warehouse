import React from "react";

function score(values) {
  let total = 44;
  total += Number(values.clearHeight || 0) * 0.9;
  total += Number(values.dockDoors || 0) * 3;
  total += Number(values.trailerStalls || 0) * 1.6;
  total += values.esfr ? 8 : -6;
  total += values.crossDock ? 8 : 0;
  total += { base: 0, upgraded: 5, premium: 9 }[values.officeFinish] || 0;
  return Math.max(0, Math.min(100, Math.round(total)));
}

function verdict(total) {
  if (total >= 82) return { label: "Premium", tone: "is-good", note: "Operationally strong enough to justify premium positioning." };
  if (total >= 65) return { label: "Competitive", tone: "is-mid", note: "Commercially credible, but still needs sharper operating proof." };
  return { label: "Needs work", tone: "is-low", note: "The building reads cleaner than it performs. Premium language would feel overstated." };
}

export default function PremiumWarehouseTool() {
  const [values, setValues] = React.useState({ clearHeight: 28, dockDoors: 4, trailerStalls: 6, esfr: true, crossDock: false, officeFinish: "upgraded" });
  const total = score(values);
  const result = verdict(total);

  const update = (event) => {
    const { name, type, checked, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <section id="tool-premium-warehouse" className="tools-v2-card tools-v2-card-large premium-tool">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 8 - Premium Warehouse Readiness</span>
          <h2>Turn the premium label into a live operational score.</h2>
          <p>
            Instead of a static information block, this tool now lets the user change clear height, dock count, trailer storage,
            sprinkler posture, and office finish to see whether the building really deserves premium positioning.
          </p>
        </div>
      </div>

      <div className="premium-tool__grid">
        <form className="premium-tool__panel premium-tool__controls">
          <label>
            <span>Clear height ({values.clearHeight} ft)</span>
            <input id="pw-clearHeight" type="range" min="16" max="40" name="clearHeight" value={values.clearHeight} onChange={update} />
          </label>
          <label>
            <span>Dock doors ({values.dockDoors})</span>
            <input id="pw-dockDoors" type="range" min="0" max="14" name="dockDoors" value={values.dockDoors} onChange={update} />
          </label>
          <label>
            <span>Trailer stalls ({values.trailerStalls})</span>
            <input id="pw-trailerStalls" type="range" min="0" max="24" name="trailerStalls" value={values.trailerStalls} onChange={update} />
          </label>
          <label className="premium-tool__check"><input id="pw-esfr" type="checkbox" name="esfr" checked={values.esfr} onChange={update} /><span>ESFR / modern suppression confirmed</span></label>
          <label className="premium-tool__check"><input id="pw-crossDock" type="checkbox" name="crossDock" checked={values.crossDock} onChange={update} /><span>Cross-dock shipping configuration</span></label>
          <label>
            <span>Office finish</span>
            <select id="pw-officeFinish" name="officeFinish" value={values.officeFinish} onChange={update}>
              <option value="base">Base finish</option>
              <option value="upgraded">Upgraded office</option>
              <option value="premium">Premium client-facing finish</option>
            </select>
          </label>
        </form>

        <div className="premium-tool__panel premium-tool__result">
          <div className="premium-tool__score-ring">
            <strong>{total}</strong>
            <span>/ 100</span>
          </div>
          <div className={`premium-tool__verdict ${result.tone}`}>{result.label}</div>
          <p>{result.note}</p>
          <div className="premium-tool__kpis">
            <article><small>Dock posture</small><strong>{Number(values.dockDoors) >= 6 ? "Strong" : "Average"}</strong></article>
            <article><small>Storage readiness</small><strong>{Number(values.clearHeight) >= 28 ? "Racking ready" : "More limited"}</strong></article>
            <article><small>Trailer flexibility</small><strong>{Number(values.trailerStalls) >= 10 ? "Strong yard" : "Constrained"}</strong></article>
          </div>
        </div>
      </div>
    </section>
  );
}
