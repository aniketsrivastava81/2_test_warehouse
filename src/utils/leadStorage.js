const MAX_STORED_CHARS = 80000;

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function normalizeKey(key) {
  return key || "MM_leads";
}

export function getStoredLeads(key) {
  if (!canUseStorage()) return [];
  try {
    const raw = window.localStorage.getItem(normalizeKey(key));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function appendLead(key, payload) {
  if (!canUseStorage()) return;
  const safeKey = normalizeKey(key);
  const existing = getStoredLeads(safeKey);
  const next = [{ ...payload, ts: new Date().toISOString() }, ...existing];
  window.localStorage.setItem(safeKey, JSON.stringify(next).slice(0, MAX_STORED_CHARS));
}

export function clearStoredLeads(key) {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(normalizeKey(key));
}
