import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

const showcasePoints = [
  "High-impact presentation for premium industrial conversations",
  "Styled to feel native to the KOLT site rather than dropped in",
  "Exit links and next-step CTAs stay visible around the experience",
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
            This route now uses a more site-native frame, stronger introductory copy, and a cleaner return path into listings, tools, and contact.
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
          <div className="warehouse-preflight-panel">
            <div>
              <div className="eyebrow">Immersive layer</div>
              <h2>Use movement, context, and branded framing to make the opportunity harder to ignore.</h2>
            </div>
            <div className="warehouse-preflight-panel__notes">
              <p>This page is designed to sit above the standard listing flow and then return users into opportunities, tools, or analysis without friction.</p>
              <div className="warehouse-preflight-panel__actions">
                <Link className="button button-primary small-button" to="/listings">View opportunities</Link>
                <Link className="button button-secondary small-button" to="/contact#analysis-workflow">Launch requirement brief</Link>
              </div>
            </div>
          </div>

          <div className="warehouse-frame-shell">
            <div className="warehouse-frame-shell__topbar">
              <div>
                <span>Listing Type 2 · premium showcase</span>
                <strong>Styled, framed, and routed like the main KOLT site</strong>
              </div>
              <div className="warehouse-frame-shell__toplinks">
                <Link to="/listings">Listings</Link>
                <Link to="/tools">Tools</Link>
                <Link to="/contact#analysis-workflow">Contact</Link>
              </div>
            </div>
            <div className="warehouse-frame-wrap frame-large warehouse-frame-premium warehouse-frame-premium-v2">
              <iframe
                className="warehouse-frame"
                title="KOLT Listing Type 2 warehouse animation and game"
                src="/warehouse-game/index.html"
                loading="eager"
              />
            </div>
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
        <div className="container warehouse-bridge-panel warehouse-bridge-panel-v2">
          <div>
            <div className="eyebrow">Return to the journey</div>
            <h2>Even the premium layer should route users back into active decision-making.</h2>
          </div>
          <div className="warehouse-bridge-actions">
            <Link className="button button-primary" to="/listings">View opportunities</Link>
            <Link className="button button-secondary" to="/tools">Open tools</Link>
            <Link className="button button-secondary" to="/contact#analysis-workflow">Request analysis</Link>
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
