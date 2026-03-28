import React, { useEffect, useMemo, useState } from 'react';
import { Button, Chip } from '@mui/material';

export default function ToolsAccessGate({ accepted, onAccept, metadataReady = true }) {
  const [checks, setChecks] = useState({
    tresa: accepted,
    reco: accepted,
    estimate: accepted,
  });

  useEffect(() => {
    if (accepted) setChecks({ tresa: true, reco: true, estimate: true });
  }, [accepted]);

  const canUnlock = useMemo(() => checks.tresa && checks.reco && checks.estimate, [checks]);
  const setCheck = (key) => (event) => setChecks((state) => ({ ...state, [key]: event.target.checked }));

  const handleUnlock = () => {
    if (!canUnlock) return;
    onAccept();
    window.setTimeout(() => {
      const target = document.querySelector('.tools-v2-intro, .tools-v2-stack');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const cards = [
    {
      key: 'tresa',
      title: 'TRESA acknowledgement',
      body: 'I have reviewed the TRESA guidance before using these tools.',
    },
    {
      key: 'reco',
      title: 'RECO acknowledgement',
      body: 'I understand RECO-related disclosure expectations and that these outputs do not replace professional advice.',
    },
    {
      key: 'estimate',
      title: 'Estimation acknowledgement',
      body: 'I acknowledge these are estimations based on ideal situations and that each profile, building, and financing structure varies.',
    },
  ];

  return (
    <section id="tools-access-gate" className="tools-v2-card tools-v2-gate tools-v2-reveal tools-v3-gate-shell">
      <div className="tools-v2-head tools-v3-gate-head">
        <div>
          <span className="tools-v2-tag">Required acknowledgement</span>
          <h2>Everything below stays hidden until this acknowledgement is accepted.</h2>
          <p>
            This gate carries the compliance layer, the guide downloads, the green light, the metadata status light,
            pillar 4 and 6 support content, and the acknowledgement that these outputs are estimations based on ideal conditions and profile-specific results may vary.
          </p>
        </div>
        <div className="tools-v3-status-cluster">
          <span className="tools-v2-status-pill"><i className="tools-v2-light tools-v2-light-green tools-v3-pulse" /> Compliance ready</span>
          <span className="tools-v2-status-pill"><i className={`tools-v2-light tools-v3-pulse ${metadataReady ? 'tools-v2-light-blue' : 'tools-v2-light-red'}`} /> Metadata {metadataReady ? 'active' : 'inactive'}</span>
        </div>
      </div>

      <div className="tools-v2-gate-grid tools-v3-gate-grid">
        <div className="tools-v2-panel tools-v2-panel-glow tools-v3-gate-main">
          <div className="tools-v2-panel-heading">
            <div>
              <span className="tools-v2-mini-tag">Step 1</span>
              <h3>TRESA + RECO acknowledgement</h3>
            </div>
            <span className="tools-v2-gate-state">Required before access</span>
          </div>

          <div className="grid gap-3">
            {cards.map((card) => (
              <label key={card.key} className={`tools-v3-gate-card ${checks[card.key] ? 'active' : ''}`}>
                <input id={`gate-${card.key}`} type="checkbox" checked={checks[card.key]} onChange={setCheck(card.key)} />
                <div>
                  <strong>{card.title}</strong>
                  <span>{card.body}</span>
                </div>
              </label>
            ))}
          </div>

          <div className="tools-v3-gate-info-row">
            <Chip label="Pillar 4 + 6 support moved here" />
            <Chip label="Green + metadata lights active" />
            <Chip label="9 tools unlock below only after acceptance" />
          </div>

          <div className="hero-button-row tools-v3-gate-actions">
            <a className="button button-secondary small-button waves-effect" href="#download-tresa" onClick={(e) => e.preventDefault()}>Download TRESA Guide</a>
            <a className="button button-secondary small-button waves-effect" href="#download-reco" onClick={(e) => e.preventDefault()}>Download RECO Report</a>
            <Button variant="contained" color="primary" onClick={handleUnlock} disabled={!canUnlock}>
              Accept and unlock tools
            </Button>
          </div>
          <p className="tools-v2-speed-note" id="download-tresa">Speed metric: fast first-pass output for shortlist logic, slower professional review for higher-stakes decisions.</p>
        </div>

        <div className="tools-v2-panel tools-v2-panel-soft tools-v3-gate-side">
          <div className="tools-v2-panel-heading">
            <div>
              <span className="tools-v2-mini-tag">Step 2</span>
              <h3>What the gate unlocks</h3>
            </div>
          </div>
          <div className="tools-v3-side-image">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80" alt="Warehouse evaluation discussion" />
          </div>
          <div className="tools-v2-table tools-v2-table-rich">
            <div><b>What is included</b><span>Pillar 4 and 6-style trust and capture prompts, guide links, the green light, and the status indicators.</span></div>
            <div><b>What happens next</b><span>Only after acceptance do the 9 tools become visible below, with all added detail intact.</span></div>
            <div><b>Why it helps conversion</b><span>It frames the page as a serious decision environment instead of a casual calculator dump.</span></div>
          </div>
          <div className="tools-v2-capture-cards tools-v2-capture-cards-elevated">
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
