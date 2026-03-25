import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LISTINGS, BLOG_POSTS } from "../data/siteData";
import { useLeadMagnet } from "../context/LeadMagnetContext";

export default function HomePage() {
  const { openLeadMagnet } = useLeadMagnet();
  const [form, setForm] = useState({ email: "", need: "", stage: "" });
  const [saved, setSaved] = useState(false);

  const submitHero = (event) => {
    event.preventDefault();
    const key = "MM_leads";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.unshift({ ...form, ts: new Date().toISOString(), source: "hero-form" });
    localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
    setSaved(true);
    setForm({ email: "", need: "", stage: "" });
    window.setTimeout(() => setSaved(false), 6500);
  };

  return (
    <div className="home-shell">
      <section className="hero-v2">
        <div className="container hero-v2-grid">
          <div className="card glow hero-copy willEnter">
            <div className="badges">
              <span className="pill">
                <strong>Commercial Leasing • GTA</strong>
              </span>
              <span className="pill">Authoritative, approachable, deeply resourceful</span>
              <span className="pill">Built for first leases, renewals, and relocations</span>
            </div>

            <div style={{ marginTop: "18px" }}>
              <div className="kicker">Finding the right space for the next chapter</div>
              <h1>
                Commercial spaces chosen with more clarity, presented with better fit, and negotiated
                with less guesswork.
              </h1>
              <p className="muted">
                <strong>If it’s your first lease:</strong> we explain the process in plain language,
                make the clauses less intimidating, and protect you from terms that feel small now
                but become expensive later.
                <br />
                <br />
                <strong>If you’re relocating or renewing:</strong> we help you compare better-fit
                options, evaluate whether staying still serves the business, and negotiate from
                leverage instead of urgency.
              </p>
            </div>

            <div className="hero-kpis">
              <div className="hero-kpi">
                <div className="num">20+</div>
                <div className="lbl">Years of commercial real estate guidance in the GTA</div>
              </div>
              <div className="hero-kpi">
                <div className="num">50+</div>
                <div className="lbl">Businesses helped into better-fit locations</div>
              </div>
              <div className="hero-kpi">
                <div className="num">3–5</div>
                <div className="lbl">Focused options instead of endless browsing</div>
              </div>
            </div>

            <div className="hero-highlights">
              <span className="pill">
                <strong>Property sourcing</strong> that saves time
              </span>
              <span className="pill">
                <strong>Lease negotiation</strong> that reduces risk
              </span>
              <span className="pill">
                <strong>Market analysis</strong> you can actually use
              </span>
            </div>

            <div className="hr"></div>

            <div className="hero-form-wrap">
              <form className="form card soft" onSubmit={submitHero}>
                <div className="field">
                  <label htmlFor="h_email">Get a shortlist of 3–5 commercial spaces</label>
                  <input
                    id="h_email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                  />
                </div>

                <div className="field">
                  <label htmlFor="h_need">What do you need?</label>
                  <select
                    id="h_need"
                    name="need"
                    required
                    value={form.need}
                    onChange={(e) => setForm((s) => ({ ...s, need: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option>Office</option>
                    <option>Retail</option>
                    <option>Warehouse / Industrial</option>
                    <option>Mixed use / Not sure yet</option>
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="h_stage">Where are you in the process?</label>
                  <select
                    id="h_stage"
                    name="stage"
                    required
                    value={form.stage}
                    onChange={(e) => setForm((s) => ({ ...s, stage: e.target.value }))}
                  >
                    <option value="" disabled>
                      Select one
                    </option>
                    <option>First commercial lease</option>
                    <option>Lease renewal in 0–6 months</option>
                    <option>Relocating / scaling</option>
                    <option>Exploring early options</option>
                  </select>
                </div>

                <button className="btn btn-primary" type="submit">
                  Request a free shortlist
                </button>

                {!saved ? null : (
                  <div className="toast">
                    <strong>Saved.</strong> Demo mode: no email is sent.
                  </div>
                )}

                <p className="tiny muted">We respond with practical next steps, not spam.</p>
              </form>

              <div className="card soft hero-side-card">
                <div>
                  <div className="kicker">Lead Magnet</div>
                  <h3 style={{ marginTop: "8px" }}>Lease Renewal vs. Relocation Checklist</h3>
                  <p className="muted">
                    A simple decision tool to help first-time renters and established businesses
                    compare the right path.
                  </p>
                </div>

                <div>
                  <button className="btn btn-secondary" type="button" onClick={openLeadMagnet}>
                    Download the checklist
                  </button>
                  <div className="hr"></div>
                  <div className="kicker">Tools</div>
                  <p className="muted" style={{ marginTop: "8px" }}>
                    Footfall, neighborhood insight, ROI, lease-vs-buy, CAM, and market trend
                    support.
                  </p>
                  <Link className="btn btn-ghost" to="/tools">
                    Open tools page
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <aside className="hero-stage willEnter" aria-label="Commercial leasing image collage">
            <div className="hero-image-main" data-depth="0.06">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80"
                alt="Modern office and commercial building exterior in a premium business district"
              />
            </div>

            <div className="hero-image-mini one" data-depth="0.11">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                alt="Bright retail storefront with modern pedestrian-friendly frontage"
              />
            </div>

            <div className="hero-image-mini two" data-depth="0.09">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"
                alt="Warehouse and logistics exterior with loading access"
              />
            </div>

            <div className="float-card a">
              <div className="fc-kicker">First-time leasers</div>
              <strong>No jargon.</strong>
              <p>We explain lease language, cost structure, and timeline risk clearly.</p>
            </div>

            <div className="float-card b">
              <div className="fc-kicker">Renewal or relocation</div>
              <strong>More leverage.</strong>
              <p>Compare multiple paths before your current deadline starts controlling the decision.</p>
            </div>

            <div className="float-card c">
              <div className="fc-kicker">Shortlists</div>
              <strong>3–5 options.</strong>
              <p>Better comparisons. Less noise. Faster decisions.</p>
            </div>

            <div className="hero-scroll-note">
              <div className="hero-scroll-line"></div>
              <span>Commercial leasing • GTA</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="media-strip">
        <div className="container">
          <div className="marquee-shell">
            <div className="marquee-track">
              {Array.from({ length: 2 }).map((_, idx) => (
                <React.Fragment key={idx}>
                  <span>
                    <strong>Relationship-first guidance</strong> backed by 20+ years
                  </span>
                  <span>
                    <strong>Property sourcing</strong> for office, retail, and warehouse needs
                  </span>
                  <span>
                    <strong>Lease negotiation</strong> with more clarity and less pressure
                  </span>
                  <span>
                    <strong>Market analysis</strong> that improves decision quality
                  </span>
                  <span>
                    <strong>Neighborhood insight</strong> for access, footfall, and convenience
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">The real problem</div>
              <h2>
                Leasing feels heavy when the stakes are real, the timing is tight, and the fine
                print is easy to underestimate.
              </h2>
            </div>
            <p>
              The pressure is different for every client, but the risk is the same: rushing into a
              space that looks right on the surface while missing the costs, limitations, or
              neighborhood realities that matter later.
            </p>
          </div>

          <div className="grid grid-3 soft-scroll-stack">
            {[
              {
                title: "First lease anxiety",
                image:
                  "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
                body:
                  "You are excited about growth, but also worried about hidden costs, confusing lease language, and committing to the wrong location too early.",
                pills: ["We simplify the process", "Plain language guidance"],
              },
              {
                title: "Expiring lease pressure",
                image:
                  "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
                body:
                  "When the clock gets close, leverage drops. Businesses often renew too quickly or accept a weaker deal because alternatives were not prepared in time.",
                pills: ["We build options before urgency wins", "Better timing, better posture"],
              },
              {
                title: "Operational misfit",
                image:
                  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
                body:
                  "Even good-looking spaces can quietly hurt productivity if layout, parking, access, staff commute, or surrounding amenities do not support the way the business runs.",
                pills: ["We align space with operations", "Fit beyond square footage"],
              },
            ].map((card) => (
              <div className="card soft journey-card reveal" key={card.title}>
                <div className="journey-image">
                  <img src={card.image} alt={card.title} />
                  <div className="image-top-overlay"></div>
                </div>
                <h3>{card.title}</h3>
                <p className="muted">{card.body}</p>
                <div className="card-meta">
                  {card.pills.map((pill) => (
                    <span className="pill" key={pill}>
                      {pill.includes("We ") ? <strong>{pill}</strong> : pill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Two client journeys</div>
              <h2>
                The page is built for both the first-time renter and the established business planning
                its next move.
              </h2>
            </div>
            <p>
              The information stays the same, but the journey becomes easier to absorb when it is
              organized visually around the client’s real decision path.
            </p>
          </div>

          <div className="grid grid-2">
            <div className="card glow reveal">
              <div className="journey-image">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80"
                  alt="Young business owner reviewing space options with confidence and support"
                />
                <div className="image-top-overlay"></div>
              </div>
              <div className="kicker">Persona A</div>
              <h3>First-time business owner</h3>
              <p className="muted">
                The main pain points are uncertainty, fear of overcommitting, and not fully
                understanding what a commercial lease can actually cost once operating expenses and
                obligations show up.
              </p>
            </div>

            <div className="card glow reveal">
              <div className="journey-image">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                  alt="Established business owner reviewing renewal and relocation choices"
                />
                <div className="image-top-overlay"></div>
              </div>
              <div className="kicker">Persona B</div>
              <h3>Relocating or scaling business owner</h3>
              <p className="muted">
                The pressure is usually speed, disruption, staff convenience, logistics, and
                negotiating from a position of strength before the current lease window starts
                dictating terms.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Core services</div>
              <h2>
                Property sourcing, lease negotiation, and market analysis built for calm,
                informed decisions.
              </h2>
            </div>
            <p>
              The website is designed to be visually easier to digest while still holding on to the
              practical intelligence that helps real clients move forward.
            </p>
          </div>

          <div className="grid grid-3">
            {[
              {
                title: "Property Sourcing",
                img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
                body:
                  "We filter options before they reach you, so the shortlist aligns with budget, operations, team access, and long-term fit.",
                rows: [
                  ["Use-fit screening", "zoning + practicality"],
                  ["Commute review", "staff + client ease"],
                  ["Space match", "office / retail / warehouse"],
                  ["Search style", "shortlist > overload"],
                ],
              },
              {
                title: "Lease Negotiation",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
                body:
                  "We help clients understand the terms that shape flexibility later: renewal options, assignments, sublease rights, occupancy costs, and escalation structure.",
                rows: [
                  ["Risk reduction", "fewer surprises later"],
                  ["Renewal awareness", "avoid weak extensions"],
                  ["Assignment rights", "preserve flexibility"],
                  ["Cost clarity", "rent + ops + structure"],
                ],
              },
              {
                title: "Market Analysis",
                img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
                body:
                  "We translate neighborhood data, market movement, and practical comparison into something clients can actually use to decide.",
                rows: [
                  ["Comparable lease ranges", "context over guesswork"],
                  ["Neighborhood insight", "fit + convenience"],
                  ["Decision support", "renew / relocate / buy"],
                  ["Timing strategy", "leverage improves early"],
                ],
              },
            ].map((service) => (
              <div className="card glow service-card reveal" key={service.title}>
                <div className="service-image">
                  <img src={service.img} alt={service.title} />
                  <div className="image-top-overlay"></div>
                </div>
                <h3>{service.title}</h3>
                <p className="muted">{service.body}</p>
                <div className="metric-inline">
                  {service.rows.map(([k, v]) => (
                    <div className="row" key={k}>
                      <b>{k}</b>
                      <span>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="inline-callout" style={{ marginTop: "18px" }}>
            <div>
              <div className="kicker">If you only do one thing</div>
              <div>
                <strong>Start earlier than feels necessary.</strong> A six-month runway usually
                creates better terms, better options, and less panic.
              </div>
            </div>
            <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
              Get the checklist
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Featured options</div>
              <h2>Office, retail, and warehouse examples presented around fit—not just square footage.</h2>
            </div>
            <p>
              Each card keeps the same structure: vibe, practicality, location advantage, and lease
              flexibility.
            </p>
          </div>

          <div className="featured-grid">
            {LISTINGS.slice(0, 3).map((listing) => (
              <article className="card soft listing-card-v2 reveal" key={listing.id}>
                <div className="listing-image">
                  <img src={listing.img} alt={listing.title} />
                  <div className="image-top-overlay"></div>
                </div>
                <div className="badges">
                  <span className="pill">
                    <strong>{listing.type}</strong>
                  </span>
                  <span className="pill">{listing.city}</span>
                  <span className="pill">
                    <strong>{listing.highlights[0]}</strong>
                  </span>
                </div>
                <h3 style={{ marginTop: "10px" }}>{listing.title}</h3>
                <p className="muted">{listing.vibe}</p>
                <div className="table-like" style={{ marginTop: "12px" }}>
                  <div className="row">
                    <b>Vibe</b>
                    <span>{listing.vibe}</span>
                  </div>
                  <div className="row">
                    <b>Practicality</b>
                    <span>{listing.highlights.join(" • ")}</span>
                  </div>
                  <div className="row">
                    <b>Location Advantage</b>
                    <span>{listing.locationAdvantage}</span>
                  </div>
                  <div className="row">
                    <b>Lease Flexibility</b>
                    <span>{listing.leaseFlex}</span>
                  </div>
                </div>
                <div className="hero-actions">
                  <Link className="btn btn-primary btn-sm" to={`/listings/${listing.id}`}>
                    View details
                  </Link>
                  <Link className="btn btn-ghost btn-sm" to="/tools#footfall">
                    Footfall tool
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="inline-callout" style={{ marginTop: "18px" }}>
            <div>
              <div className="kicker">Search-first experience</div>
              <div>
                <strong>Want filters and a map?</strong> Browse all listings by type, square
                footage, and location.
              </div>
            </div>
            <Link className="btn btn-secondary" to="/listings">
              Open listings
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Decision tools</div>
              <h2>
                The page stays informative, but the tool layer makes the information more interactive
                and more digestible.
              </h2>
            </div>
            <p>
              Instead of forcing visitors to read every line at once, the tools let them engage with
              the same intelligence in a more hands-on, visual way.
            </p>
          </div>

          <div className="stacked-panels">
            <div className="card soft reveal">
              <div className="service-image">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                  alt="Commercial district image representing neighborhood and footfall analysis"
                />
                <div className="image-top-overlay"></div>
              </div>
              <h3>Footfall + Neighborhood Insight</h3>
              <p className="muted">
                Use walkability, transit, convenience, and surrounding amenities to estimate how a
                location may support staff, clients, and visibility.
              </p>
              <Link className="btn btn-ghost btn-sm" to="/tools#footfall">
                Open tool
              </Link>
            </div>

            <div className="card soft reveal">
              <div className="service-image">
                <img
                  src="https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1400&q=80"
                  alt="Business planning and financial review scene for lease renewal versus relocation strategy"
                />
                <div className="image-top-overlay"></div>
              </div>
              <h3>Lease vs. Buy / ROI Support</h3>
              <p className="muted">
                Frame the right decision based on occupancy costs, flexibility, growth timing, and
                practical business tradeoffs.
              </p>
              <Link className="btn btn-ghost btn-sm" to="/tools#roi">
                Explore tools
              </Link>
            </div>

            <div className="card soft reveal">
              <div className="service-image">
                <img
                  src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                  alt="Office goers in a polished urban area representing movement, convenience, and daytime activity"
                />
                <div className="image-top-overlay"></div>
              </div>
              <h3>Warehouse + 3D Game Experience</h3>
              <p className="muted">
                The warehouse page now lives inside the React project as its own routed experience,
                preserving the approved 3D pallet game.
              </p>
              <Link className="btn btn-ghost btn-sm" to="/warehouse">
                Open warehouse
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header section-accent">
            <div>
              <div className="kicker">Guides</div>
              <h2>Supportive content that reduces buyer anxiety before it turns into indecision.</h2>
            </div>
            <p>
              The same premium visual system continues into neighborhood and lease strategy content.
            </p>
          </div>

          <div className="grid grid-2">
            {BLOG_POSTS.slice(1).map((post) => (
              <article className="card soft guide-card-v2 reveal" key={post.slug}>
                <div className="guide-image">
                  <img
                    src={
                      post.slug === "lease-renewal-vs-relocation"
                        ? "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1400&q=80"
                        : "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80"
                    }
                    alt={post.title}
                  />
                  <div className="image-top-overlay"></div>
                </div>
                <h3>{post.title}</h3>
                <p className="muted">{post.excerpt}</p>
                <Link className="btn btn-ghost btn-sm" to={`/guides/${post.slug}`}>
                  Read guide
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card glow reveal">
            <div className="grid grid-2" style={{ alignItems: "stretch" }}>
              <div>
                <div className="kicker">Ready for your next move?</div>
                <h2 style={{ margin: "8px 0 10px 0" }}>
                  Get the checklist, browse the right-fit options, and move forward with more
                  confidence than guesswork.
                </h2>
                <p className="muted">
                  Whether you are signing your first lease or your renewal window is closing, the
                  strongest first move is not speed — it is structure, clarity, and better
                  comparison.
                </p>

                <div className="table-like" style={{ marginTop: "16px" }}>
                  <div className="row">
                    <b>Clear next steps</b>
                    <span>Less confusion, more structure</span>
                  </div>
                  <div className="row">
                    <b>Cost clarity</b>
                    <span>Rent + operating expenses + fit</span>
                  </div>
                  <div className="row">
                    <b>Negotiation leverage</b>
                    <span>Options before urgency</span>
                  </div>
                  <div className="row">
                    <b>Time savings</b>
                    <span>Shortlists instead of overload</span>
                  </div>
                </div>

                <div className="hero-actions" style={{ marginTop: "18px" }}>
                  <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
                    Download the checklist
                  </button>
                  <Link className="btn btn-ghost" to="/tools">
                    Explore the tools
                  </Link>
                </div>

                <p className="tiny muted" style={{ marginTop: "12px" }}>
                  Demo mode: forms save locally only until your live lead flow is connected.
                </p>
              </div>

              <div className="card soft">
                <div className="kicker">Best next step</div>
                <h3 style={{ marginTop: "8px" }}>Start with the right sequence</h3>
                <div className="table-like" style={{ marginTop: "12px" }}>
                  <div className="row">
                    <b>1. Define fit</b>
                    <span>Use, budget, timing, staff needs</span>
                  </div>
                  <div className="row">
                    <b>2. Compare 3–5 spaces</b>
                    <span>Enough choice without overload</span>
                  </div>
                  <div className="row">
                    <b>3. Run the tools</b>
                    <span>Footfall, lease-vs-buy, and market support</span>
                  </div>
                  <div className="row">
                    <b>4. Negotiate from leverage</b>
                    <span>Options on the table before pressure rises</span>
                  </div>
                </div>
                <div className="hero-actions" style={{ marginTop: "18px" }}>
                  <Link className="btn btn-secondary" to="/listings">
                    Browse listings
                  </Link>
                  <Link className="btn btn-ghost" to="/warehouse">
                    See warehouse page
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
