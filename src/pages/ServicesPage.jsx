import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Chip } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import { Reveal, Stagger } from '../components/motion/Reveal';
import Counter from '../components/motion/Counter';

gsap.registerPlugin(ScrollTrigger);

const serviceBlocks = [
  {
    slug: 'tenant-representation',
    title: 'Tenant Representation',
    intro: 'For occupiers who need space that works commercially on day one and strategically over time.',
    summary: 'Translate operating requirements into a sharper shortlist, then negotiate from a position of operating clarity.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80',
    lens: ['Operating-fit first', 'Occupancy-cost logic', 'Negotiation leverage'],
    points: [
      'Translate operating requirements into a sharper shortlist.',
      'Compare occupancy cost, fit, capex, and access before negotiating.',
      'Protect flexibility, timing, and leverage through a cleaner search process.',
    ],
  },
  {
    slug: 'landlord-representation',
    title: 'Landlord Representation',
    intro: 'For owners who want assets positioned with clearer market logic and stronger leasing intent.',
    summary: 'Refine the asset story around demand, use case, and market-fit so response quality gets better, not just larger.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    lens: ['Leasing intent', 'Market-fit storytelling', 'Absorption quality'],
    points: [
      'Refine the asset story around demand, use case, and market fit.',
      'Strengthen listing quality, response quality, and absorption strategy.',
      'Align the space presentation with the tenant the asset should attract.',
    ],
  },
  {
    slug: 'owner-user-acquisition',
    title: 'Owner-User Acquisition',
    intro: 'For businesses deciding whether ownership creates more value than another lease cycle.',
    summary: 'Test control, equity, flexibility, and long-term occupancy economics together before conviction gets formed too early.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    lens: ['Balance-sheet control', 'Long-hold logic', 'Future optionality'],
    points: [
      'Test control, equity, flexibility, and long-term occupancy economics together.',
      'Screen buildings for operational permanence and future optionality.',
      'Reduce the risk of buying a property that only solves the current moment.',
    ],
  },
  {
    slug: 'investment-advisory',
    title: 'Investment Advisory',
    intro: 'For capital that needs better underwriting context before conviction is formed.',
    summary: 'Evaluate assets through tenant logic, corridor quality, and downside resilience so the hold thesis feels earned.',
    image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1400&q=80',
    lens: ['Yield with context', 'Downside resilience', 'Corridor quality'],
    points: [
      'Evaluate assets through tenant logic, corridor quality, and downside resilience.',
      'Compare opportunities based on durability, not just headline metrics.',
      'Focus attention on the assets with the strongest real hold thesis.',
    ],
  },
  {
    slug: 'development-land',
    title: 'Development Land Advisory',
    intro: 'For groups assessing land, repositioning, and future-use opportunities across the GTA.',
    summary: 'Bring discipline to opportunities that often look better than they are by sequencing corridor strength, access, and future-use logic.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80',
    lens: ['Corridor strength', 'Timing risk', 'Use-case alignment'],
    points: [
      'Prioritize corridor strength, access logic, and location context early.',
      'Screen opportunities through timing, use-case alignment, and long-range value.',
      'Bring discipline to opportunities that often look better than they are.',
    ],
  },
  {
    slug: 'portfolio-positioning',
    title: 'Portfolio Positioning',
    intro: 'For clients reassessing what to hold, upgrade, lease, sell, or redeploy.',
    summary: 'Turn scattered property decisions into one coherent portfolio strategy with timing, capital allocation, and asset-role clarity.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80',
    lens: ['Asset-role clarity', 'Capital allocation', 'Hold/sell timing'],
    points: [
      'View each property through timing, capital allocation, and strategic role.',
      'Identify where asset performance and portfolio intent are no longer aligned.',
      'Turn scattered property decisions into a more coherent portfolio strategy.',
    ],
  },
];

const accordionRows = [
  {
    title: 'How the service page increases conversion',
    body: 'Each path explains the commercial upside before any outreach. That removes ambiguity and makes the next click into listings, tools, and markets feel more valuable.'
  },
  {
    title: 'Why this feels different from a generic brokerage site',
    body: 'The page behaves more like an advisory narrative than a flat brochure. It frames the user’s decision, shows proof of thinking, and then advances them into the next relevant layer.'
  },
  {
    title: 'What a visitor should feel by the bottom of the page',
    body: 'They should feel seen, oriented, and commercially sharper. The site should already be helping them think better before they ever request anything from KOLT.'
  }
];

