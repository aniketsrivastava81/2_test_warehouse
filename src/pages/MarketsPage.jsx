import React from "react";
import CTASection from "../components/CTASection";
import { MARKETS } from "../data/siteData";

export default function MarketsPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Markets</div>
          <h1>GTA coverage framed through commercial usefulness, not empty geography.</h1>
          <p>
            Each market is presented according to what it actually means for occupancy, customer reach, labour access, and operational fit.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container services-grid services-grid-large">
          {MARKETS.map((market) => (
            <article className="service-card large" key={market.title}>
              <h2>{market.title}</h2>
              <p>{market.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Apply the market lens"
        title="The right market should feel like part of the strategy, not just a pin on a map."
        body="This page exists to help users think through that difference."
        primaryLabel="Review Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Asset Classes"
        secondaryTo="/asset-classes"
      />
    </>
  );
}
