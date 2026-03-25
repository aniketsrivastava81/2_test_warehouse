import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function money(value) {
  return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value || 0);
}

const ASSET_PROFILES = {
  industrialCondo2008: {
    label: "Industrial condo · 2008–2012 vintage",
    events: [
      { label: "Roof membrane review", dueYear: 2028, budget: 85000 },
      { label: "Dock and door package", dueYear: 2027, budget: 48000 },
      { label: "Parking lot mill + overlay", dueYear: 2029, budget: 62000 },
      { label: "Office HVAC replacement", dueYear: 2030, budget: 38000 },
      { label: "LED / controls refresh", dueYear: 2027, budget: 22000 },
    ],
  },
  flexIndustrial2013: {
    label: "Flex industrial · 2013–2017 vintage",
    events: [
      { label: "Roof seam and drainage program", dueYear: 2030, budget: 64000 },
      { label: "Truck court resurfacing", dueYear: 2029, budget: 54000 },
      { label: "Dock leveller and seal program", dueYear: 2028, budget: 35000 },
      { label: "RTU / HVAC reserve", dueYear: 2031, budget: 30000 },
      { label: "Lighting + sensor refresh", dueYear: 2028, budget: 18000 },
    ],
  },
  warehouse2018: {
    label: "Modern warehouse · 2018–2023 vintage",
    events: [
      { label: "Dock equipment reserve", dueYear: 2031, budget: 42000 },
      { label: "Roof inspection and reserve", dueYear: 2032, budget: 36000 },
      { label: "Yard and line repainting", dueYear: 2028, budget: 14000 },
      { label: "Battery / charger infrastructure reserve", dueYear: 2030, budget: 28000 },
      { label: "LED driver replacements", dueYear: 2031, budget: 12000 },
    ],
  },
};

function statusForGap(gap) {
  if (gap <= 1) return "Due now";
  if (gap <= 3) return "Within hold window";
  return "Monitor";
}

export default function CapexForecasterTool() {
  const [form, setForm] = useState({
    acquisitionYear: 2026,
    profile: "industrialCondo2008",
  });

  const output = useMemo(() => {
    const profile = ASSET_PROFILES[form.profile];
    const acquisitionYear = Number(form.acquisitionYear) || 2026;
    const events = profile.events.map((item) => {
      const yearsAfterAcquisition = item.dueYear - acquisitionYear;
      return {
        ...item,
        yearsAfterAcquisition,
        status: statusForGap(yearsAfterAcquisition),
      };
    });

    const nearTerm = events.filter((item) => item.yearsAfterAcquisition <= 3).reduce((sum, item) => sum + item.budget, 0);
    const total = events.reduce((sum, item) => sum + item.budget, 0);
    return { profile, events, nearTerm, total };
  }, [form]);

  return (
    <section id="capex-forecaster" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Pillar VII tool</div>
          <h2 style={{ marginTop: "8px" }}>CapEx forecaster by acquisition year.</h2>
        </div>
        <p>Use the acquisition year to see when major capital items are likely to hit the hold period instead of discovering the reserve burden after closing.</p>
      </div>

      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="field">
            <label htmlFor="capex-profile">Sample asset profile</label>
            <select id="capex-profile" value={form.profile} onChange={(e) => setForm((s) => ({ ...s, profile: e.target.value }))}>
              {Object.entries(ASSET_PROFILES).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="capex-year">Year of acquisition</label>
            <input id="capex-year" type="number" min="2020" max="2035" value={form.acquisitionYear} onChange={(e) => setForm((s) => ({ ...s, acquisitionYear: e.target.value }))} />
          </div>
          <p className="tiny muted">This is a planning screen for reserve thinking. It is not a building condition assessment and should be confirmed with inspection reports, vendor quotes, and lease review.</p>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>Near-term reserve</strong> {money(output.nearTerm)}</span>
            <span className="pill"><strong>Total sample program</strong> {money(output.total)}</span>
          </div>

          <div className="table-like">
            {output.events.map((item) => (
              <div className="row" key={item.label}>
                <b>{item.label}</b>
                <span>{item.dueYear} · {item.yearsAfterAcquisition <= 0 ? "Already due" : `${item.yearsAfterAcquisition} year${item.yearsAfterAcquisition === 1 ? "" : "s"} after acquisition`} · {money(item.budget)}</span>
              </div>
            ))}
          </div>

          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Decision lens</div>
              <div><strong>If a building looks inexpensive but its reserve schedule lands inside your first three years, the headline price may be hiding the real cost.</strong></div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/contact">Review reserve risk</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
