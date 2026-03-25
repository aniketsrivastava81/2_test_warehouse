import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function makeWalkScoreLink({ address, lat, lng }) {
  const a = (address || "").trim();
  if (lat && lng) {
    return `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(lat)}/lng%3D${encodeURIComponent(lng)}`;
  }
  if (a) {
    return `https://www.walkscore.com/score/${encodeURIComponent(a)}`;
  }
  return "https://www.walkscore.com/CA-ON/Toronto";
}

function footfallIndex({ walk = 0, transit = 0, bike = 0, officeDensity = "medium" }) {
  const w = clamp(Number(walk) || 0, 0, 100);
  const t = clamp(Number(transit) || 0, 0, 100);
  const b = clamp(Number(bike) || 0, 0, 100);
  const densityBoost = { low: -6, medium: 0, high: 6 }[officeDensity] ?? 0;
  const raw = 0.6 * w + 0.3 * t + 0.1 * b + densityBoost;
  return clamp(Math.round(raw), 0, 100);
}

function officeGoerGuide({ index, category, businessType }) {
  const i = clamp(Number(index) || 0, 0, 100);
  const intensity = i >= 80 ? "High" : i >= 60 ? "Strong" : i >= 40 ? "Moderate" : "Low";
  const hours =
    i >= 80
      ? "7:00am–7:00pm (capture both commute peaks)"
      : i >= 60
        ? "7:30am–6:30pm (lean into lunch + after-work)"
        : i >= 40
          ? "8:00am–6:00pm (optimize lunch + meetings)"
          : "8:30am–5:30pm (focus on destination visits)";
  const signage =
    i >= 70
      ? "Invest in high-contrast window signage + sidewalk visibility."
      : i >= 50
        ? "Clear storefront messaging + directional wayfinding works best."
        : "Prioritize Google Business Profile + building directory presence.";
  const offer =
    businessType === "retail"
      ? "Promote quick-decision bundles + easy returns."
      : businessType === "office"
        ? "Offer meeting-room packages + flexible terms."
        : businessType === "warehouse"
          ? "Lean into pickup windows + shipping cutoffs."
          : "Design a simple lunch-rush offer + pre-order.";

  return {
    summary: `${intensity} footfall potential for ${category}.`,
    playbook: [
      ["Footfall outlook", `${intensity} (${i}/100)`],
      ["Recommended hours", hours],
      ["Signage + discovery", signage],
      ["Offer design", offer],
      [
        "Next step",
        "Shortlist 3 spaces, compare rent + ops + improvements, then negotiate from options—not urgency.",
      ],
    ],
  };
}

