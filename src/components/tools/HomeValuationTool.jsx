import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

function money(value) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

const TYPE_PRESETS = {
  detached: { label: 'Detached', multiplier: 1.08 },
  semi: { label: 'Semi', multiplier: 1.02 },
  townhouse: { label: 'Townhouse', multiplier: 0.98 },
  condo: { label: 'Condo', multiplier: 0.92 },
};

const CONDITION_ADJ = {
  needsWork: { label: 'Needs work', adj: -0.06 },
  typical: { label: 'Typical', adj: 0 },
  updated: { label: 'Updated', adj: 0.04 },
  premium: { label: 'Premium', adj: 0.08 },
};

export default function HomeValuationTool() {
  const [form, setForm] = useState({
    type: 'detached',
    neighborhood: 'GTA',
    bedrooms: 3,
    bathrooms: 2,
    interiorSqft: 1800,
    lotDepthFt: 110,
    lotWidthFt: 35,
    parkingSpots: 1,
    finishedBasement: 'yes',
    condition: 'typical',
    basePpsf: 980,
    confidence: 65,
  });

  const output = useMemo(() => {
    const interiorSqft = Math.max(0, Number(form.interiorSqft) || 0);
    const basePpsf = Math.max(0, Number(form.basePpsf) || 0);
    const bedrooms = Math.max(0, Number(form.bedrooms) || 0);
    const bathrooms = Math.max(0, Number(form.bathrooms) || 0);
    const parking = Math.max(0, Number(form.parkingSpots) || 0);

    const typeMult = TYPE_PRESETS[form.type]?.multiplier ?? 1;
    const condAdj = CONDITION_ADJ[form.condition]?.adj ?? 0;

    const bedroomAdj = Math.min(0.05, Math.max(-0.03, (bedrooms - 3) * 0.015));
    const bathAdj = Math.min(0.04, Math.max(-0.02, (bathrooms - 2) * 0.012));
    const parkingAdj = Math.min(0.03, parking * 0.01);
    const basementAdj = form.finishedBasement === 'yes' ? 0.018 : 0;

    const lotArea = (Number(form.lotDepthFt) || 0) * (Number(form.lotWidthFt) || 0);
    const lotAdj = form.type === 'detached' && lotArea > 0 ? Math.min(0.06, (lotArea - 3500) / 65000) : 0;

    const totalAdj = 1 + condAdj + bedroomAdj + bathAdj + parkingAdj + basementAdj + lotAdj;
    const point = interiorSqft * basePpsf * typeMult * totalAdj;

    const conf = Math.max(35, Math.min(90, Number(form.confidence) || 65));
    const spread = (100 - conf) / 100; // 0.10 - 0.65
    const low = point * (1 - (0.09 + spread * 0.22));
    const high = point * (1 + (0.07 + spread * 0.18));

    const notes = [
      `Type multiplier applied: ${(typeMult * 100).toFixed(0)}%`,
      `Condition adjustment: ${(condAdj * 100).toFixed(1)}%`,
      `Beds/baths/parking adjustments: ${((bedroomAdj + bathAdj + parkingAdj) * 100).toFixed(1)}%`,
      `Basement and lot adjustments: ${((basementAdj + lotAdj) * 100).toFixed(1)}%`,
    ];

    return {
      point,
      low,
      high,
      totalAdj,
      notes,
      confidence: conf,
    };
  }, [form]);

  return (
    <section id="tool-home-valuation" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool · Home Valuation (Template)</span>
          <h2>Quick valuation range for residential screening (template for internal use).</h2>
          <p>
            This is a lightweight estimator meant to produce a first-pass range. It is not a replacement for a CMA,
            an appraisal, or on-the-ground pricing strategy.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/schedule">
          Schedule a review
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid" onSubmit={(e) => e.preventDefault()}>
          <div className="tools-v2-field">
            <label htmlFor="hv-type">Property type</label>
            <select id="hv-type" value={form.type} onChange={(e) => setForm((s) => ({ ...s, type: e.target.value }))}>
              {Object.entries(TYPE_PRESETS).map(([key, item]) => (
                <option value={key} key={key}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-neighborhood">Neighbourhood label</label>
            <input id="hv-neighborhood" value={form.neighborhood} onChange={(e) => setForm((s) => ({ ...s, neighborhood: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-beds">Bedrooms</label>
            <input id="hv-beds" type="number" min="0" value={form.bedrooms} onChange={(e) => setForm((s) => ({ ...s, bedrooms: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-baths">Bathrooms</label>
            <input id="hv-baths" type="number" min="0" value={form.bathrooms} onChange={(e) => setForm((s) => ({ ...s, bathrooms: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-sqft">Interior square footage</label>
            <input id="hv-sqft" type="number" min="0" value={form.interiorSqft} onChange={(e) => setForm((s) => ({ ...s, interiorSqft: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-ppsf">Base price per sqft (comps)</label>
            <input id="hv-ppsf" type="number" min="0" value={form.basePpsf} onChange={(e) => setForm((s) => ({ ...s, basePpsf: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-condition">Condition</label>
            <select id="hv-condition" value={form.condition} onChange={(e) => setForm((s) => ({ ...s, condition: e.target.value }))}>
              {Object.entries(CONDITION_ADJ).map(([key, item]) => (
                <option value={key} key={key}>{item.label}</option>
              ))}
            </select>
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-parking">Parking spots</label>
            <input id="hv-parking" type="number" min="0" value={form.parkingSpots} onChange={(e) => setForm((s) => ({ ...s, parkingSpots: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-basement">Finished basement</label>
            <select id="hv-basement" value={form.finishedBasement} onChange={(e) => setForm((s) => ({ ...s, finishedBasement: e.target.value }))}>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-lot-width">Lot width (ft)</label>
            <input id="hv-lot-width" type="number" min="0" value={form.lotWidthFt} onChange={(e) => setForm((s) => ({ ...s, lotWidthFt: e.target.value }))} />
          </div>
          <div className="tools-v2-field">
            <label htmlFor="hv-lot-depth">Lot depth (ft)</label>
            <input id="hv-lot-depth" type="number" min="0" value={form.lotDepthFt} onChange={(e) => setForm((s) => ({ ...s, lotDepthFt: e.target.value }))} />
          </div>
          <div className="tools-v2-field tools-v2-field-span-2">
            <label htmlFor="hv-confidence">Confidence slider</label>
            <input id="hv-confidence" type="range" min="35" max="90" value={form.confidence} onChange={(e) => setForm((s) => ({ ...s, confidence: e.target.value }))} />
          </div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Range low</span><strong>{money(output.low)}</strong></div>
            <div className="tools-v2-metric"><span>Range high</span><strong>{money(output.high)}</strong></div>
            <div className="tools-v2-metric"><span>Midpoint</span><strong>{money(output.point)}</strong></div>
            <div className="tools-v2-metric"><span>Confidence</span><strong>{output.confidence}%</strong></div>
          </div>

          <div className="tools-v2-table">
            <div><b>Neighbourhood</b><span>{form.neighborhood || '—'}</span></div>
            <div><b>Type</b><span>{TYPE_PRESETS[form.type]?.label}</span></div>
            <div><b>Total adjustment</b><span>{(output.totalAdj * 100).toFixed(1)}%</span></div>
            <div><b>Base comps</b><span>{money(Number(form.basePpsf) || 0)} / sqft</span></div>
            <div><b>Reminder</b><span>Use for first-pass only; validate with comps and local conditions.</span></div>
          </div>

          <div className="tools-v2-chart">
            {output.notes.map((note) => (
              <div className="tools-v2-chart-row" key={note}>
                <span>{note}</span>
                <div className="tools-v2-chart-track"><i style={{ width: `${Math.min(100, Math.max(6, output.confidence))}%` }} /></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="tools-v2-decision-row">
        <article>
          <h3>What this is for</h3>
          <p>Early-stage screening, quick scenario comparisons, and internal conversations before doing a full CMA.</p>
        </article>
        <article>
          <h3>What it does not replace</h3>
          <p>Market-specific pricing nuance, micro-location comps, or formal appraisals.</p>
        </article>
        <article>
          <h3>Next move</h3>
          <p>If the range is close to your threshold, schedule a review and confirm comps, condition, and timing sensitivity.</p>
        </article>
      </div>
    </section>
  );
}
