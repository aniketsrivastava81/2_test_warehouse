import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { SITE } from '../config/site';
import { formatMeters, haversineMeters } from '../utils/geo';

const CATEGORIES = [
  {
    key: 'grocery',
    label: 'Grocery',
    ql: ["node[shop~'supermarket|convenience']", "way[shop~'supermarket|convenience']"],
  },
  {
    key: 'cafe',
    label: 'Café / Food',
    ql: ["node[amenity~'cafe|restaurant']", "way[amenity~'cafe|restaurant']"],
  },
  {
    key: 'park',
    label: 'Parks',
    ql: ["node[leisure=park]", "way[leisure=park]"],
  },
  {
    key: 'transit',
    label: 'Transit',
    ql: ["node[highway=bus_stop]", "node[railway=station]", "node[public_transport=platform]"],
  },
  {
    key: 'gym',
    label: 'Gyms',
    ql: ["node[leisure=fitness_centre]", "way[leisure=fitness_centre]"],
  },
  {
    key: 'school',
    label: 'Schools',
    ql: ["node[amenity=school]", "way[amenity=school]"],
  },
];

async function geocodeAddress(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&email=${encodeURIComponent(SITE.primaryEmail)}`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error('Geocoding failed');
  const data = await res.json();
  if (!data?.length) throw new Error('No results found');
  return {
    lat: Number(data[0].lat),
    lon: Number(data[0].lon),
    label: data[0].display_name,
  };
}

async function fetchAmenities({ lat, lon, radiusMeters, categories }) {
  const parts = categories.flatMap((c) => c.ql);
  const union = parts.map((piece) => `${piece}(around:${radiusMeters},${lat},${lon});`).join('\n');
  const q = `[out:json][timeout:25];\n(\n${union}\n);\nout center 80;`;

  const res = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: `data=${encodeURIComponent(q)}`,
  });
  if (!res.ok) throw new Error('Amenity lookup failed');
  const data = await res.json();
  const elements = data?.elements || [];

  return elements
    .map((el) => {
      const tags = el.tags || {};
      const name = tags.name || tags.brand || tags.operator || 'Unnamed';
      const coords = el.type === 'node' ? { lat: el.lat, lon: el.lon } : { lat: el.center?.lat, lon: el.center?.lon };
      if (!coords.lat || !coords.lon) return null;
      return {
        id: `${el.type}-${el.id}`,
        name,
        lat: coords.lat,
        lon: coords.lon,
        tags,
        kind: tags.amenity || tags.shop || tags.leisure || tags.railway || tags.highway || tags.public_transport || 'amenity',
      };
    })
    .filter(Boolean);
}

export default function AmenityFinderPage() {
  const location = useLocation();
  const [query, setQuery] = useState('100 King Street West, Toronto');
  const [radius, setRadius] = useState(1500);
  const [activeCats, setActiveCats] = useState(['grocery', 'cafe', 'transit', 'park']);
  const [origin, setOrigin] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = `Amenity Finder | ${SITE.brandName}`;
  }, []);
  useEffect(() => {
    const addr = new URLSearchParams(location.search).get('address');
    if (!addr) return;
    setQuery(addr);
    // Auto-run once for deep links (e.g., from a listing detail page)
    window.setTimeout(() => {
      runSearch(addr).catch(() => {});
    }, 120);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);


  const selectedCats = useMemo(() => CATEGORIES.filter((c) => activeCats.includes(c.key)), [activeCats]);

  const sorted = useMemo(() => {
    if (!origin) return [];
    return [...items]
      .map((item) => ({
        ...item,
        distance: haversineMeters({ lat: origin.lat, lon: origin.lon }, { lat: item.lat, lon: item.lon }),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 80);
  }, [items, origin]);

  const toggleCat = (key) => {
    setActiveCats((current) => (current.includes(key) ? current.filter((k) => k !== key) : [...current, key]));
  };

  const runSearch = async (seedQuery) => {
    const workingQuery = (seedQuery ?? query).trim();
    if (!workingQuery) return;

    setLoading(true);
    setError('');
    setItems([]);
    try {
      const loc = await geocodeAddress(query);
      setOrigin(loc);
      const found = await fetchAmenities({
        lat: loc.lat,
        lon: loc.lon,
        radiusMeters: Math.max(250, Math.min(5000, Number(radius) || 1500)),
        categories: selectedCats.length ? selectedCats : CATEGORIES,
      });
      setItems(found);
    } catch (err) {
      setError(err?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // run once for initial render
    runSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="premium-page-scroll">
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container">
          <div className="page-hero-inner amenity-hero">
            <div className="eyebrow">Amenity Finder</div>
            <h1>Local amenity scan around an address.</h1>
            <p>
              Search an address, set a radius, and surface the closest grocery, cafés, parks, transit, gyms, and schools.
              This uses OpenStreetMap / Overpass data in a lightweight template layer.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container amenity-grid">
          <div className="tools-v2-card amenity-controls">
            <span className="tools-v2-tag">Search</span>
            <h2>Enter an address and pick categories.</h2>

            <div className="amenity-form">
              <div className="tools-v2-field tools-v2-field-span-2">
                <label htmlFor="amenity-query">Address</label>
                <input id="amenity-query" value={query} onChange={(e) => setQuery(e.target.value)} />
              </div>
              <div className="tools-v2-field">
                <label htmlFor="amenity-radius">Radius (m)</label>
                <input id="amenity-radius" type="number" min="250" max="5000" value={radius} onChange={(e) => setRadius(e.target.value)} />
              </div>
              <div className="tools-v2-field">
                <label>&nbsp;</label>
                <button type="button" className="button button-primary" onClick={runSearch} disabled={loading}>
                  {loading ? 'Searching…' : 'Search'}
                </button>
              </div>
            </div>

            <div className="amenity-category-row" role="group" aria-label="Amenity categories">
              {CATEGORIES.map((c) => (
                <button type="button" key={c.key}
                  className={`amenity-chip ${activeCats.includes(c.key) ? 'is-on' : ''}`}
                  onClick={() => toggleCat(c.key)}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {error && <div className="amenity-error" role="alert">{error}</div>}

            <div className="amenity-meta">
              <p><b>Tip:</b> Try an industrial address, then toggle Transit + Food to see the day-to-day context.</p>
              {origin?.label && <p className="text-black/70"><b>Resolved:</b> {origin.label}</p>}
            </div>
          </div>

          <div className="amenity-map tools-v2-card">
            <span className="tools-v2-tag">Map</span>
            <h2>Results mapped and sorted.</h2>

            <div className="amenity-map__frame" aria-label="Amenity map">
              {origin && (
                <MapContainer center={[origin.lat, origin.lon]} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <CircleMarker center={[origin.lat, origin.lon]} radius={10} pathOptions={{ color: '#B01F24', fillColor: '#B01F24', fillOpacity: 0.45 }}>
                    <Popup>Search origin</Popup>
                  </CircleMarker>
                  {sorted.map((item) => (
                    <CircleMarker
                      key={item.id}
                      center={[item.lat, item.lon]}
                      radius={7}
                      pathOptions={{ color: '#ff7a00', fillColor: '#ff7a00', fillOpacity: 0.35 }}
                    >
                      <Popup>
                        <b>{item.name}</b><br />
                        <span>{item.kind}</span><br />
                        <span>{formatMeters(item.distance)}</span>
                      </Popup>
                    </CircleMarker>
                  ))}
                </MapContainer>
              )}
            </div>

            <div className="amenity-results" aria-label="Amenity results list">
              {sorted.slice(0, 14).map((item) => (
                <div className="amenity-row" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.kind}</small>
                  </div>
                  <span>{formatMeters(item.distance)}</span>
                </div>
              ))}
              {!loading && origin && sorted.length === 0 && (
                <p className="text-black/70 mb-0">No results found for this category set. Try increasing radius or toggling categories.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}