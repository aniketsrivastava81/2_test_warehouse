import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const SERVICES = [
  {
    title: "Leasing advisory",
    bestFor: "First-time tenants, renewal decisions, and relocation strategy.",
    points: [
      "Clarify size, access, budget, and timing before touring.",
      "Turn broad requirements into a shortlist of 3–5 better-fit options.",
      "Compare renewal versus relocation with less guesswork.",
    ],
  },
  {
    title: "Owner-user acquisition support",
    bestFor: "Businesses deciding whether buying creates more control than leasing.",
    points: [
      "Evaluate long-term control, occupancy cost, and future flexibility.",
      "Screen opportunities with operations, not just brochure language, in mind.",
      "Keep acquisition logic grounded in real business use.",
    ],
  },
  {
    title: "Investment opportunity review",
    bestFor: "Buyers comparing industrial, office, or retail opportunities.",
    points: [
      "Review income logic, downside risk, and neighbourhood fit.",
      "Filter opportunities by practicality, not headline hype.",
      "Use the right evaluation lens before spending time on weak options.",
    ],
  },
  {
    title: "Retail and visibility analysis",
    bestFor: "Storefront and plaza users who depend on frontage and footfall.",
    points: [
      "Assess signage, access, anchor context, and pedestrian rhythm.",
      "Compare how a location feels on paper versus on the street.",
      "Reduce the risk of choosing a unit that looks fine but performs poorly.",
    ],
  },
  {
    title: "Industrial / warehouse search",
    bestFor: "Businesses that care about truck flow, shipping, and operational fit.",
    points: [
      "Prioritize clear height, parking, loading, and circulation.",
      "Compare units through daily use, not only polished marketing language.",
      "Keep operations and future growth in the selection process.",
    ],
  },
  {
    title: "Land and development support",
    bestFor: "Clients exploring site potential beyond standard ready-to-lease inventory.",
    points: [
      "Look at context, future-use potential, and surrounding momentum.",
      "Filter out opportunities that lack practical upside.",
      "Start with a clearer brief before deeper due diligence begins.",
    ],
  },
];

const PROCESS = [
  ["Brief first", "Start with use, timing, budget range, and non-negotiables before looking at properties."],
  ["Shortlist second", "Reduce noise into a tighter set of stronger-fit options worth real attention."],
  ["Decision support", "Compare the shortlist through operations, image, cost, and flexibility."],
  ["Move with clarity", "Use that work to support negotiations, tours, and next-step confidence."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">Services</div>
              <h1 style={{ marginTop: "8px" }}>Commercial real-estate support built around fit, clarity, and stronger decision-making.</h1>
            </div>
            <p>
              This page exists so the website reads like a serious advisory platform, not only a listings brochure.
              The goal is to make the offering easy to understand before someone ever reaches the contact page.
            </p>
          </div>

          <div className="service-hero-grid grid grid-2">
            <div className="card glow">
              <div className="kicker">What clients actually need</div>
              <h3 style={{ marginTop: "8px" }}>Not more listings. A cleaner decision path.</h3>
              <p className="muted">
                Commercial clients usually arrive with partial requirements, time pressure, and too many weak options.
                The service layer of the site needs to show how that gets turned into a more focused, more confident decision.
              </p>
              <div className="table-like">
                <div className="row"><b>Asset classes</b><span>{SITE.assetClasses.join(", ")}</span></div>
                <div className="row"><b>Coverage</b><span>{SITE.serviceAreas.join(", ")}</span></div>
                <div className="row"><b>Working style</b><span>Shortlist-first • fit-focused • finance-aware</span></div>
              </div>
            </div>

            <div className="card soft">
              <div className="kicker">What you gain</div>
              <h3 style={{ marginTop: "8px" }}>The site starts sounding more expensive in the right way.</h3>
              <p className="muted">
                Strong service pages improve trust, pre-qualify leads, and help the visitor understand where your guidance adds value.
                That means fewer vague inquiries and better conversion from serious prospects.
              </p>
              <div className="service-badge-stack">
                <span className="pill"><strong>Lease renewal vs relocation clarity</strong></span>
                <span className="pill">Owner-user decision support</span>
                <span className="pill">Industrial / warehouse operational fit</span>
                <span className="pill">Retail visibility + access lens</span>
              </div>
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: "24px" }}>
            {SERVICES.map((service) => (
              <article className="card glow reveal service-card" key={service.title}>
                <div className="kicker">Service</div>
                <h3 style={{ marginTop: "8px" }}>{service.title}</h3>
                <p className="muted"><strong>Best for:</strong> {service.bestFor}</p>
                <ul className="service-points">
                  {service.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="card soft">
            <div className="section-header" style={{ marginBottom: "18px" }}>
              <div>
                <div className="kicker">How engagements usually start</div>
                <h2 style={{ marginTop: "8px" }}>A simple process keeps the search from becoming noisy.</h2>
              </div>
              <p>
                This process language helps the site feel more premium because it explains how a lead moves from confusion to action.
              </p>
            </div>

            <div className="grid grid-4 service-process-grid">
              {PROCESS.map(([title, body]) => (
                <div className="card soft compact-card" key={title}>
                  <div className="kicker">Step</div>
                  <h3 style={{ marginTop: "8px" }}>{title}</h3>
                  <p className="muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Need one place to start?"
        title="Book a short strategy conversation and we’ll point you to the right path first."
        body="Whether the right answer is lease, renew, relocate, or buy, the next step should start from a clearer brief and a smarter shortlist."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "Browse listings", to: "/listings" }}
      />
    </>
  );
}
