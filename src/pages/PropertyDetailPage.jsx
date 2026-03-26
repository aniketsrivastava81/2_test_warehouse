import React from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const listing = LISTINGS.find((item) => item.slug === slug) || LISTINGS[0];

  return (
    <>
      <section className="page-hero property-hero page-hero-premium">
        <div className="container property-hero-grid">
          <div className="page-hero-inner property-copy-shell">
            <div className="eyebrow">{listing.category}</div>
            <h1>{listing.title}</h1>
            <p>{listing.teaser}</p>
            <div className="property-meta-strip">
              <span>{listing.location}</span>
              <span>{listing.size}</span>
              <span>{listing.status}</span>
            </div>
            <div className="hero-proof-row">
              <span className="proof-chip">{listing.corridor}</span>
              <span className="proof-chip">{listing.format}</span>
              <span className="proof-chip">{listing.ask}</span>
            </div>
          </div>
          <div className="property-image-panel">
            <img src={listing.image} alt={listing.title} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-main-card detail-main-card-premium">
            <div className="eyebrow">Why it works</div>
            <h2>{listing.highlight}</h2>
            <div className="detail-list">
              {listing.advantage.map((item) => (
                <div key={item} className="detail-point">{item}</div>
              ))}
            </div>
          </div>

          <aside className="detail-side-card detail-side-card-premium">
            <div className="eyebrow">Best fit</div>
            <h3>Who should take this seriously</h3>
            <div className="principle-list">
              {listing.bestFor.map((item) => (
                <div key={item} className="detail-point">{item}</div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container detail-grid">
          <div className="detail-main-card detail-main-card-premium">
            <div className="eyebrow">Decision checklist</div>
            <h2>What to test before this becomes a yes</h2>
            <div className="detail-list">
              {listing.checklist.map((item) => (
                <div key={item} className="detail-point">{item}</div>
              ))}
            </div>
          </div>

          <aside className="detail-side-card detail-side-card-premium">
            <div className="eyebrow">Use the site properly</div>
            <h3>Compare the building against the business.</h3>
            <p>
              Run the property through the tools, then use the guides to sharpen the final judgment before the shortlist tightens.
            </p>
            <div className="stacked-links">
              <Link className="button button-primary" to="/tools">Apply the tools</Link>
              <Link className="button button-secondary" to="/guides">Read the guides</Link>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="A strong property page should lead to a stronger next action."
        body="Move back into the listing set or widen the comparison through markets and asset classes."
        primaryLabel="Back to Listings"
        primaryTo="/listings"
        secondaryLabel="Review Markets"
        secondaryTo="/markets"
      />
    </>
  );
}
