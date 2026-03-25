import React from "react";
import { Link } from "react-router-dom";

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

export default function ListingCard({ listing, active = false, onSelect }) {
  return (
    <article
      className={`listing-card${active ? " listing-card-active" : ""}`}
      onMouseEnter={onSelect}
      onFocus={onSelect}
      tabIndex={0}
      aria-label={`${listing.title} in ${listing.city}`}
    >
      <div className="listing-thumb">
        <img src={listing.img} alt={listing.title} />
      </div>

      <div>
        <div className="badges">
          <span className="pill"><strong>{listing.leaseSale}</strong></span>
          <span className="pill">{listing.assetClass}</span>
          <span className="pill">{listing.city}</span>
          <span className="pill"><strong>{formatNumber(listing.sqft)}</strong> SF</span>
        </div>

        <h3 style={{ marginTop: "10px" }}>{listing.title}</h3>
        <p className="muted" style={{ marginTop: "6px" }}>{listing.heroSummary}</p>

        <div className="table-like listing-card-table" style={{ marginTop: "12px" }}>
          <div className="row"><b>Submarket</b><span>{listing.submarket}</span></div>
          <div className="row"><b>Rate / Price</b><span>{listing.rate}</span></div>
          <div className="row"><b>Best fit</b><span>{listing.useCase}</span></div>
        </div>

        <div className="listing-meta">
          {listing.highlights.map((item) => (
            <span className="pill" key={item}>{item}</span>
          ))}
        </div>

        <div className="hero-actions" style={{ marginTop: "12px" }}>
          <button className="btn btn-ghost btn-sm" type="button" onClick={onSelect}>
            View on map
          </button>
          <Link className="btn btn-primary btn-sm" to={`/listings/${listing.slug}`}>
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
