import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <div className="brand-mark footer-brand">
            <span className="brand-kicker">KOLT</span>
            <span className="brand-name">Realty</span>
          </div>
          <p>
            A sharper commercial real estate journey for clients who want better filters,
            stronger market clarity, and decisions that hold up under pressure.
          </p>
        </div>

        <div>
          <div className="footer-title">What clients get here</div>
          <ul className="footer-list">
            <li>Decision-first advisory</li>
            <li>Meaningful GTA market guidance</li>
            <li>Tools that reduce blind spots</li>
            <li>Interactive warehouse showcase</li>
          </ul>
        </div>

        <div>
          <div className="footer-title">Explore</div>
          <div className="footer-links">
            {SITE.footerNav.map((item) => (
              <Link key={item.href} to={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 KOLT Realty. Conceptual marketing build.</span>
        <span>Public office contact: info@kolt.ca · +1-416-860-3660</span>
      </div>
    </footer>
  );
}
