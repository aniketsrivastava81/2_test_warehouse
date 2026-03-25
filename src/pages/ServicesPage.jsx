import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import { SITE } from "../config/site";

const SERVICES = [
  {
    title: "Tenant representation & site selection",
    summary: "For businesses leasing office, industrial, retail, or flex space across the GTA.",
    points: [
      "Define size, layout, budget, location, parking, and access requirements before touring.",
      "Build a shortlist of spaces that match operations, staffing, and client-facing needs.",
      "Compare options on total occupancy cost, flexibility, and move-in timing.",
    ],
  },
  {
    title: "Lease renewal strategy",
    summary: "For tenants deciding whether to renew, relocate, or use both paths to negotiate from leverage.",
    points: [
      "Review what is and is not working in the current space.",
      "Benchmark renewal economics against real alternatives in the market.",
      "Prepare a negotiation position before urgency starts driving the process.",
    ],
  },
  {
    title: "Owner-user acquisition support",
    summary: "For business owners weighing the control of buying against the flexibility of leasing.",
    points: [
      "Compare buy-versus-lease scenarios using occupancy cost, cash flow, and future use needs.",
      "Screen industrial condos, flex units, and commercial ownership opportunities.",
      "Focus on fit, expansion potential, and long-term business value.",
    ],
  },
  {
    title: "Industrial & warehouse search",
    summary: "For operators focused on loading, clear height, truck flow, parking, and workflow efficiency.",
    points: [
      "Prioritize practical operational fit before cosmetic features.",
      "Review loading access, shipping flow, office ratio, and permitted use early.",
      "Shortlist spaces that work for the business today and leave room for growth.",
    ],
  },
  {
    title: "Retail & medical plaza advisory",
    summary: "For users who rely on visibility, convenience, signage, and customer access.",
    points: [
      "Assess frontage, parking, co-tenancy, wayfinding, and access from the street.",
      "Compare how a unit performs for real day-to-day customer behaviour, not just photos.",
      "Test whether the plaza and surrounding mix support the business model.",
    ],
  },
  {
    title: "Investment & development support",
    summary: "For investors and developers reviewing commercial opportunities, land, and strategic holds.",
    points: [
      "Evaluate opportunity through income quality, downside risk, and location logic.",
      "Review site context, future-use potential, and neighbourhood momentum.",
      "Bring a finance-aware lens to acquisition and hold decisions.",
    ],
  },
];

const PROCESS = [
  ["Step 1", "Clarify the brief", "Use, timing, budget, location priorities, and non-negotiables."],
  ["Step 2", "Build the shortlist", "Narrow the market to the options worth serious attention."],
  ["Step 3", "Compare the options", "Review cost, functionality, flexibility, and location advantage side by side."],
  ["Step 4", "Move with leverage", "Enter tours, negotiations, and next steps with a cleaner decision path."],
];

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">Services</div>
              <h1 style={{ marginTop: "8px" }}>Commercial real-estate advisory for leasing, buying, and smarter site decisions across the GTA.</h1>
            </div>
            <p>
              Megha works with tenants, owner-users, investors, and developers who need clear advice, stronger shortlists,
              and space decisions that hold up after the deal is signed.
            </p>
          </div>

          <div className="service-hero-grid grid grid-2">
            <div className="card glow">
              <div className="kicker">Coverage</div>
              <h3 style={{ marginTop: "8px" }}>What Megha helps clients solve</h3>
              <div className="table-like" style={{ marginTop: "14px" }}>
                <div className="row"><b>Markets</b><span>{SITE.serviceAreas.join(", ")}</span></div>
                <div className="row"><b>Asset classes</b><span>{SITE.assetClasses.join(", ")}</span></div>
                <div className="row"><b>Client types</b><span>Tenants, owner-users, investors, developers</span></div>
                <div className="row"><b>Focus</b><span>Fit, clarity, negotiation leverage, and cleaner execution</span></div>
              </div>
            </div>

            <div className="card soft">
              <div className="kicker">How the work is approached</div>
              <h3 style={{ marginTop: "8px" }}>Less noise. Better-fit options. Stronger decisions.</h3>
              <p className="muted">
                The process starts with the business itself: how the space needs to work, where it needs to be, what the budget needs to carry,
                and which trade-offs are acceptable. From there, the shortlist gets tighter, the touring gets sharper, and the negotiation gets stronger.
              </p>
              <div className="service-badge-stack">
                <span className="pill"><strong>Tenant rep</strong></span>
                <span className="pill">Lease renewals</span>
                <span className="pill">Owner-user strategy</span>
                <span className="pill">Industrial + retail fit</span>
              </div>
            </div>
          </div>

          <div className="grid grid-3" style={{ marginTop: "24px" }}>
            {SERVICES.map((service) => (
              <article className="card glow reveal service-card" key={service.title}>
                <div className="kicker">Service</div>
                <h3 style={{ marginTop: "8px" }}>{service.title}</h3>
                <p className="muted"><strong>Best for:</strong> {service.summary}</p>
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
                <div className="kicker">Process</div>
                <h2 style={{ marginTop: "8px" }}>Every search starts with a clear brief and ends with a stronger decision.</h2>
              </div>
              <p>
                Good commercial representation is not just about finding a listing. It is about narrowing the market, testing the fit,
                and making the next move with more leverage.
              </p>
            </div>

            <div className="grid grid-4 service-process-grid">
              {PROCESS.map(([step, title, body]) => (
                <div className="card soft compact-card" key={title}>
                  <div className="kicker">{step}</div>
                  <h3 style={{ marginTop: "8px" }}>{title}</h3>
                  <p className="muted">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="inline-callout">
            <div>
              <div className="kicker">Useful next steps</div>
              <div><strong>Need to compare cost, shortlist quality, or submarkets before deciding?</strong></div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/tools">Open tools</Link>
              <Link className="btn btn-secondary" to="/guides">Read guides</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Start here"
        title="Tell Megha what you need, where you want to be, and what has to work on day one."
        body="If you are comparing lease, renewal, relocation, or ownership paths, the best next step is a clearer brief and a sharper shortlist."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "Browse listings", to: "/listings" }}
      />
    </>
  );
}
