import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const PRINCIPLES = [
  "Commercial guidance should reduce noise, not add theatre.",
  "A stronger brief creates a stronger shortlist.",
  "Market intelligence is only useful when it changes the decision.",
  "Every page should move the user closer to conviction.",
];

export default function AboutPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">About</div>
          <h1>KOLT Realty is positioned as the place where serious users go to think better before they move.</h1>
          <p>
            This is a commercial real estate experience built around clarity, precision, and the practical decisions that shape occupancy, ownership, and investment outcomes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="feature-card about-panel">
            <div className="eyebrow">What defines the brand</div>
            <h2>{SITE.tagline}</h2>
            <p>{SITE.description}</p>
          </div>
          <div className="feature-card about-panel">
            <div className="eyebrow">Principles</div>
            <div className="principle-list">
              {PRINCIPLES.map((item) => (
                <div className="detail-point" key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Explore further"
        title="The brand becomes more credible when every page behaves like a useful advisor."
        body="That is the logic behind the entire remake."
        primaryLabel="Explore Services"
        primaryTo="/services"
        secondaryLabel="Review Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
