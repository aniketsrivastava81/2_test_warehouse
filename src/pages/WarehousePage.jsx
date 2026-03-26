import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";

const evaluationPoints = [
  "Circulation flow and aisle logic",
  "Loading practicality and staging behavior",
  "Operational fit before physical tours",
  "How the asset feels when framed as a real workflow",
];

const supportCards = [
  {
    title: "Brand-native presentation",
    body: "The interactive layer now reads like part of the KOLT experience instead of a detached demo.",
  },
  {
    title: "Practical client value",
    body: "Users can understand movement, scale, and usability faster than they can through still images alone.",
  },
  {
    title: "Better conversion posture",
    body: "Once users visualize the asset more clearly, the next click becomes easier to earn.",
  },
];

export default function WarehousePage() {
  return (
    <>
      <section className="page-hero slim-hero warehouse-hero-premium">
        <div className="container page-hero-inner warehouse-hero-shell">
          <div className="eyebrow">Warehouse Demo</div>
          <h1>See the asset as an operating environment, not just a listing page.</h1>
          <p>
            This experience exists to help industrial users judge flow, usability, and overall fit faster than static
            marketing ever could.
          </p>
          <div className="warehouse-hero-points">
            {evaluationPoints.map((point) => (
              <span key={point}>{point}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container">
          <div className="warehouse-intro-panel">
            <div>
              <div className="eyebrow">Interactive review</div>
              <h2>Use the environment to evaluate what brochures usually hide.</h2>
            </div>
            <p>
              The goal is simple: make users feel more certain about the space before they invest time in deeper
              diligence.
            </p>
          </div>

          <div className="warehouse-frame-wrap frame-large warehouse-frame-premium">
            <iframe className="warehouse-frame" src="/warehouse.html" title="KOLT warehouse walkthrough" loading="eager"></iframe>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container warehouse-support-grid">
          {supportCards.map((card) => (
            <article key={card.title} className="warehouse-support-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container warehouse-bridge-panel">
          <div>
            <div className="eyebrow">Next step</div>
            <h2>Move from visual confidence into active opportunities.</h2>
          </div>
          <div className="warehouse-bridge-actions">
            <Link className="button button-primary" to="/listings">View opportunities</Link>
            <Link className="button button-secondary" to="/listing-type-2">Open interactive showcase</Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="Interactive proof works best when it stays inside the main conversion path."
        body="This page keeps the warehouse layer branded, intentional, and commercially useful instead of feeling like a side experiment."
        primaryLabel="Open Listing Type 2"
        primaryTo="/listing-type-2"
        secondaryLabel="Back to Home"
        secondaryTo="/"
      />
    </>
  );
}
