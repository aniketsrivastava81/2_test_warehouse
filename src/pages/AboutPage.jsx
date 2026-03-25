import React from "react";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const DIFFERENTIATORS = [
  {
    title: "Finance-aware advice",
    body: "Megha brings an Accounting & Finance background plus experience across accounting, mortgage financing, sales, and banking. That helps clients evaluate more than just the asking rate.",
  },
  {
    title: "Clear communication",
    body: "Clients get straightforward guidance, practical comparisons, and a cleaner shortlist instead of a flood of mismatched options.",
  },
  {
    title: "GTA market familiarity",
    body: "The work is rooted in the Greater Toronto Area with a focus on location fit, market context, and long-term usability for the business.",
  },
];

const PROFILE_POINTS = [
  ["Brokerage", `${SITE.brokerage} • ${SITE.role}`],
  ["Markets served", SITE.serviceAreas.join(", ")],
  ["Asset focus", SITE.assetClasses.join(", ")],
  ["Languages", "English, Hindi, Gujarati, Marathi"],
];

const PROCESS = [
  "Understand the business, the timing, and the non-negotiables.",
  "Shortlist spaces that match the brief instead of wasting tours on poor-fit options.",
  "Compare cost, use, location, access, and flexibility side by side.",
  "Move into tours, negotiations, and next steps with clarity.",
];

export default function AboutPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">About Megha</div>
              <h1 style={{ marginTop: "8px" }}>Commercial real-estate guidance backed by finance fluency, market insight, and clear communication.</h1>
            </div>
            <p>
              Megha Mehta is a GTA-based Realtor and Sales Representative with {SITE.brokerage}. She brings a background in Accounting & Finance,
              along with experience in accounting, mortgage financing, sales, and banking. That combination helps clients make better-informed
              commercial real-estate decisions with less guesswork.
            </p>
          </div>

          <div className="grid grid-2">
            <div className="card glow">
              <div className="kicker">Profile</div>
              <h3 style={{ marginTop: "8px" }}>{SITE.brandName}</h3>
              <p className="muted">
                Megha works with tenants, owner-users, investors, and developers across the Greater Toronto Area. She is known for clear communication,
                strong negotiation, and a relationship-driven working style. Fluent in Hindi, Gujarati, and Marathi, she serves a diverse client base and brings cultural fluency to every conversation.
              </p>
              <div className="table-like" style={{ marginTop: "14px" }}>
                {PROFILE_POINTS.map(([label, value]) => (
                  <div className="row" key={label}><b>{label}</b><span>{value}</span></div>
                ))}
              </div>
            </div>

            <div className="card soft">
              <div className="kicker">What clients value</div>
              <h3 style={{ marginTop: "8px" }}>A calmer process and a stronger shortlist.</h3>
              <p className="muted">
                Commercial real estate decisions often come with time pressure, incomplete information, and too many weak options. Megha’s role is to bring structure to that process — define the brief, narrow the market, compare the right variables, and help clients move forward with confidence.
              </p>
              <blockquote className="profile-quote">
                “The goal is not to show the most space. The goal is to find the right space, at the right time, with the right structure behind it.”
              </blockquote>
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: "24px" }}>
            {DIFFERENTIATORS.map((item) => (
              <div className="card soft compact-card" key={item.title}>
                <div className="kicker">Why Megha</div>
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
              <div className="kicker">Working style</div>
              <h2 style={{ marginTop: "8px" }}>How Megha guides a commercial search</h2>
              <ol className="numbered-list">
                {PROCESS.map((step) => <li key={step}>{step}</li>)}
              </ol>
            </div>

            <div className="card glow">
              <div className="kicker">Who this is for</div>
              <h3 style={{ marginTop: "8px" }}>Businesses and investors who want practical guidance, not generic sales language.</h3>
              <p className="muted">
                Whether the goal is a warehouse, industrial condo, showroom-flex unit, office, retail plaza, or development land opportunity,
                the process starts with fit. Megha’s approach keeps the conversation focused on what actually helps the client make the right decision.
              </p>
              <div className="service-badge-stack">
                <span className="pill"><strong>Leasing</strong></span>
                <span className="pill">Renewals</span>
                <span className="pill">Owner-user strategy</span>
                <span className="pill">Investment review</span>
                <span className="pill">GTA market guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Ready to talk?"
        title="Share the brief and Megha can help turn the next move into a smarter one."
        body="If you already know the type of property, location, or timing that matters most, the contact page is the best next step."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "See services", to: "/services" }}
      />
    </>
  );
}
