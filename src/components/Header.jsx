import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { PRIMARY_NAV, SITE } from "../config/site";

function linkClass({ isActive }) {
  return isActive ? "active-link" : undefined;
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const { openLeadMagnet } = useLeadMagnet();

  const closeDrawer = () => setOpen(false);

  return (
    <header className="site-header" role="banner">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="header-utility-bar">
        <div className="container header-utility-inner">
          <div className="tiny muted">
            {SITE.brokerage.descriptor} • Serving {SITE.serviceAreas.join(", ")}
          </div>
          <div className="header-utility-links tiny muted">
            <a href={SITE.contact.phoneHref}>{SITE.contact.phoneDisplay}</a>
            <a href={SITE.contact.emailHref}>{SITE.contact.email}</a>
            <NavLink to="/warehouse">Warehouse demo</NavLink>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Go to homepage" onClick={closeDrawer}>
            <span className="brand-mark" aria-hidden="true">
              MM
            </span>
            <span className="brand-text">
              <span className="brand-name">{SITE.shortName}</span>
              <span className="brand-sub">{SITE.tagline}</span>
            </span>
          </NavLink>

          <nav className="nav" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeDrawer} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
            <button className="btn btn-primary btn-sm" type="button" onClick={openLeadMagnet}>
              {SITE.primaryCtaLabel}
            </button>
          </nav>

          <button
            className="nav-toggle"
            aria-label="Open menu"
            aria-expanded={open ? "true" : "false"}
            onClick={() => setOpen((s) => !s)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {!open ? null : (
        <div className="nav-drawer">
          <div className="container">
            <div className="nav-drawer-inner">
              <div className="card soft" style={{ padding: "14px", marginBottom: "4px" }}>
                <div className="kicker">Commercial real estate • GTA</div>
                <h3 style={{ marginTop: "8px" }}>{SITE.shortName}</h3>
                <p className="tiny muted" style={{ marginBottom: 0 }}>
                  Clearer leasing, relocation, and site-selection support for owner-users,
                  tenants, and investors.
                </p>
              </div>

              {PRIMARY_NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={linkClass}
                  onClick={closeDrawer}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="card soft" style={{ padding: "14px", marginTop: "4px" }}>
                <div className="kicker">Secondary experience</div>
                <NavLink to="/warehouse" className={linkClass} onClick={closeDrawer}>
                  Warehouse demo
                </NavLink>
                <div
                  className="tiny muted"
                  style={{ display: "grid", gap: "6px", marginTop: "12px", marginBottom: "12px" }}
                >
                  <a href={SITE.contact.phoneHref}>{SITE.contact.phoneDisplay}</a>
                  <a href={SITE.contact.emailHref}>{SITE.contact.email}</a>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    openLeadMagnet();
                  }}
                >
                  {SITE.primaryCtaLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
