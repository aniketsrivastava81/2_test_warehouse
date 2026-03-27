import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import { MARKETS } from "../data/siteData";

const marketVisuals = {
  "Toronto Core": {
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1600&q=80",
    insights: ["Executive image", "Transit-led access", "Premium client experience"],
    useCases: ["HQ office", "Client-facing teams", "Leadership hubs"],
  },
  Mississauga: {
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    insights: ["Airport proximity", "Western GTA labour depth", "Regional distribution logic"],
    useCases: ["Logistics", "Airport-linked users", "Service fleets"],
  },
  Brampton: {
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=1600&q=80",
    insights: ["Relative value", "Industrial utility", "Trucking adjacency"],
    useCases: ["Trade users", "Distribution", "Industrial condos"],
  },
  Vaughan: {
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=80",
    insights: ["Customer accessibility", "400-series linkage", "Flex/showroom fit"],
    useCases: ["Flex industrial", "Showrooms", "Mixed-use occupiers"],
  },
  "Richmond Hill": {
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=80",
    insights: ["North GTA talent access", "Scalable office posture", "Last-mile coverage"],
    useCases: ["Regional offices", "Service dispatch", "Growth-stage teams"],
  },
  "Logistics Corridors": {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    insights: ["Route density", "Supplier reach", "First-stop performance"],
    useCases: ["Warehousing", "Distribution", "Service coverage"],
  },
};

export default function MarketsPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="flex flex-wrap gap-2">
              <div className="eyebrow">Markets</div>
              <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Clickable GTA regions</span>
            </div>
            <h1 className="m-0 mt-4 max-w-[11ch] text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">
              GTA coverage framed through commercial usefulness, not empty geography.
            </h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/70">
              Each market is presented according to what it actually means for occupancy, customer reach, labour access, and operational fit.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80" alt="GTA skyline" className="h-full min-h-[360px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Market lens</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">The right node is part of the operating strategy, not just the address line.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-2">
          {MARKETS.map((market) => {
            const visual = marketVisuals[market.title] || marketVisuals["Logistics Corridors"];
            return (
              <article key={market.title} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative h-[260px] overflow-hidden">
                  <img src={visual.image} alt={market.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4 text-white">
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/78">GTA region</div>
                    <h2 className="m-0 mt-2 text-[1.8rem] tracking-[-0.05em] text-white">{market.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="m-0 text-[1rem] leading-8 text-black/68">{market.body}</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div>
                      <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Key insights</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {visual.insights.map((item) => (
                          <span key={item} className="rounded-full border border-black/8 bg-[#faf7f4] px-3 py-2 text-sm text-black/68">{item}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Typical use cases</div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {visual.useCases.map((item) => (
                          <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/listings" className="button button-secondary">View listings</Link>
                    <Link to="/tools" className="button button-secondary">Compare submarkets</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection
        eyebrow="Apply the market lens"
        title="The right market should feel like part of the strategy, not just a pin on a map."
        body="Use the market layer to sharpen the shortlist before moving deeper into listings and tools."
        primaryLabel="Review Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Asset Classes"
        secondaryTo="/asset-classes"
      />
    </>
  );
}
