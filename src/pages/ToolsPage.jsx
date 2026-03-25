import React, { useRef } from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import EquipmentCompatibilityTool from "../components/tools/EquipmentCompatibilityTool";
import CapexForecasterTool from "../components/tools/CapexForecasterTool";
import LeaseVsBuyTool from "../components/tools/LeaseVsBuyTool";
import CapRateTool from "../components/tools/CapRateTool";
import CamEstimatorTool from "../components/tools/CamEstimatorTool";
import FootfallTool from "../components/tools/FootfallTool";
import SubmarketComparator from "../components/tools/SubmarketComparator";
import { TOOL_SECTIONS } from "../data/siteData";
import { trackEvent } from "../utils/tracking";

const EXTRA_TOOL_SECTIONS = [
  {
    title: "Power-fit tool",
    body: "Check power, height, sprinkler, and loading assumptions against the operating profile you are actually considering.",
    href: "#equipment-compatibility",
  },
  {
    title: "CapEx forecaster",
    body: "See when reserve items are likely to hit based on acquisition timing instead of learning it too late.",
    href: "#capex-forecaster",
  },
];

function StatusDot({ active = true }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: 10,
        height: 10,
        borderRadius: 999,
        background: active ? "#2ecc71" : "#ef4444",
        boxShadow: active ? "0 0 0 4px rgba(46, 204, 113, 0.12)" : "0 0 0 4px rgba(239, 68, 68, 0.12)",
      }}
    />
  );
}

