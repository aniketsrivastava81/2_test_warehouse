import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import ListingCard from "../components/ListingCard";
import BlogCard from "../components/BlogCard";
import { LISTINGS, BLOG_POSTS, JOURNEY, SERVICES, TOOLS, VALUE_PILLARS } from "../data/siteData";
import { SITE } from "../config/site";

const audienceTracks = [
  {
    title: "Occupiers",
    body: "Find space that supports movement, staffing, client experience, shipping, and next-stage growth instead of forcing expensive compromises later.",
  },
  {
    title: "Investors",
    body: "Screen opportunities through tenant logic, corridor strength, downside protection, and practical long-term hold quality before capital is deployed.",
  },
  {
    title: "Owner-Users",
    body: "Decide whether leasing, buying, or repositioning creates the strongest control, flexibility, and balance-sheet outcome for the business.",
  },
  {
    title: "Landlords",
    body: "Present assets with sharper positioning, cleaner market logic, and a leasing story that attracts the right demand faster.",
  },
];

const proofFrames = [
  "Shortlist logic built around use, timing, access, and image.",
  "Market insight translated into decision-ready comparisons.",
  "Tools and guides that make the user smarter before they inquire.",
  "A commercial journey designed to turn attention into conviction.",
];

export default function HomePage() {
  const featuredListings = LISTINGS.slice(0, 3);
  const featuredPosts = BLOG_POSTS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 4);

  return (
    <>
      <section className="hero-section hero-section-premium">
        <div className="container hero-grid">
          <div className="hero-copy-block hero-copy-block-premium">
            <div className="eyebrow">KOLT Realty</div>
            <h1>Commercial real estate for GTA users who need the right answer before the market gets expensive.</h1>
            <p className="hero-intro">
              KOLT Realty is built around one idea: the strongest move is rarely the loudest listing.
              It is the result of sharper filters, cleaner comparisons, and a decision path that removes wasted time,
              weak options, and hidden friction before the shortlist is formed.
            </p>
            <div className="hero-button-row">
              <Link to="/listings" className="button button-primary">Browse Opportunities</Link>
              <Link to="/tools" className="button button-secondary">Open Decision Tools</Link>
            </div>
            <div className="hero-proof-row">
              {SITE.proofPoints.map((item) => (
                <span className="proof-chip" key={item}>{item}</span>
              ))}
            </div>
          </div>

          <div className="hero-visual-block hero-visual-block-premium">
            <div className="hero-image-panel hero-image-large">
              <img src="/images/hero-office.svg" alt="KOLT Realty commercial advisory presentation" />
            </div>
            <div className="hero-image-row">
              <div className="hero-image-panel">
                <img src="/images/hero-warehouse.svg" alt="Warehouse logistics and distribution environment" />
              </div>
              <div className="hero-image-panel">
                <img src="/images/hero-retail.svg" alt="Retail frontage and customer-facing real estate environment" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Who this site is for</div>
            <h2>Every path is built around the actual move being made.</h2>
          </div>
          <p>
            Instead of asking users to interpret a generic brokerage website, KOLT routes them into the exact commercial lens that matches their objective.
          </p>
        </div>
        <div className="pillar-grid">
          {audienceTracks.map((item) => (
            <article className="feature-card narrative-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">The journey</div>
            <h2>The experience is structured to move users from curiosity to commercial conviction.</h2>
          </div>
          <p>
            Every section earns the next click by giving the user clearer thinking, stronger filters, and more confidence than they had before arriving.
          </p>
        </div>
        <div className="journey-grid">
          {JOURNEY.map((item) => (
            <article key={item.step} className="journey-card journey-card-premium">
              <span className="journey-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Why KOLT wins the click</div>
            <h2>The website gives away real commercial value before it asks for a conversation.</h2>
          </div>
          <p>
            That is what creates trust. The user leaves each section with a better checklist, a sharper comparison, or a more useful framework than they could get from a typical GTA listing portal.
          </p>
        </div>
        <div className="pillar-grid">
          {VALUE_PILLARS.map((item) => (
            <article className="feature-card narrative-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container section-heading-row inverse">
          <div>
            <div className="eyebrow">What the user gets here</div>
            <h2>KOLT is positioned as the place where the GTA market finally becomes legible.</h2>
          </div>
          <p>
            The goal is not to overwhelm users with inventory. The goal is to make them feel more prepared, more selective, and more certain about the right next move.
          </p>
        </div>
        <div className="proof-grid">
          {proofFrames.map((item) => (
            <div className="proof-frame" key={item}>{item}</div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Advisory paths</div>
            <h2>Services are framed around decisions, not generic brokerage categories.</h2>
          </div>
          <p>
            Each path is designed to answer a different commercial question, reduce blind spots, and turn broad interest into a credible route forward.
          </p>
        </div>
        <div className="services-grid">
          {featuredServices.map((service) => (
            <article className="service-card service-card-premium" key={service.slug}>
              <h3>{service.title}</h3>
              <p>{service.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Featured opportunities</div>
            <h2>Shortlist-ready properties presented with commercial clarity.</h2>
          </div>
          <p>
            The objective is simple: reduce browsing noise and bring better options into focus faster.
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
            <div className="eyebrow">Decision support</div>
            <h2>Users stay longer when the site helps them think better than the rest of the market.</h2>
          </div>
          <p>
            These tools are not decoration. They are the practical edge that makes KOLT feel indispensable before the first outreach happens.
          </p>
        </div>
        <div className="tool-preview-grid">
          {TOOLS.slice(0, 3).map((tool) => (
            <article className="tool-card tool-card-premium" key={tool.title}>
              <div className="tool-icon" />
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Market intelligence</div>
            <h2>Guides that make the user feel ahead of the GTA market, not behind it.</h2>
          </div>
          <p>
            Every article is written to sharpen judgment, strengthen the checklist, and reinforce why this is where better commercial decisions begin.
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
        title="Warehouse intelligence should be experienced with context, not presented like a gimmick."
        body="The warehouse experience remains inside the brand as a practical demonstration of how KOLT turns commercial complexity into something users can understand, test, and trust."
        primaryLabel="Open Warehouse Demo"
        primaryTo="/warehouse"
        secondaryLabel="View Listing Type 2"
        secondaryTo="/listing-type-2"
      />
    </>
  );
}
