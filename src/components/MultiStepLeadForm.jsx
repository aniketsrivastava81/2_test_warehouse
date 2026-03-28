import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";
import { appendLead } from "../utils/leadStorage";
import { getShortlist } from "../utils/shortlistStorage";
import { buildMailtoHref, buildWhatsappHref } from "../utils/inquiryRouting";

const assetOptions = ["Industrial", "Office", "Retail", "Land", "Investment / Portfolio"];
const intentOptions = ["Lease", "Acquire", "Dispose / Market", "Require analysis", "Request confidential OM"];
const timingOptions = ["Immediately", "0–3 months", "3–6 months", "6–12 months", "Exploratory"];

export default function MultiStepLeadForm({ source = "multi-step-lead-form", title = "Start with the requirement, then capture the contact.", intro = "Use a two-step structure so the inquiry feels more like a requirement brief than a generic form.", context = "" }) {
  const [step, setStep] = React.useState(1);
  const [savedRecord, setSavedRecord] = React.useState(null);
  const [form, setForm] = React.useState({ assetType: "Industrial", intent: "Require analysis", area: "", sizeNeed: "", timing: "0–3 months", name: "", email: "", phone: "", message: "" });
  const shortlist = getShortlist();
  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const onSubmit = (event) => {
    event.preventDefault();
    const record = appendLead("KOLT_multi_step_inquiries", { ...form, source, context, shortlist });
    setSavedRecord(record || form);
    window.setTimeout(() => setSavedRecord(null), 9000);
  };
  const mailtoHref = buildMailtoHref(savedRecord || form);
  const whatsappHref = buildWhatsappHref(savedRecord || form);

  return (
    <form className="multi-step-form" onSubmit={onSubmit} aria-describedby="multi-step-form-note">
      <div className="multi-step-form__head"><div><div className="eyebrow">Requirement brief</div><h2>{title}</h2></div><p>{intro}</p></div>
      <div className="multi-step-form__progress" aria-label="Form progress"><span className={step === 1 ? "is-active" : ""}>1. Requirement</span><span className={step === 2 ? "is-active" : ""}>2. Contact</span></div>
      {step === 1 ? (
        <fieldset className="multi-step-form__fieldset">
          <legend>What are you looking for?</legend>
          <div className="multi-step-form__chips" role="radiogroup" aria-label="Asset type">
            {assetOptions.map((option) => (
              <label key={option} className={`choice-chip ${form.assetType === option ? "is-selected" : ""}`}><input id={`ms-asset-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} type="radio" name="assetType" value={option} checked={form.assetType === option} onChange={handleChange} /><span>{option}</span></label>
            ))}
          </div>
          <div className="multi-step-form__grid">
            <label className="field"><span>I need help with</span><select id="ms-intent" name="intent" value={form.intent} onChange={handleChange}>{intentOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
            <label className="field"><span>Preferred area / corridor</span><input id="ms-area" name="area" value={form.area} onChange={handleChange} placeholder="Mississauga, Vaughan, North York…" /></label>
            <label className="field"><span>Approximate size or budget</span><input id="ms-sizeNeed" name="sizeNeed" value={form.sizeNeed} onChange={handleChange} placeholder="12,000 SF · $18 PSF net · $4M…" /></label>
            <label className="field"><span>Timing</span><select id="ms-timing" name="timing" value={form.timing} onChange={handleChange}>{timingOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>
          </div>
          {shortlist.length ? <div className="multi-step-form__note">Shortlist attached automatically: {shortlist.length} saved opportunit{shortlist.length > 1 ? "ies" : "y"}.</div> : null}
          <div className="multi-step-form__actions"><button type="button" className="button button-primary" onClick={() => setStep(2)}>Continue to contact</button></div>
        </fieldset>
      ) : (
        <fieldset className="multi-step-form__fieldset">
          <legend>How should KOLT follow up?</legend>
          <div className="multi-step-form__grid">
            <label className="field"><span>Name</span><input id="ms-name" name="name" value={form.name} onChange={handleChange} autoComplete="name" required /></label>
            <label className="field"><span>Email</span><input id="ms-email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" required /></label>
            <label className="field"><span>Phone</span><input id="ms-phone" name="phone" value={form.phone} onChange={handleChange} autoComplete="tel" placeholder={SITE.primaryPhone} /></label>
            <label className="field field--full"><span>Anything we should pressure-test?</span><textarea id="ms-message" name="message" rows="5" value={form.message} onChange={handleChange} placeholder="NNN exposure, loading type, cap rate targets, zoning constraints, logistics concerns, decision timing…" /></label>
          </div>
          <p className="multi-step-form__note" id="multi-step-form-note">Submissions now route into a local sample CRM inbox for the demo build and expose ready-to-send email / WhatsApp drafts.</p>
          <div className="multi-step-form__actions"><button type="button" className="button button-secondary" onClick={() => setStep(1)}>Back</button><button type="submit" className="button button-primary">Send inquiry to sample inbox</button></div>
          {savedRecord ? <div className="multi-step-form__saved multi-step-form__saved--stack" aria-live="polite"><strong>Inquiry routed.</strong> Your brief is now visible in the sample CRM inbox and ready for email or WhatsApp handoff.<div className="multi-step-form__saved-actions"><Link className="button button-primary small-button" to="/contact#sample-crm-inbox">Open sample CRM inbox</Link><a className="button button-secondary small-button" href={mailtoHref}>Email this brief</a><a className="button button-secondary small-button" href={whatsappHref} target="_blank" rel="noreferrer">Send via WhatsApp</a></div></div> : null}
        </fieldset>
      )}
    </form>
  );
}
