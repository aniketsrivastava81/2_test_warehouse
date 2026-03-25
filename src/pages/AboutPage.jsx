import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const DIFFERENTIATORS = [
  {
    title: "Fit before hype",
    body: "The site positions Megha around shortlist quality, operational fit, and clearer decision-making—not loud generic sales language.",
  },
  {
    title: "Finance-aware lens",
    body: "The advisory tone makes room for cost structure, timing, renewal decisions, and owner-user logic instead of only surface-level marketing.",
  },
  {
    title: "GTA-specific framing",
    body: "Service areas and property types are anchored to Toronto-region commercial movement so the site feels local, not copy-pasted.",
  },
];

const PROCESS = [
  "Clarify the brief and define what success actually looks like.",
  "Build a shortlist that is worth serious attention.",
  "Compare the shortlist through use, cost, access, and long-term fit.",
  "Move toward negotiation and next steps with more confidence.",
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">About</div>
              <h1 style={{ marginTop: "8px" }}>A more advisor-style profile for a premium GTA commercial real-estate presence.</h1>
            </div>
            <p>
              In a competitive market, the About page does a lot of trust work. It needs to explain not just who Megha is,
              but why the site is worth believing and why the client journey feels more strategic than generic.
            </p>
          </div>

          <div className="grid grid-2">
            <div className="card glow">
              <div className="kicker">Positioning</div>
              <h3 style={{ marginTop: "8px" }}>{SITE.brandName}</h3>
              <p className="muted">
                This version of the site frames Megha as a calm, strategic guide for commercial users who need more clarity around location,
                lease structure, shortlist quality, and long-term fit. The tone is relationship-first, but the decision framework stays practical.
              </p>
              <div className="table-like">
                <div className="row"><b>Geography</b><span>{SITE.serviceAreas.join(", ")}</span></div>
                <div className="row"><b>Focus</b><span>{SITE.assetClasses.join(", ")}</span></div>
                <div className="row"><b>Style</b><span>Relationship-first • fit-focused • shortlist-led</span></div>
              </div>
            </div>

            <div className="card soft">
              <div className="kicker">Why this matters</div>
              <h3 style={{ marginTop: "8px" }}>Commercial clients do not just need a space. They need a decision they will not regret later.</h3>
              <p className="muted">
                That means the site has to communicate operational fit, budget clarity, neighbourhood reality, and timing strategy—
                not only pretty visuals or vague service claims.
              </p>
              <blockquote className="profile-quote">
                “The goal of this page is simple: when someone skims it for 30 seconds, they should understand the differentiator and feel comfortable taking the next step.”
              </blockquote>
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: "24px" }}>
            {DIFFERENTIATORS.map((item) => (
              <div className="card soft compact-card" key={item.title}>
                <div className="kicker">Differentiator</div>
                <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="grid grid-2 about-process-grid">
            <div className="card soft">
              <div className="kicker">How the work is framed</div>
              <h2 style={{ marginTop: "8px" }}>A clearer process helps the site feel trustworthy.</h2>
              <ol className="numbered-list">
                {PROCESS.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>

            <div className="card glow">
              <div className="kicker">Who this is for</div>
              <h3 style={{ marginTop: "8px" }}>Tenants, owner-users, investors, and developers who need fewer weak options and a stronger selection lens.</h3>
              <p className="muted">
                This page helps set the tone for every other conversion page. It builds confidence that the shortlist, the tools,
                and the contact process are all part of the same premium experience.
              </p>
              <div className="service-badge-stack">
                <span className="pill"><strong>Leasing</strong></span>
                <span className="pill">Renewal</span>
                <span className="pill">Relocation</span>
                <span className="pill">Owner-user search</span>
                <span className="pill">Investment review</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Next step"
        title="If the strategy is clear, the shortlist gets much stronger."
        body="Use the contact page to share timing, use, and location priorities. The next step should feel simple, specific, and worth taking."
        primary={{ label: "Contact page", to: "/contact" }}
        secondary={{ label: "See services", to: "/services" }}
      />
    </>
  );
}
