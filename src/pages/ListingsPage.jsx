import { useMemo } from 'react';
import L from 'leaflet';
import LegacyHtmlBlock from '../components/LegacyHtmlBlock';
import listingsHtmlRaw from '../legacy/propertylist_main.html?raw';
import { LISTINGS } from '../lib/siteData';
import { escapeHTML, fmtNum, transformLegacyLinks } from '../lib/siteUtils';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function renderListingCard(l) {
  return `
    <article class="listing-card">
      <div class="listing-thumb"><img src="${escapeHTML(l.img)}" alt="${escapeHTML(l.type)} listing image placeholder"></div>
      <div>
        <div class="badges">
          <span class="pill"><strong>${escapeHTML(l.type)}</strong></span>
          <span class="pill">${escapeHTML(l.neighbourhood)}</span>
          <span class="pill"><strong>${fmtNum(l.sqft)}</strong> SF</span>
          <span class="pill">${escapeHTML(l.rate)}</span>
        </div>
        <h3 style="margin-top:10px">${escapeHTML(l.title)}</h3>
        <p class="muted" style="margin-top:6px">${escapeHTML(l.vibe)}</p>
        <div class="listing-meta">${l.highlights.map((h) => `<span class="pill">${escapeHTML(h)}</span>`).join('')}</div>
        <div class="hero-actions" style="margin-top:12px">
          <a class="btn btn-primary btn-sm" href="/listings/${encodeURIComponent(l.id)}">View details</a>
          <a class="btn btn-ghost btn-sm" href="/tools#footfall">Run footfall</a>
        </div>
      </div>
    </article>
  `;
}

export default function ListingsPage() {
  const html = useMemo(() => transformLegacyLinks(listingsHtmlRaw), []);

  const handleReady = (root) => {
    const mount = root.querySelector('[data-listings]');
    const q = root.querySelector('[data-filter-q]');
    const type = root.querySelector('[data-filter-type]');
    const minSq = root.querySelector('[data-filter-minsq]');
    const maxSq = root.querySelector('[data-filter-maxsq]');
    const mapEl = root.querySelector('#listingsMap');
    let map;
    let markersLayer;

    if (mapEl) {
      map = L.map(mapEl, { scrollWheelZoom: false }).setView([43.85, -79.37], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      markersLayer = L.layerGroup().addTo(map);
      setTimeout(() => map.invalidateSize(), 350);
    }

    const applyFilters = () => {
      const query = (q?.value || '').trim().toLowerCase();
      const t = type?.value || 'All';
      const min = Number(minSq?.value || 0) || 0;
      const max = Number(maxSq?.value || 9999999) || 9999999;
      const filtered = LISTINGS.filter((listing) => {
        const hay = `${listing.title} ${listing.address} ${listing.neighbourhood} ${listing.type}`.toLowerCase();
        return (!query || hay.includes(query)) && (t === 'All' || listing.type === t) && listing.sqft >= min && listing.sqft <= max;
      });
      if (mount) mount.innerHTML = filtered.length ? filtered.map(renderListingCard).join('') : '<div class="card soft"><p>No matches. Try a broader search.</p></div>';
      if (map && markersLayer) {
        markersLayer.clearLayers();
        filtered.forEach((listing) => {
          const marker = L.marker([listing.lat, listing.lng]).bindPopup(`
            <strong>${escapeHTML(listing.type)}</strong><br>
            ${escapeHTML(listing.title)}<br>
            <a href="/listings/${encodeURIComponent(listing.id)}">Open details</a>
          `);
          markersLayer.addLayer(marker);
        });
        if (filtered.length) {
          const group = L.featureGroup(markersLayer.getLayers());
          map.fitBounds(group.getBounds().pad(0.25));
        }
      }
    };

    [q, type, minSq, maxSq].forEach((el) => el?.addEventListener('input', applyFilters));
    applyFilters();

    return () => {
      [q, type, minSq, maxSq].forEach((el) => el?.removeEventListener('input', applyFilters));
      if (map) map.remove();
    };
  };

  return <LegacyHtmlBlock as="main" id="main" className="section" html={html} onReady={handleReady} />;
}
