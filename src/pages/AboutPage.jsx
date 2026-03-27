import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const pillars = [
  {
    title: "Clarity over noise",
    body: "The brand is built for users who do not need more listings. They need stronger filters, clearer comparisons, and a cleaner route to the right decision.",
  },
  {
    title: "Commercial logic first",
    body: "Every page, tool, and content block exists to improve judgment around cost, fit, timing, leverage, and long-term upside across the GTA.",
  },
  {
    title: "Trust earned through usefulness",
    body: "KOLT is positioned to give away more practical value on-site than most firms provide before a call, which raises trust before a single form is opened.",
  },
  {
    title: "A stronger user journey",
    body: "The site does not dump categories onto the visitor. It guides them from problem definition to market perspective to decision confidence with intent.",
  },
];

const principles = [
  "Lead with the real requirement, not the broad search.",
  "Show the tradeoff before the user discovers it the hard way.",
  "Make every page useful enough to be saved, shared, or revisited.",
  "Treat clarity as the brand asset that compounds trust.",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner page-hero-premium">
          <div className="eyebrow">About KOLT Realty</div>
          <h1>A commercial real estate platform designed to make better decisions feel inevitable.</h1>
          <p>
            {SITE.description} The result is a brand experience that feels sharp, grounded,
            and materially more useful than a conventional brokerage website.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Positioning</div>
            <h2>KOLT is built to become the reference point users return to when the market gets harder.</h2>
          </div>
          <p>
            The brand speaks to occupiers, investors, owner-users, and landlords who want the shortlist, the framework, and the market logic to line up before capital or timing is put at risk.
          </p>
        </div>
        <div className="pillar-grid">
          {pillars.map((item) => (
            <article className="feature-card narrative-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container about-grid about-grid-expanded">
          <article className="about-panel about-panel-premium">
            <div className="eyebrow">Brand promise</div>
            <h2>{SITE.tagline}</h2>
            <p>
              The website is structured to make KOLT feel like the place where the right move becomes clearer,
              faster, and more commercially defensible. Not because it says more, but because it helps the user see more.
            </p>
          </article>
          <article className="about-panel about-panel-premium">
            <div className="eyebrow">Operating principles</div>
            <div className="principle-list">
              {principles.map((item) => (
                <div className="detail-point" key={item}>{item}</div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container brand-manifesto">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Why this matters</div>
              <h2>In commercial real estate, the firm that organizes the decision often earns the mandate.</h2>
            </div>
            <p>
              KOLT is positioned to do exactly that through a site experience that brings together insight, structure, relevance, and a sense of control that the user is rarely given elsewhere.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Continue the journey"
        title="The strongest brand story is not told in one page. It is proven across the next one."
        body="Move from positioning into service paths, market logic, and tools that continue to build confidence without wasting the user's time."
        primaryLabel="Explore Services"
        primaryTo="/services"
        secondaryLabel="Review Markets"
        secondaryTo="/markets"
      />
    </>
  );
}
