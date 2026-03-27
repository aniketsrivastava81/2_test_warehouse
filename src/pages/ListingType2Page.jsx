import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

const showcasePoints = [
  "High-impact presentation for premium industrial conversations",
  "More memorable than static decks or stitched screenshots",
  "Built to hold attention longer and deepen intent",
];

const useCases = [
  {
    title: "Pitching complex space faster",
    body: "Use motion and immersion to make the logic of the asset easier to absorb in one sitting.",
  },
  {
    title: "Differentiating the brand",
    body: "The experience signals that KOLT is willing to go beyond generic listing presentation.",
  },
  {
    title: "Keeping users engaged longer",
    body: "A stronger experiential layer increases time on site while reinforcing commercial intent.",
  },
];

export default function ListingType2Page() {
  return (
    <>
      <section className="page-hero slim-hero warehouse-hero-premium showcase-hero-premium">
        <div className="container page-hero-inner warehouse-hero-shell">
          <div className="eyebrow">Interactive Showcase</div>
          <h1>Present the opportunity like it matters before the first call even happens.</h1>
          <p>
            This route is the elevated presentation layer: immersive, branded, and built to make serious industrial
            interest feel more immediate.
          </p>
          <div className="warehouse-hero-points showcase-points">
            {showcasePoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container">
          <div className="warehouse-intro-panel">
            <div>
              <div className="eyebrow">Immersive layer</div>
              <h2>Use movement, context, and interaction to make the opportunity harder to ignore.</h2>
            </div>
            <p>
              This page is designed to sit above the normal listing flow and deliver a more premium presentation when the
              moment calls for it.
            </p>
          </div>

          <div className="warehouse-frame-wrap frame-large warehouse-frame-premium">
            <iframe
              className="warehouse-frame"
              title="KOLT Listing Type 2 warehouse animation and game"
              src="/warehouse-game/index.html"
              loading="eager"
            />
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container warehouse-support-grid">
          {useCases.map((card) => (
            <article key={card.title} className="warehouse-support-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container warehouse-bridge-panel">
          <div>
            <div className="eyebrow">Return to the journey</div>
            <h2>Even the premium layer should route users back into active decision-making.</h2>
          </div>
          <div className="warehouse-bridge-actions">
            <Link className="button button-primary" to="/listings">View opportunities</Link>
            <Link className="button button-secondary" to="/tools">Open tools</Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Back into the funnel"
        title="A strong experiential page should deepen intent, not scatter it."
        body="This route stays connected to listings, tools, and the rest of the KOLT journey so the experience feels premium and commercially disciplined at the same time."
        primaryLabel="View Opportunities"
        primaryTo="/listings"
        secondaryLabel="Open Tools"
        secondaryTo="/tools"
      />
    </>
  );
}
