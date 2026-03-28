import React from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import ListingCard from "../components/ListingCard";
import MultiStepLeadForm from "../components/MultiStepLeadForm";
import ShortlistButton from "../components/ShortlistButton";
import { getListingBySlug, getRelatedListings } from "../data/siteData";

function getAvailabilityLabel(listing) {
  if (listing.status === "New") return "OFF-MARKET PREVIEW";
  if (listing.category === "Office" || listing.assetClass === "Office") return "90% LEASED";
  return "SELLING NOW";
}

function getAvailabilityNote(listing) {
  if (listing.status === "New") return "Released to a tighter buyer and tenant pool before broader circulation.";
  if (listing.category === "Office" || listing.assetClass === "Office") return "Premium remaining inventory with limited near-term alternatives in the same lane.";
  return "Live industrial supply with scarcity pressure across the strongest GTA logistics corridors.";
}

export default function PropertyDetailPage() {
  const { slug } = useParams();
  const listing = getListingBySlug(slug) || getListingBySlug("brampton-industrial-condo");
  const related = getRelatedListings(listing.slug, 3);
  const [activeImage, setActiveImage] = React.useState((listing.gallery && listing.gallery[0]) || listing.image);
  const brochureHref = `/brochures/${listing.slug}-brochure.pdf`;
  const oneSheetHref = `/one-sheets/${listing.slug}.pdf`;
  const availability = getAvailabilityLabel(listing);
  const metrics = [
    { label: "Size", value: listing.size },
    { label: "Clear height", value: listing.clearHeight },
    { label: "Loading", value: listing.loading },
    { label: "Zoning", value: listing.zoning },
  ];
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(listing.mapQuery || listing.address || listing.location)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  const amenityHref = `/amenities?address=${encodeURIComponent(listing.address)}`;
  const commuteHref = `/commute?origin=${encodeURIComponent(listing.address)}`;

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.06fr_.94fr] items-start">
          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">{listing.category}</span>
                <span className="rounded-full border border-black/10 bg-[#faf7f4] px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/60">{listing.marketPulse}</span>
                <span className="listing-urgency-badge listing-urgency-badge--light">{availability}</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[13ch] text-[clamp(3rem,6vw,5.4rem)] leading-[0.92] tracking-[-0.07em]">{listing.title}</h1>
              <p className="mt-5 max-w-[60ch] text-[1.06rem] leading-8 text-black/80">{listing.teaser}</p>
              <div className="hero-proof-row mt-6">
                <span className="proof-chip">{listing.location}</span>
                <span className="proof-chip">{listing.neighbourhood}</span>
                <span className="proof-chip">{listing.ask}</span>
                <span className="proof-chip">{listing.tag}</span>
              </div>
              <div className="mt-5 rounded-[1.35rem] border border-[#ff7a00]/20 bg-[#fff8f2] px-4 py-4 text-[0.98rem] leading-7 text-black/72">
                <strong className="text-[#b01f24]">Availability note:</strong> {getAvailabilityNote(listing)}
              </div>
              <div className="detail-metric-strip mt-6">
                {metrics.map((metric) => (
                  <article key={metric.label}><small>{metric.label}</small><strong>{metric.value}</strong></article>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
              <div className="relative h-[440px] overflow-hidden">
                <img src={activeImage} alt={`${listing.title} industrial property hero image`} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="grid grid-cols-3 gap-3 p-4">
                {(listing.gallery || [listing.image]).map((image, index) => (
                  <button key={image} type="button" onClick={() => setActiveImage(image)} aria-pressed={activeImage === image} aria-label={`Show gallery image ${index + 1} for ${listing.title}`} className={`overflow-hidden rounded-[1.2rem] border ${activeImage === image ? 'border-[#b01f24]' : 'border-black/10'} bg-[#faf7f4] p-0 transition-transform duration-200 hover:-translate-y-0.5`}>
                    <img src={image} alt={`${listing.title} gallery ${index + 1}`} className="h-24 w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 space-y-5">
            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Action rail</div>
              <h2 className="m-0 mt-2 text-[1.7rem] leading-tight tracking-[-0.05em]">Keep the deal path visible while the property still feels scarce.</h2>
              <div className="mt-5 grid gap-3">
                <a className="button button-primary" href={oneSheetHref} download>Download floor plan + bay sizes</a>
                <a className="button button-secondary" href={brochureHref} download>Download sample brochure PDF</a>
                <Link className="button button-secondary" to="/contact#analysis-workflow">Request confidential review</Link>
                <Link className="button button-secondary" to="/tools">Run fit analysis</Link>
                <Link className="button button-secondary" to={amenityHref}>Find nearby amenities</Link>
                <Link className="button button-secondary" to={commuteHref}>Run commute analysis</Link>
                <Link className="button button-secondary" to="/schedule">Schedule a walkthrough</Link>
                <button className="button button-secondary" type="button" onClick={() => window.print()}>Print one-sheet</button>
                <ShortlistButton listing={listing} className="button button-secondary" />
              </div>
              <div className="mt-5 rounded-[1.4rem] border border-black/10 bg-[#faf7f4] px-4 py-4">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/60">Address</div>
                <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/80">{listing.address}</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Scarcity signal</div>
              <div className="mt-4 grid gap-3">
                {[
                  `${availability} - ${getAvailabilityNote(listing)}`,
                  'Direct plan access is visible here so serious users do not have to click through multiple dead-end pages.',
                  'The review path stays confidential and report-driven to feel closer to an institutional pipeline than a casual web form.',
                ].map((item) => (
                  <div key={item} className="rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/80">{item}</div>
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
                {listing.description.map((paragraph) => (<p key={paragraph} className="m-0 text-[1rem] leading-8 text-black/80">{paragraph}</p>))}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe"><div className="eyebrow">Decision checklist</div><div className="mt-4 grid gap-3">{listing.checklist.map((item) => (<div key={item} className="rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/80">{item}</div>))}</div></div>
              <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe"><div className="eyebrow">Best fit</div><div className="mt-4 grid gap-3">{listing.bestFor.map((item) => (<div key={item} className="rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/80">{item}</div>))}</div></div>
            </div>

            <MultiStepLeadForm source={`property-${listing.slug}`} title="Use the multi-step requirement brief for this property." intro="This keeps the listing page conversion path more commercial: shortlist, analyze, then submit the requirement with context." context={listing.title} />
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe"><div className="eyebrow">Financial snapshot</div><div className="mt-4 grid gap-3">{listing.financialSnapshot.map((row) => (<div key={row.label} className="flex items-start justify-between gap-4 rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4"><div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/60">{row.label}</div><div className="text-right text-[0.98rem] font-semibold text-black/88">{row.value}</div></div>))}</div></div>
            <div className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-luxe">
              <div className="eyebrow">Core-region logic</div>
              <div className="mt-4 grid gap-3">
                {[
                  'Peel, Halton, and York framing should tell the user whether this asset belongs in a scarcity-driven logistics lane or a higher-image industrial-flex lane.',
                  'Use zoning, truck-level loading, and corridor access together so the location story sounds like operations, not tourism.',
                ].map((item) => (<div key={item} className="rounded-[1.2rem] border border-black/10 bg-[#faf7f4] px-4 py-4 text-[0.98rem] leading-7 text-black/80">{item}</div>))}
              </div>
            </div>
            <div className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-luxe"><div className="eyebrow px-2 pt-2">Map</div><div className="overflow-hidden rounded-[1.5rem] border border-black/10 mt-3"><iframe title={`${listing.title} map`} src={mapSrc} className="h-[320px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless"><div className="container"><div className="section-heading-row"><div><div className="eyebrow">Related opportunities</div><h2>Compare this against live alternatives before deciding.</h2></div><p>A strong property page should lead to a stronger next action, not isolate the user inside one listing.</p></div><div className="listing-grid">{related.map((item) => (<ListingCard key={item.slug} listing={item} />))}</div></div></section>

      <CTASection eyebrow="Continue" title="A strong property page should lead to a stronger next action." body="Move back into the listing set, build the shortlist, or widen the comparison through markets, asset classes, tools, and the scarcity-report path." primaryLabel="Back to Listings" primaryTo="/listings" secondaryLabel="Request Scarcity Report" secondaryTo="/contact#analysis-workflow" />
    </>
  );
}
