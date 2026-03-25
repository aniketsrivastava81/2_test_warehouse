import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import LeaseVsBuyTool from "../components/tools/LeaseVsBuyTool";
import CapRateTool from "../components/tools/CapRateTool";
import CamEstimatorTool from "../components/tools/CamEstimatorTool";
import FootfallTool from "../components/tools/FootfallTool";
import SubmarketComparator from "../components/tools/SubmarketComparator";
import { TOOL_SECTIONS } from "../data/siteData";
import { trackEvent } from "../utils/tracking";

export default function ToolsPage() {
  const viewedTools = useRef(new Set());

  const handleToolFocus = (event) => {
    const section = event.target.closest("section[id]");
    if (!section?.id || viewedTools.current.has(section.id)) return;
    viewedTools.current.add(section.id);
    trackEvent("tools_use", { tool: section.id, page: "tools" });
  };

  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <div className="kicker">Tools</div>
              <h1 style={{ marginTop: "8px" }}>Commercial real-estate tools built to help you compare cost, fit, visibility, and next-step clarity.</h1>
            </div>
            <p>
              Use these calculators and comparison tools before the tour, before the renewal conversation, and before the shortlist starts expanding for the wrong reasons.
            </p>
          </div>

          <div className="card soft tools-intro-card">
            <div className="section-header" style={{ marginBottom: "14px" }}>
              <div>
                <div className="kicker">What you can do here</div>
                <h2 style={{ marginTop: "8px" }}>Compare the decision before you compare the listing.</h2>
              </div>
              <p>
                Start with occupancy cost if you are weighing lease versus ownership. Start with visibility and access if customer convenience matters. Start with submarkets if the corridor itself is still unclear.
              </p>
            </div>

            <div className="grid grid-3 tools-overview-grid">
              {TOOL_SECTIONS.map((item) => (
                <a
                  className="card glow compact-card tool-link-card"
                  href={item.href}
                  key={item.title}
                  onClick={() => trackEvent("tools_jump_click", { tool: item.href.replace("#", ""), page: "tools" })}
                >
                  <div className="kicker">Tool</div>
                  <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
                  <p className="muted">{item.body}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight" onFocusCapture={handleToolFocus} onChangeCapture={handleToolFocus}>
        <div className="container tool-stack">
          <LeaseVsBuyTool />
          <CapRateTool />
          <CamEstimatorTool />
          <FootfallTool />
          <SubmarketComparator />
        </div>
      </section>

      <section className="section tight">
        <div className="container">
          <div className="inline-callout">
            <div>
              <div className="kicker">Use the result properly</div>
              <div>
                <strong>Use the numbers to tighten the shortlist, not to replace the shortlist.</strong> Once the cost and corridor logic start making sense, compare real spaces and ask sharper questions.
              </div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/listings" onClick={() => trackEvent("tools_next_step", { cta: "browse_listings" })}>Browse listings</Link>
              <Link className="btn btn-secondary" to="/guides" onClick={() => trackEvent("tools_next_step", { cta: "read_guides" })}>Read guides</Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        kicker="Need help applying the numbers?"
        title="Use the tools to get clearer, then use Megha to turn the shortlist into a real decision."
        body="When the numbers, location logic, and property fit start coming together, the next step is to compare real options and move with leverage."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "Browse listings", to: "/listings" }}
      />
    </>
  );
}
