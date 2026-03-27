import React from "react";
import { Link } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Chip } from "@mui/material";
import { motion } from "framer-motion";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";
import { Reveal } from "../components/motion/Reveal";
import Counter from "../components/motion/Counter";

const serviceBlocks = [
  {
    slug: "tenant-representation",
    title: "Tenant Representation",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80",
    intro: "For occupiers who need a requirement brief that reads like operations, not wishful thinking.",
    summary: "We translate loading type, labour catchment, truck circulation, clear height, office ratio, parking, and NNN exposure into a smaller, sharper shortlist.",
    learnMore: [
      {
        title: "What gets pressure-tested",
        body: "Occupancy cost, truck-level versus drive-in loading, power, parking, racking assumptions, shipping rhythm, landlord work, inducements, and renewal flexibility all get compared before the final lane is chosen.",
      },
      {
        title: "Why this matters commercially",
        body: "The goal is not more tours. The goal is fewer, more relevant tours and stronger negotiation posture once conviction starts to form.",
      },
    ],
    chips: ["Loading type", "NNN exposure", "Labour access"],
    cta: "Launch requirement brief",
  },
  {
    slug: "landlord-representation",
    title: "Landlord Representation",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80",
    intro: "For owners who need the asset positioned with cleaner market logic and stronger tenant targeting.",
    summary: "We refine the presentation around corridor quality, user-fit, loading configuration, office image, and absorption logic so response quality improves — not just volume.",
    learnMore: [
      {
        title: "Institutional positioning",
        body: "CTA language, feature framing, and callouts now read like leasing intelligence: trailer access, clear height, shipping ratio, frontage, and merchandising flexibility instead of generic amenities alone.",
      },
      {
        title: "How the page now helps",
        body: "Alternating editorial sections, deeper expansion content, and stronger proof blocks help the user understand why the mandate is relevant before the first inquiry.",
      },
    ],
    chips: ["Absorption strategy", "Tenant targeting", "Narrative control"],
    cta: "Request leasing strategy review",
  },
  {
    slug: "owner-user-acquisition",
    title: "Owner-User Acquisition",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80",
    intro: "For operators deciding whether ownership beats another lease cycle.",
    summary: "We weigh equity creation, capex timing, control, future flexibility, and zoning permanence together so the acquisition thesis feels earned rather than emotional.",
    learnMore: [
      {
        title: "Decision lens",
        body: "This is where lease-versus-buy tools, lender posture, occupancy cost, and exit optionality matter. The right building must solve today’s workflow and still make sense five to ten years out.",
      },
      {
        title: "Best fit examples",
        body: "Trade contractors, food users, light manufacturing, automotive, and growing service operators often need a more operational decision lens than standard marketing materials provide.",
      },
    ],
    chips: ["Control", "Future optionality", "Balance-sheet logic"],
    cta: "Start acquisition analysis",
  },
  {
    slug: "investment-advisory",
    title: "Investment Advisory",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=80",
    intro: "For capital that needs underwriting context beyond headline cap rate.",
    summary: "We frame opportunities through tenant quality, corridor durability, lease structure, cap rate posture, rollover risk, and last-mile relevance so the downside case is easier to see early.",
    learnMore: [
      {
        title: "CRE language that matters",
        body: "Cap rate compression, covenant strength, lease rollover, free-and-clear upside, and replacement-cost context are not side notes. They shape conviction, bidding behaviour, and hold strategy.",
      },
      {
        title: "How we present assets now",
        body: "Calls to action now use institutional language like Request Confidential Offering Memorandum and Request Underwriting Pack to fit investor expectations more naturally.",
      },
    ],
    chips: ["Cap rate context", "Lease quality", "Downside resilience"],
    cta: "Request underwriting pack",
  },
  {
    slug: "development-land",
    title: "Development Land Advisory",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    intro: "For groups assessing land, zoning posture, servicing context, and future employment use.",
    summary: "We structure the land story around planning context, access, frontage, servicing, entitlement complexity, and employment land logic so the real upside is easier to compare.",
    learnMore: [
      {
        title: "Employment land lens",
        body: "The right context is more than acreage. Zoning posture, servicing risk, municipal tone, corridor adjacency, and future-use alignment determine whether the land is actionable or just theoretically attractive.",
      },
      {
        title: "Developer relevance",
        body: "Developers need a faster signal on what is truly buildable, what is strategically land-banked, and what is likely to stall in diligence. That is the lens this section now adopts.",
      },
    ],
    chips: ["Zoning context", "Servicing", "Employment land"],
    cta: "Review land strategy",
  },
  {
    slug: "portfolio-positioning",
    title: "Portfolio Positioning",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80",
    intro: "For clients reassessing what to hold, market, improve, lease, or redeploy across multiple assets.",
    summary: "We look at tenant mix, corridor quality, redevelopment optionality, leasing posture, capex prioritization, and timing so portfolio decisions do not get made asset by asset in isolation.",
    learnMore: [
      {
        title: "What gets surfaced",
        body: "Where the portfolio is overexposed to one tenant type, where a capex event could unlock rent, where disposition makes more sense than hold, and where leasing strategy should shift immediately.",
      },
      {
        title: "Why the page needed rebuilding",
        body: "This lane needed to read like strategic advisory, not a small card in a grid. The new alternating chapters and proof modules make the positioning feel much more senior and deliberate.",
      },
    ],
    chips: ["Portfolio review", "Redeployment", "Strategic timing"],
    cta: "Book portfolio strategy session",
  },
];

