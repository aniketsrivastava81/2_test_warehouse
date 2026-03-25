import React from "react";
import { NavLink } from "react-router-dom";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { PRIMARY_NAV, SITE } from "../config/site";

export default function Footer() {
  const { openLeadMagnet } = useLeadMagnet();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="card glow" style={{ marginBottom: "24px" }}>
          <div className="grid grid-2 footer-cta-grid" style={{ alignItems: "center" }}>
            <div>
              <div className="kicker">Move with more clarity</div>
              <h2 style={{ margin: "8px 0 10px 0" }}>
                Better commercial decisions start with a clearer shortlist and a stronger next step.
              </h2>
              <p className="muted" style={{ maxWidth: "62ch" }}>
                Use the site to browse listings, compare tools, and understand the decision path.
                Then use the checklist or contact route to turn interest into an actual conversation.
              </p>
            </div>

            <div className="card soft">
              <h3>Use the website like a real sales tool</h3>
              <p className="muted">
                The checklist, listings route, guides, and tools are designed to support first
                leases, renewals, relocations, and investment conversations.
              </p>
              <div className="footer-actions" style={{ marginTop: "12px" }}>
                <button className="btn btn-primary btn-sm" type="button" onClick={openLeadMagnet}>
                  {SITE.primaryCtaLabel}
                </button>
                <NavLink className="btn btn-secondary btn-sm" to="/contact">
                  {SITE.consultationCtaLabel}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-grid footer-grid-stronger">
          <div>
            <div className="footer-brand">
              <span className="brand-mark" aria-hidden="true">
                MM
              </span>
              <div>
                <div className="footer-name">{SITE.shortName}</div>
                <div className="footer-sub">{SITE.brokerage.descriptor}</div>
              </div>
            </div>

            <p className="muted">
              A commercial real-estate demo experience built around better site selection,
              leasing clarity, and cleaner conversion paths for the Greater Toronto Area.
            </p>

            <div className="badges" style={{ marginTop: "14px" }}>
              {SITE.assetClasses.slice(0, 4).map((item) => (
                <span className="pill" key={item}>
                  <strong>{item}</strong>
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3>Explore</h3>
            <ul className="footer-links">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <NavLink to="/warehouse">Warehouse demo</NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3>Advisory focus</h3>
            <ul className="footer-links">
              <li>First commercial leases</li>
              <li>Renewal vs. relocation planning</li>
              <li>Warehouse and office comparisons</li>
              <li>Retail and mixed-use evaluation</li>
              <li>Neighbourhood and footfall research</li>
            </ul>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-links">
              <li>
                <a href={SITE.contact.phoneHref}>{SITE.contact.phoneDisplay}</a>
              </li>
              <li>
                <a href={SITE.contact.emailHref}>{SITE.contact.email}</a>
              </li>
              <li>{SITE.serviceAreas.join(", ")}</li>
            </ul>
          </div>
        </div>

        <div className="card soft" style={{ marginTop: "24px" }}>
          <p className="tiny muted" style={{ marginBottom: 0 }}>
            <strong>Disclaimer:</strong> This site is still a demonstration build. Listings,
            metrics, walkability signals, and calculator outputs remain illustrative unless they
            are connected to verified live data and business details.
          </p>
        </div>

        <div className="footer-bottom">
          <span className="tiny muted">© {new Date().getFullYear()} {SITE.shortName}. All rights reserved.</span>
          <span className="tiny muted">Designed for a clean, premium, batch-built Vercel demo workflow.</span>
        </div>
      </div>
    </footer>
  );
}
