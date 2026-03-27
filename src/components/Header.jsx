import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SITE } from "../config/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link to="/" className="brand-mark" aria-label="KOLT Realty home">
          <span className="brand-kicker">KOLT</span>
          <span className="brand-name">Realty</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary navigation">
          {SITE.nav.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `nav-link ${isActive ? "is-active" : ""}`}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/listings" className="button button-primary small-button">View Opportunities</Link>
        </nav>

        <button
          type="button"
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>

      {open && (
        <div className="mobile-panel">
          <div className="container mobile-nav-stack">
            {SITE.nav.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className="mobile-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/listings" className="button button-primary" onClick={() => setOpen(false)}>
              View Opportunities
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
