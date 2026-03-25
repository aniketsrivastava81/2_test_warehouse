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
          <div className="grid grid-2" style={{ alignItems: "center" }}>
            <div>
              <div className="kicker">Move with more clarity</div>
              <h2 style={{ margin: "8px 0 10px 0" }}>Commercial space decisions should feel strategic, not rushed.</h2>
              <p className="muted" style={{ maxWidth: "62ch" }}>
                The site is built to help commercial clients move from early browsing to a more focused shortlist, stronger property comparisons, and a clear next step.
              </p>
            </div>

            <div className="card soft">
              <h3>Start with one clear next step</h3>
              <p className="muted">Download the checklist, browse listings, or book a consultation to turn this from browsing into action.</p>
              <div className="footer-actions" style={{ marginTop: "12px" }}>
                <button className="btn btn-primary btn-sm" type="button" onClick={openLeadMagnet}>Download Checklist</button>
                <NavLink className="btn btn-secondary btn-sm" to="/contact">Book a consultation</NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-mark" aria-hidden="true">{SITE.shortBrand}</span>
              <div>
                <div className="footer-name">{SITE.brandName}</div>
                <div className="footer-sub">{SITE.brokerage}</div>
              </div>
            </div>

            <p className="muted">
              Commercial real-estate guidance for tenants, owner-users, investors, and developers who need better-fit options and a clearer decision path across the GTA.
            </p>

            <div className="badges" style={{ marginTop: "14px" }}>
              {SITE.proofPoints.map((item) => (
                <span className="pill" key={item}><strong>{item}</strong></span>
              ))}
            </div>
          </div>

          <div>
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {PRIMARY_NAV.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}>{item.label}</NavLink>
                </li>
              ))}
              <li><NavLink to="/warehouse">Warehouse Demo</NavLink></li>
            </ul>

            <div className="hr"></div>

            <h3>Service Areas</h3>
            <div className="badges">
              {SITE.serviceAreas.map((area) => <span className="pill" key={area}>{area}</span>)}
            </div>
          </div>

          <div>
            <h3>Contact</h3>
            <ul className="footer-links footer-contact-list">
              <li><span>Call:</span> <a href={SITE.primaryPhoneHref}>{SITE.primaryPhone}</a></li>
              <li><span>Email:</span> <a href={SITE.primaryEmailHref}>{SITE.primaryEmail}</a></li>
              <li><span>Coverage:</span> {SITE.serviceAreas.join(", ")}</li>
            </ul>

            <div className="footer-actions footer-contact-actions">
              <NavLink className="btn btn-secondary btn-sm" to="/contact">Book consult</NavLink>
              <button className="btn btn-ghost btn-sm" type="button" onClick={openLeadMagnet}>Get checklist</button>
            </div>

            <div className="hr"></div>

            <h3>Asset Classes</h3>
            <ul className="footer-links">
              {SITE.assetClasses.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>

        <div className="card soft" style={{ marginTop: "24px" }}>
          <p className="tiny muted" style={{ marginBottom: 0 }}>
            <strong>Note:</strong> Property listings, market snapshots, and calculator outputs should be verified before any real-world decision or offer is made.
          </p>
        </div>

        <div className="footer-bottom">
          <span className="tiny muted">© {new Date().getFullYear()} {SITE.brandName}. All rights reserved.</span>
          <span className="tiny muted">Designed to feel premium, useful, and conversion-ready for client review.</span>
        </div>
      </div>
    </footer>
  );
}
