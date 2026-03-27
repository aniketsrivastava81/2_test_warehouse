import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";

const differentiators = [
  {
    title: "Closer instinct over brochure instinct",
    body: "KOLT should behave like a team that understands the difference between traffic and intent. The structure reduces ambiguity, sharpens urgency, and moves serious users toward a brief.",
  },
  {
    title: "Hyper-local GTA authority",
    body: "Peel, Halton, and York are not decorative geography. They are the commission-justifying knowledge layer that tells a user where to move and why.",
  },
  {
    title: "Institutional language throughout",
    body: "Use NOI, DCF, lease audit, E2 / E3 zoning, truck-level loading, and industrial condo conversions so the platform sounds like it belongs in a real CRE war room.",
  },
  {
    title: "3D proof of future-readiness",
    body: "The warehouse experience keeps the brand from feeling static and proves KOLT understands where logistics product and occupier expectations are going next.",
  },
];

const path = [
  {
    step: "01",
    title: "State dominance early",
    body: "Lead with the heavyweight signals - sales volume, combined experience, pipeline, and corridor focus - before the user ever reaches supporting copy.",
  },
  {
    step: "02",
    title: "Translate authority into utility",
    body: "Show why local intelligence improves NOI, occupancy, leasing velocity, and deal conviction. Authority without payoff still feels generic.",
  },
  {
    step: "03",
    title: "Make inventory feel scarce",
    body: "Status tags, floor-plan downloads, and confidentiality CTAs should create a sense that the user is entering a live market, not a parked catalogue.",
  },
  {
    step: "04",
    title: "Capture intent with information",
    body: "The scarcity report and requirement brief give serious users a value-first reason to raise their hand before they are ready for a direct call.",
  },
];

const outcomes = [
  "Stronger perceived authority because the first fold now behaves like institutional CRE positioning.",
  "Higher listing engagement because scarcity language and floor-plan access make inventory feel time-sensitive.",
  "Better lead quality because the report and brief capture users with a real mandate, not casual browsers.",
  "More memorable differentiation because the warehouse demo and local-market tone do what generic brokerage sites rarely do.",
];

const proofStats = [
  ['Sales belt', '$1B+ represented'],
  ['Experience', '200+ years combined'],
  ['Pipeline', '$2B+ assets'],
  ['Product fit', 'Industrial condo conversions'],
];

export default function WhyKoltPage() {
  return (
    <div className="premium-page-scroll premium-story-page">
      <section className="page-hero slim-hero premium-story-hero premium-story-hero--dark why-hero-upgrade">
        <div className="container premium-story-hero__grid">
          <div className="premium-story-hero__main about-hero-main">
            <div className="eyebrow">Why KOLT</div>
            <h1>Because serious GTA industrial clients want an asset advisor, not another realtor template.</h1>
            <p>
              The advantage is not more information. It is better organized judgment, stronger scarcity framing, and a cleaner bridge between industrial market insight,
              inventory, and the next step toward a confidential review.
            </p>
            <div className="premium-story-kpis about-kpi-grid">
              {proofStats.map(([label, value]) => (
                <article key={label}><small>{label}</small><strong>{value}</strong></article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listings" className="button button-primary">Browse live opportunities</Link>
              <Link to="/contact#analysis-workflow" className="button button-secondary">Request scarcity report</Link>
            </div>
          </div>
          <div className="premium-story-hero__rail premium-story-hero__rail--compact">
            {differentiators.slice(0, 2).map((item, index) => (
              <motion.article whileHover={{ y: -6 }} key={item.title} className="premium-story-hover-card premium-story-hover-card--accent institutional-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index }}>
                <div className="institutional-card__icon" aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-story-nav-wrap">
        <div className="container premium-story-nav">
          <a href="#why-proof">What changes</a>
          <a href="#why-path">How it closes</a>
          <a href="#why-outcomes">What improves</a>
        </div>
      </section>

      <section className="section" id="why-proof">
        <div className="container premium-proof-grid">
          {differentiators.map((item) => (
            <article key={item.title} className="institutional-card"><div className="institutional-card__icon" aria-hidden="true" /><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
      </section>

      <section className="section section-soft-borderless" id="why-path">
        <div className="container premium-path-grid">
          {path.map((item) => (
            <article key={item.step}><span>{item.step}</span><h3>{item.title}</h3><p>{item.body}</p></article>
          ))}
        </div>
      </section>

      <section className="section" id="why-outcomes">
        <div className="container grid gap-6 lg:grid-cols-[1fr_.95fr] items-stretch">
          <div className="premium-outcomes-grid">
            {outcomes.map((item) => (
              <article key={item}><p>{item}</p></article>
            ))}
          </div>
          <div className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-8">
            <div className="eyebrow !text-white/70">Warehouse of the future</div>
            <h3 className="m-0 text-[1.95rem] leading-tight tracking-[-0.05em] text-white">One high-impact 3D layer can separate KOLT from every flat brokerage competitor.</h3>
            <p className="mb-0 mt-4 text-[0.98rem] leading-7 text-white/74">Use the interactive warehouse page as proof that KOLT understands future logistics, future occupier expectations, and future industrial storytelling - not just current listings.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listing-type-2" className="button button-primary">Open interactive showcase</Link>
              <Link to="/warehouse" className="button button-secondary">Open warehouse route</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection eyebrow="Put it to work" title="The differentiator only matters if the user can feel it in the next click." body="Move into listings, tools, and the requirement brief with a tone that sounds closer to a senior asset advisor than a retail-style realtor site." primaryLabel="Browse Listings" primaryTo="/listings" secondaryLabel="Open Tools" secondaryTo="/tools" />
    </div>
  );
}
