import React, { useMemo, useState } from "react";
import { appendLead } from "../utils/leadStorage";

function buildInitialState(defaultValues = {}) {
  return {
    name: "",
    email: "",
    phone: "",
    interest: "",
    location: "",
    timeline: "",
    message: "",
    ...defaultValues,
  };
}

export default function LeadForm({
  storageKey = "MM_contact_requests",
  source = "generic-form",
  title = "Tell us what you need",
  intro = "Share a few details and we will save the request in demo mode.",
  context = "",
  submitLabel = "Send inquiry",
  successTitle = "Saved.",
  successBody = "Demo mode: no email is sent.",
  interestLabel = "I need help with",
  interestOptions = ["Lease", "Buy", "Relocate", "Renewal", "Investment"],
  locationLabel = "Preferred area",
  timelineLabel = "Timing",
  timelineOptions = ["Immediately", "0–3 months", "3–6 months", "6+ months"],
  messageLabel = "What matters most?",
  messagePlaceholder = "Location, size, timing, team needs, budget range, or any issue you want solved.",
  successTimeout = 5000,
  note = "We respond with practical next steps, not spam.",
  includePhone = true,
  includeLocation = true,
  includeTimeline = true,
  includeMessage = true,
  variant = "full",
  defaultValues = {},
}) {
  const [form, setForm] = useState(() => buildInitialState(defaultValues));
  const [saved, setSaved] = useState(false);

  const idBase = useMemo(() => source.replace(/[^a-z0-9]+/gi, "-").toLowerCase(), [source]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    appendLead(storageKey, { ...form, source, context });
    setSaved(true);
    setForm(buildInitialState(defaultValues));
    window.setTimeout(() => setSaved(false), successTimeout);
  };

  return (
    <form className={`form card soft lead-form ${variant === "compact" ? "lead-form-compact" : ""}`} onSubmit={onSubmit}>
      <div className="lead-form-head">
        <h3>{title}</h3>
        {intro ? <p className="muted">{intro}</p> : null}
        {context ? <p className="tiny muted">Context: {context}</p> : null}
      </div>

      <div className="grid grid-2 lead-form-grid">
        <div className="field">
          <label htmlFor={`${idBase}-name`}>Name</label>
          <input
            id={`${idBase}-name`}
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Your name"
          />
        </div>
        <div className="field">
          <label htmlFor={`${idBase}-email`}>Email</label>
          <input
            id={`${idBase}-email`}
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div className="grid grid-2 lead-form-grid">
        {includePhone ? (
          <div className="field">
            <label htmlFor={`${idBase}-phone`}>Phone (optional)</label>
            <input
              id={`${idBase}-phone`}
              name="phone"
              value={form.phone}
              onChange={onChange}
              placeholder="Best number"
            />
          </div>
        ) : null}

        <div className="field">
          <label htmlFor={`${idBase}-interest`}>{interestLabel}</label>
          <select id={`${idBase}-interest`} name="interest" value={form.interest} onChange={onChange} required>
            <option value="" disabled>
              Select one
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      {(includeLocation || includeTimeline) ? (
        <div className="grid grid-2 lead-form-grid">
          {includeLocation ? (
            <div className="field">
              <label htmlFor={`${idBase}-location`}>{locationLabel}</label>
              <input
                id={`${idBase}-location`}
                name="location"
                value={form.location}
                onChange={onChange}
                placeholder="Toronto, Vaughan, Mississauga..."
              />
            </div>
          ) : null}

          {includeTimeline ? (
            <div className="field">
              <label htmlFor={`${idBase}-timeline`}>{timelineLabel}</label>
              <select id={`${idBase}-timeline`} name="timeline" value={form.timeline} onChange={onChange}>
                <option value="">Select timing</option>
                {timelineOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ) : null}
        </div>
      ) : null}

      {includeMessage ? (
        <div className="field">
          <label htmlFor={`${idBase}-message`}>{messageLabel}</label>
          <textarea
            id={`${idBase}-message`}
            name="message"
            rows={variant === "compact" ? 3 : 4}
            value={form.message}
            onChange={onChange}
            placeholder={messagePlaceholder}
          />
        </div>
      ) : null}

      <div className="lead-form-actions">
        <button className="btn btn-primary" type="submit">{submitLabel}</button>
        {note ? <p className="tiny muted">{note}</p> : null}
      </div>

      {saved ? (
        <div className="toast">
          <strong>{successTitle}</strong> {successBody}
        </div>
      ) : null}
    </form>
  );
}
