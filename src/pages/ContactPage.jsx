import React from "react";
import { Link } from "react-router-dom";

const nextSteps = [
  {
    title: "Explore live opportunities",
    body: "Review active industrial, office, retail, and land opportunities before direct contact goes live.",
    to: "/listings",
    label: "View listings",
  },
  {
    title: "Use the decision tools",
    body: "Pressure-test fit, occupancy cost, and operational logic before entering the next conversation.",
    to: "/tools",
    label: "Open tools",
  },
  {
    title: "Read the market guides",
    body: "Use KOLT's frameworks to sharpen search criteria, timing, and negotiation posture across the GTA.",
    to: "/guides",
    label: "Read guides",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="page-hero slim-hero contact-hold-page contact-hold-hero">
        <div className="container page-hero-inner article-width contact-hold-shell">
          <div className="eyebrow">Contact</div>
          <h1>Direct contact details are being held back until approval is complete.</h1>
          <p>
            The page stays active so the journey stays intact. Until then, the site is structured to let users learn,
            screen, and narrow options without friction.
          </p>
          <div className="contact-status-band">
            <span>Approval-safe page</span>
            <span>Live route preserved</span>
            <span>No public contact details yet</span>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="eyebrow">What users should do now</div>
              <h2>Move forward with the parts of the journey that already create value.</h2>
            </div>
            <p>
              Everything below is designed to reduce uncertainty so users arrive at the eventual conversation sharper,
              better filtered, and easier to convert.
            </p>
          </div>

          <div className="contact-next-grid">
            {nextSteps.map((item) => (
              <article key={item.title} className="contact-next-card">
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <Link className="button button-secondary" to={item.to}>
                  {item.label}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-hold-panel">
            <div>
              <div className="eyebrow">What this page communicates</div>
              <h2>The site is ready. The contact layer is simply waiting for the green light.</h2>
            </div>
            <div className="contact-hold-copy">
              <p>Users still get brand trust, structured guidance, and meaningful decision support right now.</p>
              <p>No dead end. No broken experience. No unapproved information exposed.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
