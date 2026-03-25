import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../config/site";

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">About</div>
            <h1 style={{ marginTop: "8px" }}>A cleaner advisor profile for the commercial site</h1>
          </div>
          <p>
            This page replaces the missing profile layer in the original route structure and gives
            the demo a stronger commercial-advisory foundation.
          </p>
        </div>

        <div className="grid grid-2">
          <article className="card glow">
            <div className="kicker">Positioning</div>
            <h2 style={{ marginTop: "8px" }}>Megha Mehta</h2>
            <p className="muted">
              This demo positions Megha as a GTA commercial real-estate advisor focused on clarity,
              fit, and better decision support for tenants, owner-users, and investors.
            </p>
            <p className="muted">
              The final production version can swap in verified biography, brokerage credentials,
              transaction proof, and real contact data from the central site config.
            </p>
          </article>

          <article className="card soft">
            <h3>Current demo focus</h3>
            <div className="table-like">
              <div className="row">
                <b>Service areas</b>
                <span>{SITE.serviceAreas.join(", ")}</span>
              </div>
              <div className="row">
                <b>Asset classes</b>
                <span>{SITE.assetClasses.join(", ")}</span>
              </div>
              <div className="row">
                <b>Site goal</b>
                <span>Look premium, convert clearly, and stay easy to build batch by batch.</span>
              </div>
            </div>
          </article>
        </div>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next step</div>
              <div>
                <strong>Move into services or contact.</strong> This batch creates the route
                foundation so deeper credibility copy can be layered in later.
              </div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-secondary" to="/services">
                View services
              </Link>
              <Link className="btn btn-primary" to="/contact">
                Contact page
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
