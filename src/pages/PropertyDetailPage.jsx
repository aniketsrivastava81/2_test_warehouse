import React from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const listing = LISTINGS.find((item) => item.slug === slug) || LISTINGS[0];

  return (
    <>
      <section className="page-hero property-hero">
        <div className="container property-hero-grid">
          <div>
            <div className="eyebrow">{listing.category}</div>
            <h1>{listing.title}</h1>
            <p>{listing.teaser}</p>
            <div className="property-meta-strip">
              <span>{listing.location}</span>
              <span>{listing.size}</span>
              <span>{listing.status}</span>
            </div>
          </div>
          <div className="property-image-panel">
            <img src={listing.image} alt={listing.title} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid">
          <div className="detail-main-card">
            <div className="eyebrow">Why this deserves attention</div>
            <h2>{listing.highlight}</h2>
            <div className="detail-list">
              {listing.details.map((item) => (
                <div key={item} className="detail-point">{item}</div>
              ))}
            </div>
          </div>

          <aside className="detail-side-card">
            <div className="eyebrow">Use this page well</div>
            <h3>Compare the property against the business, not against the excitement.</h3>
            <p>
              Use the tools and market pages to evaluate total fit, operating logic, and corridor strength before moving forward.
            </p>
            <div className="stacked-links">
              <Link className="button button-primary" to="/tools">Compare with tools</Link>
              <Link className="button button-secondary" to="/markets">Review markets</Link>
            </div>
          </aside>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Property pages should create a better shortlist, not just a better mood." 
        body="This layout is built to keep users moving toward more disciplined comparisons across the rest of the site."
        primaryLabel="Back to Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Asset Classes"
        secondaryTo="/asset-classes"
      />
    </>
  );
}
