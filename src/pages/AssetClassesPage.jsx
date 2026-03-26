import React from "react";
import CTASection from "../components/CTASection";
import { ASSET_CLASSES } from "../data/siteData";

export default function AssetClassesPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Asset Classes</div>
          <h1>Asset classes explained through the lens of fit, value, and competitive advantage.</h1>
          <p>
            This page helps users understand why different property types solve different commercial problems.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container services-grid services-grid-large">
          {ASSET_CLASSES.map((item) => (
            <article className="service-card large" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Use the framework"
        title="The user should leave this page with a better instinct for what type of space belongs in the shortlist."
        body="That insight makes the entire rest of the site more powerful."
        primaryLabel="See Listings"
        primaryTo="/listings"
        secondaryLabel="Read Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
