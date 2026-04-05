import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LISTINGS } from "../data/siteData";

const ALL = 'All';

export default function PropertyListPage() {
  const [category, setCategory] = useState(ALL);
  const [location, setLocation] = useState(ALL);
  const [status, setStatus] = useState(ALL);

  const categories = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.category))], []);
  const locations = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.location))], []);
  const statuses = useMemo(() => [ALL, ...new Set(LISTINGS.map((item) => item.status))], []);

  const filtered = LISTINGS.filter((listing) => (
    (category === ALL || listing.category === category) &&
    (location === ALL || listing.location === location) &&
    (status === ALL || listing.status === status)
  ));

  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-5xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Listings</div>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Active commercial opportunities presented for comparison, not scrolling fatigue.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">Use the filters to narrow the market, then compare each opportunity in a broker OM-style row built for readability, scanning speed, and faster decision-making.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#efe8df]">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <div className="grid gap-4 lg:grid-cols-5">
            <label className="text-sm font-medium text-black/70">Asset type
              <select className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-black/70">Location
              <select className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3" value={location} onChange={(e) => setLocation(e.target.value)}>{locations.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <label className="text-sm font-medium text-black/70">Status
              <select className="mt-2 w-full rounded-xl border border-black/10 bg-white px-4 py-3" value={status} onChange={(e) => setStatus(e.target.value)}>{statuses.map((item) => <option key={item}>{item}</option>)}</select>
            </label>
            <div className="rounded-xl border border-black/10 bg-white px-4 py-3 flex items-center justify-between lg:col-span-2">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Matched opportunities</div>
                <div className="mt-1 text-2xl font-semibold tracking-[-0.04em]">{filtered.length}</div>
              </div>
              <Link to="/contact" className="rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white">Request shortlist review</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[320px_1fr] lg:px-10 lg:py-16">
          <aside className="lg:sticky lg:top-28 h-max space-y-8">
            <div className="overflow-hidden rounded-[1.6rem] border border-black/8 bg-[#111] text-white">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80" alt="GTA market locator" className="h-48 w-full object-cover opacity-70" />
              <div className="p-6">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/55">Market locator</div>
                <p className="mt-3 text-sm leading-7 text-white/74">Peel, Halton, York, and Toronto opportunities screened through asset class, location, status, and practical fit.</p>
              </div>
            </div>
            <div className="border-t border-black/10 pt-5">
              <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">How to read the list</div>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-black/65">
                <li>Compare size, zoning, loading, and location before asking rate alone.</li>
                <li>Use teaser copy to judge operational fit, not just marketing appeal.</li>
                <li>Open details when an opportunity clears the first operational screen.</li>
              </ul>
            </div>
          </aside>

          <div className="divide-y divide-black/8 border-y border-black/8">
            {filtered.map((listing) => (
              <article key={listing.slug} className="grid gap-5 py-8 lg:grid-cols-[220px_1fr_auto] lg:items-start">
                <Link to={`/listings/${listing.slug}`} className="overflow-hidden rounded-[1.3rem] border border-black/8 block min-h-[160px]">
                  <img src={listing.image} alt={listing.title} className="h-full w-full object-cover" />
                </Link>
                <div>
                  <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/46">
                    <span>{listing.location}</span>
                    <span>•</span>
                    <span>{listing.category}</span>
                    <span>•</span>
                    <span>{listing.status}</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">{listing.title}</h2>
                  <p className="mt-3 max-w-3xl text-base leading-8 text-black/68">{listing.teaser}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-black/66">
                    <span className="rounded-full border border-black/10 px-3 py-2">{listing.size}</span>
                    <span className="rounded-full border border-black/10 px-3 py-2">{listing.clearHeight}</span>
                    <span className="rounded-full border border-black/10 px-3 py-2">{listing.zoning}</span>
                    <span className="rounded-full border border-black/10 px-3 py-2">{listing.loading}</span>
                  </div>
                </div>
                <div className="lg:text-right">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Pricing / fit</div>
                  <div className="mt-2 text-lg font-semibold">{listing.ask}</div>
                  <div className="mt-2 text-sm leading-7 text-black/60">{listing.highlight}</div>
                  <div className="mt-5 flex flex-wrap gap-3 lg:justify-end">
                    <Link to={`/listings/${listing.slug}`} className="rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white">View details</Link>
                    <Link to="/contact" className="rounded-full border border-black/12 px-5 py-3 text-sm font-semibold text-black">Inquire</Link>
                  </div>
                </div>
              </article>
            ))}
            {filtered.length === 0 && <div className="py-12 text-base text-black/65">No matches found. Broaden the filter set to reopen the market.</div>}
          </div>
        </div>
      </section>
    </main>
  );
}
