import React from "react";
import { NavLink } from "react-router-dom";
import { SITE } from "../config/site";

export default function MobileStickyCTA() {
  return (
    <div className="mobile-sticky-cta" aria-label="Quick contact actions">
      <a href={SITE.primaryPhoneHref}>Call Megha</a>
      <a href={SITE.primaryEmailHref}>Email Megha</a>
      <NavLink to="/contact">Book consult</NavLink>
    </div>
  );
}
