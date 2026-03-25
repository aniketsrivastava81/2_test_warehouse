import React, { useMemo, useState } from "react";
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
  React.useEffect(() => {
    if (!items.length) return;
    if (items.length === 1) {
      map.setView([items[0].lat, items[0].lng], 13);
      return;
    }
    const bounds = items.map((item) => [item.lat, item.lng]);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [items, map]);

  return null;
}

export default function PropertyListPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [minSq, setMinSq] = useState("");
  const [maxSq, setMaxSq] = useState("");

  const filtered = useMemo(() => {
    const min = Number(minSq || 0) || 0;
    const max = Number(maxSq || 9999999) || 9999999;
    return LISTINGS.filter((listing) => {
      const hay = `${listing.title} ${listing.address} ${listing.neighbourhood} ${listing.type}`.toLowerCase();
      const okQ = !query.trim() || hay.includes(query.trim().toLowerCase());
      const okT = type === "All" || listing.type === type;
      const okMin = listing.sqft >= min;
      const okMax = listing.sqft <= max;
      return okQ && okT && okMin && okMax;
    });
  }, [query, type, minSq, maxSq]);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Listings</div>
            <h1 style={{ marginTop: "8px" }}>Commercial Listings</h1>
          </div>
          <p>
            This route is now the live listings index for the React site. It still uses sample data, but the route and card structure are ready for a cleaner long-term listings flow.
          </p>
        </div>

        <div className="grid grid-2" style={{ alignItems: "start" }}>
          <section className="card soft">
            <h3>Filters</h3>
            <div className="form" style={{ marginTop: "10px" }}>
              <div className="field">
                <label htmlFor="q">Search</label>
                <input
                  id="q"
                  type="text"
                  placeholder="Try: Beaver Creek, warehouse, Mural, Leek…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="type">Type</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                  <option>All</option>
                  <option>Office</option>
                  <option>Warehouse</option>
                </select>
              </div>
              <div className="grid grid-2">
                <div className="field">
                  <label htmlFor="minsq">Min SF</label>
                  <input
                    id="minsq"
                    type="number"
                    placeholder="0"
                    value={minSq}
                    onChange={(e) => setMinSq(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="maxsq">Max SF</label>
                  <input
                    id="maxsq"
                    type="number"
                    placeholder="99999"
                    value={maxSq}
                    onChange={(e) => setMaxSq(e.target.value)}
                  />
                </div>
              </div>
              <div className="inline-callout">
                <div>
                  <div className="kicker">Want higher conversion?</div>
                  <div>
                    <strong>Keep filters simple.</strong> Type + SF + location is enough for TOFU
                    and MOFU.
                  </div>
                </div>
                <Link className="btn btn-primary btn-sm" to="/tools#footfall">
                  Footfall tool
                </Link>
              </div>
            </div>
          </section>

          <section className="card soft">
            <h3>Searchable map (sample)</h3>
            <p className="tiny muted">Markers update based on filters.</p>
            <div className="map-wrap">
              <MapContainer
                className="map"
                center={[43.85, -79.37]}
                zoom={12}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {filtered.map((listing) => (
                  <Marker key={listing.id} position={[listing.lat, listing.lng]}>
                    <Popup>
                      <strong>{listing.type}</strong>
                      <br />
                      {listing.title}
                      <br />
                      <Link to={`/listings/${encodeURIComponent(listing.id)}`}>Open details</Link>
                    </Popup>
                  </Marker>
                ))}
                <FitBounds items={filtered} />
              </MapContainer>
            </div>
          </section>
        </div>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Results</div>
              <h2>Listings</h2>
            </div>
            <p>Each card includes: vibe, practicality, location advantage, and lease flexibility notes.</p>
          </div>

          <div className="grid">
            {!filtered.length ? (
              <div className="card soft">
                <p>No matches. Try a broader search.</p>
              </div>
            ) : (
              filtered.map((listing) => <ListingCard key={listing.id} listing={listing} />)
            )}
          </div>
        </section>

        <section className="section tight">
          <div className="card glow">
            <div className="grid grid-2" style={{ alignItems: "center" }}>
              <div>
                <div className="kicker">Lead capture</div>
                <h2 style={{ margin: "8px 0 10px 0" }}>
                  Want a shortlist tailored to your business?
                </h2>
                <p className="muted">
                  Tell us your timeline + must-haves, and we’ll bring 3–5 options—then negotiate
                  from leverage.
                </p>
                <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
                  Get the checklist
                </button>
              </div>
              <div className="card soft">
                <h3>What we’ll confirm before you sign</h3>
                <div className="table-like">
                  <div className="row">
                    <b>Total occupancy cost</b>
                    <span>rent + ops + utilities</span>
                  </div>
                  <div className="row">
                    <b>Use clause + zoning fit</b>
                    <span>avoid operational risk</span>
                  </div>
                  <div className="row">
                    <b>Parking + access</b>
                    <span>staff + deliveries</span>
                  </div>
                  <div className="row">
                    <b>Flexibility</b>
                    <span>renew, sublease, expansion</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="card soft">
            <div className="kicker">Snapshot</div>
            <h3 style={{ marginTop: "8px" }}>
              {filtered.length} matching spaces • {filtered.reduce((sum, item) => sum + item.sqft, 0).toLocaleString()} total SF in view
            </h3>
            <p className="muted">
              The current set includes both office and warehouse examples around Richmond Hill and
              Beaver Creek, mirroring the original sample data.
            </p>
            <div className="badges">
              {filtered.slice(0, 4).map((item) => (
                <span className="pill" key={item.id}>
                  <strong>{item.type}</strong> {formatNumber(item.sqft)} SF
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
