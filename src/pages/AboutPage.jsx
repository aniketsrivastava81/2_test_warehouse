import React from "react";
import { Link } from "react-router-dom";

const evidence = [
  {
    title: "Pipeline mindset",
    body: "More than $2B in pipeline assets should not sit quietly inside body copy. It signals a team that studies the market in motion, tracks opportunity before it becomes obvious, and helps clients move with sharper timing and stronger positioning.",
  },
  {
    title: "United culture",
    body: "KOLT’s culture is built on collaboration, diversity, accountability, and shared execution. The strongest teams combine young-market energy with veteran closing instincts to create better market coverage, stronger judgment, and more confident execution.",
  },
  {
    title: "Industrial fluency",
    body: "KOLT speaks the language of GTA commercial real estate with precision. Zoning categories, loading ratios, industrial condo conversions, lease-audit upside, site functionality, and vacancy risk are part of how opportunities are evaluated and client interests are protected.",
  },
];

const perspectiveCards = [
  {
    title: "Consultancy-first posture",
    body: "KOLT Realty approaches commercial real estate as a capital, positioning, and execution problem to be solved properly. That means understanding the capital stack, zoning bylaws, leasing risk, vacancy exposure, and the operational realities behind each asset.",
  },
  {
    title: "Boardroom and boots-on-ground credibility",
    body: "KOLT brings together boardroom-level strategy and site-level practicality. The team is as comfortable speaking through underwriting logic, portfolio direction, and investment posture as it is discussing loading geometry, bay utility, yard constraints, and site performance.",
  },
  {
    title: "Institutional rhythm",
    body: "The firm is built to feel credible with sophisticated investors, developers, landlords, and occupiers. The page should not read like a resume. It should read like a brokerage platform shaped by operators who understand how to present, advise, and close.",
  },
  {
    title: "Diversity with execution",
    body: "A united culture matters most when it translates into sharper decisions, broader market awareness, better collaboration, and stronger negotiation posture. KOLT’s culture is built to improve outcomes, not simply describe values.",
  },
];

const lensCards = [
  {
    title: "Boardroom lens",
    body: "Capital-markets discipline stays visible above the fold because it is part of how KOLT thinks. The team understands portfolio logic, investment strategy, acquisition posture, disposition framing, and the standards expected by sophisticated commercial users.",
  },
  {
    title: "Site lens",
    body: "Commercial credibility also has to hold up on-site. KOLT understands the dirt, the loading court, the turning radius, the shipping pattern, bay utility, and the operational friction that can make or break industrial performance in the field.",
  },
];

const missionCards = [
  {
    title: "Our Mission",
    body: "To unite culture and diversity in a way that drives insight, performance, and execution across every assignment. KOLT believes strong collaboration, open communication, and multiple points of view lead to better strategy and better results.",
  },
  {
    title: "Our Philosophy",
    body: "KOLT upholds quality, integrity, and accountability in every transaction. Real estate is not only about space, pricing, and contracts. It is also about people, timing, risk, and long-term consequence, which is why every assignment is approached with discipline and clear commercial judgment.",
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

function InfoCard({ title, body, tone = "light" }) {
  const toneClasses =
    tone === "dark"
      ? "border-white/10 bg-white/5 text-white"
      : "border-black/8 bg-white text-[#161616] shadow-[0_10px_35px_rgba(0,0,0,0.05)]";

  const bodyClasses = tone === "dark" ? "text-white/72" : "text-black/72";

  return (
    <div
      className={`rounded-[28px] border p-6 lg:p-7 ${toneClasses}`}
    >
      <h3 className="text-xl font-semibold tracking-[-0.03em]">{title}</h3>
      <p className={`mt-4 text-base leading-8 ${bodyClasses}`}>{body}</p>
    </div>
  );
}

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

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="rounded-full bg-[#161616] px-6 py-3 text-sm font-semibold text-white"
              >
                Contact KOLT Realty
              </Link>
              <Link
                to="/services"
                className="rounded-full border border-black/10 px-6 py-3 text-sm font-semibold text-[#161616]"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#f6f3ee]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Positioning
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              A commercial real estate platform built to advise and execute.
            </h2>
            <p className="mt-5 max-w-4xl text-lg leading-8 text-black/72">
              KOLT Realty operates with a consultancy-first posture. It does not approach
              commercial real estate as simple deal flow. It approaches it as a capital,
              positioning, and execution problem that needs to be solved properly.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {perspectiveCards.map((item) => (
              <InfoCard key={item.title} title={item.title} body={item.body} />
            ))}
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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {evidence.map((item) => (
              <InfoCard key={item.title} title={item.title} body={item.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
              Perspective
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Credible in the boardroom and credible on-site.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {lensCards.map((item) => (
              <InfoCard key={item.title} title={item.title} body={item.body} tone="dark" />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/8 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">
              Mission and philosophy
            </div>
            <h2 className="mt-4 text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
              Culture with execution.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionCards.map((item) => (
              <InfoCard key={item.title} title={item.title} body={item.body} />
            ))}
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

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {serviceRows.map((row) => (
              <InfoCard key={row.title} title={row.title} body={row.body} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161616] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 lg:p-10">
            <div className="max-w-4xl">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">
                Closing statement
              </div>
              <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-[0.96] tracking-[-0.05em] lg:text-5xl">
                Credible in the boardroom. Credible on-site. Credible in execution.
              </h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">
                KOLT Realty strives to exceed expectations with high ethical standards,
                sharp market awareness, and smart, creative strategies designed to win strong results.
              </p>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-white/72">
                We are building a commercial real estate platform that feels credible in the boardroom,
                credible on-site, and credible where it matters most: in the quality of execution clients receive.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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