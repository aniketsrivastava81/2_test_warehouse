import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import ListingCard from "../components/ListingCard";
import { LISTINGS, getRelatedListings } from "../data/siteData";

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const listing = LISTINGS.find((item) => item.slug === slug) || LISTINGS[0];
  const related = useMemo(() => getRelatedListings(listing.slug, 3), [listing.slug]);
  const [activeImage, setActiveImage] = useState(listing.gallery?.[0] || listing.image);

  const metrics = [
    { label: "Size", value: listing.size },
    { label: "Clear height", value: listing.clearHeight },
    { label: "Zoning", value: listing.zoning },
    { label: "Loading", value: listing.loading },
  ];

  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(listing.mapQuery || listing.address || listing.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.06fr_.94fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">{listing.category}</span>
                <span className="rounded-full border border-black/8 bg-[#faf7f4] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">{listing.marketPulse}</span>
                <span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">{listing.status}</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[13ch] text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">{listing.title}</h1>
              <p className="mt-5 max-w-[60ch] text-[1.06rem] leading-8 text-black/70">{listing.teaser}</p>
              <div className="hero-proof-row mt-6">
                <span className="proof-chip">{listing.location}</span>
                <span className="proof-chip">{listing.neighbourhood}</span>
                <span className="proof-chip">{listing.ask}</span>
                <span className="proof-chip">{listing.tag}</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
              <div className="relative h-[440px] overflow-hidden">
                <img src={activeImage} alt={listing.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="grid grid-cols-3 gap-3 p-4">
                {(listing.gallery || [listing.image]).map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className={`overflow-hidden rounded-[1.2rem] border ${activeImage === image ? 'border-[#b01f24]' : 'border-black/6'} bg-[#faf7f4] p-0 transition-transform duration-200 hover:-translate-y-0.5`}
                  >
                    <img src={image} alt={`${listing.title} gallery`} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Quick brief</div>
              <h2 className="m-0 mt-2 text-[1.7rem] leading-tight tracking-[-0.05em]">Primary CTA stays visible above the fold.</h2>
              <div className="mt-5 grid gap-3">
                <a className="button button-primary" href={listing.brochureUrl}>Download brochure</a>
                <Link className="button button-secondary" to="/tools">Request analysis</Link>
                <button className="button button-secondary" type="button" onClick={() => window.print()}>Print one-sheet</button>
              </div>
              <div className="mt-5 rounded-[1.4rem] border border-black/6 bg-[#faf7f4] px-4 py-4">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Address</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/68">{listing.address}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Key info</div>
              <div className="mt-4 grid gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-[1.2rem] border border-black/6 bg-[#faf7f4] px-4 py-3">
                    <div className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{metric.label}</div>
                    <div className="mt-1 text-[0.98rem] font-semibold text-black/78">{metric.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-6 lg:grid-cols-[1.05fr_.95fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-8">
              <div className="eyebrow">Description</div>
              <h2 className="m-0 max-w-[13ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">{listing.highlight}</h2>
              <div className="mt-5 grid gap-4">
                {listing.description.map((paragraph) => (
                  <p key={paragraph} className="m-0 text-[1rem] leading-8 text-black/68">{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
                <div className="eyebrow">Decision checklist</div>
                <div className="mt-4 grid gap-3">
                  {listing.checklist.map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-black/6 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/72">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
                <div className="eyebrow">Best fit</div>
                <div className="mt-4 grid gap-3">
                  {listing.bestFor.map((item) => (
                    <div key={item} className="rounded-[1.2rem] border border-black/6 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/72">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Financial snapshot</div>
              <div className="mt-4 grid gap-3">
                {listing.financialSnapshot.map((row) => (
                  <div key={row.label} className="flex items-start justify-between gap-4 rounded-[1.2rem] border border-black/6 bg-[#faf7f4] px-4 py-4">
                    <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{row.label}</div>
                    <div className="text-right text-[0.98rem] font-semibold text-black/78">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-luxe">
              <div className="eyebrow px-2 pt-2">Map</div>
              <div className="overflow-hidden rounded-[1.5rem] border border-black/6 mt-3">
                <iframe title={`${listing.title} map`} src={mapSrc} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Related opportunities</div>
              <h2>Compare this against live alternatives before deciding.</h2>
            </div>
            <p>
              A strong property page should lead to a stronger next action, not isolate the user inside one listing.
            </p>
          </div>
          <div className="listing-grid">
            {related.map((item) => (
              <ListingCard key={item.slug} listing={item} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="A strong property page should lead to a stronger next action."
        body="Move back into the listing set or widen the comparison through markets, asset classes, and tools."
        primaryLabel="Back to Listings"
        primaryTo="/listings"
        secondaryLabel="Review Markets"
        secondaryTo="/markets"
      />
    </>
  );
}
