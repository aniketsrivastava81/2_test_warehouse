import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";
import { useLeadMagnet } from "../context/LeadMagnetContext";

const SERVICES = [
  {
    title: "Leasing advisory",
    text: "Shortlist creation, requirement scoping, fit analysis, and negotiation support for first leases, relocations, and renewals.",
  },
  {
    title: "Owner-user acquisition",
    text: "Guidance for businesses comparing lease flexibility against ownership, occupancy cost, and long-term control.",
  },
  {
    title: "Warehouse and industrial search",
    text: "Operational-first reviews covering loading, access, power, layout, and scaling suitability.",
  },
  {
    title: "Office and retail strategy",
    text: "Customer visibility, commute convenience, brand fit, and neighbourhood context for client-facing businesses.",
  },
  {
    title: "Market intelligence",
    text: "Neighbourhood comparison, walkability context, and tools that help turn broad interest into clearer commercial decisions.",
  },
  {
    title: "Decision support",
    text: "Checklists, calculators, and guided comparisons that make the next step easier before a formal negotiation starts.",
  },
];

export default function ServicesPage() {
  const { openLeadMagnet } = useLeadMagnet();

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Services</div>
            <h1 style={{ marginTop: "8px" }}>Commercial real-estate support built around clearer next steps</h1>
          </div>
          <p>
            This page is part of the new route foundation. It gives the site a real services layer
            instead of forcing everything through the homepage and listings flow.
          </p>
        </div>

        <div className="grid grid-3">
          {SERVICES.map((service) => (
            <article className="card soft" key={service.title}>
              <h3>{service.title}</h3>
              <p className="muted">{service.text}</p>
            </article>
          ))}
        </div>

        <section className="section tight">
          <div className="card glow">
            <div className="grid grid-2" style={{ alignItems: "center" }}>
              <div>
                <div className="kicker">Coverage</div>
                <h2 style={{ marginTop: "8px" }}>GTA-focused support for business owners, tenants, and investors</h2>
                <p className="muted">
                  Primary service areas currently highlighted in the build: {SITE.serviceAreas.join(", ")}.
                </p>
              </div>
              <div className="footer-actions">
                <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
                  Get the checklist
                </button>
                <Link className="btn btn-secondary" to="/contact">
                  Book a consultation
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
