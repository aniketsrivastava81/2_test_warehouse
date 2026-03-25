import React from "react";
import CTASection from "../components/CTASection";
import LeadForm from "../components/LeadForm";
import { SITE } from "../config/site";

const CONTACT_REASONS = [
  ["Need a shortlist", "Get 3–5 stronger-fit options instead of endless browsing."],
  ["Lease is expiring", "Compare renewal versus relocation before urgency takes over."],
  ["Need warehouse / office / retail fit", "Clarify use, access, budget, and timing."],
  ["Exploring owner-user or investment options", "Start with the right brief and evaluation lens."],
];

const CONTACT_METHODS = [
  {
    title: "Call",
    value: SITE.primaryPhone,
    href: SITE.primaryPhoneHref,
    body: "Best for fast clarification when timing is tight or the move feels urgent.",
  },
  {
    title: "Email",
    value: SITE.primaryEmail,
    href: SITE.primaryEmailHref,
    body: "Best when you already know the basics and want to send a cleaner brief.",
  },
  {
    title: "Service area",
    value: SITE.serviceAreas.join(", "),
    href: null,
    body: "Coverage is GTA-focused so the conversation stays relevant and local.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">Contact</div>
              <h1 style={{ marginTop: "8px" }}>Book a short conversation to clarify the next move.</h1>
            </div>
            <p>
              This page exists to remove friction. Every major page on the site should be able to send someone here with a clear sense of what happens next.
            </p>
          </div>

          <div className="grid grid-2 contact-page-grid" style={{ alignItems: "start" }}>
            <div className="contact-left-rail">
              <div className="card glow">
                <div className="kicker">Best reasons to reach out</div>
                <h3 style={{ marginTop: "8px" }}>What this page is meant to convert</h3>
                <div className="table-like">
                  {CONTACT_REASONS.map(([label, body]) => (
                    <div className="row" key={label}><b>{label}</b><span>{body}</span></div>
                  ))}
                </div>
              </div>

              <div className="grid grid-3 contact-method-grid" style={{ marginTop: "18px" }}>
                {CONTACT_METHODS.map((item) => (
                  <div className="card soft compact-card" key={item.title}>
                    <div className="kicker">{item.title}</div>
                    {item.href ? (
                      <a className="contact-method-link" href={item.href}>{item.value}</a>
                    ) : (
                      <strong className="contact-method-link static">{item.value}</strong>
                    )}
                    <p className="muted">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="card soft" style={{ marginTop: "18px" }}>
                <div className="kicker">What to expect</div>
                <h3 style={{ marginTop: "8px" }}>A clearer brief first. A better next step second.</h3>
                <p className="muted">
                  The goal is not to overwhelm the visitor with forms. It is to make it easy to say what is needed,
                  where the search is focused, and what kind of decision is being made.
                </p>
              </div>
            </div>

            <LeadForm
              title="Tell us what you need"
              intro="Share the basics and the request will be saved in demo mode with a cleaner structure than the earlier batches."
              storageKey="MM_contact_requests"
              source="contact-page"
              context="General site contact form"
              submitLabel="Send inquiry"
              interestOptions={["Lease", "Renewal", "Relocate", "Buy", "Investment review"]}
              locationLabel="Preferred submarket"
              timelineLabel="How soon do you need clarity?"
              timelineOptions={["Immediately", "0–3 months", "3–6 months", "6+ months"]}
            />
          </div>
        </div>
      </section>

      <CTASection
        kicker="Prefer to browse first?"
        title="Use the listings and tools pages to narrow the brief before you reach out."
        body="The strongest conversations usually happen when the visitor already has a sense of fit, timing, and what kind of move they are making."
        primary={{ label: "Browse listings", to: "/listings" }}
        secondary={{ label: "Use the tools", to: "/tools" }}
      />
    </>
  );
}
