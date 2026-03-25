import React from "react";
import CTASection from "../components/CTASection";

const SERVICES = [
  {
    title: "Leasing advisory",
    body: "Best for first-time tenants, renewals, and relocations where clarity, timing, and lease structure matter as much as the space itself.",
  },
  {
    title: "Owner-user acquisition support",
    body: "For businesses deciding whether buying creates better long-term control than leasing in the current stage of growth.",
  },
  {
    title: "Investment opportunity review",
    body: "For buyers comparing industrial, office, and retail opportunities through practicality, income logic, and local market fit.",
  },
  {
    title: "Retail and visibility analysis",
    body: "For storefront and plaza users who need better signage, access, footfall rhythm, and neighbourhood compatibility.",
  },
  {
    title: "Industrial / warehouse search",
    body: "For businesses that care about truck access, shipping flow, clear height, parking, and operational convenience—not just brochure polish.",
  },
  {
    title: "Land and development support",
    body: "For clients exploring future-use potential, site context, and an opportunity set beyond standard ready-to-lease inventory.",
  },
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
            <p>This page exists so the site feels like a real advisory platform, not only a listings brochure.</p>
          </div>
          <div className="grid grid-3">
            {SERVICES.map((service) => (
              <div className="card glow reveal" key={service.title}>
                <h3>{service.title}</h3>
                <p className="muted">{service.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        kicker="Need one place to start?"
        title="Book a short strategy conversation and we’ll point you to the right path first."
        body="Whether the answer is lease, renew, relocate, or buy, the goal is to move forward from a cleaner brief and a smarter shortlist."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "Browse listings", to: "/listings" }}
      />
    </>
  );
}
