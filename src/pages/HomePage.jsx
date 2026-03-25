import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import LeadForm from "../components/LeadForm";
import ListingCard from "../components/ListingCard";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { LISTINGS, BLOG_POSTS } from "../data/siteData";
import { SITE } from "../config/site";

const AUDIENCES = [
  {
    title: "Tenants",
    body: "For businesses leasing their first serious space or comparing the next one with less guesswork and stronger timing.",
  },
  {
    title: "Owner-users",
    body: "For companies deciding whether leasing still serves them or whether buying creates more long-term control.",
  },
  {
    title: "Investors",
    body: "For buyers evaluating industrial, office, and retail opportunities through use, income, and flexibility.",
  },
  {
    title: "Developers",
    body: "For land or repositioning opportunities where location logic, timing, and neighbourhood understanding matter early.",
  },
];

const PROCESS = [
  ["1. Clarify the brief", "Needs, use, size, budget, timing, and what would make the move genuinely successful."],
  ["2. Build the shortlist", "A focused set of 3–5 stronger-fit options instead of endless browsing and dead-end tours."],
  ["3. Compare strategically", "Costs, access, team convenience, image, flexibility, and long-term operational fit."],
  ["4. Negotiate from options", "Use alternatives, timing, and market context to protect flexibility and reduce avoidable risk."],
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
              <span className="pill">Warehouse demo kept separate from the sales flow</span>
            </div>

            <div style={{ marginTop: "18px" }}>
              <div className="kicker">Commercial space, chosen with more clarity</div>
              <h1>Industrial condos, warehouse space, retail opportunities, and growth-focused leasing support across the GTA.</h1>
              <p className="muted hero-lead">
                This demo is built to compete like a serious Toronto-area commercial real-estate site: tighter positioning, cleaner next steps, practical tools, and stronger fit-based property selection.
              </p>
            </div>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/contact">Book a 15-minute strategy call</Link>
              <Link className="btn btn-secondary" to="/listings">Browse opportunities</Link>
              <button className="btn btn-ghost" type="button" onClick={openLeadMagnet}>Get the checklist</button>
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
                intro="Share the broad requirement and stage so the demo stores a cleaner lead than the earlier inline form."
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
                note="We respond with practical next steps, not spam."
              />

              <div className="card soft hero-side-card">
                <div>
                  <div className="kicker">Trust strip</div>
                  <h3 style={{ marginTop: "8px" }}>What this site is built to prove</h3>
                  <div className="mini-proof-list">
                    <div><strong>Brokerage style:</strong> polished commercial advisory presentation</div>
                    <div><strong>Focus:</strong> leasing, industrial space, office, retail, land</div>
                    <div><strong>Coverage:</strong> {SITE.serviceAreas.join(", ")}</div>
                    <div><strong>Angle:</strong> finance-aware, fit-focused, shortlist-first guidance</div>
                  </div>
                </div>

                <div>
                  <div className="kicker">Secondary feature</div>
                  <p className="muted" style={{ marginTop: "8px" }}>The warehouse walkthrough stays available for demo value, but the main sales flow stays focused on trust, listings, tools, and conversion.</p>
                  <Link className="btn btn-ghost" to="/warehouse">Open warehouse demo</Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-stage willEnter" aria-label="Commercial real estate image collage">
            <div className="hero-image-main" data-depth="0.06">
              <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80" alt="Modern office and commercial building exterior in a premium business district" />
            </div>
            <div className="hero-image-mini one" data-depth="0.11">
              <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80" alt="Bright retail storefront with modern pedestrian-friendly frontage" />
            </div>
            <div className="hero-image-mini two" data-depth="0.09">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80" alt="Warehouse and logistics exterior with loading access" />
            </div>
            <div className="float-card a">
              <div className="fc-kicker">Service areas</div>
              <strong>{SITE.serviceAreas[0]} to {SITE.serviceAreas[3]}</strong>
              <p>Built for GTA business movement, not generic national copy.</p>
            </div>
            <div className="float-card b">
              <div className="fc-kicker">Asset classes</div>
              <strong>Industrial, office, retail, land</strong>
              <p>Enough range to feel credible, narrow enough to stay useful.</p>
            </div>
            <div className="float-card c">
              <div className="fc-kicker">Decision style</div>
              <strong>Shortlist first.</strong>
              <p>3–5 better-fit options beat 50 weak ones every time.</p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Who I help</div>
              <h2>Different client types. One calm, strategic decision flow.</h2>
            </div>
            <p>The page is designed so visitors can recognize themselves quickly and move toward the right next step without sorting through irrelevant messaging.</p>
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
              <h2>Commercial property types the demo is built to showcase well.</h2>
            </div>
            <p>Each card is intentionally simple so the homepage stays premium and digestible while still feeling specialized.</p>
          </div>
          <div className="grid grid-4">
            {SITE.assetClasses.map((item) => (
              <div className="card glow reveal compact-card" key={item}>
                <div className="kicker">Asset class</div>
                <h3 style={{ marginTop: "8px" }}>{item}</h3>
                <p className="muted">Presented with fit, location, practicality, and next-step clarity instead of generic brochure copy.</p>
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
              <h2>Built for a Toronto-area market where local clarity matters.</h2>
            </div>
            <p>This section makes the site feel grounded in real geography, which is critical in a competitive GTA market.</p>
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
              <h2>A process that makes the move feel more controlled and less reactive.</h2>
            </div>
            <p>The purpose of the process section is to make the site read like a real advisor platform, not just a set of pretty pages.</p>
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
              <h2>Examples that preview the listings flow right from the homepage.</h2>
            </div>
            <p>These cards make the homepage feel useful immediately and create a direct path into the listing-detail experience.</p>
          </div>
          <div className="grid">
            {featuredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </div>
          <div style={{ marginTop: "16px" }}>
            <Link className="btn btn-secondary" to="/listings">View all listings</Link>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Guides</div>
              <h2>Support content that helps this site feel authoritative, not empty.</h2>
            </div>
            <p>Short practical content pieces help the demo feel closer to a real lead-generation platform.</p>
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
                <Link className="btn btn-ghost btn-sm" to={`/guides/${post.slug}`}>Read guide</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        kicker="Primary next step"
        title="Ready to turn the demo into a full commercial real-estate platform?"
        body="This build now has the positioning and structure to move into deeper page work, listing expansion, tools refinement, and final SEO/deployment polish in later batches."
        primary={{ label: "Book a consultation", to: "/contact" }}
        secondary={{ label: "Explore tools", to: "/tools" }}
      />
    </div>
  );
}