export default function ToolsPage() {
  const [footfallForm, setFootfallForm] = useState({
    address: "",
    lat: "",
    lng: "",
    walk: "",
    transit: "",
    bike: "",
    density: "medium",
    category: "General",
    bizType: "retail",
  });
  const [emailForm, setEmailForm] = useState({
    leadName: "",
    leadFocus: "",
    marketLink: "",
  });
  const [copied, setCopied] = useState(false);

  const footfall = useMemo(() => {
    const idx = footfallIndex({
      walk: footfallForm.walk,
      transit: footfallForm.transit,
      bike: footfallForm.bike,
      officeDensity: footfallForm.density,
    });
    return {
      idx,
      guide: officeGoerGuide({
        index: idx,
        category: footfallForm.category || "this location",
        businessType: footfallForm.bizType || "retail",
      }),
      link: makeWalkScoreLink({
        address: footfallForm.address,
        lat: footfallForm.lat,
        lng: footfallForm.lng,
      }),
    };
  }, [footfallForm]);

  const emailBody = useMemo(() => {
    const name = emailForm.leadName?.trim() || "there";
    const focus = emailForm.leadFocus?.trim() || "a commercial space";
    const link = emailForm.marketLink?.trim() || "#";
    return `Subject: Thanks for requesting your valuation — next steps

Hi ${name},

Thanks for reaching out and requesting a Home Valuation. I’m excited to help.

If you’re open to it, I’d love to offer a quick, no-obligation consultation (15 minutes) to understand your timeline and goals so the valuation reflects the factors that matter most to you.

In the meantime, here’s my latest market report: ${link}

Reply with 2–3 time windows that work for you this week, and I’ll confirm right away.

Warmly,
Megha Mehta
Commercial Real Estate • GTA

Focus noted: ${focus}`;
  }, [emailForm]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Tools</div>
            <h1 style={{ marginTop: "8px" }}>Walk Score + Convenience Tools</h1>
          </div>
          <p>
            These tools help business owners estimate what the street gives you — walkability,
            transit pull, and office-goer rhythm.
          </p>
        </div>

        <section id="footfall" className="card glow">
          <div className="section-header" style={{ marginBottom: "10px" }}>
            <div>
              <div className="kicker">Footfall counter</div>
              <h2 style={{ margin: "8px 0 0 0" }}>
                Estimate access to people + generate an office-goer guide
              </h2>
            </div>
            <div className="badges">
              <span className="pill">
                <strong>Benchmark:</strong> Toronto (Walk 61 • Transit 78 • Bike 61)
              </span>
            </div>
          </div>

          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <form className="form">
              <div className="field">
                <label htmlFor="addr">Address (optional)</label>
                <input
                  id="addr"
                  name="address"
                  type="text"
                  placeholder="e.g., 35 Leek Crescent, Richmond Hill, ON"
                  value={footfallForm.address}
                  onChange={(e) => setFootfallForm((s) => ({ ...s, address: e.target.value }))}
                />
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor="lat">Latitude (optional)</label>
                  <input
                    id="lat"
                    name="lat"
                    type="text"
                    inputMode="decimal"
                    placeholder="43.84"
                    value={footfallForm.lat}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, lat: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="lng">Longitude (optional)</label>
                  <input
                    id="lng"
                    name="lng"
                    type="text"
                    inputMode="decimal"
                    placeholder="-79.37"
                    value={footfallForm.lng}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, lng: e.target.value }))}
                  />
                </div>
              </div>

              <div className="inline-callout">
                <div>
                  <div className="kicker">Step 1</div>
                  <div>
                    <strong>Open Walk Score</strong>, then paste the Walk/Transit/Bike scores below.
                  </div>
                </div>
                <a className="btn btn-secondary" href={footfall.link} target="_blank" rel="noreferrer">
                  Open Walk Score
                </a>
              </div>

              <div className="grid grid-3">
                <div className="field">
                  <label htmlFor="walk">Walk Score</label>
                  <input
                    id="walk"
                    name="walk"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={footfallForm.walk}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, walk: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="transit">Transit Score</label>
                  <input
                    id="transit"
                    name="transit"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={footfallForm.transit}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, transit: e.target.value }))}
                  />
                </div>
                <div className="field">
                  <label htmlFor="bike">Bike Score</label>
                  <input
                    id="bike"
                    name="bike"
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0-100"
                    value={footfallForm.bike}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, bike: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor="density">Office density (estimate)</label>
                  <select
                    id="density"
                    value={footfallForm.density}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, density: e.target.value }))}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="category">Location category</label>
                  <select
                    id="category"
                    value={footfallForm.category}
                    onChange={(e) => setFootfallForm((s) => ({ ...s, category: e.target.value }))}
                  >
                    <option>Beaver Creek Business Park</option>
                    <option>Yonge Street corridor</option>
                    <option>Neighbourhood retail strip</option>
                    <option>Industrial last-mile node</option>
                    <option>General</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label htmlFor="bizType">Business type</label>
                <select
                  id="bizType"
                  value={footfallForm.bizType}
                  onChange={(e) => setFootfallForm((s) => ({ ...s, bizType: e.target.value }))}
                >
                  <option value="retail">Retail / Food / Service</option>
                  <option value="office">Office / Professional Services</option>
                  <option value="warehouse">Warehouse / Industrial</option>
                </select>
              </div>

              <p className="tiny muted">
                For automated score retrieval, you’ll need a Walk Score API key. This React version
                keeps the original manual workflow and improves the output handling.
              </p>
            </form>

            <div>
              <div className="card glow">
                <div className="badges" style={{ marginBottom: "10px" }}>
                  <span className="pill">
                    <strong>Footfall Index</strong> {footfall.idx}/100
                  </span>
                  <span className="pill">
                    <strong>Walk</strong> {footfallForm.walk || "—"}
                  </span>
                  <span className="pill">
                    <strong>Transit</strong> {footfallForm.transit || "—"}
                  </span>
                  <span className="pill">
                    <strong>Bike</strong> {footfallForm.bike || "—"}
                  </span>
                </div>

                <p className="muted" style={{ marginTop: 0 }}>
                  {footfall.guide.summary}{" "}
                  <a href={footfall.link} target="_blank" rel="noreferrer">
                    Open Walk Score
                  </a>
                </p>

                <div className="table-like">
                  {footfall.guide.playbook.map(([k, v]) => (
                    <div className="row" key={k}>
                      <b>{k}</b>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>

                <div className="inline-callout" style={{ marginTop: "14px" }}>
                  <div>
                    <div className="kicker">Pro move</div>
                    <div>
                      <strong>Use footfall to negotiate.</strong> Higher-demand areas can justify
                      stronger improvement packages and better renewal language.
                    </div>
                  </div>
                  <Link className="btn btn-primary" to="/listings">
                    Browse listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Client conversion</div>
              <h2>Contact Form Follow-up Email Generator</h2>
            </div>
            <p>Use this for automated follow-ups or your site chat to keep leads warm.</p>
          </div>

          <div className="grid grid-2">
            <form className="form card soft">
              <div className="field">
                <label htmlFor="leadName">Lead name</label>
                <input
                  id="leadName"
                  name="leadName"
                  type="text"
                  placeholder="Alex"
                  value={emailForm.leadName}
                  onChange={(e) => setEmailForm((s) => ({ ...s, leadName: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="leadFocus">Lead interest</label>
                <input
                  id="leadFocus"
                  name="leadFocus"
                  type="text"
                  placeholder="a commercial space / home valuation"
                  value={emailForm.leadFocus}
                  onChange={(e) => setEmailForm((s) => ({ ...s, leadFocus: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="marketLink">Market report link</label>
                <input
                  id="marketLink"
                  name="marketLink"
                  type="text"
                  placeholder="https://your-site.com/market-report"
                  value={emailForm.marketLink}
                  onChange={(e) => setEmailForm((s) => ({ ...s, marketLink: e.target.value }))}
                />
              </div>
              <p className="tiny muted">Demo: the draft updates live below.</p>
            </form>

            <div className="card soft">
              <div className="badges" style={{ marginBottom: "10px" }}>
                <span className="pill">
                  <strong>Email Draft</strong> Contact Form Follow-up
                </span>
                <span className="pill">
                  <strong>Focus</strong> {emailForm.leadFocus || "commercial space"}
                </span>
              </div>
              <textarea className="generated-email" readOnly value={emailBody}></textarea>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={async () => {
                    await navigator.clipboard.writeText(emailBody);
                    setCopied(true);
                    window.setTimeout(() => setCopied(false), 2500);
                  }}
                >
                  {copied ? "Copied" : "Copy"}
                </button>
                <a
                  className="btn btn-ghost"
                  href={`mailto:?subject=${encodeURIComponent("Thanks for requesting your valuation — next steps")}&body=${encodeURIComponent(emailBody)}`}
                >
                  Open in Email
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Lead magnet</div>
              <h2>PDF Outline Generator (Richmond Hill)</h2>
            </div>
            <p>Use this as a downloadable PDF guide headline + structure.</p>
          </div>
          <div className="card soft">
            <div className="kicker">Lead Magnet</div>
            <h3 style={{ marginTop: "6px" }}>
              10 Mistakes First-Time Buyers Make in Richmond Hill — and How to Avoid Them
            </h3>
            <ol style={{ margin: "10px 0 0 18px" }}>
              <li>Confusing rent with total occupancy cost: rent + TMI/ops + utilities.</li>
              <li>Underestimating build-out time: permits, signage, IT, inspections.</li>
              <li>Signing without clarifying use clauses, exclusives, and zoning fit.</li>
              <li>Ignoring parking ratios, loading, and delivery access.</li>
              <li>Not negotiating flexibility: renewal rights, assignment, expansion options.</li>
            </ol>
            <p className="tiny muted" style={{ marginTop: "10px" }}>
              Want this as a PDF? Use the checklist modal from the header or footer.
            </p>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Visual prompts</div>
              <h2>AI image prompts (hero + social)</h2>
            </div>
            <p>Use these in Midjourney, Gemini, or any image generator.</p>
          </div>

          <div className="grid grid-2">
            <div className="card soft">
              <h3>Hero Image</h3>
              <p className="muted">
                Photo-realistic image of a modern two-storey home with a large front lawn and a
                bright, sunny sky. Golden-hour lighting, warm and welcoming atmosphere, 16:9 ratio.
              </p>
            </div>
            <div className="card soft">
              <h3>Social Graphic (Market Update)</h3>
              <p className="muted">
                Generate a 1080x1080 graphic for a Market Update post using a clean, professional
                blue and white palette with a subtle line graph background and space for text.
              </p>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
