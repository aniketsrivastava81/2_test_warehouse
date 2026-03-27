const SHORTLIST_KEY = "kolt_shortlist_v1";
export const SHORTLIST_EVENT = "kolt-shortlist-updated";

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function getShortlist() {
  if (!hasStorage()) return [];
  try {
    const raw = window.localStorage.getItem(SHORTLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function commit(next) {
  if (!hasStorage()) return;
  window.localStorage.setItem(SHORTLIST_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(SHORTLIST_EVENT, { detail: next }));
}

export function isShortlisted(slug) {
  return getShortlist().includes(slug);
}

export function toggleShortlist(slug) {
  const current = getShortlist();
  const next = current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
  commit(next);
  return next;
}

export function clearShortlist() {
  commit([]);
}
