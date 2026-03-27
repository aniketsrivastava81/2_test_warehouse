import React from "react";
import { isShortlisted, SHORTLIST_EVENT, toggleShortlist } from "../utils/shortlistStorage";

export default function ShortlistButton({ listing, className = "button button-secondary shortlist-button", compact = false }) {
  const [saved, setSaved] = React.useState(() => isShortlisted(listing.slug));

  React.useEffect(() => {
    const sync = () => setSaved(isShortlisted(listing.slug));
    window.addEventListener(SHORTLIST_EVENT, sync);
    return () => window.removeEventListener(SHORTLIST_EVENT, sync);
  }, [listing.slug]);

  const onToggle = () => {
    const next = toggleShortlist(listing.slug);
    setSaved(next.includes(listing.slug));
  };

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${listing.title} from shortlist` : `Add ${listing.title} to shortlist`}
      className={`${className} ${saved ? "is-saved" : ""}`.trim()}
    >
      <span aria-hidden="true">{saved ? "★" : "☆"}</span>
      <span>{saved ? (compact ? "Saved" : "Saved to shortlist") : (compact ? "Shortlist" : "Add to shortlist")}</span>
    </button>
  );
}
