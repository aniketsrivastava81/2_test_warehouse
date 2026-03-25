import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import LeadForm from "../components/LeadForm";
import ListingCard from "../components/ListingCard";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { LISTINGS, BLOG_POSTS } from "../data/siteData";
import { SITE } from "../config/site";
import { trackEvent } from "../utils/tracking";

const AUDIENCES = [
  {
    title: "Tenants",
    body: "Leasing support for businesses opening, relocating, renewing, or expanding into better-fit commercial space.",
  },
  {
    title: "Owner-users",
    body: "Guidance for business owners comparing the flexibility of leasing against the control and equity of buying.",
  },
  {
    title: "Investors",
    body: "Investment-minded analysis for commercial opportunities where income, downside protection, and location logic matter.",
  },
  {
    title: "Developers",
    body: "Early-stage support on land and repositioning opportunities where timing, context, and corridor selection matter.",
  },
];

const ASSET_CONTENT = [
  ["Industrial Condos", "For owner-users and operators who want control, loading utility, and a right-sized footprint."],
  ["Warehouses", "For distribution, light manufacturing, logistics, and service businesses that need scale and function."],
  ["Retail Plazas", "For businesses that depend on visibility, parking, customer flow, and the right neighbouring mix."],
  ["Development Land", "For buyers looking at future use, site context, and long-term value across growth corridors."],
];

const PROCESS = [
  ["1. Clarify the brief", "Define use, size, budget, timing, and the non-negotiables before the search starts."],
  ["2. Build the shortlist", "Narrow the market to the options worth serious attention instead of wasting tours on weak fits."],
  ["3. Compare strategically", "Review cost, access, team convenience, image, flexibility, and operating fit side by side."],
  ["4. Negotiate with leverage", "Move into tours and negotiations with real alternatives and a clearer decision path."],
];

