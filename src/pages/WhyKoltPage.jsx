import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";

const differentiators = [
  { title: "The site does the filtering before the call", body: "Users should arrive already clearer on fit, timing, market choice, and the real tradeoffs shaping the move." },
  { title: "Commercial usefulness beats generic polish", body: "Every section is designed to give the visitor a sharper shortlist, a better comparison, or a stronger decision frame." },
  { title: "The journey compounds confidence", body: "Listings lead into tools. Tools reinforce guides. Guides push users back into the market with more conviction." },
  { title: "KOLT earns trust by being more useful", body: "The strongest differentiator is helping the user see more than the market, not simply saying more than the market." },
];

const path = [
  { step: "01", title: "Clarify the requirement", body: "The site should help the user define what actually matters before the search becomes visual noise." },
  { step: "02", title: "Pressure-test through tools and markets", body: "The user gains a stronger frame through calculators, maps, hotspots, and practical GTA context." },
  { step: "03", title: "Convert from confidence", body: "Inquiry quality improves because the next step feels commercially grounded rather than impulsive." },
];

const outcomes = [
  "Better quality inquiries because users have already self-qualified their need.",
  "Longer time on site because each page naturally creates a reason for the next click.",
  "Stronger brand memory because the experience feels more valuable than a listing portal.",
  "Higher conversion intent because uncertainty is reduced before outreach begins.",
];

export default function WhyKoltPage() {
  return (
    <div className="premium-page-scroll premium-story-page">
      <section className="page-hero slim-hero premium-story-hero premium-story-hero--dark">
        <div className="container premium-story-hero__grid">
          <div className="premium-story-hero__main">
            <div className="eyebrow">Why KOLT</div>
            <h1>The advantage is not more information. It is better organized judgment.</h1>
            <p>KOLT is built to feel like the commercial real estate site that finally respects how serious users actually make decisions.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listings" className="button button-primary">Browse listings</Link>
              <Link to="/tools" className="button button-secondary">Open tools</Link>
            </div>
          </div>
          <div className="premium-story-hero__rail premium-story-hero__rail--compact">
            {differentiators.slice(0, 2).map((item, index) => (
              <motion.article whileHover={{ y: -6 }} key={item.title} className="premium-story-hover-card premium-story-hover-card--accent" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * index }}>
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
          <a href="#why-path">How it works</a>
          <a href="#why-outcomes">Outcomes</a>
        </div>
      </section>

      <section className="section" id="why-proof">
        <div className="container premium-proof-grid">
          {differentiators.map((item) => (
            <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>
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
        <div className="container premium-outcomes-grid">
          {outcomes.map((item) => (
            <article key={item}><p>{item}</p></article>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Put it to work" title="The differentiator only matters if the user can feel it in the next click." body="Move into listings, tools, and guides that prove the positioning through real commercial usefulness." primaryLabel="Browse Listings" primaryTo="/listings" secondaryLabel="Open Checklists" secondaryTo="/checklists" />
    </div>
  );
}
