import React from "react";
import { Link } from "react-router-dom";

const beliefs = [
  ['Strategy should come before motion', 'Not every opportunity is the right one. Better results come from understanding the objective first, then aligning property, timing, and execution around it.'],
  ['Presentation shapes perception', 'How a property is presented affects how it is understood. Better positioning and clearer communication improve decision quality.'],
  ['Commercial real estate is never one-size-fits-all', 'An owner-user requirement is not the same as an investor acquisition. Advice needs to reflect the realities of the asset and the goal behind it.'],
  ['Clarity builds confidence', 'Clearer insight creates better conversations, better filtering, and better next steps.'],
];

const steps = [
  ['01', 'Understand the objective', 'Every engagement starts with understanding what success looks like for the client.'],
  ['02', 'Assess the context', 'We look at the property, the submarket, the use case, and the broader conditions shaping the opportunity.'],
  ['03', 'Clarify the strategy', 'Once the context is clear, we help frame the most practical path forward with greater precision.'],
  ['04', 'Support the next move', 'From exploration to execution, the goal is a process that stays focused and aligned with the end objective.'],
];

const audiences = [
  ['Owners', 'Looking to position assets more effectively, evaluate options, and move with stronger market awareness.'],
  ['Investors', 'Assessing opportunity through the lens of demand, risk, upside, and long-term commercial relevance.'],
  ['Tenants', 'Searching for space that supports operations, access, visibility, customer experience, or future growth.'],
  ['Developers', 'Evaluating land, site potential, market direction, and strategic positioning within the GTA.'],
];

export default function AboutPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-5xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">About KOLT Realty</div>
            <h1 className="mt-4 max-w-[14ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Commercial real estate guidance shaped by strategy, clarity, and market awareness.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">KOLT Realty is built around a straightforward idea: commercial real estate decisions deserve sharper thinking, better presentation, and a more useful client experience from the first click to the final conversation.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#f6f3ee]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[.85fr_1.15fr] lg:px-10 lg:py-24">
          <div>
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">A more considered approach</div>
            <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">More than exposure. More than inventory.</h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-black/70">
            <p>In commercial real estate, the details matter. Site functionality, timing, market conditions, positioning, and long-term use all influence the quality of a decision. KOLT Realty approaches every opportunity with that reality in mind.</p>
            <p>We work across the Greater Toronto Area with a focus on industrial, retail, land, and selected mixed-use opportunities. Our role is not simply to place properties in front of clients. It is to help them better understand fit, uncover value, reduce friction, and move forward with clearer direction.</p>
            <p>Real estate platforms often stop at information. We believe they should go further. They should help people understand what they are seeing, why it matters, and what action makes sense next.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="border-t border-white/15 pt-5">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Mission</div>
              <p className="mt-4 text-2xl leading-9 text-white/88">To deliver a stronger commercial real estate experience through better guidance, better positioning, and better tools for decision-making.</p>
            </div>
            <div className="border-t border-white/15 pt-5">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Vision</div>
              <p className="mt-4 text-2xl leading-9 text-white/88">To help set a higher digital and strategic standard for commercial real estate in the GTA through experiences that are more informative, more engaging, and more aligned with modern decision-making.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">What we believe</div>
              <h2 className="mt-4 max-w-[10ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">The point of view behind the platform.</h2>
            </div>
            <div className="divide-y divide-black/8 border-y border-black/8">
              {beliefs.map(([title, body]) => (
                <div key={title} className="py-6">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{title}</h3>
                  <p className="mt-3 text-base leading-8 text-black/68">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map(([num, title, body]) => (
              <div key={num} className="border-t border-black/10 pt-5">
                <div className="text-sm font-semibold tracking-[0.18em] text-[#8b1e24]">{num}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 text-base leading-8 text-black/68">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Who we work with</div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Built for different commercial objectives.</h2>
          </div>
          <div className="mt-10 divide-y divide-black/8 border-y border-black/8">
            {audiences.map(([title, body]) => (
              <div key={title} className="grid gap-4 py-6 lg:grid-cols-[220px_1fr] lg:items-start">
                <div className="text-xl font-semibold tracking-[-0.03em]">{title}</div>
                <div className="text-base leading-8 text-black/68">{body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Closing statement</div>
              <h2 className="mt-4 max-w-[12ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Work with a team that takes commercial real estate seriously.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">Whether you are assessing a property, planning your next move, or looking for clearer guidance in the GTA market, KOLT Realty is ready to help.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/schedule" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Schedule a Consultation</Link>
              <Link to="/services" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">View Services</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