const personas = [
  {
    title: "Investors",
    body: "Focused on yield durability, covenant quality, cap rate posture, rollover timing, and downside resilience across GTA corridors.",
    bullets: ["Request underwriting pack", "Compare cap rate against tenant quality", "Assess hold thesis versus exit timing"],
  },
  {
    title: "Owner-users",
    body: "Focused on shipping practicality, power, image, circulation, control, capex, and whether ownership creates a more durable operating platform.",
    bullets: ["Run lease-vs-buy logic", "Check loading and clear height", "Protect expansion optionality"],
  },
  {
    title: "Developers",
    body: "Focused on zoning, servicing, site context, entitlement friction, employment land logic, and where the upside is actually executable.",
    bullets: ["Assess employment land viability", "Test frontage and access logic", "Compare entitlement complexity"],
  },
];

const caseExamples = [
  {
    title: "Last-mile industrial search",
    body: "A regional operator needed truck-level shipping, 28-foot clear height, and tighter last-mile access. The search narrowed from broad GTA inventory into a smaller logistics-fit lane first.",
    tag: "Loading + logistics",
  },
  {
    title: "Investor underwriting reset",
    body: "A private investor liked the asking cap rate, but the real decision hinged on lease rollover concentration and corridor durability. The frame shifted from headline yield to hold quality.",
    tag: "Cap rate + rollover",
  },
  {
    title: "Employment land screen",
    body: "A development group needed a faster read on zoning context, servicing posture, and municipal friction. The land conversation moved from acreage to executable utility.",
    tag: "Zoning + land use",
  },
];

const publicTrackRecord = [
  {
    metric: "2021 transactions closed",
    value: "41",
    note: "Publicly reported commercial closings in 2021.",
  },
  {
    metric: "2021 dollar volume",
    value: "$37.5M",
    note: "Publicly reported 2021 commercial transaction volume.",
  },
  {
    metric: "2022 pipeline snapshot",
    value: "58 pending / $184M+",
    note: "Publicly reported pending volume snapshot from 2022.",
  },
];

const representedPlaces = [
  "2074–2084 Steeles Ave E · Brampton",
  "286 Rutherford Road South · Brampton",
  "11–13 Edvac Drive · Brampton",
  "4 Alfred Kuehne Boulevard · Brampton",
  "89–111 Orenda Road · Brampton",
  "5775 Atlantic Drive · Mississauga",
  "177 Lombard Street · Winnipeg",
  "2283 St. Laurent Boulevard · Ottawa",
];

const voicePlaceholders = [
  "Reserved for approved occupier testimonial copy.",
  "Reserved for approved owner-user testimonial copy.",
  "Reserved for approved investor testimonial copy.",
];

