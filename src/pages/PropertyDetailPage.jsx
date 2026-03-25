import React, { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import ListingCard from "../components/ListingCard";
import { LISTINGS } from "../data/siteData";
import { useLeadMagnet } from "../context/LeadMagnetContext";

export default function PropertyDetailPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const listing = useMemo(() => {
    if (slug) return LISTINGS.find((item) => item.slug === slug) || LISTINGS[0];
    const id = searchParams.get("id");
    return LISTINGS.find((item) => item.id === id) || LISTINGS[0];
  }, [slug, searchParams]);

  const related = useMemo(
    () => LISTINGS.filter((item) => item.id !== listing.id).slice(0, 2),
    [listing.id]
  );

  const walkLink = useMemo(() => `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(listing.lat)}/lng%3D${encodeURIComponent(listing.lng)}`, [listing]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Listing detail</div>
            <h1 style={{ marginTop: "8px" }}>{listing.title}</h1>
          </div>
          <p>{listing.heroSummary}</p>
        </div>

        <div className="grid grid-2">
          <div className="card glow">
            <div className="badges">
              <span className="pill"><strong>{listing.type}</strong></span>
              <span className="pill">{listing.neighbourhood}</span>
              <span className="pill"><strong>{listing.sqft.toLocaleString()}</strong> SF</span>
              <span className="pill">{listing.rate}</span>
              <span className="pill">{listing.status}</span>
            </div>

            <p className="muted" style={{ marginTop: "12px" }}>{listing.address}</p>
            <div className="listing-thumb property-hero-image"><img src={listing.img} alt={listing.title} /></div>

            <div className="hr"></div>

            <h3>Why this space stands out</h3>
            <p className="muted">{listing.vibe}</p>

            <div className="table-like">
              <div className="row"><b>Asset class</b><span>{listing.assetClass}</span></div>
              <div className="row"><b>Square footage</b><span>{listing.sqft.toLocaleString()} SF</span></div>
              <div className="row"><b>Ceiling height</b><span>{listing.ceilingHeight}</span></div>
              <div className="row"><b>Parking</b><span>{listing.parking}</span></div>
              <div className="row"><b>Ideal use</b><span>{listing.useCase}</span></div>
            </div>

            <h3 style={{ marginTop: "14px" }}>Location advantage</h3>
            <p className="muted">{listing.locationAdvantage}</p>

            <h3 style={{ marginTop: "14px" }}>Lease / structure notes</h3>
            <p className="muted">{listing.leaseFlex}</p>

            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>Get the checklist</button>
              <Link className="btn btn-secondary" to="/tools#footfall">Run footfall</Link>
              <a className="btn btn-ghost" href={walkLink} target="_blank" rel="noreferrer">Open Walk Score</a>
            </div>
          </div>

          <LeadForm
            title="Request details or a tour"
            storageKey="MM_tour_requests"
            source="listing-detail"
            context={`${listing.title} — ${listing.address}`}
          />
        </div>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next best action</div>
              <div><strong>Compare options before you negotiate.</strong> Better terms usually come when 2–3 viable alternatives are already in play.</div>
            </div>
            <Link className="btn btn-secondary" to="/listings">Back to listings</Link>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Related options</div>
              <h2>Compare this against a couple of nearby alternatives.</h2>
            </div>
            <p>This reinforces the shortlist-first sales flow instead of treating one listing page like the only decision surface.</p>
          </div>
          <div className="grid">
            {related.map((item) => <ListingCard key={item.id} listing={item} />)}
          </div>
        </section>
      </div>
    </section>
  );
}
