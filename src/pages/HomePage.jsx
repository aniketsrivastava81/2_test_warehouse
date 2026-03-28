import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CTASection from '../components/CTASection';
import SocialProofTicker from '../components/SocialProofTicker';
import { Reveal, Stagger } from '../components/motion/Reveal';
import { JOURNEY, LISTINGS } from '../data/siteData';

const heroImage = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=80';
const boardroomImage = 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80';
const siteVisitImage = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80';
const warehouseImage = 'https://images.unsplash.com/photo-1586528116493-0fefdb7fefc0?auto=format&fit=crop&w=1800&q=80';

const pillars = [
  {
    title: 'Industrial condo conversions with conviction',
    body: 'KOLT should sound like the firm that understands supply constraints, entitlement friction, and how to move an owner-user or investor before public inventory gets crowded.',
  },
  {
    title: 'Data-led advisory, not brochure language',
    body: 'Every section should feel grounded in corridor logic, zoning posture, truck movement, labour access, and the cost of vacancy.',
  },
  {
    title: 'Decision support that gets closer to the close',
    body: 'The site should shorten the distance between early curiosity, serious underwriting, and a cleaner final mandate.',
  },
];

const powerStats = [
  ['Heavyweight belt', '$1B+ sales represented'],
  ['Combined bench strength', '200+ years of CRE experience'],
  ['Future pipeline', '$2B+ pipeline assets'],
  ['Core regions', 'Peel • Halton • York'],
];

const resultCards = [
  {
    title: 'Predictive Yield Modeling',
    subtitle: 'Replace generic investment talk with sharper NOI and cap-rate logic.',
  },
  {
    title: 'Last-Mile Logistics Optimization',
    subtitle: 'Find the node that improves truck time, labour reach, and final-mile execution.',
  },
  {
    title: 'Industrial Condo Conversion Advisory',
    subtitle: 'Frame owner-user and redevelopment opportunities around control, timing, and exit optionality.',
  },
  {
    title: 'Leasing Velocity Positioning',
    subtitle: 'Show landlords how to reduce downtime and attract the right tenant profile faster.',
  },
  {
    title: 'E2 / E3 Zoning Strategy',
    subtitle: 'Translate zoning complexity into a decision the capital stack can actually act on.',
  },
  {
    title: 'NOI Maximization Programs',
    subtitle: 'Use lease auditing, facility optimization, and capital prioritization to protect income.',
  },
];

const regionCards = [
  {
    region: 'Peel Region',
    title: 'Brampton + Mississauga logistics gravity',
    body: 'Industrial scarcity, airport adjacency, and truck-level demand make Peel the first lens for users who care about velocity and throughput.',
    chips: ['Brampton industrial condos', 'Mississauga airport belt', 'Truck-level loading'],
  },
  {
    region: 'Halton Region',
    title: 'Milton and western expansion logic',
    body: 'Halton should read like the growth-and-control corridor where larger-format industrial and future expansion logic can still be priced with discipline.',
    chips: ['Milton expansion nodes', 'Land banking posture', 'Modern bay depth'],
  },
  {
    region: 'York Region',
    title: 'Vaughan and north-GTA conversion upside',
    body: 'York should feel like the hybrid corridor for industrial condo conversions, customer-facing flex, and higher-image logistics space.',
    chips: ['Vaughan showroom-flex', '400-series access', 'Industrial condo demand'],
  },
];

const institutionalNotes = [
  {
    title: 'Boardroom to site credibility',
    body: 'Clients should see the same team that can model a deal in the boardroom and walk a loading court in high-vis boots.',
    image: boardroomImage,
  },
  {
    title: 'Warehouse of the future positioning',
    body: 'The interactive warehouse layer proves KOLT understands where industrial product, automation, and occupier expectations are heading next.',
    image: siteVisitImage,
  },
];

const testimonials = [
  {
    quote: 'Institutional buyers do not need louder copy. They need a cleaner investment thesis faster.',
    source: 'Capital-markets lens',
  },
  {
    quote: 'The best digital brokerage experience reduces vacancy risk and buyer hesitation at the same time.',
    source: 'Landlord representation lens',
  },
  {
    quote: 'A premium website should narrow the shortlist before the first tour ever happens.',
    source: 'Owner-user lens',
  },
];

