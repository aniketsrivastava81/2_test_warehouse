import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function percent(value) {
  return `${Number(value || 0).toFixed(2)}%`;
}

export default function CapRateTool() {
  const [form, setForm] = useState({
    purchasePrice: 3250000,
    grossRent: 298000,
    vacancy: 3.5,
    recoveries: 28000,
    expenses: 76000,
    reserveAllowance: 18000,
    annualDebtService: 146000,
    targetCapRate: 6.15,
    exitCapRate: 6.65,
    rentGrowth: 2.5,
    tenantQuality: "strong",
    holdYears: 5,
  });

  const output = useMemo(() => {
    const purchasePrice = Number(form.purchasePrice) || 0;
    const grossRent = Number(form.grossRent) || 0;
    const vacancyLoss = grossRent * ((Number(form.vacancy) || 0) / 100);
    const effectiveGrossIncome = grossRent - vacancyLoss + (Number(form.recoveries) || 0);
    const noi = effectiveGrossIncome - (Number(form.expenses) || 0) - (Number(form.reserveAllowance) || 0);
    const capRate = purchasePrice ? (noi / purchasePrice) * 100 : 0;
    const debtCoverage = (Number(form.annualDebtService) || 0) > 0 ? noi / Number(form.annualDebtService) : 0;
    const targetValue = (Number(form.targetCapRate) || 0) > 0 ? noi / ((Number(form.targetCapRate) || 0) / 100) : 0;
    const spread = targetValue - purchasePrice;
    const stabilizedNOI = noi * Math.pow(1 + ((Number(form.rentGrowth) || 0) / 100), Number(form.holdYears) || 0);
    const exitValue = (Number(form.exitCapRate) || 0) > 0 ? stabilizedNOI / ((Number(form.exitCapRate) || 0) / 100) : 0;
    const qualityAdjustment = { weak: -0.25, average: 0, strong: 0.2, covenant: 0.35 }[form.tenantQuality] ?? 0;
    const convictionScore = Math.max(0, Math.min(100, Math.round((capRate - (Number(form.targetCapRate) || 0) + 6 + debtCoverage + qualityAdjustment) * 10)));
    const bars = [
      { label: "NOI", value: Math.min(100, Math.round((noi / Math.max(purchasePrice, 1)) * 1300)) },
      { label: "Debt", value: Math.min(100, Math.round(debtCoverage * 38)) },
      { label: "Spread", value: Math.min(100, Math.max(6, Math.round((Math.max(spread, 0) / Math.max(purchasePrice, 1)) * 900))) },
      { label: "Exit", value: Math.min(100, Math.round((exitValue / Math.max(purchasePrice, 1)) * 42)) },
    ];

    return {
      vacancyLoss,
      effectiveGrossIncome,
      noi,
      capRate,
      debtCoverage,
      targetValue,
      spread,
      exitValue,
      convictionScore,
      bars,
    };
  }, [form]);

  return (
    <section id="tool-cap-rate" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 1 · Cap Rate</span>
          <h2>Acquisition filter that goes beyond headline cap rate.</h2>
          <p>
            Use this to screen pricing, NOI quality, reserve drag, debt pressure, and exit posture before a commercial
            opportunity feels better than it really is.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/listings">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field">
            <label htmlFor="cap-price">Purchase price</label>
            <input id="cap-price" type="number" value={form.purchasePrice} onChange={(e) => setForm((s) => ({ ...s, purchasePrice: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-gross">Annual gross rent</label>
            <input id="cap-gross" type="number" value={form.grossRent} onChange={(e) => setForm((s) => ({ ...s, grossRent: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-vacancy">Vacancy allowance %</label>
            <input id="cap-vacancy" type="number" step="0.1" value={form.vacancy} onChange={(e) => setForm((s) => ({ ...s, vacancy: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-recoveries">Recoveries / reimbursements</label>
            <input id="cap-recoveries" type="number" value={form.recoveries} onChange={(e) => setForm((s) => ({ ...s, recoveries: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-expenses">Operating expenses</label>
            <input id="cap-expenses" type="number" value={form.expenses} onChange={(e) => setForm((s) => ({ ...s, expenses: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-reserve">Reserve allowance</label>
            <input id="cap-reserve" type="number" value={form.reserveAllowance} onChange={(e) => setForm((s) => ({ ...s, reserveAllowance: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-debt">Annual debt service</label>
            <input id="cap-debt" type="number" value={form.annualDebtService} onChange={(e) => setForm((s) => ({ ...s, annualDebtService: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-target">Target cap rate %</label>
            <input id="cap-target" type="number" step="0.01" value={form.targetCapRate} onChange={(e) => setForm((s) => ({ ...s, targetCapRate: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-exit">Exit cap rate %</label>
            <input id="cap-exit" type="number" step="0.01" value={form.exitCapRate} onChange={(e) => setForm((s) => ({ ...s, exitCapRate: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-growth">Annual rent growth %</label>
            <input id="cap-growth" type="number" step="0.1" value={form.rentGrowth} onChange={(e) => setForm((s) => ({ ...s, rentGrowth: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-tenant">Tenant quality</label>
            <select id="cap-tenant" value={form.tenantQuality} onChange={(e) => setForm((s) => ({ ...s, tenantQuality: e.target.value }))}>
              <option value="weak">Weak covenant</option>
              <option value="average">Average</option>
              <option value="strong">Strong</option>
              <option value="covenant">Institutional covenant</option>
            </select>
          </div>
          <div className="tools-v2-field">
            <label htmlFor="cap-hold">Hold period (years)</label>
            <input id="cap-hold" type="number" value={form.holdYears} onChange={(e) => setForm((s) => ({ ...s, holdYears: e.target.value }))} />
          </div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Cap rate</span><strong>{percent(output.capRate)}</strong></div>
            <div className="tools-v2-metric"><span>NOI</span><strong>{money(output.noi)}</strong></div>
            <div className="tools-v2-metric"><span>DSCR feel</span><strong>{output.debtCoverage.toFixed(2)}x</strong></div>
            <div className="tools-v2-metric"><span>Buy / pass score</span><strong>{output.convictionScore}/100</strong></div>
          </div>

          <div className="tools-v2-table">
            <div><b>Vacancy loss</b><span>{money(output.vacancyLoss)}</span></div>
            <div><b>Effective gross income</b><span>{money(output.effectiveGrossIncome)}</span></div>
            <div><b>Target value at target cap</b><span>{money(output.targetValue)}</span></div>
            <div><b>Price spread to target</b><span>{output.spread >= 0 ? `${money(output.spread)} above` : `${money(Math.abs(output.spread))} below`}</span></div>
            <div><b>Illustrative exit value</b><span>{money(output.exitValue)}</span></div>
          </div>

          <div className="tools-v2-chart">
            {output.bars.map((bar) => (
              <div className="tools-v2-chart-row" key={bar.label}>
                <span>{bar.label}</span>
                <div className="tools-v2-chart-track"><i style={{ width: `${bar.value}%` }} /></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article>
          <h3>Pricing pressure</h3>
          <p>If the spread to your target value is already stretched, the listing should only move forward if covenant quality or corridor quality is compensating for it.</p>
        </article>
        <article>
          <h3>Debt comfort</h3>
          <p>Use the debt-service view to catch apparently good cap rates that still feel tight once financing enters the picture.</p>
        </article>
        <article>
          <h3>Exit realism</h3>
          <p>The exit-rate lens keeps the first year from doing all the storytelling on a multi-year hold.</p>
        </article>
      </div>
    </section>
  );
}
