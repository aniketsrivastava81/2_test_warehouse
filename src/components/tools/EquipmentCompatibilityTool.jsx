import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PROFILES = {
  showroomHybrid: {
    label: "Showroom + warehouse hybrid",
    power: 400,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 24,
    esfr: false,
    truckLevelDoors: 1,
    driveInDoors: 1,
    note: "Best when customer-facing frontage matters but the rear still needs useful operational utility.",
  },
  foodProcessing: {
    label: "Food processing / cold-chain prep",
    power: 1600,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 32,
    esfr: true,
    truckLevelDoors: 4,
    driveInDoors: 1,
    note: "Demands stronger service, more clearance, and sprinkler confidence before the shortlist goes any further.",
  },
  cncLightManufacturing: {
    label: "CNC / light manufacturing",
    power: 800,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 20,
    esfr: false,
    truckLevelDoors: 2,
    driveInDoors: 1,
    note: "Power quality and 3-phase service matter more than image-heavy frontage for this use case.",
  },
  ecommerceDistribution: {
    label: "E-commerce / distribution",
    power: 600,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 30,
    esfr: true,
    truckLevelDoors: 4,
    driveInDoors: 1,
    note: "Dock count, clear height, and truck circulation matter more than polished office area.",
  },
  evFleetService: {
    label: "EV fleet / service operations",
    power: 1200,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 18,
    esfr: false,
    truckLevelDoors: 2,
    driveInDoors: 2,
    note: "Power expansion path matters because charger infrastructure can become the bottleneck quickly.",
  },
};

function verdictLabel(score) {
  if (score >= 5) return { tone: "Ready to shortlist", detail: "The core building systems align with the selected use case." };
  if (score >= 3) return { tone: "Needs underwriting", detail: "The building may work, but power, sprinkler, or loading upgrades need to be priced before touring seriously." };
  return { tone: "Weak fit", detail: "This use case is likely forcing the building instead of matching it." };
}

function checkRow(label, pass, reason) {
  return { label, pass, reason };
}

export default function EquipmentCompatibilityTool() {
  const [form, setForm] = useState({
    useCase: "showroomHybrid",
    amperage: 1600,
    voltage: 600,
    phase: "3-phase",
    clearHeight: 40,
    esfr: true,
    truckLevelDoors: 12,
    driveInDoors: 2,
  });

  const profile = PROFILES[form.useCase];

  const result = useMemo(() => {
    const checks = [
      checkRow("Power service", Number(form.amperage) >= profile.power, `Target ${profile.power}A minimum for this use.`),
      checkRow("Voltage", Number(form.voltage) >= profile.voltage, `Target ${profile.voltage}V service.`),
      checkRow("Phase", form.phase === profile.phase, `Target ${profile.phase} service.`),
      checkRow("Clear height", Number(form.clearHeight) >= profile.clearHeight, `Target ${profile.clearHeight}' clear or better.`),
      checkRow("ESFR coverage", !profile.esfr || form.esfr, profile.esfr ? "ESFR is recommended for this operating profile." : "ESFR is not a gating item here."),
      checkRow("Truck-level loading", Number(form.truckLevelDoors) >= profile.truckLevelDoors, `Target ${profile.truckLevelDoors}+ truck-level doors.`),
      checkRow("Drive-in loading", Number(form.driveInDoors) >= profile.driveInDoors, `Target ${profile.driveInDoors}+ drive-in doors.`),
    ];

    const score = checks.filter((item) => item.pass).length;
    return { checks, score, verdict: verdictLabel(score) };
  }, [form, profile]);

  return (
    <section id="equipment-compatibility" className="card glow tool-card">
      <div className="section-header" style={{ marginBottom: "14px" }}>
        <div>
          <div className="kicker">Pillar II tool</div>
          <h2 style={{ marginTop: "8px" }}>Power-load and equipment compatibility tool.</h2>
        </div>
        <p>Toggle the building specs against the operating profile you are actually considering before a weak-fit unit sneaks into the shortlist.</p>
      </div>

      <div className="grid grid-2 tool-grid">
        <form className="form card soft">
          <div className="field">
            <label htmlFor="equip-use-case">Equipment / operating profile</label>
            <select id="equip-use-case" value={form.useCase} onChange={(e) => setForm((s) => ({ ...s, useCase: e.target.value }))}>
              {Object.entries(PROFILES).map(([key, value]) => (
                <option key={key} value={key}>{value.label}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="equip-amperage">Amperage</label>
              <input id="equip-amperage" type="number" value={form.amperage} onChange={(e) => setForm((s) => ({ ...s, amperage: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="equip-voltage">Voltage</label>
              <input id="equip-voltage" type="number" value={form.voltage} onChange={(e) => setForm((s) => ({ ...s, voltage: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="field">
              <label htmlFor="equip-phase">Phase</label>
              <select id="equip-phase" value={form.phase} onChange={(e) => setForm((s) => ({ ...s, phase: e.target.value }))}>
                <option value="1-phase">1-phase</option>
                <option value="3-phase">3-phase</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="equip-clear">Clear height (ft)</label>
              <input id="equip-clear" type="number" value={form.clearHeight} onChange={(e) => setForm((s) => ({ ...s, clearHeight: e.target.value }))} />
            </div>
          </div>

          <div className="grid grid-3">
            <div className="field">
              <label htmlFor="equip-esfr">ESFR verified</label>
              <select id="equip-esfr" value={form.esfr ? "yes" : "no"} onChange={(e) => setForm((s) => ({ ...s, esfr: e.target.value === "yes" }))}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="equip-tl">Truck-level doors</label>
              <input id="equip-tl" type="number" value={form.truckLevelDoors} onChange={(e) => setForm((s) => ({ ...s, truckLevelDoors: e.target.value }))} />
            </div>
            <div className="field">
              <label htmlFor="equip-di">Drive-in doors</label>
              <input id="equip-di" type="number" value={form.driveInDoors} onChange={(e) => setForm((s) => ({ ...s, driveInDoors: e.target.value }))} />
            </div>
          </div>

          <p className="tiny muted">Use this as a fit screen. If a requirement fails here, price the upgrade before booking a tour around the wrong building.</p>
        </form>

        <div className="card soft tool-output">
          <div className="badges" style={{ marginBottom: "12px" }}>
            <span className="pill"><strong>{result.score}/7</strong> fit checks passed</span>
            <span className="pill">{result.verdict.tone}</span>
          </div>

          <div className="inline-callout" style={{ marginBottom: "14px" }}>
            <div>
              <div className="kicker">Selected profile</div>
              <div><strong>{profile.label}</strong> — {profile.note}</div>
            </div>
          </div>

          <div className="table-like">
            {result.checks.map((item) => (
              <div className="row" key={item.label}>
                <b>{item.label}</b>
                <span style={{ color: item.pass ? "var(--accent-success)" : "var(--accent)" }}>{item.pass ? "Pass" : "Upgrade needed"}</span>
              </div>
            ))}
          </div>

          <p className="tiny muted" style={{ marginTop: "12px" }}>{result.verdict.detail}</p>

          <div className="inline-callout" style={{ marginTop: "14px" }}>
            <div>
              <div className="kicker">Next step</div>
              <div><strong>When the fit is partial, ask for service details, sprinkler confirmation, and upgrade timing before moving the building higher.</strong></div>
            </div>
            <Link className="btn btn-secondary btn-sm" to="/contact">Review the fit</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
