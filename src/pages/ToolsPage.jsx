import React, { useEffect, useMemo, useState } from "react";
import CTASection from "../components/CTASection";
import ToolsAccessGate from "../components/tools/ToolsAccessGate";
import CapRateTool from "../components/tools/CapRateTool";
import CamEstimatorTool from "../components/tools/CamEstimatorTool";
import LeaseVsBuyTool from "../components/tools/LeaseVsBuyTool";
import FootfallTool from "../components/tools/FootfallTool";
import SubmarketComparator from "../components/tools/SubmarketComparator";
import EquipmentCompatibilityTool from "../components/tools/EquipmentCompatibilityTool";
import RiskResilienceTool from "../components/tools/RiskResilienceTool";
import PremiumWarehouseTool from "../components/tools/PremiumWarehouseTool";
import StorageFlowLabTool from "../components/tools/StorageFlowLabTool";

const STORAGE_KEY = "kolt_tools_gate_signed";

function useMeta() {
  useEffect(() => {
    document.title = "KOLT Realty Tools | GTA Commercial Real Estate Decision Tools";

    const ensureMeta = (name, content, attr = "name") => {
      let element = document.head.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    ensureMeta("description", "KOLT Realty tools for cap rate, CAM and TMI budgeting, mortgage intelligence, warehouse fit, submarket comparison, and industrial decision support across the GTA.");
    ensureMeta("keywords", "KOLT Realty, GTA commercial real estate tools, cap rate calculator, CAM TMI budget, mortgage DSCR LTV tool, warehouse sprinkler suppression checker, submarket comparison GTA, industrial warehouse fit, owner user acquisition tool");
    ensureMeta("og:title", "KOLT Realty Tools", "property");
    ensureMeta("og:description", "Decision tools for commercial and industrial real estate users across the GTA.", "property");
  }, []);
}

export default function ToolsPage() {
  useMeta();
  const [accepted, setAccepted] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(STORAGE_KEY) === "yes";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (accepted) window.localStorage.setItem(STORAGE_KEY, "yes");
      else window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [accepted]);

  const toolCount = useMemo(() => 9, []);

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium tools-v2-hero">
        <div className="container page-hero-inner tools-v2-hero-inner">
          <div className="eyebrow">Tools</div>
          <h1>A longer, denser tools page that only opens after acknowledgement.</h1>
          <p>
            The visual language stays clean and premium. The value gets deeper: more fields, more operating logic, more real comparison structure, and a gated entry that makes the page feel serious before it becomes useful.
          </p>
          <div className="hero-proof-row">
            <span className="proof-chip">9 tools total</span>
            <span className="proof-chip">Acknowledgement required first</span>
            <span className="proof-chip">White / premium style preserved</span>
            <span className="proof-chip">More detailed decision layers</span>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container tools-v2-page">
          <ToolsAccessGate accepted={accepted} onAccept={() => setAccepted(true)} metadataReady />

          {!accepted ? (
            <section className="tools-v2-card tools-v2-locked-state">
              <span className="tools-v2-tag">Locked until acceptance</span>
              <h2>The tool stack stays hidden until the acknowledgement is accepted.</h2>
              <p>
                Once the TRESA, RECO, and estimation acknowledgements are accepted above, the full set of 9 tools becomes visible here.
              </p>
            </section>
          ) : (
            <div className="tools-v2-stack">
              <CapRateTool />
              <CamEstimatorTool />
              <LeaseVsBuyTool />
              <FootfallTool />
              <SubmarketComparator />
              <EquipmentCompatibilityTool />
              <RiskResilienceTool />
              <PremiumWarehouseTool />
              <StorageFlowLabTool />
            </div>
          )}
        </div>
      </section>

      {accepted && (
        <CTASection
          eyebrow="Next move"
          title={`Use the ${toolCount}-tool stack against live opportunities.`}
          body="Run the tools, pressure-test the shortlist, then move into listings and market pages with much stronger decision clarity."
          primaryLabel="Browse Listings"
          primaryTo="/listings"
          secondaryLabel="Explore Markets"
          secondaryTo="/markets"
        />
      )}
    </>
  );
}
