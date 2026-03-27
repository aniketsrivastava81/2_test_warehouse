import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import VideoTestimonials from "../components/VideoTestimonials";

const stats = [
  ["Heavyweight belt", "$1B+ sales volume"],
  ["Combined expertise", "200+ years"],
  ["Pipeline", "$2B+ assets"],
  ["Corridor focus", "Peel • Halton • York"],
];

const consultancyPillars = [
  {
    title: "Consultancy-first posture",
    body: "The page should sound like a fiduciary partner who understands the capital stack, zoning bylaws, leasing risk, and the true cost of vacancy.",
  },
  {
    title: "Boardroom and boots-on-ground credibility",
    body: "KOLT has to look equally believable in a suit under a cap-rate model and in high-vis gear on an active industrial site.",
  },
  {
    title: "Institutional rhythm",
    body: "This page needed to stop feeling like a resume and start feeling like a pitch deck written by operators who know how to close.",
  },
  {
    title: "Diversity with execution",
    body: "A united culture matters most when it translates into sharper decisions, better market coverage, and stronger negotiation posture.",
  },
];

const visuals = [
  {
    kicker: "Boardroom lens",
    title: "Capital-markets discipline stays visible above the fold.",
    body: "Use polished boardroom visuals to show investors and developers that KOLT can speak underwriting, portfolio strategy, and pipeline logic with confidence.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
  },
  {
    kicker: "Site lens",
    title: "Then prove the same team understands the dirt, loading courts, and operational realities.",
    body: "High-vis, on-site imagery reinforces that KOLT understands truck movement, bay utility, yard constraints, and how industrial product really performs in the field.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
  },
];

const philosophy = [
  "Velocity matters, but only when it is paired with disciplined underwriting.",
  "Variety matters, but only when every opportunity is framed through local market intelligence.",
  "Pipeline is a power word because it signals continuity, deal flow, and investor-grade visibility into what comes next.",
  "The goal is to turn industrial space from a line-item expense into a high-performance asset.",
];

const cultureCards = [
  {
    title: "Pipeline mindset",
    body: "$2B+ in pipeline assets should not hide in body copy. It should read like evidence that KOLT sees the market in motion, not just after it posts online.",
  },
  {
    title: "United culture",
    body: "The strongest teams mix young-market energy with veteran closing instincts. That dual-lens approach should feel obvious in the pacing and visual hierarchy.",
  },
  {
    title: "Industrial fluency",
    body: "Talk openly about E2 / E3 zoning, loading ratios, industrial condo conversions, and lease-audit upside so the page sounds like it belongs in GTA CRE.",
  },
];

export default function AboutPage() {
  return (
    <div className="premium-page-scroll premium-story-page">
      <section className="page-hero slim-hero premium-story-hero premium-story-hero--dark about-hero-upgrade">
        <div className="container premium-story-hero__grid">
          <div className="premium-story-hero__main about-hero-main">
            <div className="eyebrow">About KOLT Realty</div>
            <h1>Asset-advisory positioning for the GTA’s industrial landscape.</h1>
            <p className="about-lead-quote">“In the GTA’s industrial landscape, data is the only currency that matters.”</p>
            <p>
              Megha Mehta does not just list warehouses; she engineers high-yield real estate strategies for institutional investors and owner-users across the Golden Horseshoe.
              With a focus on Peel, Halton, and York, the advisory lens here is last-mile logistics optimization, off-market asset acquisition, industrial condo conversions,
              and disciplined DCF-backed judgment that turns industrial space into a higher-performance asset.
            </p>
            <div className="premium-story-kpis about-kpi-grid">
              {stats.map(([label, value]) => (
                <article key={label}><small>{label}</small><strong>{value}</strong></article>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listings" className="button button-primary">Review opportunities</Link>
              <Link to="/contact#analysis-workflow" className="button button-secondary">Request scarcity report</Link>
            </div>
          </div>

          <div className="premium-story-hero__rail">
            {consultancyPillars.map((item, index) => (
              <motion.article whileHover={{ y: -6 }} key={item.title} className="premium-story-hover-card institutional-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
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
          <a href="#about-boardroom-site">Boardroom to site</a>
          <a href="#about-philosophy">KOLT philosophy</a>
          <a href="#about-culture">Team and culture</a>
        </div>
      </section>

      <section className="section premium-story-band" id="about-boardroom-site">
        <div className="container grid gap-6 lg:grid-cols-2 items-stretch">
          {visuals.map((item) => (
            <article key={item.title} className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-luxe">
              <div className="overflow-hidden rounded-[1.4rem]">
                <img src={item.image} alt={item.title} className="h-[280px] w-full object-cover" />
              </div>
              <div className="mt-5 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{item.kicker}</div>
              <h2 className="m-0 mt-2 text-[1.8rem] leading-tight tracking-[-0.05em]">{item.title}</h2>
              <p className="mb-0 mt-3 text-[1rem] leading-8 text-black/72">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft-borderless" id="about-philosophy">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-10">
            <div className="eyebrow !text-white/70">KOLT philosophy</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2rem,3vw,3.5rem)] leading-[0.95] tracking-[-0.06em] text-white">The mission is not to look premium. It is to make the mandate stronger.</h2>
            <p className="mt-5 max-w-[56ch] text-[1rem] leading-8 text-white/74">Backed by dynamic analysts and seasoned market veterans, the platform should feel quick enough for rapid-fire opportunities and disciplined enough for a $20M industrial land conversation.</p>
            <div className="mt-6 grid gap-3">
              {philosophy.map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/12 bg-white/8 px-4 py-4 text-[0.98rem] leading-7 text-white/80">{item}</div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            {cultureCards.map((card) => (
              <article key={card.title} className="rounded-[1.6rem] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.07)] institutional-card">
                <div className="institutional-card__icon" aria-hidden="true" />
                <h3 className="m-0 text-[1.25rem] tracking-[-0.04em]">{card.title}</h3>
                <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="about-culture">
        <div className="container premium-principles-grid">
          {[
            'Institutional tone over generic biography formatting.',
            'Sharper hierarchy so the most powerful numbers land first.',
            'On-site and boardroom visuals proving both dirt and deal fluency.',
            'A clearer bridge from about-page trust into inventory, tools, and direct inquiry.',
          ].map((item) => (
            <article key={item}><strong>{item}</strong></article>
          ))}
        </div>
      </section>

      <VideoTestimonials />

      <CTASection eyebrow="Continue the mandate" title="The strongest About page should make the next click feel more inevitable." body="Move from team credibility into services, listings, and the scarcity-report capture path without losing the institutional tone." primaryLabel="Explore Services" primaryTo="/services" secondaryLabel="Open Listings" secondaryTo="/listings" />
    </div>
  );
}
