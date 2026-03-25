import React, { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { LISTINGS } from "../data/siteData";
import { useLeadMagnet } from "../context/LeadMagnetContext";

export default function PropertyDetailPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const [tour, setTour] = useState({ name: "", email: "", notes: "" });
  const [saved, setSaved] = useState(false);

  const listing = useMemo(() => {
    const legacyId = searchParams.get("id");
    const lookup = slug || legacyId;
    return LISTINGS.find((item) => item.id === lookup) || LISTINGS[0];
  }, [searchParams, slug]);

  const walkLink = useMemo(() => {
    return `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(listing.lat)}/lng%3D${encodeURIComponent(listing.lng)}`;
  }, [listing]);

  const submitTour = (event) => {
    event.preventDefault();
    const key = "MM_tour_requests";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.unshift({ listingId: listing.id, ...tour, ts: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
    setSaved(true);
    setTour({ name: "", email: "", notes: "" });
    window.setTimeout(() => setSaved(false), 6500);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Listing</div>
            <h1 style={{ marginTop: "8px" }}>Property Details</h1>
          </div>
          <p>
            The route now supports cleaner listing URLs and a more stable path structure for future SEO and sharing.
          </p>
        </div>

        <div className="grid grid-2">
          <div className="card glow">
            <div className="badges">
              <span className="pill">
                <strong>{listing.type}</strong>
              </span>
              <span className="pill">{listing.neighbourhood}</span>
              <span className="pill">
                <strong>{listing.sqft.toLocaleString()}</strong> SF
              </span>
              <span className="pill">{listing.rate}</span>
            </div>

            <h1 style={{ marginTop: "12px" }}>{listing.title}</h1>
            <p className="muted">{listing.address}</p>

            <div className="hr"></div>

            <h3>The Vibe</h3>
            <p className="muted">{listing.vibe}</p>

            <h3>The Practicality</h3>
            <div className="table-like">
              <div className="row">
                <b>Square footage</b>
                <span>{listing.sqft.toLocaleString()} SF</span>
              </div>
              <div className="row">
                <b>Ceiling height</b>
                <span>{listing.ceilingHeight}</span>
              </div>
              <div className="row">
                <b>Parking</b>
                <span>{listing.parking}</span>
              </div>
            </div>

            <h3 style={{ marginTop: "14px" }}>Location Advantage</h3>
            <p className="muted">{listing.locationAdvantage}</p>

            <h3 style={{ marginTop: "14px" }}>Lease Flexibility</h3>
            <p className="muted">{listing.leaseFlex}</p>

            <div className="hero-actions">
              <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
                Get the checklist
              </button>
              <Link className="btn btn-secondary" to="/tools#footfall">
                Run footfall
              </Link>
              <a className="btn btn-ghost" href={walkLink} target="_blank" rel="noreferrer">
                Open Walk Score
              </a>
            </div>
          </div>

          <div className="card soft">
            <div className="listing-thumb property-hero-image">
              <img src={listing.img} alt={listing.title} />
            </div>

            <div className="hr"></div>

            <h3>Book a tour (demo form)</h3>
            <form className="form" onSubmit={submitTour}>
              <div className="field">
                <label htmlFor="t_name">Name</label>
                <input
                  id="t_name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={tour.name}
                  onChange={(e) => setTour((s) => ({ ...s, name: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="t_email">Email</label>
                <input
                  id="t_email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={tour.email}
                  onChange={(e) => setTour((s) => ({ ...s, email: e.target.value }))}
                />
              </div>
              <div className="field">
                <label htmlFor="t_notes">What do you need this space for?</label>
                <textarea
                  id="t_notes"
                  name="notes"
                  rows="4"
                  placeholder="A quick note helps shortlist the right fit."
                  value={tour.notes}
                  onChange={(e) => setTour((s) => ({ ...s, notes: e.target.value }))}
                ></textarea>
              </div>
              <button className="btn btn-primary" type="submit">
                Request a tour
              </button>
              {!saved ? null : (
                <div className="toast">
                  <strong>Request saved.</strong> Demo mode: no email is sent.
                </div>
              )}
            </form>

            <p className="tiny muted" style={{ marginTop: "12px" }}>
              Source link:{" "}
              <a href={listing.source} target="_blank" rel="noreferrer">
                {listing.source}
              </a>
            </p>
          </div>
        </div>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next best action</div>
              <div>
                <strong>Compare options.</strong> We negotiate better terms when we have 2–3 strong
                alternatives.
              </div>
            </div>
            <Link className="btn btn-secondary" to="/listings">
              Back to listings
            </Link>
          </div>
        </section>
      </div>
    </section>
  );
}
