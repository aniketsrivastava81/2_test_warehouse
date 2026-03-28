import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import MarketIntelligenceHub from "../components/MarketIntelligenceHub";
import ZoningAssistant from "../components/ZoningAssistant";
import { MARKETS } from "../data/siteData";

const marketVisuals = {
  "Toronto Core": { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80", insights: ["Executive image", "Transit reach", "Client-facing presence"], landing: "Downtown HQ and premium office users" },
  Mississauga: { image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80", insights: ["Airport adjacency", "Western GTA logistics", "Balanced labour access"], landing: "Airport-linked logistics and western GTA utility" },
  Brampton: { image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80", insights: ["Relative value", "Industrial utility", "Truck movement"], landing: "Industrial condos and trucking-sensitive operators" },
  Vaughan: { image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=80", insights: ["400-series linkage", "Customer access", "Showroom-flex fit"], landing: "Customer-facing industrial and flex" },
  "Richmond Hill": { image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80", insights: ["North GTA office", "Service dispatch", "Last-mile reach"], landing: "North GTA office and last-mile staging" },
  "Logistics Corridors": { image: "https://images.unsplash.com/photo-1586528116493-0fefdb7fefc0?auto=format&fit=crop&w=1600&q=80", insights: ["Route density", "Supplier reach", "First-stop performance"], landing: "Operational speed and corridor strategy" },
};

export default function MarketsPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-white px-7 py-7 shadow-luxe lg:px-10 lg:py-9">
            <div className="flex flex-wrap gap-2"><div className="eyebrow">Markets</div><span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/70">Peel • Halton • York emphasized</span></div>
            <h1 className="m-0 mt-4 max-w-[14ch] text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">GTA coverage framed through corridor performance, scarcity pressure, and commercial usefulness.</h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/70">Each market is presented according to what it actually means for occupancy, customer reach, labour access, last-mile logic, and the real operating value of Peel, Halton, York, and surrounding GTA nodes.</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" alt="GTA skyline and market coverage" className="h-full min-h-[360px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg"><div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Market lens</div><p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">The right node is part of the operating strategy, not just the address line.</p></div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless"><div className="container"><MarketIntelligenceHub /></div></section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-2">
          {MARKETS.map((market) => {
            const visual = marketVisuals[market.title] || marketVisuals["Logistics Corridors"];
            return (
              <article key={market.title} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative h-[260px] overflow-hidden"><img src={visual.image} alt={market.title} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" /><div className="absolute left-4 right-4 bottom-4 text-white"><div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/78">Regional landing</div><h2 className="m-0 mt-2 text-[1.8rem] tracking-[-0.05em] text-white">{market.title}</h2></div></div>
                <div className="p-6"><p className="m-0 text-[1rem] leading-8 text-black/68">{market.body}</p><div className="mt-4 rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-3 text-[0.98rem] leading-7 text-black/74">{visual.landing}</div><div className="mt-5 flex flex-wrap gap-2">{visual.insights.map((item) => (<span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{item}</span>))}</div><div className="mt-6 flex flex-wrap gap-3"><Link to="/listings" className="button button-secondary">View listings</Link><Link to="/tools" className="button button-secondary">Compare submarkets</Link></div></div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section"><div className="container"><ZoningAssistant /></div></section>

      <CTASection eyebrow="Apply the market lens" title="The right market should feel like part of the strategy, not just a pin on a map." body="Use the market layer to sharpen the shortlist before moving deeper into listings, tools, and the scarcity-report capture path." primaryLabel="Review Listings" primaryTo="/listings" secondaryLabel="Request Scarcity Report" secondaryTo="/contact#analysis-workflow" />
    </>
  );
}
