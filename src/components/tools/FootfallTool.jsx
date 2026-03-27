import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function FootfallTool() {
  const [form, setForm] = useState({
    address: "125 Commerce Valley Drive W, Markham, ON",
    walk: 62,
    transit: 70,
    bike: 56,
    parking: 88,
    frontage: 72,
    signage: 78,
    anchorAdjacency: 64,
    officeDensity: 74,
    ingress: 81,
    businessType: "service",
  });

  const output = useMemo(() => {
    const accessIndex = Math.round((Number(form.walk) * 0.22) + (Number(form.transit) * 0.18) + (Number(form.bike) * 0.08) + (Number(form.parking) * 0.18) + (Number(form.frontage) * 0.12) + (Number(form.signage) * 0.1) + (Number(form.anchorAdjacency) * 0.05) + (Number(form.officeDensity) * 0.03) + (Number(form.ingress) * 0.04));
    const visibilityIndex = Math.round((Number(form.frontage) * 0.32) + (Number(form.signage) * 0.28) + (Number(form.ingress) * 0.16) + (Number(form.anchorAdjacency) * 0.12) + (Number(form.walk) * 0.12));
    const arrivalFriction = 100 - Math.round((Number(form.parking) + Number(form.ingress) + Number(form.transit)) / 3);
    const fit = {
      service: "Good for service, medical, or destination users who need a smooth arrival experience more than impulse traffic.",
      retail: "Retail fit improves when frontage and signage stay above 75 and parking friction stays low.",
      showroom: "Works best when the frontage and parking convenience support first-time visits and repeat pickups.",
      office: "Treat this more like staff and client arrival quality than classic retail footfall."
    }[form.businessType];

    return {
      accessIndex: clamp(accessIndex, 0, 100),
      visibilityIndex: clamp(visibilityIndex, 0, 100),
      arrivalFriction: clamp(arrivalFriction, 0, 100),
      fit,
      bars: [
        { label: "Parking", value: Number(form.parking) },
        { label: "Frontage", value: Number(form.frontage) },
        { label: "Signage", value: Number(form.signage) },
        { label: "Ingress", value: Number(form.ingress) },
      ],
    };
  }, [form]);

  const update = (key) => (e) => setForm((s) => ({ ...s, [key]: e.target.value }));

  return (
    <section id="tool-footfall-access" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 4 · Footfall + Access</span>
          <h2>Pre-populated example so the user sees how location convenience actually gets judged.</h2>
          <p>
            This is intentionally populated with an example. It should look alive on first load and help the user understand parking, arrival ease, frontage, signage, and access in one place.
          </p>
        </div>
        <Link className="button button-primary small-button" to="/listings">
          Compare Listings
        </Link>
      </div>

      <div className="tools-v2-split">
        <form className="tools-v2-panel tools-v2-form-grid">
          <div className="tools-v2-field tools-v2-field-span-2"><label htmlFor="ff-address">Example address</label><input id="ff-address" type="text" value={form.address} onChange={update("address")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-walk">Walk score</label><input id="ff-walk" type="number" value={form.walk} onChange={update("walk")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-transit">Transit score</label><input id="ff-transit" type="number" value={form.transit} onChange={update("transit")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-bike">Bike score</label><input id="ff-bike" type="number" value={form.bike} onChange={update("bike")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-parking">Parking ease</label><input id="ff-parking" type="number" value={form.parking} onChange={update("parking")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-frontage">Frontage visibility</label><input id="ff-frontage" type="number" value={form.frontage} onChange={update("frontage")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-signage">Signage clarity</label><input id="ff-signage" type="number" value={form.signage} onChange={update("signage")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-anchor">Anchor adjacency</label><input id="ff-anchor" type="number" value={form.anchorAdjacency} onChange={update("anchorAdjacency")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-office">Office density</label><input id="ff-office" type="number" value={form.officeDensity} onChange={update("officeDensity")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-ingress">Ingress / egress</label><input id="ff-ingress" type="number" value={form.ingress} onChange={update("ingress")} /></div>
          <div className="tools-v2-field"><label htmlFor="ff-type">Use type</label><select id="ff-type" value={form.businessType} onChange={update("businessType")}><option value="service">Service / medical</option><option value="retail">Retail</option><option value="showroom">Showroom</option><option value="office">Office / professional</option></select></div>
        </form>

        <aside className="tools-v2-panel tools-v2-output-panel">
          <div className="tools-v2-metric-grid tools-v2-metric-grid-compact">
            <div className="tools-v2-metric"><span>Access index</span><strong>{output.accessIndex}/100</strong></div>
            <div className="tools-v2-metric"><span>Visibility index</span><strong>{output.visibilityIndex}/100</strong></div>
            <div className="tools-v2-metric"><span>Arrival friction</span><strong>{output.arrivalFriction}/100</strong></div>
            <div className="tools-v2-metric"><span>Market feel</span><strong>{output.accessIndex >= 72 ? "Strong" : output.accessIndex >= 56 ? "Viable" : "Needs caution"}</strong></div>
          </div>

          <div className="tools-v2-table">
            <div><b>Address shown</b><span>{form.address}</span></div>
            <div><b>Use fit</b><span>{output.fit}</span></div>
            <div><b>What this means</b><span>Easy arrival and clear frontage usually outperform map proximity alone.</span></div>
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
          <h3>Useful reality check</h3>
          <p>A unit can sit in the right submarket and still underperform if arrival friction, frontage, or signage weakens the actual first impression.</p>
        </article>
        <article>
          <h3>Why it converts</h3>
          <p>This tool gives the user something practical they do not usually get on brokerage websites: a way to judge how the place feels before touring.</p>
        </article>
        <article>
          <h3>Best paired with</h3>
          <p>Use this next to Submarket Comparison and CAM / TMI so the user sees access quality, operating cost, and corridor logic together.</p>
        </article>
      </div>
    </section>
  );
}
