import React from "react";
import CTASection from "../components/CTASection";
import { TOOLS } from "../data/siteData";

export default function ToolsPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Tools</div>
          <h1>Decision tools that give KOLT its own value moat in the GTA market.</h1>
          <p>
            The user should leave this page feeling better informed than they would anywhere else in the category.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container tools-grid">
          {TOOLS.map((tool) => (
            <article className="tool-card" key={tool.title}>
              <div className="tool-icon"></div>
              <h2>{tool.title}</h2>
              <p>{tool.body}</p>
            </article>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Applied value"
        title="The point of the tools is not novelty. It is conversion through clarity."
        body="A user who can think more clearly through KOLT is a user who will come back to KOLT for the next answer."
        primaryLabel="Browse Listings"
        primaryTo="/listings"
        secondaryLabel="Read Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
