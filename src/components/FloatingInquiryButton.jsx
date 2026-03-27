import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";
import { buildTelHref, buildWhatsappHref } from "../utils/inquiryRouting";

export default function FloatingInquiryButton() {
  const [open, setOpen] = React.useState(false);
  const whatsappHref = buildWhatsappHref({ source: "floating-cta", context: "Quick inquiry panel" });
  const telHref = buildTelHref();

  React.useEffect(() => {
    const onEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className={`floating-inquiry ${open ? "is-open" : ""}`}>
      {open ? (
        <div className="floating-inquiry__panel" role="dialog" aria-label="Quick inquiry options">
          <div className="floating-inquiry__eyebrow">Quick inquiry</div>
          <h2>Move into contact, a call, or a WhatsApp-ready draft.</h2>
          <p>
            This demo build uses a sample business number and sample inbox routing so the inquiry flow feels connected,
            reviewable, and ready for a real CRM handoff.
          </p>
          <div className="floating-inquiry__actions">
            <a className="button button-primary small-button" href={whatsappHref} target="_blank" rel="noreferrer">Open WhatsApp draft</a>
            <a className="button button-secondary small-button" href={telHref}>Call office</a>
            <Link className="button button-secondary small-button" to="/contact#analysis-workflow" onClick={() => setOpen(false)}>Request analysis</Link>
          </div>
          <div className="floating-inquiry__meta">Sample phone: {SITE.primaryPhone} - sample inbox: {SITE.inquiryEmail}</div>
        </div>
      ) : null}
      <button
        type="button"
        className="floating-inquiry__toggle"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label="Open quick inquiry options"
      >
        <span aria-hidden="true">✆</span>
        <span>Quick inquiry</span>
      </button>
    </div>
  );
}
