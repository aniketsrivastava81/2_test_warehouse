import { SITE } from "../config/site";
function normalizePhone(phone){ return (phone||"").replace(/[^\d+]/g,""); }
export function buildLeadSummary(payload={}){ const shortlist=Array.isArray(payload.shortlist)&&payload.shortlist.length?`Shortlist: ${payload.shortlist.map((i)=>i.title||i.slug||i).join(", ")}`:"Shortlist: none attached"; return [
`Name: ${payload.name||"Not provided"}`,
`Email: ${payload.email||"Not provided"}`,
`Phone: ${payload.phone||"Not provided"}`,
`Asset type: ${payload.assetType||payload.interest||"Not provided"}`,
`Intent: ${payload.intent||payload.stage||"Not provided"}`,
`Area / market: ${payload.area||payload.location||"Not provided"}`,
`Size / budget: ${payload.sizeNeed||"Not provided"}`,
`Timing: ${payload.timing||payload.timeline||"Not provided"}`,
`Source: ${payload.source||"Website"}`,
`Context: ${payload.context||"General inquiry"}`,
shortlist,
`Message: ${payload.message||payload.note||"None"}`].join("\n"); }
export function buildMailtoHref(payload={}){ const subject=encodeURIComponent(`KOLT sample inquiry - ${payload.assetType||payload.interest||"Commercial requirement"}`); const body=encodeURIComponent(buildLeadSummary(payload)); return `mailto:${SITE.inquiryEmail}?subject=${subject}&body=${body}`; }
export function buildWhatsappHref(payload={}){ const text=encodeURIComponent(`${SITE.whatsappShareText}\n\n${buildLeadSummary(payload)}`); const number=normalizePhone(SITE.whatsappNumber).replace("+",""); return `https://wa.me/${number}?text=${text}`; }
export function buildTelHref(){ return `tel:${normalizePhone(SITE.primaryPhone)}`; }
