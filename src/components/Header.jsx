import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useLeadMagnet } from "../context/LeadMagnetContext";
import { PRIMARY_NAV, SITE } from "../config/site";

export default function Header() {
  const { openLeadMagnet } = useLeadMagnet();
  const [open, setOpen] = useState(false);

  const linkClass = useMemo(
    () => ({ isActive }) => `nav-link${isActive ? " active" : ""}`,
    []
  );

  const closeDrawer = () => setOpen(false);

  return (
    <header className="site-header" role="banner">
      <div className="container">
        <div className="header-topbar tiny muted">
          <span>{SITE.brokerage}</span>
          <div className="header-topbar-links">
            <a href={SITE.primaryPhoneHref}>{SITE.primaryPhone}</a>
            <a href={SITE.primaryEmailHref}>{SITE.primaryEmail}</a>
          </div>
        </div>

        <div className="header-inner">
          <NavLink className="brand" to="/" aria-label="Go to homepage" onClick={closeDrawer}>
            <span className="brand-mark" aria-hidden="true">{SITE.shortBrand}</span>
            <span className="brand-text">
              <span className="brand-name">{SITE.brandName}</span>
              <span className="brand-sub">{SITE.brokerage}</span>
            </span>
          </NavLink>

          <nav className="nav" aria-label="Primary">
            {PRIMARY_NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === "/"}>
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/warehouse" className="nav-secondary-link">Warehouse Demo</NavLink>
            <button className="btn btn-primary btn-sm" type="button" onClick={openLeadMagnet}>
              Get the Checklist
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
                <div className="kicker">Commercial Real Estate • GTA</div>
                <h3 style={{ marginTop: "8px" }}>{SITE.brandName}</h3>
                <p className="tiny muted" style={{ marginBottom: 0 }}>{SITE.tagline}</p>
              </div>

              {PRIMARY_NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={linkClass} onClick={closeDrawer} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              ))}
              <NavLink to="/warehouse" className={linkClass} onClick={closeDrawer}>Warehouse Demo</NavLink>

              <div className="card soft" style={{ padding: "14px", marginTop: "4px" }}>
                <div className="tiny muted" style={{ display: "grid", gap: "6px", marginBottom: "12px" }}>
                  <a href={SITE.primaryPhoneHref}>{SITE.primaryPhone}</a>
                  <a href={SITE.primaryEmailHref}>{SITE.primaryEmail}</a>
                </div>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    closeDrawer();
                    openLeadMagnet();
                  }}
                >
                  Get the Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
