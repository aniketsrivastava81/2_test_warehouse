import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, CircleMarker, Polyline, Popup } from 'react-leaflet';
import { SITE } from '../config/site';
import { formatMeters, formatMinutes, haversineMeters } from '../utils/geo';

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1&email=${encodeURIComponent(SITE.primaryEmail)}`;
  const resp = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!resp.ok) throw new Error(`Geocode failed (${resp.status})`);
  const data = await resp.json();
  if (!Array.isArray(data) || !data[0]) throw new Error('No geocode result');
  return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon), name: data[0].display_name };
}

async function route(profile, from, to) {
  const url = `https://router.project-osrm.org/route/v1/${profile}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=simplified&geometries=geojson`;
  const resp = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!resp.ok) throw new Error(`Routing failed (${resp.status})`);
  const data = await resp.json();
  if (!data.routes || !data.routes[0]) throw new Error('No route returned');
  const r = data.routes[0];
  const coords = r.geometry?.coordinates || [];
  return {
    distance: r.distance,
    duration: r.duration,
    line: coords.map((c) => [c[1], c[0]]),
  };
}

const MODES = [
  { key: 'driving', label: 'Driving', profile: 'driving' },
  { key: 'cycling', label: 'Cycling', profile: 'cycling' },
  { key: 'walking', label: 'Walking', profile: 'foot' },
];

export default function CommuteAnalysisPage() {
  const location = useLocation();

  const [from, setFrom] = useState('100 King St W, Toronto');
  const [to, setTo] = useState('Pearson International Airport');
  const [mode, setMode] = useState('driving');
  const [peak, setPeak] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [dest, setDest] = useState(null);
  const [routeData, setRouteData] = useState(null);

  const selectedMode = useMemo(() => MODES.find((m) => m.key === mode) || MODES[0], [mode]);

  const straightLineMeters = useMemo(() => {
    if (!origin || !dest) return 0;
    return haversineMeters(origin, dest);
  }, [origin, dest]);

  const adjustedDuration = useMemo(() => {
    if (!routeData) return 0;
    return routeData.duration * peak;
  }, [routeData, peak]);

  const handleRun = async () => {
    setError('');
    setLoading(true);
    try {
      const o = await geocode(from);
      const d = await geocode(to);
      setOrigin(o);
      setDest(d);
      const r = await route(selectedMode.profile, o, d);
      setRouteData(r);
    } catch (err) {
      setError(err?.message || 'Unable to compute route');
      setRouteData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = `Commute analysis | ${SITE.brandName}`;
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const o = params.get('origin');
    const d = params.get('dest');
    let shouldRun = false;
    if (o) {
      setFrom(o);
      shouldRun = true;
    }
    if (d) {
      setTo(d);
      shouldRun = true;
    }
    if (shouldRun) {
      window.setTimeout(() => {
        handleRun().catch(() => {});
      }, 160);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    handleRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const center = useMemo(() => {
    if (origin) return [origin.lat, origin.lon];
    return [43.6532, -79.3832];
  }, [origin]);

  return (
    <div className="premium-page-scroll">
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container">
          <div className="page-hero-inner commute-hero">
            <div className="eyebrow">Commute analysis</div>
            <h1>Drive-time and distance sanity checks for location decisions.</h1>
            <p>
              This tool uses a public routing service (OSRM) plus OpenStreetMap geocoding. It is a template layer (no API keys required)
              and is meant for first-pass comparison.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
          <div className="tools-v2-card commute-panel">
            <span className="tools-v2-tag">Inputs</span>
            <h2>Origin → destination</h2>

            <form className="commute-form" onSubmit={(e) => { e.preventDefault(); handleRun(); }}>
              <div className="tools-v2-field">
                <label htmlFor="commute-from">Origin</label>
                <input id="commute-from" value={from} onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="tools-v2-field">
                <label htmlFor="commute-to">Destination</label>
                <input id="commute-to" value={to} onChange={(e) => setTo(e.target.value)} />
              </div>
              <div className="tools-v2-field">
                <label htmlFor="commute-mode">Mode</label>
                <select id="commute-mode" value={mode} onChange={(e) => setMode(e.target.value)}>
                  {MODES.map((m) => (
                    <option key={m.key} value={m.key}>{m.label}</option>
                  ))}
                </select>
              </div>
              <div className="tools-v2-field">
                <label htmlFor="commute-peak">Peak multiplier</label>
                <select id="commute-peak" value={peak} onChange={(e) => setPeak(Number(e.target.value))}>
                  <option value={1}>Typical</option>
                  <option value={1.15}>Busier than normal</option>
                  <option value={1.3}>Peak traffic</option>
                </select>
              </div>

              <div className="commute-controls__actions">
                <button type="submit" className="button button-primary" disabled={loading}>{loading ? 'Running…' : 'Run analysis'}</button>
                <button type="button" className="button button-secondary" onClick={() => { setFrom('100 King St W, Toronto'); setTo('Pearson International Airport'); }}>Reset</button>
              </div>

              {error ? <div className="amenity-error" role="alert" style={{ marginTop: '12px' }}>{error}</div> : null}
            </form>
          </div>

          <div className="commute-output">
            <div className="commute-summary">
              <span className="tools-v2-tag">Outputs</span>
              <h2>Summary</h2>
              <div className="commute-metrics">
                <article>
                  <small>Mode</small>
                  <strong>{selectedMode.label}</strong>
                </article>
                <article>
                  <small>Route distance</small>
                  <strong>{routeData ? formatMeters(routeData.distance) : '—'}</strong>
                </article>
                <article>
                  <small>Estimated time</small>
                  <strong>{routeData ? formatMinutes(adjustedDuration) : '—'}</strong>
                </article>
              </div>
              <p className="mt-3 text-black/70 mb-0">
                Straight-line distance: <b>{origin && dest ? formatMeters(straightLineMeters) : '—'}</b>
              </p>
            </div>

            <div className="commute-map-wrap" aria-label="Commute map">
              <MapContainer center={center} zoom={12} scrollWheelZoom={false} style={{ height: '440px', width: '100%' }}>
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {origin && (
                  <CircleMarker center={[origin.lat, origin.lon]} radius={8} pathOptions={{ color: '#b01f24' }}>
                    <Popup>Origin<br />{origin.name}</Popup>
                  </CircleMarker>
                )}
                {dest && (
                  <CircleMarker center={[dest.lat, dest.lon]} radius={8} pathOptions={{ color: '#ff7a00' }}>
                    <Popup>Destination<br />{dest.name}</Popup>
                  </CircleMarker>
                )}
                {routeData?.line?.length ? (
                  <Polyline positions={routeData.line} pathOptions={{ color: '#111111', weight: 4, opacity: 0.75 }} />
                ) : null}
              </MapContainer>
            </div>
            <p className="commute-note text-black/70 mb-0">
              Use this as a fast comparison tool. For official commute planning, confirm with live Google Maps directions and mode-specific timing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
