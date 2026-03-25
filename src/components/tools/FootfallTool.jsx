import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function makeWalkScoreLink({ address, lat, lng }) {
  const a = (address || "").trim();
  if (lat && lng) return `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(lat)}/lng%3D${encodeURIComponent(lng)}`;
  if (a) return `https://www.walkscore.com/score/${encodeURIComponent(a)}`;
  return "https://www.walkscore.com/CA-ON/Toronto";
}

export default function FootfallTool() {
  const [form, setForm] = useState({ address: "", lat: "", lng: "", walk: "", transit: "", bike: "", density: "medium", businessType: "retail" });

  const result = useMemo(() => {
    const walk = clamp(Number(form.walk) || 0, 0, 100);
    const transit = clamp(Number(form.transit) || 0, 0, 100);
    const bike = clamp(Number(form.bike) || 0, 0, 100);
    const densityBoost = { low: -6, medium: 0, high: 6 }[form.density] ?? 0;
    const index = clamp(Math.round(0.55 * walk + 0.3 * transit + 0.15 * bike + densityBoost), 0, 100);
    const tone = index >= 80 ? "High" : index >= 60 ? "Strong" : index >= 40 ? "Moderate" : "Low";
    const hours = index >= 75 ? "Open for commute + lunch + after-work traffic." : index >= 55 ? "Lean into lunch and appointment-based peaks." : "Treat this as a destination location and tighten appointment flow.";
    const offer = form.businessType === "retail" ? "Focus on quick-entry offers, visible signage, and repeat convenience." : form.businessType === "medical" ? "Lead with parking ease, wayfinding, and friction-free arrival." : form.businessType === "showroom" ? "Emphasize visibility, appointment experience, and easy first visits." : "Optimize signage and search presence more than walk-up traffic.";
    return { index, tone, hours, offer, link: makeWalkScoreLink(form) };
  }, [form]);

  return (
    <section id="footfall-access" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Footfall + access</div>
          <h2 style={{ marginTop: "8px" }}>Estimate how easy a location feels for customers, patients, and first-time visitors.</h2>
        </div>
        <p>Use Walk Score data plus your own local knowledge to judge convenience, not just map position.</p>
      </div>
      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="field">
            <label htmlFor="ff-address">Address</label>
            <input id="ff-address" type="text" placeholder="35 Leek Crescent, Richmond Hill" value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="ff-lat">Latitude (optional)</label>
              <input id="ff-lat" type="text" value={form.lat} onChange={(e) => setForm((s) => ({ ...s, lat: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="ff-lng">Longitude (optional)</label>
              <input id="ff-lng" type="text" value={form.lng} onChange={(e) => setForm((s) => ({ ...s, lng: e.target.value }))} />
            </div>
          </div>
          <div className="inline-callout">
            <div>
              <div className="kicker">Step 1</div>
              <div><strong>Open Walk Score</strong> and bring back Walk, Transit, and Bike data.</div>
            </div>
            <a className="btn btn-secondary btn-sm" href={result.link} target="_blank" rel="noreferrer">Open Walk Score</a>
          </div>
          <div className="grid grid-3">
            <div className="field"><label htmlFor="ff-walk">Walk</label><input id="ff-walk" type="number" min="0" max="100" value={form.walk} onChange={(e) => setForm((s) => ({ ...s, walk: e.target.value }))} /></div>
            <div className="field"><label htmlFor="ff-transit">Transit</label><input id="ff-transit" type="number" min="0" max="100" value={form.transit} onChange={(e) => setForm((s) => ({ ...s, transit: e.target.value }))} /></div>
            <div className="field"><label htmlFor="ff-bike">Bike</label><input id="ff-bike" type="number" min="0" max="100" value={form.bike} onChange={(e) => setForm((s) => ({ ...s, bike: e.target.value }))} /></div>
          </div>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="ff-density">Office / daytime density</label>
              <select id="ff-density" value={form.density} onChange={(e) => setForm((s) => ({ ...s, density: e.target.value }))}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="ff-type">Business type</label>
              <select id="ff-type" value={form.businessType} onChange={(e) => setForm((s) => ({ ...s, businessType: e.target.value }))}>
                <option value="retail">Retail / service</option>
                <option value="medical">Medical / wellness</option>
                <option value="showroom">Showroom</option>
                <option value="office">Office / destination use</option>
              </select>
            </div>
          </div>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>Access score</strong> {result.index}/100</span>
            <span className="pill">{result.tone} potential</span>
          </div>
          <div className="table-like">
            <div className="row"><b>Convenience outlook</b><span>{result.tone}</span></div>
            <div className="row"><b>Operating rhythm</b><span>{result.hours}</span></div>
            <div className="row"><b>Location playbook</b><span>{result.offer}</span></div>
            <div className="row"><b>Important reminder</b><span>Footfall supports a decision. It should not replace signage, parking, and access review in person.</span></div>
          </div>
          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Decision lens</div>
              <div><strong>Use this when visibility and ease of arrival matter as much as rent.</strong></div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/guides/retail-plaza-fit-check">Read retail guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
