import React, { useEffect, useMemo, useState } from "react";
import { SITE } from "../config/site";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { appendLead } from "../utils/leadStorage";
import { trackEvent } from "../utils/tracking";

const initialForm = {
  name: "",
  email: "",
  stage: "",
  note: "",
  space: [],
};

export default function LeadMagnetModal() {
  const { isOpen, closeLeadMagnet } = useLeadMagnet();
  const [form, setForm] = useState(initialForm);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeLeadMagnet();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeLeadMagnet, isOpen]);

  const checkedMap = useMemo(
    () => ({
      office: form.space.includes("office"),
      retail: form.space.includes("retail"),
      warehouse: form.space.includes("warehouse"),
    }),
    [form.space]
  );

  const toggleSpace = (value) => {
    setForm((prev) => ({
      ...prev,
      space: prev.space.includes(value)
        ? prev.space.filter((item) => item !== value)
        : [...prev.space, value],
    }));
  };

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const payload = { ...form, source: "checklist-modal", context: SITE.leadMagnetTitle };
    appendLead("MM_leads", payload);
    trackEvent("lead_magnet_submit", {
      stage: form.stage || "unspecified",
      spaces: form.space.join(",") || "unspecified",
    });
    setSaved(true);
    setForm(initialForm);
    window.setTimeout(() => setSaved(false), 6500);
  };

  if (!isOpen) return null;

  return (
    <div className="modal" aria-hidden="false">
      <div className="modal-backdrop" onClick={closeLeadMagnet}></div>

      <div className="modal-card" role="dialog" aria-modal="true" aria-label={`Get the ${SITE.leadMagnetTitle}`}>
        <button className="modal-close" aria-label="Close" type="button" onClick={closeLeadMagnet}>
          ×
        </button>

        <div className="modal-header">
          <div className="badges" style={{ marginBottom: "10px" }}>
            <span className="pill"><strong>Free PDF</strong></span>
            <span className="pill">First lease • Renewal • Relocation</span>
          </div>

          <h2>{SITE.leadMagnetTitle}</h2>
          <p className="muted">
            A calm, practical checklist to help GTA business owners compare options, reduce uncertainty, and move forward with more confidence before signing a commercial lease.
          </p>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="lm_name">Name</label>
              <input
                id="lm_name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Your name"
                required
                value={form.name}
                onChange={updateField}
              />
            </div>

            <div className="field">
              <label htmlFor="lm_email">Email</label>
              <input
                id="lm_email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                required
                value={form.email}
                onChange={updateField}
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="lm_stage">Where are you in your leasing journey?</label>
            <select id="lm_stage" name="stage" required value={form.stage} onChange={updateField}>
              <option value="" disabled>
                Select one
              </option>
              <option value="first-lease">First commercial lease (0–3 months)</option>
              <option value="renewal">Lease renewal (expires in 0–6 months)</option>
              <option value="relocation">Relocating / scaling into a new space</option>
              <option value="exploring">Exploring early options (6+ months out)</option>
            </select>
          </div>

          <fieldset className="field checkbox-fieldset">
            <legend>What type of space are you considering?</legend>
            <div className="checks">
              <label className="check">
                <input type="checkbox" checked={checkedMap.office} onChange={() => toggleSpace("office")} />
                <span>Office</span>
              </label>
              <label className="check">
                <input type="checkbox" checked={checkedMap.retail} onChange={() => toggleSpace("retail")} />
                <span>Retail</span>
              </label>
              <label className="check">
                <input type="checkbox" checked={checkedMap.warehouse} onChange={() => toggleSpace("warehouse")} />
                <span>Warehouse / Industrial</span>
              </label>
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="lm_note">Anything helpful to know? (optional)</label>
            <textarea
              id="lm_note"
              name="note"
              rows="3"
              placeholder="Budget range, preferred area, timing, or any concerns you want help with."
              value={form.note}
              onChange={updateField}
            ></textarea>
          </div>

          <button className="btn btn-primary" type="submit">
            Send me the checklist
          </button>

          <p className="tiny muted">
            Practical leasing guidance, delivered with a clear starting point for the next conversation.
          </p>

          {!saved ? null : (
            <div className="toast" aria-live="polite">
              <strong>Done.</strong> Your request has been received.
              <div className="tiny muted" style={{ marginTop: "6px" }}>
                You can also use the tools page to compare lease-vs-buy scenarios, footfall patterns, and occupancy costs.
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
