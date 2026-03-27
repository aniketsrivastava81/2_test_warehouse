import React from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { Reveal, Stagger } from '../components/motion/Reveal';

const heroImage = 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80';
const boardroomImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80';
const warehouseImage = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80';

const pillars = [
  {
    title: 'See the right path faster',
    body: 'Users should understand whether they need to lease, buy, compare, or refine before they ever start a conversation.',
  },
  {
    title: 'Use tools that change judgment',
    body: 'KOLT’s tools are meant to change decision quality, not just output numbers that look smart for a moment.',
  },
  {
    title: 'Move into opportunities with conviction',
    body: 'Listings, markets, and warehouse experiences should all feel more valuable once the user has context.',
  },
];

const audiences = [
  {
    title: 'Occupiers',
    body: 'Find space that works commercially on day one and still makes sense later.',
    image: warehouseImage,
  },
  {
    title: 'Owners and landlords',
    body: 'Position assets with stronger market logic, better presentation, and clearer leasing intent.',
    image: heroImage,
  },
  {
    title: 'Investors and owner-users',
    body: 'Pressure-test hold logic, financing posture, and downside resilience before conviction gets expensive.',
    image: boardroomImage,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="page-hero slim-hero !pt-10 lg:!pt-14 overflow-hidden hero-section-premium">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2.1rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-90" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="eyebrow">KOLT Realty</div>
              <h1 className="m-0 max-w-[10.5ch] text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.08em]">
                The GTA commercial real estate site should already make the decision easier.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[1.06rem] leading-8 text-black/70">
                KOLT should feel like the place where the user becomes clearer, sharper, and more commercially confident before any outreach begins.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/listings" className="button button-primary waves-effect waves-light small-button">View Opportunities</Link>
                <Link to="/tools" className="button button-secondary waves-effect small-button">Open Tools</Link>
              </div>
              <Stagger className="mt-8 grid gap-3 md:grid-cols-3">
                {pillars.map((pillar) => (
                  <motion.article key={pillar.title} variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0} }} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <h3 className="m-0 text-[1.15rem] leading-tight tracking-[-0.04em]">{pillar.title}</h3>
                    <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/66">{pillar.body}</p>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="relative min-h-[450px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-luxe">
              <img src={heroImage} alt="Modern commercial office interior" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">KOLT advantage</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#151515]">Guide users through the journey instead of listing everything at them.</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">Value</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">The site should hint that KOLT holds better checklists, better screening logic, and the missing decision framework.</p>
              </div>
              <div className="rounded-[1.6rem] border border-[#b01f24]/12 bg-[#f9f1ef] px-5 py-5 shadow-[0_18px_50px_rgba(176,31,36,0.08)]">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Feel</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">Alive, tactile, premium, and intentionally authored — not generic brokerage filler.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8 lg:pt-10">
        <div className="container">
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="eyebrow">Who it is for</div>
              <h2 className="m-0 max-w-[11ch] text-[clamp(2.2rem,4vw,4.2rem)] leading-[0.94] tracking-[-0.06em]">Every audience should instantly find their lane.</h2>
            </div>
            <p className="max-w-[44rem] text-[1rem] leading-8 text-black/68">The homepage should feel like a guided start point into services, tools, and opportunities rather than a brochure that asks the user to do all the work.</p>
          </Reveal>
          <Stagger className="mt-7 grid gap-6 lg:grid-cols-3">
            {audiences.map((audience) => (
              <motion.article key={audience.title} variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0} }} className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
                <div className="relative h-[270px] overflow-hidden">
                  <img src={audience.image} alt={audience.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="m-0 text-[1.5rem] tracking-[-0.04em]">{audience.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{audience.body}</p>
                </div>
              </motion.article>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[1fr_.94fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Connected layers</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2.1rem,3vw,3.6rem)] leading-[0.95] tracking-[-0.06em]">Services, tools, and warehouse experience should all feel like one authored system.</h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-black/68">That means stronger section choreography, better imagery, micro motion, and a more premium content rhythm across the entire site.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Guided conversion', 'Premium white direction', 'Interactive tools', 'Warehouse brand layer'].map((chip) => (
                <Chip key={chip} label={chip} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src={warehouseImage} alt="Industrial warehouse corridor" className="h-full min-h-[320px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Interactive layer</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">The warehouse experience is there to deepen intent, not feel like a disconnected toy.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Once the page has oriented the user, every next click should feel more valuable."
        body="Move into services, tools, and listings with clearer decision logic and stronger commercial confidence."
        primaryLabel="Explore Services"
        primaryTo="/services"
        secondaryLabel="Open Tools"
        secondaryTo="/tools"
      />
    </>
  );
}
