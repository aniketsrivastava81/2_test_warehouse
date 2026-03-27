import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Chip } from '@mui/material';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { Reveal, Stagger } from '../components/motion/Reveal';
import { JOURNEY, LISTINGS, SERVICES, SUBMARKET_SNAPSHOTS } from '../data/siteData';

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
    title: 'Investors',
    body: 'Focus on yield, downside resilience, corridor quality, and the hold thesis before chasing noise.',
    image: boardroomImage,
  },
  {
    title: 'Owner-users',
    body: 'Test control, fit, and long-term economics together before ownership starts to feel emotional.',
    image: warehouseImage,
  },
  {
    title: 'Developers',
    body: 'Screen land, use alignment, access, and timing so upside still looks real after discipline is applied.',
    image: heroImage,
  },
];

const trustStats = [
  ['Market Pulse', 'March 2026'],
  ['Coverage', 'GTA industrial + office'],
  ['Journey', 'Tools → compare → act'],
  ['Presentation', 'Premium white editorial'],
];

const testimonials = [
  {
    quote: 'The site should feel like KOLT already sharpened the brief before the first call happened.',
    source: 'Tenant representation lens',
  },
  {
    quote: 'The strongest pages are the ones that reduce ambiguity, not the ones that shout the loudest.',
    source: 'Institutional CRE tone',
  },
  {
    quote: 'A better digital experience should make the shortlist smaller, not just prettier.',
    source: 'Decision-first positioning',
  },
];

export default function HomePage() {
  const featured = useMemo(() => LISTINGS.find((item) => item.status === 'Featured') || LISTINGS[0], []);
  const servicePreview = useMemo(() => SERVICES.slice(0, 3), []);
  const marketPreview = useMemo(() => SUBMARKET_SNAPSHOTS.slice(0, 4), []);

  return (
    <>
      <section className="page-hero slim-hero !pt-10 lg:!pt-14 overflow-hidden hero-section-premium">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2.1rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-90" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-2">
                <div className="eyebrow">KOLT Realty</div>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Market Pulse · March 2026</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[10.5ch] text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.9] tracking-[-0.08em]">
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
              {trustStats.map(([label, value]) => (
                <div key={label} className="rounded-[1.6rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">{label}</div>
                  <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8 lg:pt-10">
        <div className="container">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe lg:p-8">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {trustStats.map(([label, value]) => (
                <div key={`strip-${label}`} className="rounded-[1.4rem] border border-black/6 bg-[#faf7f4] px-4 py-4">
                  <div className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{label}</div>
                  <div className="mt-2 text-[1rem] font-semibold text-black/78">{value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4 lg:pt-6">
        <div className="container grid gap-6 lg:grid-cols-[1fr_.94fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Featured opportunity</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2.2rem,4vw,4.2rem)] leading-[0.94] tracking-[-0.06em]">Show one property like it actually matters.</h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-black/68">This section gives the listings page authority before the user even gets there. The page should preview a serious opportunity, not just mention that listings exist.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                [featured.size, 'size'],
                [featured.clearHeight, 'clear'],
                [featured.zoning, 'zoning'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-[1.4rem] border border-black/6 bg-[#faf7f4] px-4 py-4">
                  <div className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{label}</div>
                  <div className="mt-1 text-[0.98rem] font-semibold text-black/78">{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to={`/listings/${featured.slug}`} className="button button-primary">View featured property</Link>
              <Link to="/listings" className="button button-secondary">Browse all listings</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src={featured.image} alt={featured.title} className="h-full min-h-[320px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{featured.location} · {featured.tag}</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">{featured.teaser}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-4 lg:pt-6">
        <div className="container">
          <Reveal className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="eyebrow">Who we serve</div>
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
            <div className="eyebrow">Services preview</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2.1rem,3vw,3.6rem)] leading-[0.95] tracking-[-0.06em]">Services, tools, and warehouse experience should all feel like one authored system.</h2>
            <div className="mt-6 grid gap-4">
              {servicePreview.map((service) => (
                <article key={service.slug} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5">
                  <h3 className="m-0 text-[1.2rem] tracking-[-0.04em]">{service.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{service.body}</p>
                </article>
              ))}
            </div>
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

      <section className="section pt-2">
        <div className="container grid gap-6 lg:grid-cols-[.95fr_1.05fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-10">
            <div className="eyebrow !text-white/70">Tools teaser</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2rem,3.2vw,3.3rem)] leading-[0.95] tracking-[-0.06em] text-white">The tools should feel like the differentiator, not an afterthought.</h2>
            <p className="mt-5 max-w-[55ch] text-[1rem] leading-8 text-white/74">Lead with a gated decision environment, stronger calculator presentation, and a path that turns raw numbers into a smarter shortlist.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Cap rate', 'Occupancy cost', 'Mortgage intelligence', 'Warehouse fit', 'Submarket comparison'].map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">{chip}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/tools" className="button button-primary">Open tools</Link>
              <Link to="/checklists" className="button button-secondary">View checklists</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Market snapshot</div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {marketPreview.map((market) => (
                <article key={market.name} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5">
                  <h3 className="m-0 text-[1.2rem] tracking-[-0.04em]">{market.name}</h3>
                  <p className="mb-0 mt-3 text-[0.95rem] leading-7 text-black/68"><strong>Best for:</strong> {market.bestFor}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {market.strengths.slice(0, 2).map((item) => (
                      <span key={item} className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/66">{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <Link to="/markets" className="button button-secondary">Explore markets</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Process steps</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">The homepage should naturally lead to the next section, not strand the user.</h2>
            <div className="mt-6 grid gap-4">
              {JOURNEY.map((step) => (
                <article key={step.step} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Step {step.step}</div>
                  <h3 className="m-0 mt-2 text-[1.2rem] tracking-[-0.04em]">{step.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{step.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-4">
            <div className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-8">
              <div className="eyebrow !text-white/70">Private Vault</div>
              <h3 className="m-0 text-[1.9rem] leading-tight tracking-[-0.05em] text-white">The best industrial conversations often begin before public inventory gets crowded.</h3>
              <p className="mb-0 mt-4 text-[0.98rem] leading-7 text-white/74">This section hints at off-market logic, pocket opportunities, and a more confidential deal flow posture without pretending to dump every deal on the page.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {testimonials.map((item) => (
                <article key={item.source} className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
                  <p className="m-0 text-[0.98rem] leading-7 text-black/70">“{item.quote}”</p>
                  <div className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{item.source}</div>
                </article>
              ))}
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
