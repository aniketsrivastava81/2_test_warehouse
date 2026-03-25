import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

export default function CamEstimatorTool() {
  const [form, setForm] = useState({ sqft: 3200, baseRent: 19.5, additionalRent: 8.75, utilitiesMonthly: 850, maintenanceMonthly: 420 });

  const totals = useMemo(() => {
    const sqft = Number(form.sqft) || 0;
    const baseAnnual = sqft * (Number(form.baseRent) || 0);
    const additionalAnnual = sqft * (Number(form.additionalRent) || 0);
    const utilitiesAnnual = (Number(form.utilitiesMonthly) || 0) * 12;
    const maintenanceAnnual = (Number(form.maintenanceMonthly) || 0) * 12;
    const annualTotal = baseAnnual + additionalAnnual + utilitiesAnnual + maintenanceAnnual;
    return { baseAnnual, additionalAnnual, utilitiesAnnual, maintenanceAnnual, annualTotal, monthlyTotal: annualTotal / 12 };
  }, [form]);

  return (
    <section id="cam-budget" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">CAM / TMI budget</div>
          <h2 style={{ marginTop: "8px" }}>Estimate true occupancy cost before a “good deal” turns into an expensive surprise.</h2>
        </div>
        <p>Base rent rarely tells the whole story. This tool gives you a cleaner first-pass annual and monthly occupancy budget.</p>
      </div>
      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="field">
            <label htmlFor="cam-sqft">Square footage</label>
            <input id="cam-sqft" type="number" value={form.sqft} onChange={(e) => setForm((s) => ({ ...s, sqft: e.target.value }))} />
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="cam-base">Base rent / SF</label>
              <input id="cam-base" type="number" step="0.1" value={form.baseRent} onChange={(e) => setForm((s) => ({ ...s, baseRent: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cam-additional">Additional rent / SF</label>
              <input id="cam-additional" type="number" step="0.1" value={form.additionalRent} onChange={(e) => setForm((s) => ({ ...s, additionalRent: e.target.value }))} />
            </div>
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="cam-utilities">Utilities monthly</label>
              <input id="cam-utilities" type="number" value={form.utilitiesMonthly} onChange={(e) => setForm((s) => ({ ...s, utilitiesMonthly: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cam-maintenance">Maintenance / misc. monthly</label>
              <input id="cam-maintenance" type="number" value={form.maintenanceMonthly} onChange={(e) => setForm((s) => ({ ...s, maintenanceMonthly: e.target.value }))} />
            </div>
          </div>
          <p className="tiny muted">Use this when comparing two spaces that appear similar on rent but carry different total occupancy burdens.</p>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>Annual total</strong> {money(totals.annualTotal)}</span>
            <span className="pill"><strong>Monthly total</strong> {money(totals.monthlyTotal)}</span>
          </div>
          <div className="table-like">
            <div className="row"><b>Base rent</b><span>{money(totals.baseAnnual)}</span></div>
            <div className="row"><b>Additional rent / TMI</b><span>{money(totals.additionalAnnual)}</span></div>
            <div className="row"><b>Utilities</b><span>{money(totals.utilitiesAnnual)}</span></div>
            <div className="row"><b>Maintenance + misc.</b><span>{money(totals.maintenanceAnnual)}</span></div>
            <div className="row"><b>Total occupancy cost</b><span>{money(totals.annualTotal)}</span></div>
          </div>
          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Decision lens</div>
              <div><strong>Two spaces with similar rent can feel completely different once operating costs are included.</strong></div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/listings">Compare listings</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
