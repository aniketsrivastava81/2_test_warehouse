import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

export default function CamEstimatorTool() {
  const [form, setForm] = useState({
    sqft: 16250,
    baseRent: 18.95,
    tmi: 6.85,
    taxes: 1.35,
    insurance: 0.42,
    utilitiesMonthly: 2850,
    repairsMonthly: 980,
    suppression: "ESFR sprinkler",
    phase: "3 phase 600V",
    loading: 6,
    clearHeight: 30,
    officePercent: 12,
  });

  const output = useMemo(() => {
    const sqft = Number(form.sqft) || 0;
    const annualBase = sqft * (Number(form.baseRent) || 0);
    const annualTmi = sqft * (Number(form.tmi) || 0);
    const annualTaxes = sqft * (Number(form.taxes) || 0);
    const annualInsurance = sqft * (Number(form.insurance) || 0);
    const utilities = (Number(form.utilitiesMonthly) || 0) * 12;
    const repairs = (Number(form.repairsMonthly) || 0) * 12;
    const annualTotal = annualBase + annualTmi + annualTaxes + annualInsurance + utilities + repairs;
    const monthlyTotal = annualTotal / 12;
    const loadedRate = sqft ? annualTotal / sqft : 0;
    const hiddenDrag = (annualTmi + annualTaxes + annualInsurance + repairs) / Math.max(annualTotal, 1);

    return {
      annualBase,
      annualTmi,
      annualTaxes,
      annualInsurance,
      utilities,
      repairs,
      annualTotal,
      monthlyTotal,
      loadedRate,
      hiddenDrag,
    };
  }, [form]);

  const chartRows = [
    { label: "Base rent", value: output.annualBase, max: output.annualTotal },
    { label: "TMI / CAM", value: output.annualTmi, max: output.annualTotal },
    { label: "Taxes + insurance", value: output.annualTaxes + output.annualInsurance, max: output.annualTotal },
    { label: "Utilities + repairs", value: output.utilities + output.repairs, max: output.annualTotal },
  ];

  return (
    <section id="tool-cam-tmi" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 2 · CAM / TMI Budget</span>
          <h2>Total occupancy view with sprinkler, utility, and operating drag built in.</h2>
          <p>
            This version is fuller on purpose. It helps a user see when an apparently clean industrial rate is being distorted by additional rent, building systems, or operating assumptions.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/listings">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field"><label htmlFor="cam-sqft">Square footage</label><input id="cam-sqft" type="number" value={form.sqft} onChange={(e) => setForm((s) => ({ ...s, sqft: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-base">Base rent / SF</label><input id="cam-base" type="number" step="0.01" value={form.baseRent} onChange={(e) => setForm((s) => ({ ...s, baseRent: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-tmi">TMI / CAM / SF</label><input id="cam-tmi" type="number" step="0.01" value={form.tmi} onChange={(e) => setForm((s) => ({ ...s, tmi: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-taxes">Property taxes / SF</label><input id="cam-taxes" type="number" step="0.01" value={form.taxes} onChange={(e) => setForm((s) => ({ ...s, taxes: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-insurance">Insurance / SF</label><input id="cam-insurance" type="number" step="0.01" value={form.insurance} onChange={(e) => setForm((s) => ({ ...s, insurance: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-utilities">Utilities monthly</label><input id="cam-utilities" type="number" value={form.utilitiesMonthly} onChange={(e) => setForm((s) => ({ ...s, utilitiesMonthly: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-repairs">Repairs / misc. monthly</label><input id="cam-repairs" type="number" value={form.repairsMonthly} onChange={(e) => setForm((s) => ({ ...s, repairsMonthly: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-suppression">Suppression / sprinkler</label><input id="cam-suppression" type="text" value={form.suppression} onChange={(e) => setForm((s) => ({ ...s, suppression: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-phase">Phase / power service</label><input id="cam-phase" type="text" value={form.phase} onChange={(e) => setForm((s) => ({ ...s, phase: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-loading">Truck-level doors</label><input id="cam-loading" type="number" value={form.loading} onChange={(e) => setForm((s) => ({ ...s, loading: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-clear">Clear height</label><input id="cam-clear" type="number" value={form.clearHeight} onChange={(e) => setForm((s) => ({ ...s, clearHeight: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="cam-office">Office finish %</label><input id="cam-office" type="number" value={form.officePercent} onChange={(e) => setForm((s) => ({ ...s, officePercent: e.target.value }))} /></div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Annual total</span><strong>{money(output.annualTotal)}</strong></div>
            <div className="tools-v2-metric"><span>Monthly total</span><strong>{money(output.monthlyTotal)}</strong></div>
            <div className="tools-v2-metric"><span>Loaded rate / SF</span><strong>{output.loadedRate.toFixed(2)}</strong></div>
            <div className="tools-v2-metric"><span>Hidden drag</span><strong>{Math.round(output.hiddenDrag * 100)}%</strong></div>
          </div>

          <div className="tools-v2-table">
            <div><b>Suppression</b><span>{form.suppression}</span></div>
            <div><b>Power service</b><span>{form.phase}</span></div>
            <div><b>Loading / clear height</b><span>{form.loading} doors · {form.clearHeight}' clear</span></div>
            <div><b>Office finish</b><span>{form.officePercent}% of total area</span></div>
            <div><b>Total occupancy cost</b><span>{money(output.annualTotal)}</span></div>
          </div>

          <div className="tools-v2-chart">
            {chartRows.map((row) => (
              <div className="tools-v2-chart-row" key={row.label}>
                <span>{row.label}</span>
                <div className="tools-v2-chart-track"><i style={{ width: `${Math.max(7, (row.value / Math.max(row.max, 1)) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article>
          <h3>What usually gets missed</h3>
          <p>Sprinkler scope, power configuration, and ongoing repairs often decide whether a "cheap" industrial unit stays cheap after move-in.</p>
        </article>
        <article>
          <h3>Best use</h3>
          <p>Run this when two units feel close on rate but very different on infrastructure, loading, or office burden.</p>
        </article>
        <article>
          <h3>Next move</h3>
          <p>If the loaded rate becomes tight, negotiate work letters, free-rent support, or defer higher-buildout options from the shortlist.</p>
        </article>
      </div>
    </section>
  );
}
