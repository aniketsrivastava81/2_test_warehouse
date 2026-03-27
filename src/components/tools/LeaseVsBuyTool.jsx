import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

export default function LeaseVsBuyTool() {
  const [form, setForm] = useState({
    purchasePrice: 4980000,
    downPercent: 30,
    interestRate: 6.15,
    amortYears: 25,
    noi: 438000,
    annualLeaseCost: 371000,
    targetDSCR: 1.25,
    ltvLimit: 70,
    stressRate: 7.35,
    vtbAvailable: "yes",
    vtbAmount: 350000,
    lenderFees: 28000,
    reserveMonths: 6,
  });

  const output = useMemo(() => {
    const price = Number(form.purchasePrice) || 0;
    const down = price * ((Number(form.downPercent) || 0) / 100);
    const vtb = form.vtbAvailable === "yes" ? Number(form.vtbAmount) || 0 : 0;
    const loanPrincipal = Math.max(price - down - vtb, 0);
    const monthlyRate = (Number(form.interestRate) || 0) / 100 / 12;
    const months = (Number(form.amortYears) || 0) * 12;
    const mortgagePayment = monthlyRate > 0 ? (loanPrincipal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months)) : loanPrincipal / Math.max(months, 1);
    const annualDebtService = mortgagePayment * 12;
    const dscr = annualDebtService > 0 ? (Number(form.noi) || 0) / annualDebtService : 0;
    const ltv = price > 0 ? ((loanPrincipal + vtb) / price) * 100 : 0;
    const stressMonthlyRate = (Number(form.stressRate) || 0) / 100 / 12;
    const stressPayment = stressMonthlyRate > 0 ? (loanPrincipal * stressMonthlyRate) / (1 - Math.pow(1 + stressMonthlyRate, -months)) : loanPrincipal / Math.max(months, 1);
    const stressDSCR = stressPayment > 0 ? (Number(form.noi) || 0) / (stressPayment * 12) : 0;
    const reserveTarget = mortgagePayment * (Number(form.reserveMonths) || 0);
    const lenderComfort = dscr >= (Number(form.targetDSCR) || 0) && ltv <= (Number(form.ltvLimit) || 0);

    return { down, loanPrincipal, annualDebtService, dscr, ltv, stressDSCR, reserveTarget, lenderComfort };
  }, [form]);

  return (
    <section id="tool-mortgage-intelligence" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 3 · Mortgage Intelligence</span>
          <h2>Finance posture before the site visit starts driving the decision.</h2>
          <p>
            This is the owner-user and buy-side filter: target DSCR, LTV ceiling, stress-rate coverage, vendor take-back support, reserve comfort, and lease alternative pressure in one view.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/listings">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field"><label htmlFor="mort-price">Purchase price</label><input id="mort-price" type="number" value={form.purchasePrice} onChange={(e) => setForm((s) => ({ ...s, purchasePrice: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-noi">NOI / operating income</label><input id="mort-noi" type="number" value={form.noi} onChange={(e) => setForm((s) => ({ ...s, noi: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-down">Down payment %</label><input id="mort-down" type="number" value={form.downPercent} onChange={(e) => setForm((s) => ({ ...s, downPercent: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-rate">Interest rate %</label><input id="mort-rate" type="number" step="0.01" value={form.interestRate} onChange={(e) => setForm((s) => ({ ...s, interestRate: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-amort">Amortization (years)</label><input id="mort-amort" type="number" value={form.amortYears} onChange={(e) => setForm((s) => ({ ...s, amortYears: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-target-dscr">Target DSCR</label><input id="mort-target-dscr" type="number" step="0.01" value={form.targetDSCR} onChange={(e) => setForm((s) => ({ ...s, targetDSCR: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-ltv">LTV limit %</label><input id="mort-ltv" type="number" value={form.ltvLimit} onChange={(e) => setForm((s) => ({ ...s, ltvLimit: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-stress">Stress rate %</label><input id="mort-stress" type="number" step="0.01" value={form.stressRate} onChange={(e) => setForm((s) => ({ ...s, stressRate: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-vtb">VTB available</label><select id="mort-vtb" value={form.vtbAvailable} onChange={(e) => setForm((s) => ({ ...s, vtbAvailable: e.target.value }))}><option value="yes">Yes</option><option value="no">No</option></select></div>
          <div className="tools-v2-field"><label htmlFor="mort-vtb-amount">VTB amount</label><input id="mort-vtb-amount" type="number" value={form.vtbAmount} onChange={(e) => setForm((s) => ({ ...s, vtbAmount: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-fees">Lender / legal fees</label><input id="mort-fees" type="number" value={form.lenderFees} onChange={(e) => setForm((s) => ({ ...s, lenderFees: e.target.value }))} /></div>
          <div className="tools-v2-field"><label htmlFor="mort-reserve">Reserve target (months)</label><input id="mort-reserve" type="number" value={form.reserveMonths} onChange={(e) => setForm((s) => ({ ...s, reserveMonths: e.target.value }))} /></div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Down payment</span><strong>{money(output.down)}</strong></div>
            <div className="tools-v2-metric"><span>Annual debt service</span><strong>{money(output.annualDebtService)}</strong></div>
            <div className="tools-v2-metric"><span>DSCR</span><strong>{output.dscr.toFixed(2)}x</strong></div>
            <div className="tools-v2-metric"><span>LTV</span><strong>{output.ltv.toFixed(1)}%</strong></div>
          </div>

          <div className="tools-v2-table">
            <div><b>Stress-rate DSCR</b><span>{output.stressDSCR.toFixed(2)}x</span></div>
            <div><b>Reserve target</b><span>{money(output.reserveTarget)}</span></div>
            <div><b>Lease alternative</b><span>{money(Number(form.annualLeaseCost) || 0)} / year</span></div>
            <div><b>VTB support</b><span>{form.vtbAvailable === "yes" ? money(Number(form.vtbAmount) || 0) : "Not included"}</span></div>
            <div><b>Lender posture</b><span>{output.lenderComfort ? "Within first-pass comfort band" : "Needs restructuring or more equity"}</span></div>
          </div>

          <div className="tools-v2-chart">
            <div className="tools-v2-chart-row"><span>DSCR target</span><div className="tools-v2-chart-track"><i style={{ width: `${Math.min(100, (output.dscr / Math.max(Number(form.targetDSCR) || 1, 0.5)) * 82)}%` }} /></div></div>
            <div className="tools-v2-chart-row"><span>LTV headroom</span><div className="tools-v2-chart-track"><i style={{ width: `${Math.min(100, Math.max(8, ((Number(form.ltvLimit) || 0) - output.ltv + 20) * 2.6))}%` }} /></div></div>
            <div className="tools-v2-chart-row"><span>Stress durability</span><div className="tools-v2-chart-track"><i style={{ width: `${Math.min(100, output.stressDSCR * 55)}%` }} /></div></div>
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article>
          <h3>Why this matters</h3>
          <p>Before deciding which way to go, the capital stack needs to feel real. This avoids touring a property the financing profile was never going to support.</p>
        </article>
        <article>
          <h3>What to watch</h3>
          <p>Low DSCR, high LTV, and no VTB cushion usually mean the deal requires more equity, a lower price, or a slower acquisition plan.</p>
        </article>
        <article>
          <h3>Where KOLT helps</h3>
          <p>KOLT can translate this first-pass screen into a cleaner shortlist between lease, buy, and hold-off decisions.</p>
        </article>
      </div>
    </section>
  );
}
