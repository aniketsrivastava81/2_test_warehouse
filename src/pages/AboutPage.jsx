import React from "react";
import { Link } from "react-router-dom";

const evidence = [
  {
    title: "Pipeline mindset",
    body: "More than $2B in pipeline assets should not sit quietly inside body copy. It speaks to a team that studies the market in motion, tracks opportunity before it becomes obvious, and understands how to position clients ahead of slower competitors.",
  },
  {
    title: "United culture",
    body: "KOLT’s culture is built on collaboration, diversity, accountability, and shared execution. We believe the strongest teams combine young-market energy with veteran closing instincts, creating better market coverage, sharper decisions, and a stronger posture in front of clients and counterparties.",
  },
  {
    title: "Industrial fluency",
    body: "We speak the language of GTA commercial real estate with precision. Zoning categories, loading ratios, industrial condo conversions, lease audit upside, site functionality, and vacancy risk are not side notes here. They are part of how we evaluate opportunities and how we protect client interests.",
  },
];

const serviceRows = [
  {
    title: "Investment Services & Leasing",
    body: "We advise on acquisitions, dispositions, leasing strategy, and commercial positioning across industrial, business, retail, and multi-family opportunities with a disciplined investment lens.",
  },
  {
    title: "Tenant Representation",
    body: "We support landlords and tenants through tailored leasing strategies built around real property requirements, market conditions, operational fit, and negotiation leverage.",
  },
  {
    title: "Advisory",
    body: "We deliver market insight, scrutiny, and strategic guidance that helps clients evaluate opportunity, reduce blind spots, and move with greater confidence.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-6xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              About KOLT Realty
            </div>
            <h1 className="mt-4 max-w-[12ch] text-5xl font-semibold leading-[0.9] tracking-[-0.06em] lg:text-7xl">
              Driven, informed, and built to execute in motion.
            </h1>
            <p className="mt-6 max-w-4xl text-lg leading-8 text-black/72 lg:text-xl">
              KOLT Realty is a GTA commercial real estate brokerage built for landlords,
              tenants, investors, developers, and owner-users who expect sharper thinking,
              stronger execution, and market fluency that goes beyond what is publicly posted online.
            </p>
            <p className="mt-4 max-w-4xl text-lg leading-8 text-black/72">
              We pair entrepreneurial urgency with disciplined advisory thinking to help clients
              move through industrial, retail, land, and investment decisions with more clarity,
              better positioning, and stronger outcomes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#f6f3ee]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.78fr_1.22fr] lg:px-10 lg:py-24">
          <div>
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Consultancy-first posture
            </div>
            <h2 className="mt-4 max-w-[10ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Built to advise before the market catches up.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-8 text-black/72">
            <p>
              KOLT Realty operates with a consultancy-first posture. We do not approach commercial
              real estate as simple deal flow. We approach it as a capital, positioning, and execution
              problem that needs to be solved properly.
            </p>
            <p>
              That means understanding the capital stack, zoning bylaws, leasing risk, vacancy exposure,
              industrial functionality, and the operational realities behind each property. It also means
              staying close enough to the market to see motion early, not just after it shows up on a listing feed.
            </p>
            <p>
              Our team brings together boardroom-level strategy and boots-on-the-ground credibility. We are as
              comfortable speaking through underwriting logic, portfolio direction, pipeline assets, and investment
              posture as we are discussing loading geometry, bay utility, industrial condo conversion logic, yard
              constraints, and site-level performance.
            </p>
            <p>
              That dual-lens approach shapes how we advise, how we position opportunities, and how we negotiate.
              It gives clients a team that can think like operators, present like advisors, and execute like
              professionals who understand that commercial real estate is won in both the analysis and the field.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Market evidence
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credibility should read clearly on the page.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-black/8 border-y border-black/8">
            {evidence.map((item) => (
              <div
                key={item.title}
                className="grid gap-4 py-6 lg:grid-cols-[280px_1fr] lg:gap-8 lg:py-8"
              >
                <div className="text-xl font-semibold tracking-[-0.03em]">{item.title}</div>
                <p className="text-base leading-8 text-black/72 lg:text-lg">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border-t border-white/15 pt-5">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Boardroom lens
              </div>
              <p className="mt-5 text-2xl leading-9 text-white/88">
                Capital-markets discipline stays visible above the fold because it is part of how KOLT thinks.
              </p>
              <p className="mt-5 text-base leading-8 text-white/70">
                We understand portfolio logic, investment strategy, acquisition posture, disposition framing,
                and the decision-making standards expected by investors, developers, and sophisticated commercial users.
              </p>
              <p className="mt-4 text-base leading-8 text-white/70">
                We do not just market property. We help clients interpret opportunity through the language of
                returns, positioning, timing, and downside protection.
              </p>
            </div>

            <div className="border-t border-white/15 pt-5">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Site lens
              </div>
              <p className="mt-5 text-2xl leading-9 text-white/88">
                Commercial credibility also has to hold up at property level.
              </p>
              <p className="mt-5 text-base leading-8 text-white/70">
                KOLT understands the dirt, the loading court, the turning radius, the shipping pattern,
                the utility of a bay, and the operational friction that can make or break industrial performance
                in the field.
              </p>
              <p className="mt-4 text-base leading-8 text-white/70">
                That site-level awareness matters because a polished pitch means little if the team cannot read
                how the asset actually works once boots hit the ground.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
                Mission and philosophy
              </div>
              <h2 className="mt-4 max-w-[10ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
                Culture with execution.
              </h2>
            </div>

            <div className="space-y-10">
              <div className="border-t border-black/10 pt-5">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">Our Mission</h3>
                <p className="mt-4 text-base leading-8 text-black/72 lg:text-lg">
                  To unite culture and diversity in a way that drives insight, performance, and execution
                  across every assignment.
                </p>
                <p className="mt-4 text-base leading-8 text-black/72 lg:text-lg">
                  We believe open communication, strong collaboration, and multiple points of view produce
                  better strategy and better results. Our clients can expect a team of high-caliber professionals
                  who uphold integrity, think creatively, and operate with a clear commitment to service excellence.
                </p>
              </div>

              <div className="border-t border-black/10 pt-5">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">Our Philosophy</h3>
                <p className="mt-4 text-base leading-8 text-black/72 lg:text-lg">
                  We uphold quality, integrity, and accountability in every transaction. Our role is to serve the
                  client’s best interests with discipline, respect, and clear commercial judgment.
                </p>
                <p className="mt-4 text-base leading-8 text-black/72 lg:text-lg">
                  Real estate is not only about space, pricing, and contracts. It is about people, timing, risk,
                  and long-term consequence. That is why we work to understand the full picture, communicate clearly,
                  and execute with consistency from first conversation to final outcome.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              What we do
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Commercial strategy backed by execution.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-black/8 border-y border-black/8">
            {serviceRows.map((row) => (
              <div
                key={row.title}
                className="grid gap-4 py-6 lg:grid-cols-[320px_1fr] lg:gap-8 lg:py-8"
              >
                <div className="text-xl font-semibold tracking-[-0.03em]">{row.title}</div>
                <p className="text-base leading-8 text-black/72 lg:text-lg">{row.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Closing statement
              </div>
              <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
                Credible in the boardroom. Credible on-site. Credible in execution.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                KOLT Realty strives to exceed expectations with high ethical standards, sharp market awareness,
                and smart, creative strategies designed to win strong results.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">
                We are building a commercial real estate platform that feels credible in the boardroom,
                credible on-site, and credible where it matters most: in the quality of execution clients receive.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black"
              >
                Contact KOLT Realty
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}