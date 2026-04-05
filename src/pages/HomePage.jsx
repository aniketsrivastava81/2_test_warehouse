import React from "react";
import { Link } from "react-router-dom";

const trustStrip = [
  'Industrial • Retail • Land • Advisory',
  'Greater Toronto Area market focus',
  'Sharper digital presentation and decision support',
  'Built for owners, investors, tenants, and developers',
];

const editorialSections = [
  {
    eyebrow: 'Services',
    title: 'Commercial real estate services built around strategy, not just transactions.',
    body: 'From acquisitions and leasing to owner representation and market advisory, KOLT Realty helps clients approach commercial decisions with greater clarity, stronger positioning, and a more useful strategic lens.',
    image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    cta: 'Explore Services',
    to: '/services',
  },
  {
    eyebrow: 'Market focus',
    title: 'Grounded in the GTA. Focused on real commercial opportunity.',
    body: 'The Greater Toronto Area continues to reward informed decision-making. KOLT Realty tracks the local dynamics that shape pricing, scarcity, logistics value, retail viability, and land relevance so clients can move with more precision.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    cta: 'Explore Markets',
    to: '/markets',
  },
  {
    eyebrow: 'Asset classes',
    title: 'Different asset classes require different thinking.',
    body: 'Industrial, retail, and land each demand their own lens. Functional requirements, customer visibility, zoning, access, scarcity, and investment logic vary significantly from one property type to another.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80',
    cta: 'View Asset Classes',
    to: '/asset-classes',
  },
  {
    eyebrow: 'Interactive property experience',
    title: 'See potential beyond the brochure.',
    body: 'Some spaces need more than static photos and floor plans. The warehouse experience is designed to help users better understand layout, scale, circulation, and operational feel before stepping on site.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    cta: 'Open Warehouse Demo',
    to: '/listing-type-2',
  },
];

const stats = [
  { value: 'GTA', label: 'Commercial real estate focus across core industrial, retail, and land corridors.' },
  { value: '3', label: 'Primary asset lanes: industrial, retail, and land.' },
  { value: '1', label: 'More modern client journey built around clarity and action.' },
];

const faq = [
  ['What types of properties does KOLT Realty focus on?', 'KOLT Realty focuses on industrial, retail, land, and selected mixed-use opportunities across the Greater Toronto Area.'],
  ['Is the site only for active listings?', 'No. It is also built to provide market insight, advisory framing, practical tools, and interactive ways to understand space before a conversation starts.'],
  ['Can KOLT help early in the process?', 'Yes. Strong outcomes often begin with earlier planning around timing, market fit, asset class, and strategy.'],
];

export default function HomePage() {
  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">GTA Commercial Real Estate</div>
              <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Commercial real estate guidance built for how decisions are actually made.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-black/70">KOLT Realty helps owners, investors, tenants, and developers navigate industrial, retail, and land opportunities across the Greater Toronto Area with sharper market insight, stronger positioning, and a more modern property experience.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/listings" className="rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white transition hover:bg-black">View Opportunities</Link>
                <Link to="/schedule" className="rounded-full border border-black/12 bg-transparent px-6 py-3 text-sm font-semibold text-black transition hover:bg-black/[0.03]">Schedule a Consultation</Link>
              </div>
            </div>
            <div className="overflow-hidden rounded-[2rem] min-h-[420px] border border-black/6 bg-[#d8d2ca]">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80" alt="Modern industrial property in the GTA" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#111] text-white">
        <div className="mx-auto grid max-w-7xl gap-0 px-6 lg:grid-cols-4 lg:px-10">
          {trustStrip.map((item, index) => (
            <div key={item} className={`py-5 text-sm font-medium text-white/80 ${index < trustStrip.length - 1 ? 'lg:border-r lg:border-white/10' : ''}`}>{item}</div>
          ))}
        </div>
      </section>

      {editorialSections.map((section, index) => (
        <section key={section.title} className={`border-b border-black/6 ${index % 2 === 0 ? 'bg-[#f6f3ee]' : 'bg-white'}`}>
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-24">
            <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">{section.eyebrow}</div>
              <h2 className="mt-4 max-w-[16ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">{section.title}</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68">{section.body}</p>
              <Link to={section.to} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-black">{section.cta} <span aria-hidden="true">↗</span></Link>
            </div>
            <div className={`overflow-hidden rounded-[2rem] min-h-[360px] border border-black/6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
              <img src={section.image} alt={section.title} className="h-full w-full object-cover" />
            </div>
          </div>
        </section>
      ))}

      <section className="border-b border-black/6 bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Why the platform matters</div>
              <h2 className="mt-4 max-w-[10ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">Useful tools. Better decisions.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="border-t border-white/15 pt-5">
                  <div className="text-4xl font-semibold tracking-[-0.06em]">{item.value}</div>
                  <p className="mt-3 text-sm leading-7 text-white/72">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Questions worth answering</div>
              <h2 className="mt-4 max-w-[11ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Before the inquiry call.</h2>
            </div>
            <div className="divide-y divide-black/8 border-y border-black/8">
              {faq.map(([q,a]) => (
                <div key={q} className="py-6">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{q}</h3>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-black/68">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Final CTA</div>
              <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Looking for the right commercial real estate move in the GTA?</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/70">Whether you are evaluating a site, planning a lease, positioning an asset, or exploring new opportunities, KOLT Realty is here to help you move with greater clarity and confidence.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/schedule" className="rounded-full bg-[#111] px-6 py-3 text-sm font-semibold text-white">Schedule a Consultation</Link>
              <Link to="/contact" className="rounded-full border border-black/12 px-6 py-3 text-sm font-semibold text-black">Contact KOLT Realty</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
