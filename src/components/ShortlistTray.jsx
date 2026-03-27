import React from "react";
import { Link } from "react-router-dom";
import { LISTINGS } from "../data/siteData";
import { clearShortlist, getShortlist, SHORTLIST_EVENT } from "../utils/shortlistStorage";

export default function ShortlistTray() {
  const [slugs, setSlugs] = React.useState(() => getShortlist());

  React.useEffect(() => {
    const sync = (event) => setSlugs(event.detail || getShortlist());
    window.addEventListener(SHORTLIST_EVENT, sync);
    return () => window.removeEventListener(SHORTLIST_EVENT, sync);
  }, []);

  const listings = LISTINGS.filter((listing) => slugs.includes(listing.slug));
  if (!listings.length) return null;

  return (
    <aside className="shortlist-tray" aria-label="Saved shortlist">
      <div className="shortlist-tray__header">
        <div>
          <div className="eyebrow">Shortlist</div>
          <h2>{listings.length} saved opportunity{listings.length > 1 ? "ies" : ""}</h2>
        </div>
        <button type="button" className="shortlist-tray__clear" onClick={() => clearShortlist()}>
          Clear all
        </button>
      </div>
      <div className="shortlist-tray__items">
        {listings.slice(0, 3).map((listing) => (
          <Link key={listing.slug} to={`/listings/${listing.slug}`} className="shortlist-tray__item">
            <span>{listing.title}</span>
            <small>{listing.location} · {listing.size}</small>
          </Link>
        ))}
      </div>
      <div className="shortlist-tray__footer">
        <Link className="button button-secondary small-button" to="/contact#analysis-workflow">Request analysis</Link>
        <Link className="button button-primary small-button" to="/tools">Pressure-test shortlist</Link>
      </div>
    </aside>
  );
}
