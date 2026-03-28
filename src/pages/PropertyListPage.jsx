import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";
import { Reveal } from "../components/motion/Reveal";

const ALL = "All";

const regionInsights = [
  {
    region: 'Peel',
    title: 'Scarcity-led industrial demand',
    body: 'Brampton and Mississauga stay central when truck movement, airport access, and industrial condo supply all matter at once.',
  },
  {
    region: 'Halton',
    title: 'Expansion and development runway',
    body: 'Milton and western logistics growth make Halton useful for users balancing modern warehouse product with future expansion logic.',
  },
  {
    region: 'York',
    title: 'Industrial-flex and conversion upside',
    body: 'Vaughan and north-GTA product fit owner-users, flex occupiers, and industrial condo strategies that need stronger front-end image.',
  },
];

export default function PropertyListPage() {
  const [category, setCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.category))], []);
  const locations = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.location))], []);
  const statuses = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.status))], []);
  const featured = useMemo(() => LISTINGS.find((item) => item.status === "Featured") || LISTINGS[0], []);

  const filtered = LISTINGS.filter((listing) => {
    return (category === ALL || listing.category === category)
      && (location === ALL || listing.location === location)
      && (status === ALL || listing.status === status);
  });

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.03fr_.97fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-7 shadow-luxe lg:px-10 lg:py-9">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">Listings</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/70">Peel • Halton • York focus</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/70">Scarcity-led inventory</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[13.5ch] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.07em]">
                GTA industrial inventory is scarce. The wrong shortlist is expensive.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/70">
                This page should feel less like a gallery and more like a live industrial pipeline - floor plans up front, availability framed with urgency,
                and every card speaking the language of fit, zoning, truck access, and commercial usefulness.
              </p>
              <div className="hero-proof-row mt-6">
                <span className="proof-chip">Availability tags</span>
                <span className="proof-chip">Floor plan download</span>
                <span className="proof-chip">Industrial condo focus</span>
                <span className="proof-chip">Confidential review path</span>
              </div>
              <div className="hero-power-bar hero-power-bar--inline mt-6">
                {[
                  ['Coverage', 'Peel • Halton • York'],
                  ['Inventory lane', 'Industrial and flex-heavy'],
                  ['Client action', 'Download plans before tours'],
                  ['Advisor tone', 'Scarcity-first'],
                ].map(([label, value]) => (
                  <article key={label}><small>{label}</small><strong>{value}</strong></article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src={featured.image} alt={`${featured.title} featured industrial opportunity in ${featured.location}`} className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex flex-wrap justify-between gap-2">
              <span className="listing-urgency-badge">SELLING NOW</span>
              <span className="rounded-full border border-white/20 bg-[#151515]/78 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">{featured.tag}</span>
            </div>
            <div className="absolute left-4 right-4 bottom-4 rounded-[1.6rem] border border-white/20 bg-white/80 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{featured.location} · {featured.neighbourhood}</div>
              <h2 className="mb-0 mt-2 text-[1.75rem] leading-tight tracking-[-0.05em] text-[#151515]">{featured.title}</h2>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{featured.teaser}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{featured.size}</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{featured.clearHeight}</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68">{featured.zoning}</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link to={`/listings/${featured.slug}`} className="button button-primary">Review availability</Link>
                <a href={`/one-sheets/${featured.slug}.pdf`} className="button button-secondary" download>Download floor plan</a>
                <Link to="/contact#analysis-workflow" className="button button-secondary">Request confidential review</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-6 lg:pt-8">
        <div className="container grid gap-4 md:grid-cols-3">
          {regionInsights.map((item) => (
            <Reveal key={item.region} className="rounded-[1.7rem] border border-black/5 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.07)] institutional-card institutional-card--soft">
              <div className="institutional-card__icon" aria-hidden="true" />
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{item.region} Region</div>
              <h3 className="m-0 mt-2 text-[1.25rem] tracking-[-0.04em]">{item.title}</h3>
              <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Opportunity filter</div>
              <h2>Find the right lane before the shortlist grows.</h2>
            </div>
            <p>
              The goal is not to show the most properties. The goal is to help the right user find the right few faster - with plan access and scarcity cues already in place.
            </p>
          </div>

          <div className="listing-filter-panel">
            <label>
              <span>Asset type</span>
              <select id="pl-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Location</span>
              <select id="pl-location" value={location} onChange={(e) => setLocation(e.target.value)}>
                {locations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select id="pl-status" value={status} onChange={(e) => setStatus(e.target.value)}>
                {statuses.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <div className="listing-filter-result">
              <strong>{filtered.length}</strong>
              <span>matched opportunities</span>
            </div>
            <Link className="button button-secondary small-button" to="/contact#analysis-workflow">Request shortlist analysis</Link>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container listing-grid">
          {filtered.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-stretch">
          <div className="rounded-[2rem] border border-black/5 bg-[#151515] p-7 text-white shadow-luxe lg:p-9">
            <div className="eyebrow !text-white/70">Private Vault</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2rem,3vw,3.3rem)] leading-[0.95] tracking-[-0.06em] text-white">
              The strongest industrial opportunities are not public for long.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-white/74">
              Create the feeling of a confidential pipeline - off-market previews, limited-release inventory, and floor-plan access that rewards serious buyers and landlords first.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Off-market previews', 'Limited-release inventory', 'Floor-plan first conversion'].map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/78">{chip}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Scarcity-led UX',
                body: 'Availability tags and stronger CTA language make each opportunity feel active instead of archival.',
              },
              {
                title: 'Floor-plan urgency',
                body: 'Users can grab the one-sheet or floor plan directly from the card rather than hunting through multiple screens.',
              },
              {
                title: 'Conversion by clarity',
                body: 'The page naturally points users into confidential review, scarcity report capture, and direct analysis.',
              },
              {
                title: 'Institutional tone',
                body: 'Status language, asset descriptors, and corridor framing all read more like elite industrial advisory than retail real estate copy.',
              },
            ].map((item) => (
              <article key={item.title} className="rounded-[1.6rem] border border-black/5 bg-white p-5 shadow-[0_18px_50px_rgba(17,17,17,0.07)]">
                <h3 className="m-0 text-[1.2rem] tracking-[-0.04em]">{item.title}</h3>
                <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/68">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Turn the shortlist into a stronger final decision."
        body="Move from inventory to fit testing with the tools, then use the scarcity report or confidential review path to start the real conversation."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="Request Scarcity Report"
        secondaryTo="/contact#analysis-workflow"
      />
    </>
  );
}
