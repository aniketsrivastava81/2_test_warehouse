import React, { useMemo, useState } from "react";

export default function ToolsAccessGate({ accepted, onAccept, metadataReady = true }) {
  const [checks, setChecks] = useState({
    tresa: accepted,
    reco: accepted,
    estimate: accepted,
  });

  const canUnlock = useMemo(() => checks.tresa && checks.reco && checks.estimate, [checks]);

  const toggle = (key) => setChecks((current) => ({ ...current, [key]: !current[key] }));

  return (
    <section className="tools-v2-card tools-v2-gate">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Required acknowledgement</span>
          <h2>Tools unlock only after acknowledgement is accepted.</h2>
          <p>
            This gate now carries the compliance layer, the capture prompts, the guide downloads, the green light, the metadata status light, and the user acknowledgement that the tools are estimations based on ideal situations and profile-specific results may vary.
          </p>
        </div>
        <div className="tools-v2-status-cluster">
          <span className="tools-v2-status-pill"><i className="tools-v2-light tools-v2-light-green" /> Compliance ready</span>
          <span className="tools-v2-status-pill"><i className={`tools-v2-light ${metadataReady ? "tools-v2-light-blue" : "tools-v2-light-red"}`} /> Metadata {metadataReady ? "active" : "inactive"}</span>
        </div>
      </div>

      <div className="tools-v2-gate-grid">
        <div className="tools-v2-panel">
          <h3>TRESA + RECO acknowledgement</h3>
          <div className="tools-v2-checks">
            <label><input type="checkbox" checked={checks.tresa} onChange={() => toggle("tresa")} /> I have reviewed the TRESA guidance before using these tools.</label>
            <label><input type="checkbox" checked={checks.reco} onChange={() => toggle("reco")} /> I understand RECO-related disclosure expectations and that the outputs do not replace professional advice.</label>
            <label><input type="checkbox" checked={checks.estimate} onChange={() => toggle("estimate")} /> I acknowledge these are estimations based on ideal situations and each profile, building, and financing structure varies.</label>
          </div>
          <div className="hero-button-row">
            <a className="button button-secondary small-button" href="#download-tresa">Download TRESA Guide</a>
            <a className="button button-secondary small-button" href="#download-reco">Download RECO Report</a>
            <button type="button" className="button button-primary small-button" disabled={!canUnlock} onClick={onAccept}>Accept and unlock tools</button>
          </div>
          <p className="tools-v2-speed-note" id="download-tresa">Speed metric: fast first-pass output for shortlist logic, slower professional review for higher-stakes decisions.</p>
        </div>

        <div className="tools-v2-panel">
          <h3>Why the gate exists</h3>
          <div className="tools-v2-table">
            <div><b>What is included</b><span>Pillar 4 and 6-style trust/capture prompts, guide links, the green light, and the status indicators.</span></div>
            <div><b>What happens next</b><span>Only after acceptance do the 9 tools become visible below.</span></div>
            <div><b>Why it helps conversion</b><span>It frames the page as a serious decision environment instead of a casual calculator dump.</span></div>
          </div>
          <div className="tools-v2-capture-cards">
            <article>
              <strong>Follow KOLT on LinkedIn</strong>
              <p>Stay on top of GTA industrial and commercial shifts.</p>
            </article>
            <article>
              <strong>Get the checklist sent</strong>
              <p>Capture email only after the user understands the page value.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
