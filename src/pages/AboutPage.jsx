import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import VideoTestimonials from "../components/VideoTestimonials";
import { SITE } from "../config/site";

const pillars = [
  { title: "Clarity over noise", body: "The brand is built for users who do not need more listings. They need sharper filters, cleaner tradeoffs, and stronger decision confidence." },
  { title: "Commercial logic first", body: "Every page, tool, and content block exists to improve judgment around cost, timing, leverage, loading, labour, and future utility across the GTA." },
  { title: "Trust earned through usefulness", body: "KOLT earns attention by being more useful on-site than most firms are before the first call." },
  { title: "A stronger user journey", body: "The site is designed to guide the visitor from requirement to shortlist to action without falling into dead-end brochure pages." },
];

const chapters = [
  {
    kicker: "Positioning",
    title: "KOLT should feel editorial, strategic, and commercially literate from the first fold.",
    body: "This page was rebuilt to avoid the static-card look. It now reads more like a premium narrative with stronger hierarchy, motion, and alternating image/text pacing.",
    points: ["Sharper card uniformity", "Alternating layout rhythm", "More premium hover / depth cues"],
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
  },
  {
    kicker: "What users should feel",
    title: "The right next step should feel easier after this page, not less clear.",
    body: "The about experience now carries the user into services, markets, tools, and contact through deliberate pathways rather than decorative blocks.",
    points: ["More scroll rhythm", "Less dead space", "Clearer visual sequence"],
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80",
  },
  {
    kicker: "Brand role",
    title: "In commercial real estate, the firm that organizes the decision often wins the mandate.",
    body: `${SITE.brandName} is designed to become the place users return to when the market gets harder, not because it says more, but because it helps them see more.`,
    points: ["Decision-first tone", "Useful frameworks", "Clear return path into contact"],
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1600&q=80",
  },
];

const principles = [
  "Lead with the real requirement, not the broad search.",
  "Show the tradeoff before the user discovers it the hard way.",
  "Make every page useful enough to be saved, shared, or revisited.",
  "Treat clarity as the brand asset that compounds trust.",
];

export default function AboutPage() {
  return (
    <div className="premium-page-scroll premium-story-page">
      <section className="page-hero slim-hero premium-story-hero">
        <div className="container premium-story-hero__grid">
          <div className="premium-story-hero__main">
            <div className="eyebrow">About KOLT Realty</div>
            <h1>A commercial real estate platform designed to make better decisions feel inevitable.</h1>
            <p>{SITE.description} The rebuilt page now feels more cinematic, more deliberate, and far less like a dead brochure section.</p>
            <div className="hero-proof-row mt-6">
              <span className="proof-chip">Editorial rhythm</span>
              <span className="proof-chip">Stronger hover states</span>
              <span className="proof-chip">Uniform card placement</span>
            </div>
            <div className="premium-story-kpis">
              <article><small>Brand mode</small><strong>Premium and useful</strong></article>
              <article><small>User feeling</small><strong>Less generic, more guided</strong></article>
              <article><small>Conversion role</small><strong>Bridge into services and contact</strong></article>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/services" className="button button-primary">Explore services</Link>
              <Link to="/why-kolt" className="button button-secondary">Why KOLT</Link>
            </div>
          </div>

          <div className="premium-story-hero__rail">
            {pillars.map((item, index) => (
              <motion.article whileHover={{ y: -6 }} key={item.title} className="premium-story-hover-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section premium-story-nav-wrap">
        <div className="container premium-story-nav">
          <a href="#about-chapter-1">Positioning</a>
          <a href="#about-chapter-2">User feeling</a>
          <a href="#about-chapter-3">Brand role</a>
          <a href="#about-principles">Principles</a>
        </div>
      </section>

      {chapters.map((chapter, index) => (
        <section key={chapter.title} id={`about-chapter-${index + 1}`} className="section premium-story-band">
          <div className={`container premium-story-band__grid ${index % 2 === 1 ? "is-reversed" : ""}`}>
            <div className="premium-story-band__visual">
              <img src={chapter.image} alt={chapter.title} />
            </div>
            <div className="premium-story-band__content">
              <div className="eyebrow">{chapter.kicker}</div>
              <h2>{chapter.title}</h2>
              <p>{chapter.body}</p>
              <div className="premium-story-points">
                {chapter.points.map((point) => (<span key={point}>{point}</span>))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section" id="about-principles">
        <div className="container premium-principles-grid">
          {principles.map((item) => (
            <article key={item}><strong>{item}</strong></article>
          ))}
        </div>
      </section>

      <VideoTestimonials />

      <CTASection eyebrow="Continue the journey" title="The strongest brand story is not told in one page. It is proven across the next one." body="Move from positioning into service paths, market logic, and tools that continue to build confidence without wasting the user's time." primaryLabel="Explore Services" primaryTo="/services" secondaryLabel="Review Markets" secondaryTo="/markets" />
    </div>
  );
}
