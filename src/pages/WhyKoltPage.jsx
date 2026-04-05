import React from "react";
import { Link } from "react-router-dom";

const manifesto = [
  'Clarity over clutter.',
  'Strategy over assumption.',
  'Presentation with purpose.',
  'Experience that supports action.',
];

const comparisons = [
  ['Generic CRE experience', 'Basic exposure, fragmented information, passive browsing, and weaker digital context.'],
  ['KOLT approach', 'Sharper positioning, clearer guidance, stronger user journeys, and more useful ways to understand opportunity.'],
];

const values = [
  ['Clearer opportunity assessment', 'Commercial opportunities are evaluated with better context around fit, use, market conditions, and long-term relevance.'],
  ['Stronger asset positioning', 'Owners and stakeholders can present properties more effectively through sharper framing and stronger digital communication.'],
  ['Better pre-conversation alignment', 'Stronger online framing leads to more informed inquiries and more productive conversations earlier in the process.'],
  ['A more modern user experience', 'The online experience is designed to move users from curiosity to clarity with less friction and more confidence.'],
];

const audiences = [
  ['Owners', 'Because asset positioning, presentation, and market understanding all influence the quality of attention a property receives.'],
  ['Investors', 'Because good acquisitions start with disciplined filtering, sharper context, and a clearer read on opportunity and risk.'],
  ['Tenants', 'Because the right space needs to support operations, access, visibility, cost structure, and long-term plans.'],
  ['Developers', 'Because land and development opportunities require a broader strategic view of location, scarcity, growth, and future potential.'],
];

export default function WhyKoltPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/6 bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-5xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Why KOLT Realty</div>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Because commercial real estate decisions deserve more than basic exposure.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72">KOLT Realty is built for clients who want clearer guidance, stronger positioning, and a more modern way to evaluate commercial real estate opportunities across the Greater Toronto Area.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Manifesto</div>
              <h2 className="mt-4 max-w-[11ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">A better commercial real estate experience starts with better thinking.</h2>
            </div>
            <div className="space-y-5">
              <p className="text-lg leading-8 text-black/70">In commercial real estate, outcomes are shaped by more than access alone. The quality of the decision depends on context, timing, positioning, market awareness, and how well an opportunity is understood before action is taken.</p>
              <div className="grid gap-3 md:grid-cols-2">
                {manifesto.map((item) => <div key={item} className="border-t border-black/10 pt-4 text-lg font-medium">{item}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">The difference</div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Not just what KOLT shows. How KOLT helps clients think.</h2>
          </div>
          <div className="mt-10 divide-y divide-black/8 border-y border-black/8 bg-transparent">
            {comparisons.map(([title, body]) => (
              <div key={title} className="grid gap-4 py-6 lg:grid-cols-[260px_1fr]">
                <div className="text-xl font-semibold tracking-[-0.03em]">{title}</div>
                <div className="text-base leading-8 text-black/68">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="space-y-0 divide-y divide-black/8 border-y border-black/8">
            {values.map(([title, body]) => (
              <div key={title} className="grid gap-4 py-8 lg:grid-cols-[320px_1fr]">
                <div className="text-2xl font-semibold tracking-[-0.03em]">{title}</div>
                <div className="text-base leading-8 text-black/68">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#161616] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1fr_.9fr] lg:px-10 lg:py-20 lg:items-center">
          <div>
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Digital proof layer</div>
            <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Some properties need more than static media.</h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">That is why KOLT Realty is investing in interactive digital experiences that help users better understand layout, scale, flow, and potential before a site visit ever takes place.</p>
            <Link to="/listing-type-2" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white">View Interactive Warehouse Experience <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-white/10 min-h-[340px]">
            <img src="https://images.unsplash.com/photo-1586528116493-0fefdb7fefc0?auto=format&fit=crop&w=1600&q=80" alt="Warehouse experience preview" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Who chooses KOLT</div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Different stakeholders. Same need for better clarity.</h2>
          </div>
          <div className="mt-10 divide-y divide-black/8 border-y border-black/8">
            {audiences.map(([title, body]) => (
              <div key={title} className="grid gap-4 py-6 lg:grid-cols-[220px_1fr]">
                <div className="text-xl font-semibold tracking-[-0.03em]">{title}</div>
                <div className="text-base leading-8 text-black/68">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Closing CTA</div>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Choose a commercial real estate experience built around clarity.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-black/70">If you are looking for sharper guidance, stronger positioning, and a more useful way to navigate commercial property opportunities in the GTA, KOLT Realty is ready to help.</p>
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
