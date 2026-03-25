import React, { useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import LeadForm from "../components/LeadForm";
import ListingCard from "../components/ListingCard";
import { LISTINGS } from "../data/siteData";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { trackEvent } from "../utils/tracking";

export default function PropertyDetailPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const listing = useMemo(() => {
    if (slug) return LISTINGS.find((item) => item.slug === slug) || LISTINGS[0];
    const id = searchParams.get("id");
    return LISTINGS.find((item) => item.id === id) || LISTINGS[0];
  }, [slug, searchParams]);

  const related = useMemo(() => {
    if (listing.related?.length) {
      return listing.related
        .map((id) => LISTINGS.find((item) => item.id === id))
        .filter(Boolean)
        .slice(0, 2);
    }
    return LISTINGS.filter((item) => item.id !== listing.id).slice(0, 2);
  }, [listing]);

  const walkLink = useMemo(
    () => `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(listing.lat)}/lng%3D${encodeURIComponent(listing.lng)}`,
    [listing]
  );

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

        <div className="grid grid-2 property-detail-grid">
          <div className="card glow">
            <div className="badges">
              <span className="pill"><strong>{listing.leaseSale}</strong></span>
              <span className="pill">{listing.assetClass}</span>
              <span className="pill">{listing.submarket}</span>
              <span className="pill"><strong>{listing.sqft.toLocaleString()}</strong> SF</span>
              <span className="pill">{listing.status}</span>
            </div>

            <p className="muted" style={{ marginTop: "12px" }}>{listing.address}</p>

            <div className="listing-thumb property-hero-image">
              <img src={listing.img} alt={`${listing.title} main property view`} fetchPriority="high" decoding="async" />
            </div>

            {listing.gallery?.length ? (
              <div className="property-gallery-grid">
                {listing.gallery.map((image, index) => (
                  <div className="listing-thumb property-gallery-thumb" key={`${image}-${index}`}>
                    <img src={image} alt={`${listing.title} view ${index + 1}`} loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            ) : null}

            <div className="hr"></div>

            <h3>Property overview</h3>
            <p className="muted">{listing.vibe}</p>

            <div className="table-like property-specs-table" style={{ marginTop: "14px" }}>
              {listing.specs.map(([label, value]) => (
                <div className="row" key={label}><b>{label}</b><span>{value}</span></div>
              ))}
            </div>

            <div className="grid grid-2 detail-support-grid" style={{ marginTop: "18px" }}>
              <div className="card soft compact-card">
                <div className="kicker">Location advantage</div>
                <p className="muted">{listing.locationAdvantage}</p>
              </div>
              <div className="card soft compact-card">
                <div className="kicker">Structure notes</div>
                <p className="muted">{listing.leaseFlex}</p>
              </div>
            </div>

            <div className="grid grid-2 detail-support-grid" style={{ marginTop: "18px" }}>
              <div className="card soft compact-card">
                <div className="kicker">Ideal use</div>
                <ul className="service-points">
                  {listing.idealFor.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="card soft compact-card">
                <div className="kicker">What to test on the shortlist</div>
                <ul className="service-points">
                  {listing.decisionPoints.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="hero-actions">
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  trackEvent("checklist_open", { page: "listing-detail", listing: listing.slug });
                  openLeadMagnet();
                }}
              >
                Get the checklist
              </button>
              <Link
                className="btn btn-secondary"
                to="/listings"
                onClick={() => trackEvent("listing_navigation", { action: "back_to_listings", listing: listing.slug })}
              >
                Back to listings
              </Link>
              <a
                className="btn btn-ghost"
                href={walkLink}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("listing_walkscore_open", { listing: listing.slug })}
              >
                Open Walk Score
              </a>
            </div>
          </div>

          <div className="property-detail-right-rail">
            <LeadForm
              title="Request details or a tour"
              intro="Share what matters most and Megha can help you compare this property against the rest of your shortlist."
              storageKey="MM_tour_requests"
              source="listing-detail"
              context={`${listing.title} — ${listing.inquiryContext}`}
              submitLabel="Request details"
              interestLabel="What do you want help with?"
              interestOptions={[
                "Tour this property",
                "Compare alternatives",
                "Review lease / price structure",
                "Owner-user evaluation",
              ]}
              includeLocation={false}
              timelineLabel="How soon do you need to move?"
              timelineOptions={["Immediately", "0–3 months", "3–6 months", "6+ months"]}
              messagePlaceholder="Share team size, layout needs, loading or parking requirements, budget range, or what makes this property interesting to you."
              note="A clear brief makes tours and negotiations more productive."
              onSuccess={() => trackEvent("property_inquiry_submit", { listing: listing.slug, city: listing.city, assetClass: listing.assetClass })}
            />

            <div className="card soft">
              <div className="kicker">Key details</div>
              <div className="table-like" style={{ marginTop: "12px" }}>
                <div className="row"><b>Rate / price</b><span>{listing.rate}</span></div>
                <div className="row"><b>Parking</b><span>{listing.parking}</span></div>
                <div className="row"><b>Loading</b><span>{listing.loading}</span></div>
                <div className="row"><b>Zoning</b><span>{listing.zoning}</span></div>
                <div className="row"><b>Power</b><span>{listing.power}</span></div>
              </div>
            </div>
          </div>
        </div>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Best next move</div>
              <div><strong>Compare this property against at least two real alternatives before you negotiate.</strong></div>
            </div>
            <div className="footer-actions">
              <Link
                className="btn btn-secondary"
                to="/listings"
                onClick={() => trackEvent("listing_navigation", { action: "compare_options", listing: listing.slug })}
              >
                See comparable options
              </Link>
              <Link
                className="btn btn-ghost"
                to="/tools"
                onClick={() => trackEvent("listing_navigation", { action: "compare_with_tools", listing: listing.slug })}
              >
                Compare with tools
              </Link>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Related options</div>
              <h2>Use these as comparison points before deciding.</h2>
            </div>
            <p>Good commercial decisions usually get better when there is a real shortlist behind them. Use the tools and guides if you need more clarity before the next tour or offer.</p>
          </div>
          <div className="grid">
            {related.map((item) => <ListingCard key={item.id} listing={item} />)}
          </div>
        </section>
      </div>
    </section>
  );
}