export default function HomePage() {
  const featured = useMemo(() => LISTINGS.find((item) => item.status === 'Featured') || LISTINGS[0], []);

  return (
    <>
      <section className="page-hero slim-hero !pt-10 lg:!pt-14 overflow-hidden hero-section-premium">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2.1rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-90" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-2">
                <div className="eyebrow">KOLT Realty</div>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Asset advisory mode</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Industrial condo conversions</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[10.8ch] text-[clamp(3.15rem,7vw,6.35rem)] leading-[0.9] tracking-[-0.08em]">
                Navigating GTA industrial landscapes with data-driven insight and unmatched access.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[1.06rem] leading-8 text-black/72">
                In Toronto commercial real estate, clients are not hiring a digital business card. They are hiring a fiduciary partner who understands the capital stack,
                E2 / E3 zoning, truck-level loading, and the high cost of vacancy across Peel, Halton, and York.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/listings" className="button button-primary waves-effect waves-light small-button">Review inventory</Link>
                <Link to="/contact#analysis-workflow" className="button button-secondary waves-effect small-button">Get the 2026 scarcity report</Link>
                <Link to="/listing-type-2" className="button button-secondary waves-effect small-button">Open warehouse demo</Link>
              </div>
              <Stagger className="mt-8 grid gap-3 md:grid-cols-3">
                {pillars.map((pillar) => (
                  <motion.article key={pillar.title} variants={{ hidden:{opacity:0,y:24}, show:{opacity:1,y:0} }} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] institutional-card">
                    <div className="institutional-card__icon" aria-hidden="true" />
                    <h3 className="m-0 text-[1.15rem] leading-tight tracking-[-0.04em]">{pillar.title}</h3>
                    <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/66">{pillar.body}</p>
                  </motion.article>
                ))}
              </Stagger>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="relative min-h-[470px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-luxe">
              <img src={heroImage} alt="Toronto west industrial logistics warehouse with truck-level loading and modern distribution frontage" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/12 to-transparent" />
              <div className="hero-power-bar">
                {powerStats.map(([label, value]) => (
                  <article key={label}>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </article>
                ))}
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/20 bg-white/80 px-5 py-4 backdrop-blur-lg">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Hero mandate</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#151515]">KOLT should read like the brokerage that already knows where the next industrial squeeze will happen.</div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ['Core edge', 'Industrial condo conversions, last-mile logistics, and institutional underwriting in one lane.'],
                ['Language', 'NOI, cap rates, zoning bylaws, truck courts, and vacancy risk - not vague lifestyle copy.'],
                ['Visual cue', 'Safety-orange accents, blueprint rhythm, and cleaner scarcity signaling across every high-value section.'],
                ['Closer instinct', 'Every page now gives the visitor a stronger reason to request analysis instead of just browsing.'],
              ].map(([label, value]) => (
                <div key={label} className="rounded-[1.6rem] border border-black/6 bg-white px-5 py-5 shadow-[0_18px_50px_rgba(17,17,17,0.08)]">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/45">{label}</div>
                  <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <SocialProofTicker />

      <section className="section pt-6 lg:pt-8">
        <div className="container">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe lg:p-8">
            <div className="section-heading-row !mb-6">
              <div>
                <div className="eyebrow">Strategic cards</div>
                <h2>Result-oriented advisory language closes better than service-list language.</h2>
              </div>
              <p>These cards keep the institutional tone while answering the one question serious clients are actually asking: how does this make the asset perform better?</p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {resultCards.map((card) => (
                <article key={card.title} className="rounded-[1.55rem] border border-black/6 bg-[#faf7f4] px-5 py-5 shadow-[0_14px_35px_rgba(17,17,17,0.05)] institutional-card institutional-card--soft">
                  <div className="institutional-card__icon" aria-hidden="true" />
                  <h3 className="m-0 text-[1.2rem] tracking-[-0.05em]">{card.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{card.subtitle}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-2 lg:pt-4">
        <div className="container grid gap-6 lg:grid-cols-[1fr_.94fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Core regions</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2.2rem,4vw,4.2rem)] leading-[0.94] tracking-[-0.06em]">Claim Peel, Halton, and York like local knowledge is the real differentiator.</h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-black/68">This is where the site stops feeling generic and starts sounding plugged into the actual GTA industrial chessboard.</p>
            <div className="mt-6 grid gap-4">
              {regionCards.map((card) => (
                <article key={card.region} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5 region-strategy-card">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{card.region}</div>
                  <h3 className="m-0 mt-2 text-[1.25rem] tracking-[-0.04em]">{card.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{card.body}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.chips.map((chip) => (
                      <span key={chip} className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{chip}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="overflow-hidden rounded-[2rem] border border-black/5 bg-[#151515] text-white shadow-luxe">
            <div className="relative h-full min-h-[520px]">
              <img src={warehouseImage} alt="Future-ready industrial warehouse aisle representing automation, storage efficiency, and modern GTA logistics product" className="h-full w-full object-cover opacity-75" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute inset-x-5 top-5 rounded-[1.2rem] border border-white/10 bg-white/10 px-4 py-3 text-sm text-white/74 backdrop-blur-md">
                Market pulse demo - scarcity messaging, inventory urgency, and warehouse-of-the-future positioning live in one presentation layer.
              </div>
              <div className="absolute inset-x-5 bottom-5 space-y-4">
                <div className="rounded-[1.5rem] border border-white/14 bg-white/10 px-5 py-5 backdrop-blur-md">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white/70">Interactive differentiator</div>
                  <h3 className="m-0 mt-2 text-[1.75rem] tracking-[-0.05em] text-white">Warehouse of the future, not another static brochure section.</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-white/74">Bring the 3D warehouse demo into the main narrative so users see that KOLT understands how industrial product is evolving, not just how to market yesterday&apos;s inventory.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {institutionalNotes.map((item) => (
                    <article key={item.title} className="rounded-[1.45rem] border border-white/14 bg-white/10 p-4 backdrop-blur-md">
                      <img src={item.image} alt={item.title} className="h-36 w-full rounded-[1rem] object-cover" />
                      <h3 className="m-0 mt-4 text-[1.1rem] tracking-[-0.04em] text-white">{item.title}</h3>
                      <p className="mb-0 mt-2 text-[0.95rem] leading-7 text-white/74">{item.body}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[1fr_.94fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Featured opportunity</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2.2rem,4vw,4.2rem)] leading-[0.94] tracking-[-0.06em]">Make the first listing feel like the market is moving now.</h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-black/68">KOLT should not show inventory politely. It should stage urgency, fit, and commercial upside the way an elite industrial team would talk in a live pitch.</p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                [featured.size, 'Size'],
                [featured.clearHeight, 'Clear'],
                [featured.zoning, 'Zoning'],
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
              <Link to="/contact#analysis-workflow" className="button button-secondary">Request scarcity report</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src={featured.image} alt={`${featured.title} industrial property in ${featured.location}`} className="h-full min-h-[320px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2">
              <span className="listing-urgency-badge">SELLING NOW</span>
              <span className="rounded-full border border-white/15 bg-white/12 px-4 py-2 text-sm text-white/78 backdrop-blur-md">Industrial scarcity monitor</span>
            </div>
            <div className="absolute left-5 right-5 bottom-5 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{featured.location} · {featured.tag}</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/70">{featured.teaser}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-2 lg:pt-4">
        <div className="container grid gap-6 lg:grid-cols-[.95fr_1.05fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-10">
            <div className="eyebrow !text-white/70">Lead magnet</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2rem,3.2vw,3.3rem)] leading-[0.95] tracking-[-0.06em] text-white">Create the information gap before asking for the call.</h2>
            <p className="mt-5 max-w-[55ch] text-[1rem] leading-8 text-white/74">The 2026 GTA Industrial Scarcity Report gives investors, developers, and owner-users a reason to hand over an email before they are ready for a hard sales conversation.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Vacancy pressure', 'Core-region comparison', 'Industrial condo signals', 'Off-market readiness'].map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/80">{chip}</span>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact#analysis-workflow" className="button button-primary">Request the report</Link>
              <Link to="/guides" className="button button-secondary">Read market guides</Link>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Decision path</div>
            <div className="mt-5 grid gap-4">
              {JOURNEY.map((step) => (
                <article key={step.step} className="rounded-[1.5rem] border border-black/6 bg-[#faf7f4] px-5 py-5">
                  <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Step {step.step}</div>
                  <h3 className="m-0 mt-2 text-[1.2rem] tracking-[-0.04em]">{step.title}</h3>
                  <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{step.body}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <Reveal className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
            <div className="eyebrow">Institutional proof</div>
            <h2 className="m-0 max-w-[11ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">The site should feel more asset advisor than retail realtor.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                'Industrial real estate Toronto language built into the hierarchy.',
                'Supply-chain real estate framing baked into the hero and market copy.',
                'E2 / E3 zoning, truck-level loading, and scarcity signals surfaced early.',
                'A cleaner route from interest to confidential review and report request.',
              ].map((item) => (
                <article key={item} className="rounded-[1.45rem] border border-black/6 bg-[#faf7f4] px-5 py-5">
                  <p className="m-0 text-[0.98rem] leading-7 text-black/70">{item}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-4 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.source} className="rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
                <p className="m-0 text-[0.98rem] leading-7 text-black/70">“{item.quote}”</p>
                <div className="mt-4 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{item.source}</div>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Once the page establishes authority, every next click should feel more valuable."
        body="Move into listings, tools, and the warehouse presentation with sharper decision logic and stronger institutional confidence."
        primaryLabel="Explore Listings"
        primaryTo="/listings"
        secondaryLabel="Open Warehouse Demo"
        secondaryTo="/listing-type-2"
      />
    </>
  );
}
