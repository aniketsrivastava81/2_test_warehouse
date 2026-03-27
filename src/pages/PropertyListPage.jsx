import React, { useMemo, useState } from "react";
import ListingCard from "../components/ListingCard";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";

const ALL = "All";

export default function PropertyListPage() {
  const [category, setCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.category))], []);
  const locations = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.location))], []);
  const statuses = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.status))], []);

  const filtered = LISTINGS.filter((listing) => {
    return (category === ALL || listing.category === category)
      && (location === ALL || listing.location === location)
      && (status === ALL || listing.status === status);
  });

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner listings-hero-shell">
          <div className="eyebrow">Listings</div>
          <h1>Search less. Compare better. Move with conviction.</h1>
          <p>
            Every opportunity is framed around operational fit, corridor logic, and decision quality so users can move past browsing and into a shortlist that makes sense.
          </p>
          <div className="hero-proof-row">
            <span className="proof-chip">Curated GTA opportunities</span>
            <span className="proof-chip">Fit-first positioning</span>
            <span className="proof-chip">Clearer next steps</span>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Opportunity filter</div>
            <h2>Start with the right lane.</h2>
          </div>
          <p>
            The goal is not to show the most properties. The goal is to help the right user see the right few faster.
          </p>
        </div>
        <div className="listing-filter-panel">
          <label>
            <span>Asset type</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Location</span>
            <select value={location} onChange={(e) => setLocation(e.target.value)}>
              {locations.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span>Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <div className="listing-filter-result">
            <strong>{filtered.length}</strong>
            <span>matched opportunities</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container listing-grid">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">What makes this page useful</div>
              <h2>Each property pushes the user toward a better decision.</h2>
            </div>
            <p>
              Instead of vague inventory, the page gives users the context they need to understand where a space fits, how it wins, and what to test next.
            </p>
          </div>
          <div className="services-grid services-grid-large">
            <article className="service-card service-card-premium">
              <h3>Corridor logic</h3>
              <p>Every opportunity is positioned through access, movement, and the kind of business it should serve best.</p>
            </article>
            <article className="service-card service-card-premium">
              <h3>Shortlist discipline</h3>
              <p>Users can move from broad browsing into a smaller, stronger comparison set without losing momentum.</p>
            </article>
            <article className="service-card service-card-premium">
              <h3>Conversion by clarity</h3>
              <p>The page naturally points users into tools, guides, and property details instead of leaving them at a dead end.</p>
            </article>
            <article className="service-card service-card-premium">
              <h3>KOLT point of view</h3>
              <p>The listing is not just displayed. It is framed through the questions serious occupiers and investors actually ask.</p>
            </article>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Turn the shortlist into a stronger final decision."
        body="Move from inventory to fit testing with the tools, then use the guides to sharpen the final comparison."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="Read the Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
