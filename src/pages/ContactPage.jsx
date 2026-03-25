import React, { useState } from "react";
import { SITE } from "../config/site";
import { useLeadMagnet } from "../context/LeadMagnetContext";

const initialForm = {
  name: "",
  email: "",
  company: "",
  need: "",
  message: "",
};

export default function ContactPage() {
  const { openLeadMagnet } = useLeadMagnet();
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const key = "MM_contact_requests";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.unshift({ ...form, ts: new Date().toISOString(), source: "contact-page" });
    localStorage.setItem(key, JSON.stringify(existing).slice(0, 80000));
    setSaved(true);
    setForm(initialForm);
    window.setTimeout(() => setSaved(false), 6500);
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Contact</div>
            <h1 style={{ marginTop: "8px" }}>Use one clear route to start the conversation</h1>
          </div>
          <p>
            This page becomes the main contact route for the demo. It supports direct contact,
            quick inquiry capture, and checklist-driven lead generation.
          </p>
        </div>

        <div className="grid grid-2">
          <article className="card glow">
            <div className="kicker">Direct contact</div>
            <h2 style={{ marginTop: "8px" }}>Prefer a fast, human next step?</h2>
            <p className="muted">
              Reach out directly or use the form. The final production version can connect this
              page to real submissions, scheduling, or CRM flows.
            </p>
            <div className="table-like">
              <div className="row">
                <b>Phone</b>
                <span><a href={SITE.contact.phoneHref}>{SITE.contact.phoneDisplay}</a></span>
              </div>
              <div className="row">
                <b>Email</b>
                <span><a href={SITE.contact.emailHref}>{SITE.contact.email}</a></span>
              </div>
              <div className="row">
                <b>Coverage</b>
                <span>{SITE.serviceAreas.join(", ")}</span>
              </div>
            </div>
            <div className="footer-actions" style={{ marginTop: "14px" }}>
              <a className="btn btn-secondary" href={SITE.contact.phoneHref}>
                Call now
              </a>
              <button className="btn btn-primary" type="button" onClick={openLeadMagnet}>
                Get the checklist
              </button>
            </div>
          </article>

          <article className="card soft">
            <h3>Contact form (demo mode)</h3>
            <form className="form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="contact_name">Name</label>
                <input id="contact_name" name="name" type="text" required value={form.name} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="contact_email">Email</label>
                <input id="contact_email" name="email" type="email" required value={form.email} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="contact_company">Company</label>
                <input id="contact_company" name="company" type="text" value={form.company} onChange={handleChange} />
              </div>
              <div className="field">
                <label htmlFor="contact_need">What do you need?</label>
                <select id="contact_need" name="need" required value={form.need} onChange={handleChange}>
                  <option value="" disabled>Select one</option>
                  <option value="first-lease">First commercial lease</option>
                  <option value="renewal">Lease renewal</option>
                  <option value="relocation">Relocating or scaling</option>
                  <option value="investment">Investment / owner-user search</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="contact_message">Message</label>
                <textarea id="contact_message" name="message" rows="4" value={form.message} onChange={handleChange}></textarea>
              </div>
              <button className="btn btn-primary" type="submit">Save inquiry</button>
              {!saved ? null : (
                <div className="toast"><strong>Saved.</strong> Demo mode: this request is stored locally only.</div>
              )}
            </form>
          </article>
        </div>
      </div>
    </section>
  );
}
