import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import { ASSET_CLASSES } from "../data/siteData";

const classMeta = {
  Industrial: {
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1600&q=80",
    useCase: "Throughput, loading, storage, and operational control.",
    approach: "KOLT should screen industrial through flow, power, access, and long-term operating fit.",
  },
  Warehouse: {
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    useCase: "Inbound and outbound movement where speed and staging define the outcome.",
    approach: "KOLT should prioritize dock count, truck court logic, aisle rhythm, and dispatch performance.",
  },
  Office: {
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    useCase: "Talent attraction, client-facing confidence, and leadership convenience.",
    approach: "KOLT should weigh workplace image, access, collaboration, and effective occupancy together.",
  },
  Retail: {
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
    useCase: "Visibility, relevance, customer convenience, and parking behaviour.",
    approach: "KOLT should screen retail through the actual customer trip, not just raw traffic claims.",
  },
  "Flex / Showroom": {
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    useCase: "Customer-facing polish plus backend utility in one format.",
    approach: "KOLT should test whether presentation and operational flow coexist without compromise.",
  },
  "Land / Development": {
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
    useCase: "Future use, entitlement logic, access, and timing-sensitive upside.",
    approach: "KOLT should pressure-test land through context, alignment, corridor strength, and downside realism.",
  },
};

export default function AssetClassesPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="eyebrow">Asset Classes</div>
            <h1 className="m-0 mt-4 max-w-[11ch] text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">Asset classes explained through fit, value, and competitive advantage.</h1>
            <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/70">
              This page helps users understand why different property types solve different commercial problems, and how KOLT should evaluate them differently.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80" alt="Commercial property planning" className="h-full min-h-[360px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Framework</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">The visitor should leave knowing which asset type actually belongs in the shortlist.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-2">
          {ASSET_CLASSES.map((item) => {
            const meta = classMeta[item.title] || classMeta.Industrial;
            return (
              <article key={item.title} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
                <div className="relative h-[250px] overflow-hidden">
                  <img src={meta.image} alt={item.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/8 to-transparent" />
                  <div className="absolute left-4 right-4 bottom-4 text-white">
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/78">Asset class</div>
                    <h2 className="m-0 mt-2 text-[1.8rem] tracking-[-0.05em] text-white">{item.title}</h2>
                  </div>
                </div>
                <div className="p-6">
                  <p className="m-0 text-[1rem] leading-8 text-black/68">{item.body}</p>
                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-[1.3rem] border border-black/6 bg-[#faf7f4] px-4 py-4">
                      <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Use case</div>
                      <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{meta.useCase}</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-black/6 bg-white px-4 py-4">
                      <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">KOLT approach</div>
                      <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{meta.approach}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link to="/listings" className="button button-secondary">See matching listings</Link>
                    <Link to="/guides" className="button button-secondary">Read guides</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CTASection
        eyebrow="Use the framework"
        title="The user should leave this page with a better instinct for what type of space belongs in the shortlist."
        body="That insight makes the rest of the site more powerful, because every next click is better informed."
        primaryLabel="See Listings"
        primaryTo="/listings"
        secondaryLabel="Read Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
