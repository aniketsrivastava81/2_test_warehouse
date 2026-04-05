import React from "react";
import { Link } from "react-router-dom";

const services = [
  { slug: 'industrial-real-estate', title: 'Industrial Real Estate', line: 'Industrial property guidance for occupiers, owners, and investors.', body: 'Industrial real estate decisions require more than square footage alone. Functionality, shipping access, clear height, loading configuration, site circulation, power, zoning, and future operational fit all matter.', bullets: ['Warehousing and distribution requirements', 'Functional property evaluation', 'Site access and circulation considerations', 'Leasing and acquisition support'], cta: 'Explore Industrial Opportunities' },
  { slug: 'retail-real-estate', title: 'Retail Real Estate', line: 'Retail strategy shaped by visibility, demand, and market context.', body: 'Retail property decisions depend on more than location alone. Frontage, visibility, access, surrounding tenancy, traffic patterns, local demographics, and brand fit all influence performance.', bullets: ['Site selection and retail positioning', 'Visibility and accessibility considerations', 'Tenant and consumer alignment', 'Acquisition and leasing support'], cta: 'View Retail Opportunities' },
  { slug: 'land-advisory', title: 'Land Advisory', line: 'Land opportunities evaluated through a longer-term strategic lens.', body: 'Land decisions require patience, context, and a strong understanding of future potential. Scarcity, planning context, surrounding growth, access, servicing, and development logic all affect how a site should be evaluated.', bullets: ['Development potential assessment', 'Strategic land positioning', 'Market and growth context', 'Long-term opportunity analysis'], cta: 'Explore Land Opportunities' },
  { slug: 'tenant-representation', title: 'Tenant Representation', line: 'Helping occupiers secure space that fits the way their business operates.', body: 'The right property needs to support operations, customer experience, access, staffing, logistics, growth plans, and cost structure. The focus is on helping occupiers identify, evaluate, and compare opportunities more strategically.', bullets: ['Requirement-based property searches', 'Functional fit analysis', 'Location and access review', 'Comparative property evaluation'], cta: 'Discuss Your Requirement' },
  { slug: 'owner-representation', title: 'Owner Representation', line: 'Helping owners position commercial assets with greater clarity and stronger market appeal.', body: 'Owners benefit from more than exposure alone. Effective property positioning requires strong messaging, clear presentation, market-aware pricing logic, and a better understanding of what serious users or buyers need to see.', bullets: ['Asset positioning strategy', 'Commercial marketing support', 'Presentation and messaging guidance', 'Market-aware listing support'], cta: 'Position Your Property' },
  { slug: 'acquisition-advisory', title: 'Acquisition Advisory', line: 'Support for buyers and investors evaluating commercial opportunities with discipline.', body: 'Acquiring commercial real estate requires a clear view of both opportunity and risk. Properties are assessed through the lens of use case, market timing, functionality, demand drivers, and long-term relevance.', bullets: ['Opportunity screening', 'Strategic fit analysis', 'Submarket and demand context', 'Decision support for acquisitions'], cta: 'Evaluate an Opportunity' },
  { slug: 'disposition-strategy', title: 'Disposition Strategy', line: 'Guidance for owners preparing to bring commercial assets to market.', body: 'A successful disposition starts well before the property is introduced. Positioning, timing, presentation, audience targeting, and narrative all influence how an asset is received.', bullets: ['Pre-market positioning', 'Asset narrative development', 'Audience-focused presentation', 'Commercial listing strategy'], cta: 'Plan Your Disposition' },
  { slug: 'market-advisory', title: 'Market Advisory', line: 'Commercial real estate insight designed to reduce guesswork.', body: 'Not every question begins with a transaction. Sometimes the most important step is understanding the market, the submarket, or the direction of an asset class before deciding what to do next.', bullets: ['GTA market insight', 'Submarket perspective', 'Opportunity and risk framing', 'Decision-stage advisory support'], cta: 'Request Market Insight' },
  { slug: 'digital-property-presentation', title: 'Digital Property Presentation', line: 'A more modern way to help commercial properties stand out.', body: 'Static media alone does not always communicate the functionality, scale, or potential of a space. KOLT Realty is focused on stronger digital presentation through clearer content structure, better user journeys, and interactive ways to experience a property before a site visit takes place.', bullets: ['Digital property storytelling', 'User-focused listing presentation', 'Interactive space visualization', 'Improved engagement before inquiry'], cta: 'See the Warehouse Experience' },
];

export default function ServicesPage() {
  return (
    <main className="bg-[#f6f3ee] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-5xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Commercial Real Estate Services</div>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Commercial real estate services built around strategy, not just transactions.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">KOLT Realty supports owners, investors, tenants, and developers across the Greater Toronto Area with practical commercial real estate guidance across industrial, retail, land, and advisory-focused assignments.</p>
          </div>
        </div>
      </section>

      <section className="border-b border-black/6 bg-[#f6f3ee]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[280px_1fr] lg:px-10 lg:py-16">
          <aside className="lg:sticky lg:top-28 h-max border-t border-black/10 pt-5">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Service navigator</div>
            <nav className="mt-6 space-y-3">
              {services.map((service) => (
                <a key={service.slug} href={`#${service.slug}`} className="block text-sm font-medium text-black/72 transition hover:text-black">{service.title}</a>
              ))}
            </nav>
          </aside>

          <div className="divide-y divide-black/8 border-y border-black/8 bg-white px-0">
            {services.map((service) => (
              <section key={service.slug} id={service.slug} className="grid gap-5 py-10 lg:grid-cols-[1fr_240px] lg:items-start">
                <div className="pr-0 lg:pr-8">
                  <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Service</div>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] lg:text-4xl">{service.title}</h2>
                  <div className="mt-3 text-lg font-medium text-black/78">{service.line}</div>
                  <p className="mt-5 max-w-3xl text-base leading-8 text-black/68">{service.body}</p>
                  <Link to={service.slug === 'digital-property-presentation' ? '/listing-type-2' : '/contact'} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-black">{service.cta} <span aria-hidden="true">↗</span></Link>
                </div>
                <div className="border-t border-black/10 pt-4">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">What this includes</div>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-black/66">
                    {service.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white/60">Service philosophy</div>
              <h2 className="mt-4 max-w-[13ch] text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">The value of commercial guidance is clarity, filtering, and stronger positioning.</h2>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/72">KOLT Realty structures its services around that principle so clients can approach opportunities with greater precision and less friction.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/schedule" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black">Schedule a Consultation</Link>
              <Link to="/contact" className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white">Contact Us</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
