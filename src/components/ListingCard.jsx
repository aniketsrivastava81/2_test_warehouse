import React from "react";
import { Link } from "react-router-dom";

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

export default function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      <div className="listing-thumb">
        <img src={listing.img} alt={`${listing.type} listing`} />
      </div>
      <div>
        <div className="badges">
          <span className="pill">
            <strong>{listing.type}</strong>
          </span>
          <span className="pill">{listing.neighbourhood}</span>
          <span className="pill">
            <strong>{formatNumber(listing.sqft)}</strong> SF
          </span>
          <span className="pill">{listing.rate}</span>
        </div>
        <h3 style={{ marginTop: "10px" }}>{listing.title}</h3>
        <p className="muted" style={{ marginTop: "6px" }}>
          {listing.vibe}
        </p>
        <div className="listing-meta">
          {listing.highlights.map((item) => (
            <span className="pill" key={item}>
              {item}
            </span>
          ))}
        </div>
        <div className="hero-actions" style={{ marginTop: "12px" }}>
          <Link className="btn btn-primary btn-sm" to={`/listings/${encodeURIComponent(listing.id)}`}>
            View details
          </Link>
          <Link className="btn btn-ghost btn-sm" to="/tools#footfall">
            Run footfall
          </Link>
        </div>
      </div>
    </article>
  );
}
