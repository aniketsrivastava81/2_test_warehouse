import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <article className="listing-card listing-card-premium">
      <div className="listing-image-wrap">
        <img src={listing.image} alt={listing.title} className="listing-image" />
        <span className="listing-status">{listing.status}</span>
      </div>
      <div className="listing-body listing-body-premium">
        <div className="meta-row">
          <span>{listing.category}</span>
          <span>{listing.location}</span>
        </div>
        <h3>{listing.title}</h3>
        <p>{listing.teaser}</p>
        <div className="listing-chip-row">
          <span className="detail-point chip-point">{listing.size}</span>
          <span className="detail-point chip-point">{listing.corridor}</span>
        </div>
        <div className="listing-fit-copy">
          <strong>Best fit</strong>
          <p>{listing.bestFor.slice(0, 2).join(" • ")}</p>
        </div>
        <Link to={`/listings/${listing.slug}`} className="button button-secondary inline-button">View property</Link>
      </div>
    </article>
  );
}
