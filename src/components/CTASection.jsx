import React from "react";
import { Link } from "react-router-dom";

export default function CTASection({ kicker, title, body, primary, secondary }) {
  return (
    <section className="section tight">
      <div className="container">
        <div className="card glow cta-section-block">
          <div>
            {kicker ? <div className="kicker">{kicker}</div> : null}
            <h2 style={{ marginTop: "8px" }}>{title}</h2>
            <p className="muted" style={{ maxWidth: "64ch" }}>{body}</p>
          </div>
          <div className="footer-actions">
            {primary ? (
              <Link className="btn btn-primary" to={primary.to}>
                {primary.label}
              </Link>
            ) : null}
            {secondary ? (
              <Link className="btn btn-secondary" to={secondary.to}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
