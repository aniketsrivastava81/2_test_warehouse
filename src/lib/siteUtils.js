export const escapeHTML = (str = '') =>
  String(str).replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[m]));

export const fmtNum = (n) => {
  const x = Number(n);
  if (Number.isNaN(x)) return String(n ?? '');
  return x.toLocaleString(undefined);
};

export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

export function transformLegacyLinks(html) {
  return html
    .replaceAll('landingpage.html', '/')
    .replaceAll('propertylist.html', '/listings')
    .replaceAll('tools.html#footfall', '/tools#footfall')
    .replaceAll('tools.html', '/tools')
    .replaceAll('blog.html', '/guides');
}

export function saveLocalLead(payload) {
  const key = 'MM_leads';
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.unshift({ ...payload, ts: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
}

export function makeWalkScoreLink({ address, lat, lng }) {
  const a = (address || '').trim();
  if (lat && lng) {
    return `https://www.walkscore.com/score/loc/lat%3D${encodeURIComponent(lat)}/lng%3D${encodeURIComponent(lng)}`;
  }
  if (a) {
    return `https://www.walkscore.com/score/${encodeURIComponent(a)}`;
  }
  return 'https://www.walkscore.com/CA-ON/Toronto';
}

export function footfallIndex({ walk = 0, transit = 0, bike = 0, officeDensity = 'medium' }) {
  const w = clamp(Number(walk) || 0, 0, 100);
  const t = clamp(Number(transit) || 0, 0, 100);
  const b = clamp(Number(bike) || 0, 0, 100);
  const densityBoost = ({ low: -6, medium: 0, high: 6 }[officeDensity] ?? 0);
  return clamp(Math.round(0.6 * w + 0.3 * t + 0.1 * b + densityBoost), 0, 100);
}

export function officeGoerGuide({ index, category, businessType }) {
  const i = clamp(Number(index) || 0, 0, 100);
  const intensity = i >= 80 ? 'High' : i >= 60 ? 'Strong' : i >= 40 ? 'Moderate' : 'Low';
  const hours = i >= 80
    ? '7:00am–7:00pm (capture both commute peaks)'
    : i >= 60
      ? '7:30am–6:30pm (lean into lunch + after-work)'
      : i >= 40
        ? '8:00am–6:00pm (optimize lunch + meetings)'
        : '8:30am–5:30pm (focus on destination visits)';
  const signage = i >= 70
    ? 'Invest in high-contrast window signage + sidewalk visibility.'
    : i >= 50
      ? 'Clear storefront messaging + directional wayfinding works best.'
      : 'Prioritize Google Business Profile + building directory presence.';
  const offer = businessType === 'retail'
    ? 'Promote quick-decision bundles + easy returns.'
    : businessType === 'office'
      ? 'Offer meeting-room packages + flexible terms.'
      : businessType === 'warehouse'
        ? 'Lean into pickup windows + shipping cutoffs.'
        : 'Design a simple lunch-rush offer + pre-order.';
  return {
    summary: `${intensity} footfall potential for ${category}.`,
    playbook: [
      { k: 'Footfall outlook', v: `${intensity} (${i}/100)` },
      { k: 'Recommended hours', v: hours },
      { k: 'Signage + discovery', v: signage },
      { k: 'Offer design', v: offer },
      { k: 'Next step', v: 'Shortlist 3 spaces, compare (rent + ops + improvements), then negotiate from options—not urgency.' }
    ]
  };
}
