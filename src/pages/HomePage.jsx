import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import ListingCard from "../components/ListingCard";
import BlogCard from "../components/BlogCard";
import { LISTINGS, BLOG_POSTS, JOURNEY, SERVICES, TOOLS, VALUE_PILLARS } from "../data/siteData";
import { SITE } from "../config/site";

export default function HomePage() {
  const featuredListings = LISTINGS.slice(0, 3);
  const featuredPosts = BLOG_POSTS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy-block">
            <div className="eyebrow">KOLT Realty</div>
            <h1>Commercial real estate for people who need sharper answers before they commit.</h1>
            <p className="hero-intro">
              The strongest GTA moves are not found by browsing harder. They are built through better filters,
              better market logic, and a client journey that turns uncertainty into leverage.
            </p>
            <div className="hero-button-row">
              <Link to="/listings" className="button button-primary">Browse Opportunities</Link>
              <Link to="/tools" className="button button-secondary">Open the Tools</Link>
            </div>
            <div className="hero-proof-row">
              {SITE.proofPoints.map((item) => (
                <span className="proof-chip" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual-block">
            <div className="hero-image-panel hero-image-large">
              <img src="/images/hero-office.svg" alt="KOLT Realty office and commercial advisory presentation" />
            </div>
            <div className="hero-image-row">
              <div className="hero-image-panel">
                <img src="/images/hero-warehouse.svg" alt="Warehouse logistics view" />
              </div>
              <div className="hero-image-panel">
                <img src="/images/hero-retail.svg" alt="Retail frontage and customer experience view" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">The client journey</div>
            <h2>The site is built to move users from curiosity to conviction.</h2>
          </div>
          <p>
            Every section narrows the field, increases clarity, and makes KOLT the place where the useful answers live.
          </p>
        </div>
        <div className="journey-grid">
          {JOURNEY.map((item) => (
            <div key={item.step} className="journey-card">
              <span className="journey-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Why this converts</div>
            <h2>Every page gives something useful before it asks for trust.</h2>
          </div>
          <p>
            The website does not dump services on the user. It teaches them how to think better than the market,
            then makes KOLT the natural next step.
          </p>
        </div>
        <div className="pillar-grid">
          {VALUE_PILLARS.map((item) => (
            <div className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Services</div>
            <h2>Commercial advisory framed around the actual decision.</h2>
          </div>
          <p>
            Occupiers, investors, owner-users, and landlords need different frameworks. The site makes those paths obvious.
          </p>
        </div>
        <div className="services-grid">
          {featuredServices.map((service) => (
            <div className="service-card" key={service.slug}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container section-heading-row inverse">
          <div>
            <div className="eyebrow">Opportunities</div>
            <h2>Shortlist-ready listings that feel commercially intentional.</h2>
          </div>
          <p>
            The opportunity set is presented the way serious clients want to consume it: clean, clear, and useful.
          </p>
        </div>
        <div className="listing-grid">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Tools</div>
            <h2>Frameworks that make users feel smarter before the conversation even starts.</h2>
          </div>
          <p>
            These tools position KOLT as the source of structured decision support instead of just another listing website.
          </p>
        </div>
        <div className="tool-preview-grid">
          {TOOLS.slice(0, 3).map((tool) => (
            <div className="tool-card" key={tool.title}>
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Guides</div>
            <h2>Content built to earn trust through clarity, not filler.</h2>
          </div>
          <p>
            Each guide answers a real commercial question and reinforces why KOLT is where serious GTA users come for signal.
          </p>
        </div>
        <div className="insight-grid">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Interactive showcase"
        title="Warehouse intelligence should be seen, not just described."
        body="The warehouse experience stays in the site as a brand asset: immersive, practical, and aligned with commercial decision-making."
        primaryLabel="Open Warehouse Demo"
        primaryTo="/warehouse"
        secondaryLabel="View Listing Type 2"
        secondaryTo="/listing-type-2"
      />
    </>
  );
}
