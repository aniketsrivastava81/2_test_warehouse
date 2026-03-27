import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const SUBMARKETS = {
  vaughan: { label: "Vaughan", cost: 58, labour: 82, access: 86, image: 78, reach: 79, note: "Strong 400/407 logic with good trade, showroom, and distribution compatibility." },
  mississauga: { label: "Mississauga", cost: 42, labour: 80, access: 92, image: 84, reach: 90, note: "Premium logistics position with stronger reach and higher cost pressure." },
  brampton: { label: "Brampton", cost: 67, labour: 84, access: 75, image: 66, reach: 76, note: "Good labour depth and industrial volume, but image and congestion require more selective screening." },
  markham: { label: "Markham", cost: 54, labour: 78, access: 73, image: 82, reach: 72, note: "Useful where office image, tech adjacency, and polished arrival matter." },
  richmondHill: { label: "Richmond Hill", cost: 57, labour: 73, access: 71, image: 79, reach: 68, note: "Balanced north-GTA option for service, showroom, and office-hybrid operators." },
};

function weightedScore(market, weights) {
  const totalWeight = Object.values(weights).reduce((sum, value) => sum + value, 0);
  const raw = (market.cost * weights.cost) + (market.labour * weights.labour) + (market.access * weights.access) + (market.image * weights.image) + (market.reach * weights.reach);
  return Math.round(raw / Math.max(totalWeight, 1));
}

export default function SubmarketComparator() {
  const [form, setForm] = useState({
    left: "vaughan",
    right: "mississauga",
    cost: 5,
    labour: 4,
    access: 5,
    image: 3,
    reach: 4,
  });

  const output = useMemo(() => {
    const left = SUBMARKETS[form.left];
    const right = SUBMARKETS[form.right];
    const weights = {
      cost: Number(form.cost) || 1,
      labour: Number(form.labour) || 1,
      access: Number(form.access) || 1,
      image: Number(form.image) || 1,
      reach: Number(form.reach) || 1,
    };

    const leftScore = weightedScore(left, weights);
    const rightScore = weightedScore(right, weights);

    return { left, right, leftScore, rightScore, weights };
  }, [form]);

  const scoreRows = [
    ["Cost discipline", "cost"],
    ["Labour depth", "labour"],
    ["Highway access", "access"],
    ["Image / client feel", "image"],
    ["Regional reach", "reach"],
  ];

  return (
    <section id="tool-submarket-comparison" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 5 · Submarket Comparison</span>
          <h2>Interactive corridor comparison instead of static neighbourhood blurbs.</h2>
          <p>
            This is deliberately more interactive. The user can weight what matters, compare two GTA nodes, and feel that KOLT is structuring the market in a more useful way than a standard listings page.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/markets">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <div className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field"><label htmlFor="sub-left">Compare market A</label><select id="sub-left" value={form.left} onChange={(e) => setForm((s) => ({ ...s, left: e.target.value }))}>{Object.entries(SUBMARKETS).map(([key, market]) => <option value={key} key={key}>{market.label}</option>)}</select></div>
          <div className="tools-v2-field"><label htmlFor="sub-right">Compare market B</label><select id="sub-right" value={form.right} onChange={(e) => setForm((s) => ({ ...s, right: e.target.value }))}>{Object.entries(SUBMARKETS).map(([key, market]) => <option value={key} key={key}>{market.label}</option>)}</select></div>
          {scoreRows.map(([label, key]) => (
            <div className="tools-v2-field tools-v2-field-span-2" key={key}>
              <label htmlFor={`sub-${key}`}>{label} weighting</label>
              <input id={`sub-${key}`} type="range" min="1" max="5" value={form[key]} onChange={(e) => setForm((s) => ({ ...s, [key]: e.target.value }))} />
            </div>
          ))}
        </div>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-compare-top">
            <div className="tools-v2-compare-market">
              <strong>{output.left.label}</strong>
              <span>{output.leftScore}/100 fit</span>
            </div>
            <div className="tools-v2-compare-market tools-v2-compare-market-right">
              <strong>{output.right.label}</strong>
              <span>{output.rightScore}/100 fit</span>
            </div>
          </div>
          <div className="tools-v2-compare-table">
            {scoreRows.map(([label, key]) => (
              <div className="tools-v2-compare-row" key={key}>
                <div className="tools-v2-compare-bar left"><i style={{ width: `${output.left[key]}%` }} /></div>
                <span>{label}</span>
                <div className="tools-v2-compare-bar right"><i style={{ width: `${output.right[key]}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="tools-v2-table">
            <div><b>{output.left.label}</b><span>{output.left.note}</span></div>
            <div><b>{output.right.label}</b><span>{output.right.note}</span></div>
            <div><b>Current edge</b><span>{output.leftScore === output.rightScore ? "Tie on current priorities" : output.leftScore > output.rightScore ? `${output.left.label} leads on this weighting` : `${output.right.label} leads on this weighting`}</span></div>
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article>
          <h3>What users usually miss</h3>
          <p>They compare buildings without comparing what the corridor itself does to labour, access, client confidence, and timing.</p>
        </article>
        <article>
          <h3>What this changes</h3>
          <p>It turns the submarket discussion into a scored decision instead of a vague opinion from a listing sheet.</p>
        </article>
        <article>
          <h3>What follows next</h3>
          <p>Once a corridor wins, the shortlist gets cleaner and the following tools become more meaningful instead of noisier.</p>
        </article>
      </div>
    </section>
  );
}
