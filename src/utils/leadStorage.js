export function appendLead(key, payload) {
  if (typeof window === "undefined") return;
  const existing = JSON.parse(window.localStorage.getItem(key) || "[]");
  existing.unshift({ ...payload, ts: new Date().toISOString() });
  window.localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
}
