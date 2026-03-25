import React, { useState } from "react";
import { appendLead } from "../utils/leadStorage";

const EMPTY = {
  name: "",
  email: "",
  phone: "",
  interest: "Lease",
  message: "",
};

export default function LeadForm({ storageKey = "MM_contact_requests", source = "generic-form", title = "Tell us what you need", context = "" }) {
  const [form, setForm] = useState(EMPTY);
  const [saved, setSaved] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    appendLead(storageKey, { ...form, source, context });
    setSaved(true);
    setForm(EMPTY);
    window.setTimeout(() => setSaved(false), 5000);
  };

  return (
    <form className="form card soft" onSubmit={onSubmit}>
      <h3>{title}</h3>
      {context ? <p className="tiny muted">Context: {context}</p> : null}
      <div className="grid grid-2">
        <div className="field">
          <label htmlFor={`${source}-name`}>Name</label>
          <input id={`${source}-name`} name="name" value={form.name} onChange={onChange} required placeholder="Your name" />
        </div>
        <div className="field">
          <label htmlFor={`${source}-email`}>Email</label>
          <input id={`${source}-email`} name="email" type="email" value={form.email} onChange={onChange} required placeholder="you@company.com" />
        </div>
      </div>
      <div className="grid grid-2">
        <div className="field">
          <label htmlFor={`${source}-phone`}>Phone (optional)</label>
          <input id={`${source}-phone`} name="phone" value={form.phone} onChange={onChange} placeholder="Best number" />
        </div>
        <div className="field">
          <label htmlFor={`${source}-interest`}>I need help with</label>
          <select id={`${source}-interest`} name="interest" value={form.interest} onChange={onChange}>
            <option>Lease</option>
            <option>Buy</option>
            <option>Relocate</option>
            <option>Renewal</option>
            <option>Investment</option>
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor={`${source}-message`}>What matters most?</label>
        <textarea id={`${source}-message`} name="message" rows="4" value={form.message} onChange={onChange} placeholder="Location, size, timing, team needs, budget range, or any issue you want solved." />
      </div>
      <button className="btn btn-primary" type="submit">Send inquiry</button>
      {saved ? <div className="toast"><strong>Saved.</strong> Demo mode: no email is sent.</div> : null}
      <p className="tiny muted">This demo stores submissions locally so the flow can be tested before the real CRM/email step is connected.</p>
    </form>
  );
}
