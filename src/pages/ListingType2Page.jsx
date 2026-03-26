import React from "react";
import CTASection from "../components/CTASection";

export default function ListingType2Page() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Interactive Showcase</div>
          <h1>A premium experiential page for high-impact presentation and branded differentiation.</h1>
          <p>
            This route remains as the elevated presentation layer for the warehouse animation and game environment.
          </p>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container warehouse-frame-wrap frame-large">
          <iframe
            className="warehouse-frame"
            title="KOLT Listing Type 2 warehouse animation and game"
            src="/warehouse-game/index.html"
            loading="eager"
          />
        </div>
      </section>

      <CTASection
        eyebrow="Back into the funnel"
        title="Even premium experiential pages should lead users back into the core journey."
        body="That is how the site feels advanced without becoming scattered."
        primaryLabel="View Opportunities"
        primaryTo="/listings"
        secondaryLabel="Open Tools"
        secondaryTo="/tools"
      />
    </>
  );
}