export default function HomePage() {
  const { openLeadMagnet } = useLeadMagnet();
  const featuredListings = useMemo(() => LISTINGS.filter((item) => item.featured).slice(0, 3), []);
  const featuredGuides = useMemo(() => BLOG_POSTS.slice(0, 3), []);

  return (
    <div className="home-shell">
      <section className="hero-v2 hero-v3">
        <div className="container hero-v2-grid">
          <div className="card glow hero-copy willEnter">
            <div className="badges">
              <span className="pill"><strong>GTA Commercial & Industrial Advisory</strong></span>
              <span className="pill">For tenants, owner-users, investors, and developers</span>
              <span className="pill">Warehouse walkthrough available as a secondary showcase</span>
            </div>

            <div style={{ marginTop: "18px" }}>
              <div className="kicker">Commercial space, chosen with more clarity</div>
              <h1>Industrial condos, warehouse space, retail opportunities, and growth-focused leasing support across the GTA.</h1>
              <p className="muted hero-lead">
                Megha helps clients compare locations, shortlist stronger spaces, and move into leasing or ownership decisions with a finance-aware process.
              </p>
            </div>

            <div className="hero-actions">
              <Link
                className="btn btn-primary"
                to="/contact"
                onClick={() => trackEvent("hero_cta_click", { cta: "book_strategy_call", page: "home" })}
              >
                Book a 15-minute strategy call
              </Link>
              <Link
                className="btn btn-secondary"
                to="/listings"
                onClick={() => trackEvent("hero_cta_click", { cta: "browse_opportunities", page: "home" })}
              >
                Browse opportunities
              </Link>
              <button
                className="btn btn-ghost"
                type="button"
                onClick={() => {
                  trackEvent("checklist_open", { page: "home", placement: "hero" });
                  openLeadMagnet();
                }}
              >
                Get the checklist
              </button>
            </div>

            <div className="hero-highlights home-proof-grid">
              {SITE.proofPoints.map((item) => (
                <span className="pill" key={item}><strong>{item}</strong></span>
              ))}
            </div>

            <div className="hr"></div>

            <div className="hero-form-wrap">
              <LeadForm
                title="Request a tailored shortlist of 3–5 spaces"
                intro="Share the requirement and Megha can begin with a tighter brief and a more useful first shortlist."
                storageKey="MM_leads"
                source="hero-shortlist"
                context="Homepage shortlist request"
                submitLabel="Request shortlist"
                interestLabel="What are you looking for?"
                interestOptions={["Industrial / Warehouse", "Office", "Retail", "Land / Development"]}
                locationLabel="Preferred area"
                timelineLabel="Where are you in the process?"
                timelineOptions={[
                  "First commercial lease",
                  "Lease renewal in 0–6 months",
                  "Relocating / scaling",
                  "Owner-user purchase exploration",
                ]}
                includePhone={false}
                includeMessage={false}
                variant="compact"
                note="Expect a practical response focused on fit, timing, and next steps."
                onSuccess={() => trackEvent("shortlist_request_submit", { page: "home", source: "hero-shortlist" })}
              />

              <div className="card soft hero-side-card">
                <div>
                  <div className="kicker">Why clients start here</div>
                  <h3 style={{ marginTop: "8px" }}>Clear brief. Better shortlist. Stronger next move.</h3>
                  <div className="mini-proof-list">
                    <div><strong>Brokerage:</strong> {SITE.brokerage}</div>
                    <div><strong>Coverage:</strong> {SITE.serviceAreas.join(", ")}</div>
                    <div><strong>Focus:</strong> industrial, office, retail, and development opportunities</div>
                    <div><strong>Approach:</strong> finance-aware, fit-focused, shortlist-first guidance</div>
                  </div>
                </div>

                <div>
                  <div className="kicker">Interactive showcase</div>
                  <p className="muted" style={{ marginTop: "8px" }}>
                    Explore the warehouse walkthrough after the core pages if you want to see the interactive demo without leaving the main sales flow.
                  </p>
                  <Link
                    className="btn btn-ghost"
                    to="/warehouse"
                    onClick={() => trackEvent("warehouse_route_open", { page: "home", placement: "hero-side" })}
                  >
                    Open warehouse walkthrough
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-stage willEnter" aria-label="Commercial real estate image collage">
            <div className="hero-image-main" data-depth="0.06">
              <img
                src="/images/hero-office.svg"
                alt="Premium GTA office and commercial environment"
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <div className="hero-image-mini one" data-depth="0.11">
              <img src="/images/hero-retail.svg" alt="Retail frontage with visibility and walk-in access" loading="eager" decoding="async" />
            </div>
            <div className="hero-image-mini two" data-depth="0.09">
              <img src="/images/hero-warehouse.svg" alt="Warehouse access and distribution-ready exterior" loading="eager" decoding="async" />
            </div>
            <div className="float-card a">
              <div className="fc-kicker">Service areas</div>
              <strong>{SITE.serviceAreas[0]} to {SITE.serviceAreas[3]}</strong>
              <p>Coverage across the key GTA corridors where fit, timing, and access matter most.</p>
            </div>
            <div className="float-card b">
              <div className="fc-kicker">Asset classes</div>
              <strong>Industrial, office, retail, land</strong>
              <p>Commercial property types approached through use, location logic, and decision quality.</p>
            </div>
            <div className="float-card c">
              <div className="fc-kicker">Decision style</div>
              <strong>Shortlist first.</strong>
              <p>Three strong options usually create better outcomes than fifty weak ones.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Who I help</div>
              <h2>Advice tailored to the kind of move you are actually making.</h2>
            </div>
            <p>Whether the priority is a first lease, a renewal decision, a better owner-user path, or a location-driven investment move, the process begins with fit.</p>
          </div>
          <div className="grid grid-4">
            {AUDIENCES.map((item) => (
              <div className="card soft reveal" key={item.title}>
                <div className="kicker">Audience</div>
                <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
                <p className="muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Asset classes</div>
              <h2>Commercial property types Megha helps clients source and evaluate.</h2>
            </div>
            <p>Every space is screened for how it works in practice: layout, access, visibility, occupancy cost, and the role it needs to play for the business.</p>
          </div>
          <div className="grid grid-4">
            {ASSET_CONTENT.map(([title, body]) => (
              <div className="card glow reveal compact-card" key={title}>
                <div className="kicker">Asset class</div>
                <h3 style={{ marginTop: "8px" }}>{title}</h3>
                <p className="muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Service areas</div>
              <h2>Coverage across the GTA corridors where access and context shape better decisions.</h2>
            </div>
            <p>Toronto, Vaughan, Mississauga, Brampton, Markham, North York, and Richmond Hill all ask different questions. The search should reflect that.</p>
          </div>
          <div className="badges area-chip-grid">
            {SITE.serviceAreas.map((area) => (
              <span className="pill" key={area}><strong>{area}</strong></span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">How I help</div>
              <h2>A process built to keep commercial moves more controlled and less reactive.</h2>
            </div>
            <p>Good representation narrows the market, tests the fit, and helps you move into tours and negotiations with better information.</p>
          </div>
          <div className="grid grid-2">
            {PROCESS.map(([title, body]) => (
              <div className="card soft reveal" key={title}>
                <h3>{title}</h3>
                <p className="muted">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Featured opportunities</div>
              <h2>A few examples to start the shortlist conversation.</h2>
            </div>
            <p>Use these as the first comparison points, then move into the full listings page if the location or property type is close to the brief.</p>
          </div>
          <div className="grid">
            {featuredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </div>
          <div style={{ marginTop: "16px" }}>
            <Link
              className="btn btn-secondary"
              to="/listings"
              onClick={() => trackEvent("hero_cta_click", { cta: "view_all_listings", page: "home" })}
            >
              View all listings
            </Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Guides</div>
              <h2>Practical reading for the questions that usually come before the tour.</h2>
            </div>
            <p>Start with the guide that matches the decision in front of you, then move into the tools or listings once the shortlist starts to tighten.</p>
          </div>
          <div className="grid grid-3">
            {featuredGuides.map((post) => (
              <article className="card soft reveal" key={post.slug}>
                <div className="badges" style={{ marginBottom: "10px" }}>
                  <span className="pill"><strong>{post.tag}</strong></span>
                  <span className="pill">{post.date}</span>
                </div>
                <h3>{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
                <Link
                  className="btn btn-ghost btn-sm"
                  to={`/guides/${post.slug}`}
                  onClick={() => trackEvent("guide_open", { slug: post.slug, source: "home" })}
                >
                  Read guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        kicker="Primary next step"
        title="Ready to move from browsing to a stronger commercial real-estate strategy?"
        body="Book a short consultation or explore the tools page to compare locations, occupancy costs, and the next move with more clarity."
        primary={{ label: "Book a consultation", to: "/contact" }}
        secondary={{ label: "Explore tools", to: "/tools" }}
      />
    </div>
  );
}
