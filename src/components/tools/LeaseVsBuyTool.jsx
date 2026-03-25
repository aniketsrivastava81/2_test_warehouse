import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

export default function LeaseVsBuyTool() {
  const [form, setForm] = useState({
    sqft: 2500,
    netRate: 21,
    additionalRent: 8,
    pricePerSqft: 520,
    downPercent: 25,
    amortYears: 25,
    interestRate: 6.1,
    condoFeesMonthly: 950,
    taxAndInsuranceMonthly: 1200,
  });

  const results = useMemo(() => {
    const sqft = Number(form.sqft) || 0;
    const annualLease = sqft * ((Number(form.netRate) || 0) + (Number(form.additionalRent) || 0));
    const monthlyLease = annualLease / 12;

    const purchasePrice = sqft * (Number(form.pricePerSqft) || 0);
    const downPayment = purchasePrice * ((Number(form.downPercent) || 0) / 100);
    const loanPrincipal = Math.max(purchasePrice - downPayment, 0);
    const monthlyRate = (Number(form.interestRate) || 0) / 100 / 12;
    const numberOfPayments = (Number(form.amortYears) || 0) * 12;

    const mortgagePayment =
      monthlyRate > 0 && numberOfPayments > 0
        ? (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numberOfPayments))
        : loanPrincipal / Math.max(numberOfPayments, 1);

    const monthlyOwnership =
      mortgagePayment +
      (Number(form.condoFeesMonthly) || 0) +
      (Number(form.taxAndInsuranceMonthly) || 0);

    return {
      annualLease,
      monthlyLease,
      purchasePrice,
      downPayment,
      monthlyOwnership,
      delta: monthlyOwnership - monthlyLease,
    };
  }, [form]);

  return (
    <section id="lease-vs-buy" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Lease vs buy</div>
          <h2 style={{ marginTop: "8px" }}>See whether ownership is worth comparing before you default to another lease cycle.</h2>
        </div>
        <p>Use this to compare monthly occupancy cost for a commercial lease versus a first-pass owner-user purchase scenario.</p>
      </div>

      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lvb-sqft">Square footage</label>
              <input id="lvb-sqft" type="number" value={form.sqft} onChange={(e) => setForm((s) => ({ ...s, sqft: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="lvb-price">Purchase price / SF</label>
              <input id="lvb-price" type="number" value={form.pricePerSqft} onChange={(e) => setForm((s) => ({ ...s, pricePerSqft: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lvb-net">Net rent / SF</label>
              <input id="lvb-net" type="number" value={form.netRate} onChange={(e) => setForm((s) => ({ ...s, netRate: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="lvb-additional">Additional rent / SF</label>
              <input id="lvb-additional" type="number" value={form.additionalRent} onChange={(e) => setForm((s) => ({ ...s, additionalRent: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lvb-down">Down payment %</label>
              <input id="lvb-down" type="number" value={form.downPercent} onChange={(e) => setForm((s) => ({ ...s, downPercent: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="lvb-rate">Interest rate %</label>
              <input id="lvb-rate" type="number" step="0.1" value={form.interestRate} onChange={(e) => setForm((s) => ({ ...s, interestRate: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lvb-amort">Amortization (years)</label>
              <input id="lvb-amort" type="number" value={form.amortYears} onChange={(e) => setForm((s) => ({ ...s, amortYears: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="lvb-condo">Condo / common fees monthly</label>
              <input id="lvb-condo" type="number" value={form.condoFeesMonthly} onChange={(e) => setForm((s) => ({ ...s, condoFeesMonthly: e.target.value }))} />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lvb-tax">Property tax + insurance monthly</label>
            <input id="lvb-tax" type="number" value={form.taxAndInsuranceMonthly} onChange={(e) => setForm((s) => ({ ...s, taxAndInsuranceMonthly: e.target.value }))} />
          </div>
          <p className="tiny muted">Use this as a first-pass screening tool, then verify financing, taxes, fees, and fit with a full deal review.</p>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>Lease</strong> {money(results.monthlyLease)}/mo</span>
            <span className="pill"><strong>Own</strong> {money(results.monthlyOwnership)}/mo</span>
          </div>
          <div className="table-like">
            <div className="row"><b>Annual lease cost</b><span>{money(results.annualLease)}</span></div>
            <div className="row"><b>Purchase price</b><span>{money(results.purchasePrice)}</span></div>
            <div className="row"><b>Down payment</b><span>{money(results.downPayment)}</span></div>
            <div className="row"><b>Monthly ownership cost</b><span>{money(results.monthlyOwnership)}</span></div>
            <div className="row"><b>Monthly gap</b><span>{results.delta >= 0 ? `${money(results.delta)} above leasing` : `${money(Math.abs(results.delta))} below leasing`}</span></div>
          </div>

          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Decision lens</div>
              <div><strong>Ownership is worth deeper review when the monthly gap is manageable and the business wants long-term control.</strong></div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/contact">Discuss the scenario</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
