import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";

function normalizePhone(phone) {
  return phone.replace(/[^\d+]/g, "");
}

export default function FloatingInquiryButton() {
  const [open, setOpen] = React.useState(false);
  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(SITE.whatsappShareText)}`;
  const telHref = `tel:${normalizePhone(SITE.primaryPhone)}`;

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
          <h2>Move directly into contact, call, or a WhatsApp-ready draft.</h2>
          <p>
            The WhatsApp action opens a prefilled message draft. Dial and email actions use KOLT’s public contact details.
          </p>
          <div className="floating-inquiry__actions">
            <a className="button button-primary small-button" href={whatsappHref} target="_blank" rel="noreferrer">Open WhatsApp draft</a>
            <a className="button button-secondary small-button" href={telHref}>Call office</a>
            <Link className="button button-secondary small-button" to="/contact#analysis-workflow" onClick={() => setOpen(false)}>Request analysis</Link>
          </div>
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