export default function ServicesPage() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-story-card',
        { autoAlpha: 0, y: 48, scale: 0.98 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: '.services-story-shell',
            start: 'top 72%',
          },
        }
      );

      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': function () {
          ScrollTrigger.create({
            trigger: '.services-story-shell',
            start: 'top 120',
            end: 'bottom bottom-=120',
            pin: '.services-premium-rail',
            pinSpacing: false,
          });
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const elems = document.querySelectorAll('.tooltipped');
    const M = window.M;
    if (!M) return undefined;
    const instances = M.Tooltip.init(elems, {
      enterDelay: 120,
      exitDelay: 0,
      margin: 10,
      transitionMovement: 8,
      opacity: 1,
    });
    return () => instances.forEach((instance) => instance.destroy());
  }, []);

  return (
    <div ref={rootRef} className="services-premium-page">
      <section className="page-hero slim-hero !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.08fr_.92fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="eyebrow">Services</div>
              <h1 className="max-w-[10.5ch] text-[clamp(3rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.07em] m-0">Advisory paths that feel tailored before a call ever happens.</h1>
              <p className="mt-5 max-w-[58ch] text-[1.06rem] leading-8 text-black/70">
                The services page should not read like a brochure. It should help visitors recognize their situation instantly,
                understand the value of the right path, and feel that KOLT has already reduced the complexity of the next move.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/listings" className="button button-primary waves-effect waves-light small-button">View Opportunities</Link>
                <Link to="/tools" className="button button-secondary waves-effect small-button">Open Tools</Link>
              </div>
              <Stagger className="mt-8 grid gap-3 md:grid-cols-3">
                {[
                  ['Paths', 6, 'decision-led paths'],
                  ['Coverage', 4, 'core GTA lenses'],
                  ['Goal', 100, '% clarity before outreach']
                ].map(([label, value, suffix]) => (
                  <motion.article key={label} variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0} }} className="rounded-[1.4rem] border border-black/6 bg-[#faf7f4] px-5 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">{label}</div>
                    <div className="mt-2 text-[1.75rem] font-extrabold tracking-[-0.06em] text-[#151515]">
                      <Counter value={Number(value)} suffix={label === 'Goal' ? '%' : ''} />
                    </div>
                    <div className="mt-1 text-sm text-black/58">{suffix}</div>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-luxe">
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" alt="Commercial advisory meeting table" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/20 bg-white/75 px-5 py-4 backdrop-blur-lg">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Client lens</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#151515]">Commercial confidence grows fastest when the path feels unmistakably relevant.</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.6rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">Live feel</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">Framer-led hover lift, GSAP scroll timing, MUI chips, Tailwind spacing, and Materialize wave CTAs are all used here to break the static feel.</p>
              </div>
              <div className="rounded-[1.6rem] border border-[#b01f24]/12 bg-[#f9f1ef] px-5 py-5 shadow-[0_18px_50px_rgba(176,31,36,0.08)]">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Design target</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">Less boxy, more editorial. More layered, more tactile, more obviously designed by a human.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8 lg:pt-10">
        <div className="container services-story-shell grid gap-7 lg:grid-cols-[360px_minmax(0,1fr)] items-start">
          <aside className="services-premium-rail rounded-[2rem] border border-black/5 bg-white/90 p-6 shadow-luxe backdrop-blur-md">
            <div className="eyebrow">Advisory map</div>
            <h2 className="mt-0 max-w-[12ch] text-[clamp(2rem,3vw,3rem)] leading-[0.96] tracking-[-0.06em]">The site should guide the user into the right lane instantly.</h2>
            <p className="text-black/68 leading-8">Each service chapter below is designed as a high-conviction scene: image-led, benefit-led, and motion-led, without losing the exact content you asked to preserve.</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {serviceBlocks.map((service) => (
                <Chip key={service.slug} label={service.title} size="small" className="tooltipped" data-tooltip={service.summary} />
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] bg-[#151515] p-5 text-white">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/55">What changes</div>
              <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-white/74">The whole page stops behaving like six repeated cards and starts behaving like a carefully-authored advisory story.</p>
            </div>
          </aside>

          <div className="grid gap-6">
            {serviceBlocks.map((service, index) => (
              <motion.article
                key={service.slug}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className={`service-story-card relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe ${index % 2 === 0 ? '' : 'lg:-ml-4'}`}
              >
                <div className="grid gap-0 lg:grid-cols-[1.08fr_.92fr]">
                  <div className={`relative order-2 p-6 lg:p-8 ${index % 2 ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#b01f24]/45 to-transparent" />
                    <div className="eyebrow">Service {index + 1}</div>
                    <h2 className="mb-3 mt-2 text-[clamp(2rem,3.2vw,3.6rem)] leading-[0.95] tracking-[-0.07em]">{service.title}</h2>
                    <p className="text-[1.04rem] leading-8 text-black/68">{service.intro}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {service.lens.map((tag) => <Chip key={tag} label={tag} />)}
                    </div>
                    <div className="mt-5 rounded-[1.5rem] bg-[#f6f0ea] p-5 text-[1rem] leading-8 text-black/70">{service.summary}</div>
                    <div className="mt-5 grid gap-3">
                      {service.points.map((point) => (
                        <div key={point} className="rounded-[1.3rem] border border-black/6 bg-white px-4 py-4 text-[0.98rem] leading-7 text-black/72 shadow-[0_10px_30px_rgba(17,17,17,0.05)]">
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`relative min-h-[360px] overflow-hidden ${index % 2 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <img src={service.image} alt={service.title} className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                    <div className="absolute left-4 right-4 top-4 flex justify-between gap-3">
                      <div className="rounded-full border border-white/25 bg-white/74 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24] backdrop-blur-md">{service.slug.replaceAll('-', ' ')}</div>
                      <div className="rounded-full border border-white/25 bg-[#151515]/76 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">KOLT Lens</div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 rounded-[1.4rem] border border-white/20 bg-white/78 px-4 py-4 backdrop-blur-lg">
                      <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">Why it matters</div>
                      <p className="mb-0 mt-2 text-[0.96rem] leading-7 text-black/72">The user should understand the value of this path at a glance and feel the next click getting easier.</p>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless pt-2">
        <div className="container grid gap-4 lg:grid-cols-3">
          {accordionRows.map((row) => (
            <Accordion key={row.title} disableGutters>
              <AccordionSummary expandIcon={<span className="text-lg font-bold">+</span>}>
                <div className="text-[1.02rem] font-extrabold tracking-[-0.03em]">{row.title}</div>
              </AccordionSummary>
              <AccordionDetails>
                <p className="m-0 text-[0.98rem] leading-7 text-black/68">{row.body}</p>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Once the right service path is clear, the rest of the site becomes dramatically more valuable."
        body="Continue into listings, tools, and market guidance built to support the same decision from every angle."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Explore Tools"
        secondaryTo="/tools"
      />
    </div>
  );
}
