import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { Reveal } from '../components/motion/Reveal';

const evaluationPoints = [
  'Circulation flow and aisle logic',
  'Loading practicality and staging behavior',
  'Operational fit before physical tours',
  'How the asset feels when framed as a real workflow',
];

const supportCards = [
  {
    title: 'Brand-native presentation',
    body: 'The interactive layer now reads like part of the KOLT experience instead of a detached demo.',
  },
  {
    title: 'Practical client value',
    body: 'Users can understand movement, scale, and usability faster than they can through still images alone.',
  },
  {
    title: 'Better conversion posture',
    body: 'Once users visualize the asset more clearly, the next click becomes easier to earn.',
  },
];

export default function WarehousePage() {
  return (
    <>
      <section className="page-hero slim-hero warehouse-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="eyebrow">Warehouse Demo</div>
              <h1 className="m-0 max-w-[10ch] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.07em]">See the asset as an operating environment, not just a listing page.</h1>
              <p className="mt-5 max-w-[58ch] text-[1.04rem] leading-8 text-black/70">
                This experience exists to help industrial users judge flow, usability, and overall fit faster than static marketing ever could.
              </p>
              <div className="warehouse-hero-points mt-6 flex flex-wrap gap-3">
                {evaluationPoints.map((point) => (
                  <span key={point} className="rounded-full border border-black/8 bg-white px-4 py-2 text-sm text-black/70 shadow-[0_10px_25px_rgba(17,17,17,0.05)]">{point}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" alt="Industrial warehouse interior" className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 right-4 bottom-4 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">KOLT branded environment</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">The warehouse should feel embedded into the brand — not like a random iframe dropped into the page.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container">
          <div className="warehouse-intro-panel">
            <div>
              <div className="eyebrow">Interactive review</div>
              <h2>Use the environment to evaluate what brochures usually hide.</h2>
            </div>
            <p>
              The goal is simple: make users feel more certain about the space before they invest time in deeper diligence.
            </p>
          </div>

          <div className="warehouse-frame-wrap frame-large warehouse-frame-premium relative overflow-hidden">
            <div className="absolute left-5 top-5 z-10 rounded-full border border-white/20 bg-[#151515]/82 px-4 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-lg">KOLT Realty · Interactive warehouse intelligence</div>
            <iframe className="warehouse-frame" src="/warehouse.html" title="KOLT warehouse walkthrough" loading="eager"></iframe>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container warehouse-support-grid grid gap-6 lg:grid-cols-3">
          {supportCards.map((card) => (
            <motion.article whileHover={{ y: -6 }} key={card.title} className="warehouse-support-card rounded-[1.8rem] border border-black/5 bg-white p-6 shadow-luxe">
              <h3 className="m-0 text-[1.35rem] tracking-[-0.04em]">{card.title}</h3>
              <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container warehouse-bridge-panel rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Next step</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">Move from visual confidence into active opportunities.</h2>
          </div>
          <div className="warehouse-bridge-actions mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Link className="button button-primary" to="/listings">View opportunities</Link>
            <Link className="button button-secondary" to="/listing-type-2">Open interactive showcase</Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="Interactive proof works best when it stays inside the main conversion path."
        body="This page keeps the warehouse layer branded, intentional, and commercially useful instead of feeling like a side experiment."
        primaryLabel="Open Listing Type 2"
        primaryTo="/listing-type-2"
        secondaryLabel="Back to Home"
        secondaryTo="/"
      />
    </>
  );
}
