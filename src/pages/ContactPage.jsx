import React from "react";
import LeadForm from "../components/LeadForm";
import { SITE } from "../config/site";

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Contact</div>
            <h1 style={{ marginTop: "8px" }}>Book a short conversation to clarify the next move.</h1>
          </div>
          <p>Use this page when the user is ready to move from browsing into a shortlist, renewal strategy, relocation discussion, or owner-user purchase conversation.</p>
        </div>

        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <div className="card glow">
            <div className="kicker">Best reasons to reach out</div>
            <h3 style={{ marginTop: "8px" }}>What this page is meant to convert</h3>
            <div className="table-like">
              <div className="row"><b>Need a shortlist</b><span>3–5 stronger-fit options instead of endless browsing</span></div>
              <div className="row"><b>Lease is expiring</b><span>Compare renewal vs relocation before urgency takes over</span></div>
              <div className="row"><b>Need a warehouse / office / retail fit</b><span>Clarify use, access, budget, and timing</span></div>
              <div className="row"><b>Exploring owner-user or investment options</b><span>Start with the right brief and evaluation lens</span></div>
            </div>
            <div className="hr"></div>
            <p className="muted"><strong>Phone:</strong> <a href={SITE.primaryPhoneHref}>{SITE.primaryPhone}</a></p>
            <p className="muted"><strong>Email:</strong> <a href={SITE.primaryEmailHref}>{SITE.primaryEmail}</a></p>
            <p className="muted"><strong>Service area:</strong> {SITE.serviceAreas.join(", ")}</p>
          </div>
          <LeadForm title="Tell us what you need" storageKey="MM_contact_requests" source="contact-page" context="General site contact form" />
        </div>
      </div>
    </section>
  );
}
