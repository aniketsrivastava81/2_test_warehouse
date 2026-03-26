import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({ eyebrow, title, body, primaryLabel, primaryTo, secondaryLabel, secondaryTo }) {
  return (
    <section className="section">
      <div className="container">
        <div className="cta-panel">
          <div>
            {eyebrow && <div className="eyebrow">{eyebrow}</div>}
            <h2>{title}</h2>
            <p>{body}</p>
          </div>
          <div className="cta-actions">
            {primaryLabel && primaryTo && <Link className="button button-primary" to={primaryTo}>{primaryLabel}</Link>}
            {secondaryLabel && secondaryTo && <Link className="button button-secondary" to={secondaryTo}>{secondaryLabel}</Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
