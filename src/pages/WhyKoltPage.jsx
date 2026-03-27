import React from "react";
import CTASection from "../components/CTASection";

const differentiators = [
  {
    title: "The site does the filtering before the call",
    body: "Users should arrive already clearer on fit, timing, market choice, and the real tradeoffs shaping the move.",
  },
  {
    title: "Commercial usefulness beats generic polish",
    body: "Every section is designed to give the visitor a sharper shortlist, a better comparison, or a stronger decision frame.",
  },
  {
    title: "The journey compounds confidence",
    body: "Listings lead into tools. Tools reinforce guides. Guides push users back into the market with more conviction.",
  },
  {
    title: "KOLT earns trust by being more useful",
    body: "The strongest differentiator is not saying more than the market. It is helping the user see more than the market.",
  },
];

const outcomes = [
  "Better quality inquiries because users have already self-qualified their need.",
  "Longer time on site because each page naturally creates a reason for the next click.",
  "Stronger brand memory because the experience feels more valuable than a listing portal.",
  "Higher conversion intent because uncertainty is reduced before outreach begins.",
];

export default function WhyKoltPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner page-hero-premium">
          <div className="eyebrow">Why KOLT</div>
          <h1>The advantage is not more information. It is better organized judgment.</h1>
          <p>
            KOLT is built to feel like the commercial real estate site that finally respects how serious users actually make decisions.
          </p>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">What makes this different</div>
            <h2>Every page is engineered to make the next decision easier than it was five minutes ago.</h2>
          </div>
          <p>
            The site does not ask the user to figure out why it matters. It proves its value by improving the search, the shortlist, and the level of certainty.
          </p>
        </div>
        <div className="pillar-grid">
          {differentiators.map((item) => (
            <article className="feature-card narrative-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container about-grid about-grid-expanded">
          <article className="about-panel about-panel-premium">
            <div className="eyebrow">What the visitor feels</div>
            <h2>KOLT holds the checklists, comparisons, and market logic other sites make them find alone.</h2>
            <p>
              That feeling is what increases return visits, strengthens trust, and creates the sense that the smartest next step lives inside this ecosystem.
            </p>
          </article>
          <article className="about-panel about-panel-premium">
            <div className="eyebrow">What that changes</div>
            <div className="principle-list">
              {outcomes.map((item) => (
                <div className="detail-point" key={item}>{item}</div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <CTASection
        eyebrow="Put it to work"
        title="The differentiator only matters if the user can feel it in the next click."
        body="Move into listings, tools, and guides that prove the positioning through real commercial usefulness."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Open Checklists"
        secondaryTo="/checklists"
      />
    </>
  );
}
