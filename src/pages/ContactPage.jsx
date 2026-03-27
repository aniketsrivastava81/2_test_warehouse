import React from "react";
import { Link } from "react-router-dom";
import MultiStepLeadForm from "../components/MultiStepLeadForm";
import { SITE } from "../config/site";

const contactChapters = [
  {
    title: "Call the brokerage",
    body: "Use the public office line when the next move is already clear and you want a faster conversation.",
    href: `tel:${SITE.primaryPhone.replace(/[^\d+]/g, "")}`,
    label: SITE.primaryPhone,
  },
  {
    title: "Email the team",
    body: "Use email when the requirement needs attachments, a property list, or a more detailed written brief.",
    href: `mailto:${SITE.primaryEmail}`,
    label: SITE.primaryEmail,
  },
  {
    title: "Pressure-test first",
    body: "Not ready to inquire yet? Move into the tools and build a stronger requirement before outreach.",
    href: "/tools",
    label: "Open tools",
    internal: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="flex flex-wrap gap-2">
              <span className="eyebrow">Contact</span>
              <span className="rounded-full border border-black/10 bg-[#faf7f4] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/60">Strategy-led outreach</span>
            </div>
            <h1 className="m-0 mt-4 max-w-[11ch] text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.07em]">
              Capture the requirement cleanly before the conversation begins.
            </h1>
            <p className="mt-5 max-w-[58ch] text-[1.04rem] leading-8 text-black/78">
              This contact flow now behaves more like a commercial requirement brief: asset type, corridor, timing, and constraints first — contact second.
            </p>
            <div className="hero-proof-row mt-6">
              <span className="proof-chip">Two-step inquiry</span>
              <span className="proof-chip">Phone + email routing</span>
              <span className="proof-chip">Shortlist-aware workflow</span>
              <span className="proof-chip">WhatsApp-ready draft</span>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe lg:p-8">
            <div className="eyebrow">Public contact details</div>
            <div className="contact-direct-card mt-4">
              <div>
                <small>Office</small>
                <strong>{SITE.primaryPhone}</strong>
              </div>
              <div>
                <small>Email</small>
                <strong>{SITE.primaryEmail}</strong>
              </div>
              <div>
                <small>Address</small>
                <strong>{SITE.officeAddress}</strong>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {contactChapters.map((item) => item.internal ? (
                <Link key={item.title} className="contact-direct-link" to={item.href}>
                  <span>{item.title}</span>
                  <strong>{item.label}</strong>
                  <p>{item.body}</p>
                </Link>
              ) : (
                <a key={item.title} className="contact-direct-link" href={item.href}>
                  <span>{item.title}</span>
                  <strong>{item.label}</strong>
                  <p>{item.body}</p>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-soft-borderless" id="analysis-workflow">
        <div className="container grid gap-6 lg:grid-cols-[1.04fr_.96fr] items-start">
          <MultiStepLeadForm source="contact-page" context="Direct contact page inquiry" />
          <div className="grid gap-4">
            <article className="contact-story-panel">
              <div className="eyebrow">Analysis workflow</div>
              <h2>Make the next outreach feel earned, not generic.</h2>
              <p>
                The stronger conversion pattern is now: save a shortlist, run the tools, then package the requirement brief. That sequence gives KOLT far more context than a blank contact form ever could.
              </p>
            </article>
            <article className="contact-story-panel contact-story-panel--dark">
              <div className="eyebrow">Institutional language</div>
              <h2>Use the same tone serious CRE conversations already expect.</h2>
              <ul>
                <li>Request Confidential Offering Memorandum</li>
                <li>Launch Requirement Brief</li>
                <li>Pressure-test cap rate, NNN exposure, and loading type</li>
                <li>Screen corridor fit, last-mile access, and employment land context</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
