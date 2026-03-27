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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const revealTargets = Array.from(document.querySelectorAll(".tools-v2-reveal, .tools-v2-stagger"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("on");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [accepted]);

  const toolCount = useMemo(() => 9, []);
  const chapters = [
    { label: "Access Gate", href: "#tools-access-gate" },
    { label: "Pricing & Yield", href: "#tool-cap-rate" },
    { label: "Occupancy", href: "#tool-cam-tmi" },
    { label: "Finance", href: "#tool-lease-vs-buy" },
    { label: "Flow & Fit", href: "#tool-storage-flow-lab" },
  ];

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium tools-v2-hero tools-v2-stage">
        <div className="tools-v2-orb tools-v2-orb-a" aria-hidden="true" />
        <div className="tools-v2-orb tools-v2-orb-b" aria-hidden="true" />
        <div className="container tools-v2-hero-grid">
          <div className="page-hero-inner tools-v2-hero-main tools-v2-reveal">
            <div className="eyebrow">KOLT Tools</div>
            <h1>A serious tool stack with a cleaner luxury finish and a stronger decision journey.</h1>
            <p>
              The value stays dense. The gating stays strict. The visual system now feels more authored, more premium, and much closer to the original white-surface elegance that made the earlier page work.
            </p>
            <div className="hero-proof-row tools-v2-proof-row">
              <span className="proof-chip">9 tools total</span>
              <span className="proof-chip">Acknowledgement required first</span>
              <span className="proof-chip">Longer and denser content preserved</span>
              <span className="proof-chip">Premium white / editorial direction</span>
            </div>
            <div className="tools-v2-kpi-row tools-v2-stagger">
              <article>
                <small>Journey</small>
                <strong>Gate → tools → compare → act</strong>
              </article>
              <article>
                <small>Positioning</small>
                <strong>KOLT as the interpretation layer</strong>
              </article>
              <article>
                <small>UX standard</small>
                <strong>Cleaner, slower, sharper, more human</strong>
              </article>
            </div>
          </div>

          <aside className="tools-v2-hero-rail tools-v2-reveal">
            <div className="tools-v2-rail-card tools-v2-rail-card-accent">
              <span className="tools-v2-mini-tag">What changes</span>
              <h2>Same content. Better atmosphere. Better pacing.</h2>
              <p>Nothing gets removed. The page simply stops looking assembled and starts looking designed.</p>
            </div>
            <div className="tools-v2-rail-card">
              <span className="tools-v2-mini-tag">Quick map</span>
              <div className="tools-v2-anchor-list">
                {chapters.map((chapter) => (
                  <a key={chapter.href} href={chapter.href}>{chapter.label}</a>
                ))}
              </div>
            </div>
            <div className="tools-v2-rail-card tools-v2-rail-card-soft">
              <span className="tools-v2-mini-tag">Visual direction</span>
              <ul className="tools-v2-bullet-list">
                <li>Paper-like white surfaces with warmer luxury contrast</li>
                <li>Editorial spacing, quieter shadows, stronger emphasis moments</li>
                <li>Gentle motion and premium state changes without changing the page identity</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-soft-borderless tools-v2-stage">
        <div className="container tools-v2-page">
          <ToolsAccessGate accepted={accepted} onAccept={() => setAccepted(true)} metadataReady />

          {!accepted ? (
            <section className="tools-v2-card tools-v2-locked-state tools-v2-reveal">
              <span className="tools-v2-tag">Locked until acceptance</span>
              <h2>The tool stack stays hidden until the acknowledgement is accepted.</h2>
              <p>
                Once the TRESA, RECO, and estimation acknowledgements are accepted above, the full set of 9 tools becomes visible here.
              </p>
            </section>
          ) : (
            <>
              <section className="tools-v2-intro tools-v2-card tools-v2-reveal">
                <div>
                  <span className="tools-v2-mini-tag">Unlocked environment</span>
                  <h2>The tools are live. Every section below stays content-heavy and comparison-led.</h2>
                </div>
                <p>
                  Use the calculators in sequence, then compare outputs against live opportunities. The objective is not raw numbers alone. It is better judgment, better screening, and a stronger reason to keep moving through KOLT.
                </p>
              </section>
              <div className="tools-v2-stack tools-v2-stagger">
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
            </>
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
