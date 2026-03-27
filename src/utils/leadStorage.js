const MAX_STORED_CHARS = 120000;
export const SAMPLE_INBOX_KEY = "KOLT_sample_inbox";
function canUseStorage(){ return typeof window !== "undefined" && typeof window.localStorage !== "undefined"; }
function normalizeKey(key){ return key || "MM_leads"; }
function emitInboxEvent(){ if(typeof window !== "undefined") window.dispatchEvent(new CustomEvent("kolt-inbox-updated")); }
export function getStoredLeads(key){ if(!canUseStorage()) return []; try{ const raw=window.localStorage.getItem(normalizeKey(key)); return raw?JSON.parse(raw):[]; }catch{return [];} }
export function appendLead(key,payload){ if(!canUseStorage()) return null; const safeKey=normalizeKey(key); const record={ id:`${Date.now()}-${Math.random().toString(36).slice(2,7)}`, ...payload, ts:new Date().toISOString()}; const existing=getStoredLeads(safeKey); window.localStorage.setItem(safeKey, JSON.stringify([record,...existing]).slice(0,MAX_STORED_CHARS)); appendToInbox(record); emitInboxEvent(); return record; }
export function appendToInbox(payload){ if(!canUseStorage()) return null; const existing=getStoredLeads(SAMPLE_INBOX_KEY); window.localStorage.setItem(SAMPLE_INBOX_KEY, JSON.stringify([payload,...existing].slice(0,50)).slice(0,MAX_STORED_CHARS)); emitInboxEvent(); return payload; }
export function getInboxLeads(){ return getStoredLeads(SAMPLE_INBOX_KEY); }
export function clearStoredLeads(key){ if(!canUseStorage()) return; window.localStorage.removeItem(normalizeKey(key)); emitInboxEvent(); }
export function clearInboxLeads(){ clearStoredLeads(SAMPLE_INBOX_KEY); }
