import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { Link } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import { LISTINGS } from "../data/siteData";
import { useLeadMagnet } from "../context/LeadMagnetContext";

function formatNumber(value) {
  return new Intl.NumberFormat().format(value);
}

function FitBounds({ items }) {
  const map = useMap();

  useEffect(() => {
    if (!items.length) return;
    if (items.length === 1) {
      map.setView([items[0].lat, items[0].lng], 12);
      return;
    }
    const bounds = items.map((item) => [item.lat, item.lng]);
    map.fitBounds(bounds, { padding: [34, 34] });
  }, [items, map]);

  return null;
}

function FocusListingOnMap({ listing }) {
  const map = useMap();

  useEffect(() => {
    if (!listing) return;
    map.setView([listing.lat, listing.lng], 12, { animate: true });
  }, [listing, map]);

  return null;
}

const SIZE_BUCKETS = [
  { label: "Any size", value: "all" },
  { label: "Under 2,500 SF", value: "under-2500" },
  { label: "2,500–7,500 SF", value: "2500-7500" },
  { label: "7,500–20,000 SF", value: "7500-20000" },
  { label: "20,000+ SF", value: "20000-plus" },
];

function matchesSizeBucket(listing, bucket) {
  if (bucket === "all") return true;
  if (bucket === "under-2500") return listing.sqft < 2500;
  if (bucket === "2500-7500") return listing.sqft >= 2500 && listing.sqft <= 7500;
  if (bucket === "7500-20000") return listing.sqft > 7500 && listing.sqft <= 20000;
  if (bucket === "20000-plus") return listing.sqft > 20000;
  return true;
}