function InfoPillar({ kicker, title, body, children, subtleStatus = null }) {
  return (
    <article className="card soft compact-card" style={{ position: "relative", height: "100%", background: "rgba(15, 23, 42, 0.03)" }}>
      {subtleStatus && (
        <div style={{ position: "absolute", top: 16, left: 16, display: "flex", alignItems: "center", gap: 8, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--muted)" }}>
          <StatusDot active={subtleStatus === "active"} />
          <span>{subtleStatus === "active" ? "Live" : "Inactive"}</span>
        </div>
      )}
      <div className="kicker" style={{ marginTop: subtleStatus ? 26 : 0 }}>{kicker}</div>
      <h3 style={{ marginTop: 8 }}>{title}</h3>
      <p className="muted">{body}</p>
      <div style={{ marginTop: 14 }}>{children}</div>
    </article>
  );
}

export default function ToolsPage() {
  const viewedTools = useRef(new Set());
  const allToolSections = [...EXTRA_TOOL_SECTIONS, ...TOOL_SECTIONS];

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
              <h1 style={{ marginTop: "8px" }}>Commercial real-estate tools built to help you compare cost, fit, access, infrastructure, and next-step clarity.</h1>
            </div>
            <p>
              Use these tools to screen the building, not just admire the listing. Start with power and reserve logic, then move into occupancy cost, corridor fit, and shortlist discipline.
            </p>
          </div>

          <div className="card soft tools-intro-card">
            <div className="section-header" style={{ marginBottom: "14px" }}>
              <div>
                <div className="kicker">What you can do here</div>
                <h2 style={{ marginTop: "8px" }}>Compare the decision before you compare the listing.</h2>
              </div>
              <p>
                The tools stay interactive. The supporting pillars stay visual. That keeps the page useful without pretending every block is a calculator.
              </p>
            </div>

            <div className="grid grid-3 tools-overview-grid">
              {allToolSections.map((item) => (
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

      <section className="section tight">
        <div className="container">
          <div className="section-header" style={{ marginBottom: 16 }}>
            <div>
              <div className="kicker">Display pillars</div>
              <h2 style={{ marginTop: 8 }}>Reference blocks that support the tool stack without pretending to be tools.</h2>
            </div>
            <p>These blocks are there to add context, credentials, and sample infrastructure visibility. The actual calculations stay in the interactive sections below.</p>
          </div>

          <div className="grid grid-3" style={{ alignItems: "stretch" }}>
            <InfoPillar
              kicker="Pillar I · Status badge"
              title="Legal identity and compliance display"
              body="Broker identity, representation posture, and compliance framing shown as a status badge instead of a fake calculator."
            >
              <div className="table-like">
                <div className="row"><b>Name</b><span>Megha Mehta</span></div>
                <div className="row"><b>Brokerage</b><span>KOLT Realty Inc., Brokerage</span></div>
                <div className="row"><b>Representation</b><span>Disclosure-first commercial advisory</span></div>
                <div className="row"><b>Use</b><span>Status display for the tools page</span></div>
              </div>
            </InfoPillar>

            <InfoPillar
              kicker="Pillar II · Datasheet"
              title="Sample industrial datasheet"
              body="A sample building-information card so the user can scan the physical asset profile before using the compatibility tool."
            >
              <div className="table-like">
                <div className="row"><b>Service</b><span>1,600A / 600V / 3-phase</span></div>
                <div className="row"><b>Clear height</b><span>40' clear</span></div>
                <div className="row"><b>Sprinklers</b><span>ESFR verified</span></div>
                <div className="row"><b>Loading</b><span>12 truck-level · 2 drive-in</span></div>
                <div className="row"><b>Best fit</b><span>Distribution, showroom-flex, cold-chain candidate</span></div>
              </div>
            </InfoPillar>

            <InfoPillar
              kicker="Pillar IV · Certification display"
              title="Accessibility and certification sample"
              body="A display-only compliance block for the digital experience rather than another faux interactive widget."
            >
              <div className="badges" style={{ marginBottom: 12 }}>
                <span className="pill">WCAG 2.1 AA target</span>
                <span className="pill">Keyboard flow enabled</span>
              </div>
              <div className="table-like">
                <div className="row"><b>Focus states</b><span>Visible across forms and CTAs</span></div>
                <div className="row"><b>Reduced motion</b><span>Respected where supported</span></div>
                <div className="row"><b>Form labels</b><span>Explicitly paired</span></div>
                <div className="row"><b>Contrast review</b><span>Included in UI pass</span></div>
              </div>
            </InfoPillar>

            <InfoPillar
              kicker="Pillar VI · AEO status"
              title="Answer-engine status light"
              body="Low-visibility indicator showing the pillar is alive without turning it into a public-facing sales gimmick."
              subtleStatus="active"
            >
              <div className="table-like">
                <div className="row"><b>Structured data</b><span>Organization · LocalBusiness · Article</span></div>
                <div className="row"><b>Route metadata</b><span>Mapped through the SEO layer</span></div>
                <div className="row"><b>Purpose</b><span>Improve machine readability, not distract the user</span></div>
              </div>
            </InfoPillar>

            <InfoPillar
              kicker="Pillar VIII · Static report"
              title="ESG and infrastructure snapshot"
              body="A static building-readiness block that stays informative without pretending to be a live calculator yet."
            >
              <div className="table-like">
                <div className="row"><b>Indicative roof-ready area</b><span>48,000 SF</span></div>
                <div className="row"><b>Indicative solar yield</b><span>392 MWh / year</span></div>
                <div className="row"><b>LED readiness</b><span>Retrofit-friendly</span></div>
                <div className="row"><b>EV capacity</b><span>8 future stalls planned</span></div>
              </div>
            </InfoPillar>

            <InfoPillar
              kicker="Pillar XI · Speed metric"
              title="Edge performance snapshot"
              body="A simple speed display that shows the site’s performance posture without turning the tools page into a technical brag sheet."
            >
              <div className="table-like">
                <div className="row"><b>LCP target</b><span>&lt; 2.0s</span></div>
                <div className="row"><b>INP target</b><span>&lt; 200ms</span></div>
                <div className="row"><b>CLS target</b><span>&lt; 0.1</span></div>
                <div className="row"><b>Field mode</b><span>Warehouse kept secondary</span></div>
              </div>
            </InfoPillar>
          </div>
        </div>
      </section>

      <section className="section tight" onFocusCapture={handleToolFocus} onChangeCapture={handleToolFocus}>
        <div className="container tool-stack">
          <EquipmentCompatibilityTool />
          <CapexForecasterTool />
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
                <strong>Use the tools to tighten the shortlist, not to replace the shortlist.</strong> Once the building fit, reserve timing, cost, and corridor logic start making sense, compare real spaces and ask sharper questions.
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
        body="When the building systems, reserve timing, location logic, and occupancy math start coming together, the next move is to compare real options and negotiate with better context."
        primary={{ label: "Contact Megha", to: "/contact" }}
        secondary={{ label: "Browse listings", to: "/listings" }}
      />
    </>
  );
}
