import React from "react";
import { Link } from "react-router-dom";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { SITE } from "../config/site";

export default function MobileStickyCTA() {
  const { openLeadMagnet } = useLeadMagnet();

  return (
    <div className="mobile-sticky-cta" aria-label="Quick contact actions">
      <a className="mobile-sticky-link" href={SITE.contact.phoneHref}>
        Call
      </a>
      <a className="mobile-sticky-link" href={SITE.contact.emailHref}>
        Email
      </a>
      <button className="mobile-sticky-button" type="button" onClick={openLeadMagnet}>
        Checklist
      </button>
      <Link className="mobile-sticky-link mobile-sticky-link--accent" to="/contact">
        Contact
      </Link>
    </div>
  );
}
