import React from "react";
import CTASection from "../components/CTASection";

const playbooks = [
  {
    title: "Industrial shortlist checklist",
    body: "Screen corridor fit, loading pattern, power, flow, staffing, fleet needs, and future expansion before the tour list grows out of control.",
  },
  {
    title: "Office decision checklist",
    body: "Compare workplace image, leadership convenience, team access, collaboration quality, and effective occupancy cost with discipline.",
  },
  {
    title: "Retail location checklist",
    body: "Measure quality of attention, parking behavior, co-tenancy, visibility, and customer convenience instead of falling for raw traffic volume.",
  },
  {
    title: "Owner-user acquisition checklist",
    body: "Test ownership against control, flexibility, future-proofing, capex, and the true permanence of the business model.",
  },
  {
    title: "Warehouse fit checklist",
    body: "Judge dock utility, trailer movement, aisle logic, staging, dispatch speed, and labour access before size becomes the headline.",
  },
  {
    title: "Land and repositioning checklist",
    body: "Pressure-test access, context, timing, use alignment, and upside realism before optimism makes the opportunity look cleaner than it is.",
  },
];

export default function ChecklistsPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner page-hero-premium">
          <div className="eyebrow">Checklists</div>
          <h1>The practical decision layer users save, revisit, and use against the market.</h1>
          <p>
            These checklists turn KOLT into the place where commercial users organize their thinking before the next shortlist, tour, negotiation, or commitment.
          </p>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Decision frameworks</div>
            <h2>Every checklist exists to expose what the market usually leaves vague.</h2>
          </div>
          <p>
            The purpose is simple: help the user ask stronger questions, reject weaker options faster, and feel that KOLT holds the key to a more defensible move.
          </p>
        </div>
        <div className="services-grid services-grid-large">
          {playbooks.map((item) => (
            <article className="service-card large service-card-premium" key={item.title}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Use the framework"
        title="A stronger checklist should send the user back into the market with better judgment."
        body="Move directly into listings, tools, and guides while the decision framework is still fresh."
        primaryLabel="See Listings"
        primaryTo="/listings"
        secondaryLabel="Open Tools"
        secondaryTo="/tools"
      />
    </>
  );
}
