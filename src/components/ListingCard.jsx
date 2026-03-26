import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <article className="listing-card">
      <div className="listing-image-wrap">
        <img src={listing.image} alt={listing.title} className="listing-image" />
        <span className="listing-status">{listing.status}</span>
      </div>
      <div className="listing-body">
        <div className="meta-row">
          <span>{listing.category}</span>
          <span>{listing.location}</span>
        </div>
        <h3>{listing.title}</h3>
        <p>{listing.teaser}</p>
        <div className="meta-row emphasis-row">
          <strong>{listing.size}</strong>
          <span>{listing.highlight}</span>
        </div>
        <Link to={`/listings/${listing.slug}`} className="button button-secondary inline-button">View Detail</Link>
      </div>
    </article>
  );
}
