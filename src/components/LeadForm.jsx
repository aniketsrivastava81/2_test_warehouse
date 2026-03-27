import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { appendLead } from "../utils/leadStorage";
import { buildMailtoHref, buildWhatsappHref } from "../utils/inquiryRouting";

function buildInitialState(defaultValues = {}) {
  return { name: "", email: "", phone: "", interest: "", location: "", timeline: "", message: "", ...defaultValues };
}

export default function LeadForm({ storageKey = "MM_contact_requests", source = "generic-form", title = "Tell us what you need", intro = "Share a few details and Megha will have a clear starting point for the conversation.", context = "", submitLabel = "Send inquiry", successTitle = "Saved.", successBody = "Your inquiry has been received.", interestLabel = "I need help with", interestOptions = ["Lease", "Buy", "Relocate", "Renewal", "Investment"], locationLabel = "Preferred area", timelineLabel = "Timing", timelineOptions = ["Immediately", "0–3 months", "3–6 months", "6+ months"], messageLabel = "What matters most?", messagePlaceholder = "Location, size, timing, team needs, budget range, or any issue you want solved.", successTimeout = 5000, note = "We respond with practical next steps, not spam.", includePhone = true, includeLocation = true, includeTimeline = true, includeMessage = true, variant = "full", defaultValues = {}, onSuccess }) {
  const [form, setForm] = useState(() => buildInitialState(defaultValues));
  const [savedRecord, setSavedRecord] = useState(null);
  const idBase = useMemo(() => source.replace(/[^a-z0-9]+/gi, "-").toLowerCase(), [source]);
  const onChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const onSubmit = (event) => {
    event.preventDefault();
    const record = appendLead(storageKey, { ...form, source, context });
    setSavedRecord(record || form);
    setForm(buildInitialState(defaultValues));
    onSuccess?.(record || form);
    window.setTimeout(() => setSavedRecord(null), successTimeout);
  };
  return (
    <form className={`form card soft lead-form ${variant === "compact" ? "lead-form-compact" : ""}`} onSubmit={onSubmit}>
      <div className="lead-form-head"><h3>{title}</h3>{intro ? <p className="muted">{intro}</p> : null}{context ? <p className="tiny muted">Context: {context}</p> : null}</div>
      <div className="grid grid-2 lead-form-grid"><div className="field"><label htmlFor={`${idBase}-name`}>Name</label><input id={`${idBase}-name`} name="name" autoComplete="name" value={form.name} onChange={onChange} required placeholder="Your name" /></div><div className="field"><label htmlFor={`${idBase}-email`}>Email</label><input id={`${idBase}-email`} name="email" type="email" autoComplete="email" value={form.email} onChange={onChange} required placeholder="you@company.com" /></div></div>
      <div className="grid grid-2 lead-form-grid">{includePhone ? <div className="field"><label htmlFor={`${idBase}-phone`}>Phone (optional)</label><input id={`${idBase}-phone`} name="phone" autoComplete="tel" value={form.phone} onChange={onChange} placeholder="Best number" /></div> : null}<div className="field"><label htmlFor={`${idBase}-interest`}>{interestLabel}</label><select id={`${idBase}-interest`} name="interest" value={form.interest} onChange={onChange} required><option value="" disabled>Select one</option>{interestOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div></div>
      {(includeLocation || includeTimeline) ? <div className="grid grid-2 lead-form-grid">{includeLocation ? <div className="field"><label htmlFor={`${idBase}-location`}>{locationLabel}</label><input id={`${idBase}-location`} name="location" autoComplete="address-level2" value={form.location} onChange={onChange} placeholder="Toronto, Vaughan, Mississauga..." /></div> : null}{includeTimeline ? <div className="field"><label htmlFor={`${idBase}-timeline`}>{timelineLabel}</label><select id={`${idBase}-timeline`} name="timeline" value={form.timeline} onChange={onChange}><option value="">Select timing</option>{timelineOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></div> : null}</div> : null}
      {includeMessage ? <div className="field"><label htmlFor={`${idBase}-message`}>{messageLabel}</label><textarea id={`${idBase}-message`} name="message" rows={variant === "compact" ? 3 : 4} value={form.message} onChange={onChange} placeholder={messagePlaceholder} /></div> : null}
      <div className="lead-form-actions"><button className="btn btn-primary" type="submit">{submitLabel}</button>{note ? <p className="tiny muted">{note}</p> : null}</div>
      {savedRecord ? <div className="toast" aria-live="polite"><strong>{successTitle}</strong> {successBody}<div className="toast-actions"><Link className="button button-secondary small-button" to="/contact#sample-crm-inbox">Open inbox</Link><a className="button button-secondary small-button" href={buildMailtoHref(savedRecord)}>Email brief</a><a className="button button-secondary small-button" href={buildWhatsappHref(savedRecord)} target="_blank" rel="noreferrer">WhatsApp draft</a></div></div> : null}
    </form>
  );
}
