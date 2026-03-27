import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const remainder = BLOG_POSTS.slice(1);

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner">
          <div className="eyebrow">Guides</div>
          <h1>The commercial intelligence layer behind the KOLT experience.</h1>
          <p>
            Each guide is written to make the user think more clearly, compare more intelligently, and feel that KOLT holds the most useful frameworks in the GTA market.
          </p>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <article className="insight-card insight-featured-card">
            <div className="insight-meta">
              <span>{featured.category}</span>
              <span>{featured.readTime}</span>
            </div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="detail-point featured-takeaway">{featured.takeaway}</div>
            <Link to={`/guides/${featured.slug}`} className="button button-primary">Read the featured guide</Link>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Guide library</div>
            <h2>Frameworks users can actually apply.</h2>
          </div>
          <p>
            This is not filler content. Every piece exists to help users narrow a market choice, pressure-test a move, or avoid a weak decision.
          </p>
        </div>
        <div className="container insight-grid">
          {remainder.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container services-grid services-grid-large">
          <article className="service-card service-card-premium">
            <h3>Built to pre-qualify intent</h3>
            <p>Users who consume the guides arrive at the next step with stronger questions and better judgment.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Built to reinforce the tools</h3>
            <p>The content makes the calculators and frameworks feel even more practical by showing how to use them.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Built to strengthen the brand</h3>
            <p>KOLT becomes the place where serious users go when they want the reasoning, not just the property feed.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Built to move the journey forward</h3>
            <p>Every guide pushes toward listings, markets, and stronger commercial decisions without feeling like a hard sell.</p>
          </article>
        </div>
      </section>

      <CTASection
        eyebrow="Continue the journey"
        title="Read, compare, then move back into the market with a better frame."
        body="The guides exist to sharpen decisions, then hand the user back to the tools and the active opportunities."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="See Listings"
        secondaryTo="/listings"
      />
    </>
  );
}
