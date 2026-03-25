import React from "react";
import CTASection from "../components/CTASection";
import LeadForm from "../components/LeadForm";
import { SITE } from "../config/site";
import { trackEvent } from "../utils/tracking";

const CONTACT_REASONS = [
  ["Lease is expiring", "Review renewal versus relocation before time pressure takes over."],
  ["Need a shortlist", "Compare 3–5 stronger-fit options instead of searching without a plan."],
  ["Need warehouse, office, or retail fit", "Clarify layout, location, access, timing, and budget priorities."],
  ["Thinking about buying", "Review owner-user and investment opportunities with a finance-aware lens."],
];

const CONTACT_METHODS = [
  {
    title: "Direct line",
    value: SITE.primaryPhone,
    href: SITE.primaryPhoneHref,
    body: "Best for urgent timing, quick questions, or a fast first conversation.",
  },
  {
    title: "Email",
    value: SITE.primaryEmail,
    href: SITE.primaryEmailHref,
    body: "Best when you want to send a cleaner brief with location, size, and timing details.",
  },
  {
    title: "Brokerage office",
    value: SITE.officeAddress,
    href: null,
    body: "Serving commercial clients across Toronto, Vaughan, Mississauga, Brampton, Markham, North York, and Richmond Hill.",
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
              <h1 style={{ marginTop: "8px" }}>Let’s talk about the next commercial move.</h1>
            </div>
            <p>
              Whether you are leasing, renewing, relocating, buying, or reviewing investment opportunities, Megha can help you start with a cleaner brief and a better next step.
            </p>
          </div>

          <div className="grid grid-2 contact-page-grid" style={{ alignItems: "start" }}>
            <div className="contact-left-rail">
              <div className="card glow">
                <div className="kicker">When to reach out</div>
                <h3 style={{ marginTop: "8px" }}>The best time to start is before urgency takes over.</h3>
                <div className="table-like" style={{ marginTop: "14px" }}>
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
                      <a
                        className="contact-method-link"
                        href={item.href}
                        onClick={() => trackEvent(item.title === "Direct line" ? "call_click" : "email_click", { page: "contact" })}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <strong className="contact-method-link static">{item.value}</strong>
                    )}
                    <p className="muted">{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="card soft" style={{ marginTop: "18px" }}>
                <div className="kicker">What to send</div>
                <h3 style={{ marginTop: "8px" }}>A few details are enough to get started.</h3>
                <div className="table-like" style={{ marginTop: "12px" }}>
                  <div className="row"><b>Property type</b><span>Office, warehouse, industrial condo, retail, or land</span></div>
                  <div className="row"><b>Preferred area</b><span>City, submarket, or corridor</span></div>
                  <div className="row"><b>Timing</b><span>Immediate, 0–3 months, 3–6 months, or longer</span></div>
                  <div className="row"><b>Must-haves</b><span>Size, parking, loading, exposure, budget, or access</span></div>
                </div>
              </div>
            </div>

            <LeadForm
              title="Tell Megha what you need"
              intro="Share the basics and Megha can begin with a cleaner brief and a more useful next step."
              storageKey="MM_contact_requests"
              source="contact-page"
              context="General site contact form"
              submitLabel="Send inquiry"
              interestOptions={[
                "Lease a commercial space",
                "Renew an existing lease",
                "Relocate to a new space",
                "Buy for my business",
                "Review an investment opportunity",
              ]}
              locationLabel="Preferred city or submarket"
              timelineLabel="How soon do you need clarity?"
              timelineOptions={["Immediately", "0–3 months", "3–6 months", "6+ months"]}
              messagePlaceholder="Share the type of space, the size range, the location, your timing, and anything the next property must do for the business."
              note="A concise brief makes the first conversation more productive."
              onSuccess={() => trackEvent("contact_form_submit", { page: "contact" })}
            />
          </div>
        </div>
      </section>

      <CTASection
        kicker="Prefer to call first?"
        title="Call Megha directly if the timing is tight or the decision needs quick clarity."
        body="A short conversation can usually narrow the search faster than a long chain of messages."
        primary={{ label: "Browse listings", to: "/listings" }}
        secondary={{ label: "See services", to: "/services" }}
      />
    </>
  );
}