export default function ServicesPage() {
  const inventorySqft = LISTINGS.reduce((total, listing) => total + (listing.sqft || 0), 0);
  const assetClasses = new Set(LISTINGS.map((listing) => listing.assetClass)).size;
  const activeNodes = new Set(LISTINGS.map((listing) => listing.location)).size;

  return (
    <div className="services-premium-page services-premium-page-v2">
      <section className="page-hero slim-hero page-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="flex flex-wrap gap-2">
                <span className="eyebrow">Services</span>
                <span className="rounded-full border border-black/10 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/60">Market Pulse · March 2026</span>
              </div>
              <h1 className="m-0 mt-4 max-w-[10.5ch] text-[clamp(3rem,7vw,6.2rem)] leading-[0.92] tracking-[-0.07em]">
                Advisory paths that read like commercial strategy, not brochure filler.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[1.04rem] leading-8 text-black/80">
                The services page now works like an editorial CRE narrative: stronger hierarchy, alternating image-and-text chapters, deeper expansion content, sharper jargon, and a clearer route into the right mandate.
              </p>
              <div className="hero-proof-row mt-6">
                <span className="proof-chip">Alternating story-led sections</span>
                <span className="proof-chip">Institutional CTA language</span>
                <span className="proof-chip">Who we serve</span>
                <span className="proof-chip">Proof + case examples</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/listings" className="button button-primary">Request Confidential Offering Memorandum</Link>
                <Link to="/contact#analysis-workflow" className="button button-secondary">Launch requirement brief</Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="grid gap-4">
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/60 bg-white shadow-luxe">
              <img src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1500&q=80" alt="Commercial real estate strategy session" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
                <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">Why this rebuild matters</div>
                <div className="mt-2 text-2xl font-extrabold leading-tight tracking-[-0.05em] text-[#151515]">Less static grid. More authored decision support.</div>
              </div>
            </div>
            <div className="services-proof-strip">
              {[
                ["Active mandates", LISTINGS.length, "opportunities in current build"],
                ["Current inventory", inventorySqft, "SF showcased across live listings"],
                ["Asset classes", assetClasses, "industrial, office, retail, land, mixed-use"],
                ["GTA nodes", activeNodes, "markets represented in current inventory"],
              ].map(([label, value, note]) => (
                <article key={label} className="services-proof-stat">
                  <small>{label}</small>
                  <strong><Counter value={Number(value)} separator={label === "Current inventory"} suffix={label === "Current inventory" ? " SF" : ""} /></strong>
                  <span>{note}</span>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section pt-8 lg:pt-10">
        <div className="container grid gap-7">
          {serviceBlocks.map((service, index) => (
            <motion.article
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className={`service-story-card service-story-card--editorial ${index % 2 === 1 ? "is-reversed" : ""}`}
            >
              <div className="service-story-card__visual">
                <img src={service.image} alt={service.title} />
                <div className="service-story-card__visual-overlay" />
                <div className="service-story-card__badge-row">
                  <span>{service.slug.replaceAll("-", " ")}</span>
                  <span>KOLT Lens</span>
                </div>
              </div>
              <div className="service-story-card__content">
                <div className="eyebrow">Service {index + 1}</div>
                <h2>{service.title}</h2>
                <p className="service-story-card__intro">{service.intro}</p>
                <div className="service-story-card__summary">{service.summary}</div>
                <div className="service-story-card__chips">
                  {service.chips.map((chip) => <Chip key={chip} label={chip} />)}
                </div>
                <div className="service-story-card__learnmore">
                  {service.learnMore.map((row) => (
                    <Accordion key={row.title} disableGutters>
                      <AccordionSummary expandIcon={<span className="text-lg font-bold">+</span>}>
                        <div className="text-[1rem] font-extrabold tracking-[-0.03em]">{row.title}</div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <p className="m-0 text-[0.98rem] leading-7 text-black/78">{row.body}</p>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </div>
                <div className="service-story-card__actions">
                  <Link className="button button-primary small-button" to="/contact#analysis-workflow">{service.cta}</Link>
                  <Link className="button button-secondary small-button" to="/tools">Pressure-test this path</Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Who we serve</div>
              <h2>Three commercial lenses. Three very different decision patterns.</h2>
            </div>
            <p>
              Investors, owner-users, and developers do not evaluate the same asset the same way. The page now says that clearly.
            </p>
          </div>
          <div className="services-persona-grid">
            {personas.map((persona) => (
              <article key={persona.title} className="services-persona-card">
                <h3>{persona.title}</h3>
                <p>{persona.body}</p>
                <ul>
                  {persona.bullets.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-6 lg:grid-cols-[.92fr_1.08fr] items-start">
          <div className="services-proof-panel">
            <div className="eyebrow">Proof + trust</div>
            <h2>Give the page enough commercial proof that the advisory tone feels earned.</h2>
            <p>
              This pass adds a proper proof layer: live-inventory scale metrics, public track-record snapshots, represented markets, mandate-style examples, and testimonial-ready slots awaiting approved client quote language.
            </p>
            <div className="services-proof-panel__stats">
              <article>
                <small>Current active listings</small>
                <strong>{LISTINGS.length}</strong>
              </article>
              <article>
                <small>Current inventory</small>
                <strong>{inventorySqft.toLocaleString()} SF</strong>
              </article>
              <article>
                <small>Markets currently represented</small>
                <strong>{activeNodes}</strong>
              </article>
            </div>
            <div className="services-proof-panel__stats mt-4">
              {publicTrackRecord.map((item) => (
                <article key={item.metric}>
                  <small>{item.metric}</small>
                  <strong>{item.value}</strong>
                  <span>{item.note}</span>
                </article>
              ))}
            </div>
            <div className="services-proof-panel__represented mt-4">
              <div className="text-[0.74rem] font-extrabold uppercase tracking-[0.16em] text-black/55">Selected publicly referenced properties / markets</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {representedPlaces.map((place) => (
                  <span key={place} className="proof-chip">{place}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {voicePlaceholders.map((quote, index) => (
              <blockquote key={quote} className="services-voice-card">
                <span>Client voice slot {index + 1}</span>
                <p>“{quote}”</p>
                <footer>Pending approved testimonial</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">Case-style examples</div>
              <h2>Give the user a glimpse of how the mandate gets framed in the real world.</h2>
            </div>
            <p>
              These are not fictional transaction claims. They are advisory-style examples designed to show how KOLT would structure the conversation.
            </p>
          </div>
          <div className="services-case-grid">
            {caseExamples.map((item) => (
              <article key={item.title} className="services-case-card">
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next move"
        title="Use the rebuilt services page to move naturally into listings, tools, and contact."
        body="The service story now sets up the rest of the site properly: institutional language, cleaner mandate fit, better proof, and better next actions."
        primaryLabel="Browse listings"
        primaryTo="/listings"
        secondaryLabel="Launch requirement brief"
        secondaryTo="/contact#analysis-workflow"
      />
    </div>
  );
}
