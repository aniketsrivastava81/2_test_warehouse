import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import LeaseVsBuyTool from "../components/tools/LeaseVsBuyTool";
import CapRateTool from "../components/tools/CapRateTool";
import CamEstimatorTool from "../components/tools/CamEstimatorTool";
import FootfallTool from "../components/tools/FootfallTool";
import SubmarketComparator from "../components/tools/SubmarketComparator";
import { TOOL_SECTIONS } from "../data/siteData";

export default function ToolsPage() {
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
              These tools are designed for commercial users, owner-users, and investors who want a cleaner decision process before touring,
              negotiating, renewing, or buying.
            </p>
          </div>

          <div className="card soft tools-intro-card">
            <div className="section-header" style={{ marginBottom: "14px" }}>
              <div>
                <div className="kicker">What you can do here</div>
                <h2 style={{ marginTop: "8px" }}>Use the tools to screen options before you commit time, money, or negotiation leverage.</h2>
              </div>
              <p>
                Start with cost if you are comparing lease versus ownership. Start with access if visibility or customer convenience matters.
                Start with submarkets if the corridor itself is still unclear.
              </p>
            </div>

            <div className="grid grid-3 tools-overview-grid">
              {TOOL_SECTIONS.map((item) => (
                <a className="card glow compact-card tool-link-card" href={item.href} key={item.title}>
                  <div className="kicker">Tool</div>
                  <h3 style={{ marginTop: "8px" }}>{item.title}</h3>
                  <p className="muted">{item.body}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section tight">
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
                <strong>The tool should sharpen the shortlist, not replace the shortlist.</strong> Once the numbers start making sense,
                move into listings, compare real spaces, and then ask the next questions.
              </div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/listings">Browse listings</Link>
              <Link className="btn btn-secondary" to="/guides">Read guides</Link>
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
