import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">About</div>
              <h1 style={{ marginTop: "8px" }}>A more advisor-style profile for a premium GTA commercial real-estate presence.</h1>
            </div>
            <p>This page is written to make the demo feel closer to how a credible commercial agent or boutique advisory firm would present itself online.</p>
          </div>

          <div className="grid grid-2">
            <div className="card glow">
              <div className="kicker">Positioning</div>
              <h3 style={{ marginTop: "8px" }}>{SITE.brandName}</h3>
              <p className="muted">This version of the site frames Megha as a calm, strategic guide for commercial users who need more clarity around location, lease structure, shortlist quality, and long-term fit.</p>
              <div className="table-like">
                <div className="row"><b>Geography</b><span>{SITE.serviceAreas.join(", ")}</span></div>
                <div className="row"><b>Focus</b><span>{SITE.assetClasses.join(", ")}</span></div>
                <div className="row"><b>Style</b><span>Relationship-first, fit-focused, shortlist-led</span></div>
              </div>
            </div>

            <div className="card soft">
              <div className="kicker">Why this matters</div>
              <h3 style={{ marginTop: "8px" }}>Commercial clients don’t just need a space. They need a decision they won’t regret later.</h3>
              <p className="muted">That means the site needs to communicate operational fit, budget clarity, neighbourhood reality, and timing strategy—not only surface-level marketing language.</p>
              <p className="muted">This page helps establish that tone while keeping the site premium and easy to absorb.</p>
            </div>
          </div>
        </div>
      </section>
      <CTASection
        kicker="Next step"
        title="If the strategy is clear, the shortlist gets much stronger."
        body="Use the contact page to share timing, use, and location priorities, and the next batch can push this into an even more conversion-ready platform."
        primary={{ label: "Contact page", to: "/contact" }}
        secondary={{ label: "See services", to: "/services" }}
      />
    </>
  );
}