export default function PropertyListPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All cities");
  const [assetClass, setAssetClass] = useState("All asset classes");
  const [dealType, setDealType] = useState("All availabilities");
  const [sizeBucket, setSizeBucket] = useState("all");
  const [selectedId, setSelectedId] = useState(LISTINGS[0]?.id ?? null);

  const cities = useMemo(() => ["All cities", ...new Set(LISTINGS.map((item) => item.city))], []);
  const assetClasses = useMemo(() => ["All asset classes", ...new Set(LISTINGS.map((item) => item.assetClass))], []);
  const dealTypes = useMemo(() => ["All availabilities", ...new Set(LISTINGS.map((item) => item.leaseSale))], []);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return LISTINGS.filter((listing) => {
      const haystack = [
        listing.title,
        listing.address,
        listing.city,
        listing.submarket,
        listing.neighbourhood,
        listing.assetClass,
        listing.useCase,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);
      const matchesCity = city === "All cities" || listing.city === city;
      const matchesAsset = assetClass === "All asset classes" || listing.assetClass === assetClass;
      const matchesDeal = dealType === "All availabilities" || listing.leaseSale === dealType;
      const matchesSize = matchesSizeBucket(listing, sizeBucket);

      return matchesQuery && matchesCity && matchesAsset && matchesDeal && matchesSize;
    });
  }, [query, city, assetClass, dealType, sizeBucket]);

  useEffect(() => {
    if (!filtered.length) {
      setSelectedId(null);
      return;
    }
    if (!filtered.some((item) => item.id === selectedId)) {
      setSelectedId(filtered[0].id);
    }
  }, [filtered, selectedId]);

  const selectedListing = useMemo(
    () => filtered.find((item) => item.id === selectedId) || filtered[0] || null,
    [filtered, selectedId]
  );

  const totalSqft = useMemo(
    () => filtered.reduce((sum, item) => sum + item.sqft, 0),
    [filtered]
  );

  const resetFilters = () => {
    setQuery("");
    setCity("All cities");
    setAssetClass("All asset classes");
    setDealType("All availabilities");
    setSizeBucket("all");
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Listings</div>
            <h1 style={{ marginTop: "8px" }}>Browse commercial spaces by type, location, size, and fit.</h1>
          </div>
          <p>
            Explore active examples across the GTA, compare the shortlist, and move into the detail page when a space starts to look right for the business.
          </p>
        </div>

        <div className="grid grid-2 listing-top-grid" style={{ alignItems: "start" }}>
          <section className="card soft listing-filter-panel">
            <div className="section-header" style={{ marginBottom: "12px" }}>
              <div>
                <div className="kicker">Search filters</div>
                <h3 style={{ marginTop: "8px" }}>Narrow the shortlist</h3>
              </div>
              <button className="btn btn-ghost btn-sm" type="button" onClick={resetFilters}>Reset</button>
            </div>

            <div className="form">
              <div className="field">
                <label htmlFor="listing-q">Search</label>
                <input
                  id="listing-q"
                  type="text"
                  placeholder="Try: industrial condo, Vaughan, warehouse, office..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor="listing-city">City</label>
                  <select id="listing-city" value={city} onChange={(e) => setCity(e.target.value)}>
                    {cities.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="listing-deal">Availability</label>
                  <select id="listing-deal" value={dealType} onChange={(e) => setDealType(e.target.value)}>
                    {dealTypes.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor="listing-asset">Asset class</label>
                  <select id="listing-asset" value={assetClass} onChange={(e) => setAssetClass(e.target.value)}>
                    {assetClasses.map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="listing-size">Size</label>
                  <select id="listing-size" value={sizeBucket} onChange={(e) => setSizeBucket(e.target.value)}>
                    {SIZE_BUCKETS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="inline-callout" style={{ marginTop: "16px" }}>
              <div>
                <div className="kicker">Focused search</div>
                <div><strong>{filtered.length}</strong> spaces matched • <strong>{formatNumber(totalSqft)}</strong> total SF currently in view.</div>
              </div>
              <Link className="btn btn-secondary btn-sm" to="/tools#footfall">Open tools</Link>
            </div>
          </section>

          <section className="card soft listing-map-panel">
            <div className="section-header" style={{ marginBottom: "12px" }}>
              <div>
                <div className="kicker">Map view</div>
                <h3 style={{ marginTop: "8px" }}>Use the map to support the shortlist</h3>
              </div>
              <p className="tiny muted" style={{ marginBottom: 0 }}>Click or hover a card to focus the map.</p>
            </div>

            {selectedListing ? (
              <div className="card soft listing-map-focus-card" style={{ marginBottom: "14px" }}>
                <div className="badges">
                  <span className="pill"><strong>{selectedListing.city}</strong></span>
                  <span className="pill">{selectedListing.submarket}</span>
                  <span className="pill">{selectedListing.leaseSale}</span>
                </div>
                <h3 style={{ marginTop: "10px" }}>{selectedListing.title}</h3>
                <p className="muted">{selectedListing.address}</p>
              </div>
            ) : null}

            <div className="map-wrap">
              <MapContainer className="map" center={[43.746, -79.46]} zoom={10} scrollWheelZoom={false}>
                <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {filtered.map((listing) => (
                  <Marker key={listing.id} position={[listing.lat, listing.lng]} eventHandlers={{ click: () => setSelectedId(listing.id) }}>
                    <Popup>
                      <strong>{listing.title}</strong>
                      <br />{listing.city} • {listing.leaseSale}
                      <br /><Link to={`/listings/${listing.slug}`}>Open details</Link>
                    </Popup>
                  </Marker>
                ))}
                <FitBounds items={filtered} />
                <FocusListingOnMap listing={selectedListing} />
              </MapContainer>
            </div>
          </section>
        </div>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Results</div>
              <h2>{filtered.length ? `${filtered.length} properties in the current shortlist` : "No properties match the current filters"}</h2>
            </div>
            <p>
              Review the shortlist by fit first: location logic, size, business use, and whether the space supports the way the company actually operates.
            </p>
          </div>

          <div className="grid">
            {!filtered.length ? (
              <div className="card soft listing-empty-state">
                <h3>Nothing matched this search.</h3>
                <p className="muted">Try broadening the city, asset class, or size range to bring more options back into view.</p>
                <button className="btn btn-secondary" type="button" onClick={resetFilters}>Reset filters</button>
              </div>
            ) : (
              filtered.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  active={listing.id === selectedId}
                  onSelect={() => setSelectedId(listing.id)}
                />
              ))
            )}
          </div>
        </section>

        <section className="section tight">
          <div className="card glow">
            <div className="grid grid-2" style={{ alignItems: "center" }}>
              <div>
                <div className="kicker">Need a better shortlist?</div>
                <h2 style={{ margin: "8px 0 10px 0" }}>Tell Megha the type of space, timing, and must-haves before the search gets noisy.</h2>
                <p className="muted">A tighter shortlist makes tours more useful and negotiations stronger.</p>
                <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>Get the checklist</button>
              </div>
              <div className="card soft">
                <h3>What a strong shortlist usually compares</h3>
                <div className="table-like">
                  <div className="row"><b>Total occupancy cost</b><span>Rent, operating costs, utilities, and setup</span></div>
                  <div className="row"><b>Location fit</b><span>Client access, labour pool, supplier reach, and commute</span></div>
                  <div className="row"><b>Function</b><span>Parking, loading, layout, visibility, and permitted use</span></div>
                  <div className="row"><b>Flexibility</b><span>Renewal, expansion, and exit options</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
