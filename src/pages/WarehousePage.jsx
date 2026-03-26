import React from "react";
import CTASection from "../components/CTASection";

export default function WarehousePage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Warehouse Demo</div>
          <h1>An interactive warehouse experience that makes the brand feel more capable than a static brochure ever could.</h1>
          <p>
            This showcase stays inside the KOLT journey as a high-value asset for industrial and logistics-focused users.
          </p>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container warehouse-frame-wrap frame-large">
          <iframe className="warehouse-frame" src="/warehouse.html" title="KOLT warehouse walkthrough" loading="eager"></iframe>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="Interactive proof is strongest when it still feels part of the main site."
        body="This page keeps the demo branded, intentional, and commercially relevant."
        primaryLabel="Open Listing Type 2"
        primaryTo="/listing-type-2"
        secondaryLabel="Back to Home"
        secondaryTo="/"
      />
    </>
  );
}
