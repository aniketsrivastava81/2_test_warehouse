import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";
import { Reveal } from "../components/motion/Reveal";

const ALL = "All";

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
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">Listings</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Market Pulse · March 2026</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[11ch] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.07em]">
                Search less. Compare better. Move with conviction.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[1.05rem] leading-8 text-black/70">
                This page should feel like a serious CRE platform, not a generic gallery. Every opportunity is framed through operational fit,
                corridor logic, and commercial usefulness before the shortlist gets emotional.
              </p>
              <div className="hero-proof-row mt-6">
                <span className="proof-chip">Curated GTA opportunities</span>
                <span className="proof-chip">Image-led cards</span>
                <span className="proof-chip">Fit-first filtering</span>
                <span className="proof-chip">Direct route into tools</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src={featured.image} alt={featured.title} className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/12 to-transparent" />
            <div className="absolute left-4 right-4 top-4 flex flex-wrap justify-between gap-2">
              <span className="rounded-full border border-white/20 bg-white/80 px-3 py-2 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24] backdrop-blur-md">Featured listing</span>
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
                <Link to={`/listings/${featured.slug}`} className="button button-primary">View featured property</Link>
                <Link to="/tools" className="button button-secondary">Run KOLT tools</Link>
                <Link to="/contact#analysis-workflow" className="button button-secondary">Launch requirement brief</Link>
              </div>
            </div>
          </Reveal>
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
              The goal is not to show the most properties. The goal is to help the right user see the right few faster.
            </p>
          </div>

          <div className="listing-filter-panel">
            <label>
              <span>Asset type</span>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Location</span>
              <select value={location} onChange={(e) => setLocation(e.target.value)}>
                {locations.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            <label>
              <span>Status</span>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
              The strongest industrial opportunities are not always public for long.
            </h2>
            <p className="mt-5 max-w-[58ch] text-[1rem] leading-8 text-white/74">
              Create the feeling of a confidential pipeline, not a stale catalogue. This section teases off-market logic,
              pocket opportunities, and why KOLT should feel plugged into better deal flow than the average search path.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Off-market signals', 'Pocket opportunities', 'Shortlist before broadcast'].map((chip) => (
                <span key={chip} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white/78">{chip}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Corridor logic',
                body: 'Every opportunity is positioned through access, movement, and the kind of business it should serve best.',
              },
              {
                title: 'Shortlist discipline',
                body: 'Users can move from broad browsing into a smaller, stronger comparison set without losing momentum.',
              },
              {
                title: 'Conversion by clarity',
                body: 'The page naturally points users into tools, guides, and property details instead of leaving them at a dead end.',
              },
              {
                title: 'Institutional tone',
                body: 'Micro-copy, tags, and metric strips all speak like a serious advisory platform instead of generic retail marketing.',
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
        body="Move from inventory to fit testing with the tools, then use the guides to sharpen the final comparison."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="Read the Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
