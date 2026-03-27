import React from "react";
import { Link } from "react-router-dom";
import MultiStepLeadForm from "../components/MultiStepLeadForm";
import { SITE } from "../config/site";
import { buildMailtoHref, buildTelHref, buildWhatsappHref } from "../utils/inquiryRouting";
import { clearInboxLeads, getInboxLeads } from "../utils/leadStorage";

const contactChapters = [
  { title: "Request the 2026 GTA Industrial Scarcity Report", body: "Use the requirement brief below to request the gated market-intelligence piece and route it through the sample CRM flow.", href: "/contact#analysis-workflow", label: "Request report", internal: true },
  { title: "Call the sample office line", body: "Use the sample office line when the requirement is already clear and you want a faster human handoff.", href: buildTelHref(), label: SITE.primaryPhone },
  { title: "Email the sample inbox", body: "Use the inbox when the requirement needs attachments, a longer brief, or a property comparison note.", href: `mailto:${SITE.inquiryEmail}`, label: SITE.inquiryEmail },
  { title: "Open a WhatsApp-ready draft", body: "This uses a sample business number so the demo build shows a connected messaging flow.", href: buildWhatsappHref({ source: "contact-page", context: "Sample WhatsApp routing" }), label: "WhatsApp draft" },
  { title: "Pressure-test first", body: "Not ready to inquire yet? Move into the tools and build a stronger requirement before outreach.", href: "/tools", label: "Open tools", internal: true },
];

export default function ContactPage() {
  const [inbox, setInbox] = React.useState(getInboxLeads());

  React.useEffect(() => {
    const refresh = () => setInbox(getInboxLeads());
    window.addEventListener("kolt-inbox-updated", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("kolt-inbox-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="flex flex-wrap gap-2"><div className="eyebrow">Contact</div><span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Sample CRM routing now live</span><span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Scarcity report capture</span></div>
            <h1 className="m-0 mt-4 max-w-[10.4ch] text-[clamp(3rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.07em]">Value first, then the call.</h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/76">This pass upgrades the contact flow into a more commercial capture path: a gated 2026 GTA Industrial Scarcity Report, a multi-step requirement brief, sample phone and WhatsApp routing, and a visible sample CRM inbox.</p>
            <div className="hero-proof-row mt-6"><span className="proof-chip">Scarcity report</span><span className="proof-chip">Sample phone</span><span className="proof-chip">Sample WhatsApp</span><span className="proof-chip">Local CRM inbox view</span></div>
          </div>
          <div className="grid gap-4">
            {contactChapters.map((item) => (
              item.internal ? (
                <Link key={item.title} to={item.href} className="contact-direct-card">
                  <strong>{item.title}</strong><p>{item.body}</p><span>{item.label}</span>
                </Link>
              ) : (
                <a key={item.title} href={item.href} className="contact-direct-card" target={item.href.startsWith('https://') ? '_blank' : undefined} rel={item.href.startsWith('https://') ? 'noreferrer' : undefined}>
                  <strong>{item.title}</strong><p>{item.body}</p><span>{item.label}</span>
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      <section className="section pt-8 lg:pt-10" id="analysis-workflow">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-start">
          <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe lg:p-8">
            <div className="eyebrow">Lead magnet</div>
            <h2 className="m-0 mt-2 max-w-[14ch] text-[clamp(2rem,3.2vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">Request the 2026 GTA Industrial Scarcity Report and route a real sample inquiry.</h2>
            <p className="mt-4 text-[1rem] leading-8 text-black/76">The report capture now works as the value-first entry point. The same brief also saves into the sample CRM inbox and generates email / WhatsApp handoff options so the demo behaves more like a working commercial funnel.</p>
            <div className="mt-5 grid gap-3">
              {[
                'Core-region inventory pressure across Peel, Halton, and York.',
                'Industrial condo conversion signals and user-fit screening prompts.',
                'A cleaner handoff into phone, email, and WhatsApp without dead-end CTAs.',
              ].map((item) => (<div key={item} className="rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/80">{item}</div>))}
            </div>
          </div>
          <MultiStepLeadForm source="contact-page" title="Start with the requirement, then capture the contact." intro="The two-step structure makes the inquiry feel more like a serious brief than a generic website form." context="Contact page" />
        </div>
      </section>

      <section className="section section-soft-borderless" id="sample-crm-inbox">
        <div className="container contact-inbox">
          <div className="contact-inbox__header">
            <div><div className="eyebrow">{SITE.sampleCrmLabel}</div><h2>Visible sample inbox for routed leads</h2></div>
            <div className="contact-inbox__actions"><button type="button" className="button button-secondary small-button" onClick={() => { clearInboxLeads(); setInbox([]); }}>Clear inbox</button></div>
          </div>
          {!inbox.length ? (
            <div className="contact-inbox__empty">No sample inquiries saved yet. Submit the multi-step form, lead form, or checklist modal and the record will appear here.</div>
          ) : (
            <div className="contact-inbox__list">
              {inbox.map((lead) => (
                <article key={lead.id || lead.ts} className="contact-inbox__card">
                  <div className="contact-inbox__meta">
                    <strong>{lead.name || "Unnamed lead"}</strong>
                    <span>{lead.assetType || lead.stage || lead.interest || "General inquiry"}</span>
                  </div>
                  <p>{lead.message || lead.note || "No message provided."}</p>
                  <div className="contact-inbox__chips">
                    <span>{lead.email || "No email"}</span>
                    <span>{lead.phone || "No phone"}</span>
                    <span>{lead.area || lead.location || lead.context || "No area specified"}</span>
                  </div>
                  <div className="contact-inbox__row">
                    <a className="button button-primary small-button" href={buildMailtoHref(lead)}>Email lead brief</a>
                    <a className="button button-secondary small-button" href={buildWhatsappHref(lead)} target="_blank" rel="noreferrer">WhatsApp draft</a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
