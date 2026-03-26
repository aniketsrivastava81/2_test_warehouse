import React from "react";
import CTASection from "../components/CTASection";
import { TOOLS } from "../data/siteData";

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner">
          <div className="eyebrow">Tools</div>
          <h1>The GTA decision stack users do not get anywhere else.</h1>
          <p>
            Each tool removes a blind spot, sharpens the comparison, and moves the user closer to a decision that actually holds up.
          </p>
          <div className="hero-proof-row">
            <span className="proof-chip">Built for real comparisons</span>
            <span className="proof-chip">Designed to reduce friction</span>
            <span className="proof-chip">Made to increase return visits</span>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">Tool logic</div>
            <h2>From uncertainty to leverage.</h2>
          </div>
          <p>
            This page is structured to make users feel that KOLT holds the frameworks, calculators, and checkpoints that turn a vague search into a serious move.
          </p>
        </div>
        <div className="services-grid services-grid-large">
          <article className="service-card service-card-premium">
            <h3>First remove the illusion</h3>
            <p>Start with cost, capex, and location logic so the shortlist is not being built on incomplete information.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Then pressure-test the fit</h3>
            <p>Use warehouse, submarket, and visibility tools to see whether the asset actually supports the operating model.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Then narrow with intent</h3>
            <p>Once the right variables are visible, the user can rank options properly instead of bouncing between generic listings.</p>
          </article>
          <article className="service-card service-card-premium">
            <h3>Then return to KOLT</h3>
            <p>The tool experience is designed to make the next visit feel necessary because the useful thinking lives here.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container tools-grid">
          {TOOLS.map((tool) => (
            <article className="tool-card tool-card-premium" key={tool.slug} id={tool.slug}>
              <div className="tool-icon"></div>
              <div className="eyebrow">{tool.kicker}</div>
              <h2>{tool.title}</h2>
              <p>{tool.body}</p>
              <div className="detail-point chip-point">{tool.outcome}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="container section-heading-row">
          <div>
            <div className="eyebrow">What this unlocks</div>
            <h2>Why this page converts better than a generic resource hub.</h2>
          </div>
          <p>
            The tools are not just informational. They make the user feel more capable, which naturally pushes them toward deeper engagement with listings, markets, and KOLT itself.
          </p>
        </div>
        <div className="pillar-grid">
          <article className="feature-card narrative-card">
            <h3>More trust</h3>
            <p>KOLT becomes the source that explains the market in a way that immediately feels more useful.</p>
          </article>
          <article className="feature-card narrative-card">
            <h3>More return traffic</h3>
            <p>Users come back because the tools create a practical reason to revisit before every major move.</p>
          </article>
          <article className="feature-card narrative-card">
            <h3>Better conversion quality</h3>
            <p>The user who moves from tool to listing to guide is already thinking more seriously by the time they act.</p>
          </article>
        </div>
      </section>

      <CTASection
        eyebrow="Apply it"
        title="Take the clearer thinking into the market."
        body="Use the tool outputs against active opportunities, then reinforce the decision through the guide library."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Read Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
