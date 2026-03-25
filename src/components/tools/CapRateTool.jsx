import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

export default function CapRateTool() {
  const [form, setForm] = useState({
    rentRoll: 185000,
    vacancyPercent: 4,
    operatingExpenses: 47000,
    purchasePrice: 2550000,
  });

  const result = useMemo(() => {
    const effectiveIncome = (Number(form.rentRoll) || 0) * (1 - (Number(form.vacancyPercent) || 0) / 100);
    const noi = effectiveIncome - (Number(form.operatingExpenses) || 0);
    const capRate = form.purchasePrice ? (noi / Number(form.purchasePrice)) * 100 : 0;
    return { effectiveIncome, noi, capRate };
  }, [form]);

  return (
    <section id="cap-rate" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Cap rate / ROI</div>
          <h2 style={{ marginTop: "8px" }}>Pressure-test commercial acquisitions before you fall in love with the headline price.</h2>
        </div>
        <p>Use this for first-pass investment screening on income-producing commercial opportunities.</p>
      </div>
      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="field">
            <label htmlFor="cap-rent">Annual gross rent roll</label>
            <input id="cap-rent" type="number" value={form.rentRoll} onChange={(e) => setForm((s) => ({ ...s, rentRoll: e.target.value }))} />
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="cap-vacancy">Vacancy allowance %</label>
              <input id="cap-vacancy" type="number" step="0.1" value={form.vacancyPercent} onChange={(e) => setForm((s) => ({ ...s, vacancyPercent: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="cap-expenses">Operating expenses</label>
              <input id="cap-expenses" type="number" value={form.operatingExpenses} onChange={(e) => setForm((s) => ({ ...s, operatingExpenses: e.target.value }))} />
            </div>
          </div>
          <div className="field">
            <label htmlFor="cap-price">Purchase price</label>
            <input id="cap-price" type="number" value={form.purchasePrice} onChange={(e) => setForm((s) => ({ ...s, purchasePrice: e.target.value }))} />
          </div>
          <p className="tiny muted">This is a screening tool. Verify leases, recoveries, reserves, financing, and tenant quality before underwriting the deal.</p>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>NOI</strong> {money(result.noi)}</span>
            <span className="pill"><strong>Cap rate</strong> {result.capRate.toFixed(2)}%</span>
          </div>
          <div className="table-like">
            <div className="row"><b>Effective gross income</b><span>{money(result.effectiveIncome)}</span></div>
            <div className="row"><b>Operating expenses</b><span>{money(Number(form.operatingExpenses) || 0)}</span></div>
            <div className="row"><b>Net operating income</b><span>{money(result.noi)}</span></div>
            <div className="row"><b>Cap rate</b><span>{result.capRate.toFixed(2)}%</span></div>
          </div>
          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Decision lens</div>
              <div><strong>Use cap rate as a starting point, not the whole answer.</strong> Tenant quality, rollover risk, and location logic still matter.</div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/guides/industrial-condo-buyer-checklist">Read buyer guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
