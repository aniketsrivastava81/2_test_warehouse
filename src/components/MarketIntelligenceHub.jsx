import React from "react";

const REGIONS = {
  toronto: {
    label: "Toronto Core",
    vacancy: 8.2,
    rent: "$39 - $49 PSF gross",
    capRate: "5.10% - 5.60%",
    hotspots: ["King West creative office", "Front Street client-facing HQ", "Transit-first repositioning"],
    notes: "Best for leadership hubs, client-facing firms, and occupiers where image, transit, and executive access matter more than cheap occupancy.",
  },
  mississauga: {
    label: "Mississauga",
    vacancy: 3.7,
    rent: "$17.75 - $21.50 PSF net",
    capRate: "4.90% - 5.35%",
    hotspots: ["Airport logistics belt", "Dixie/Eglinton node", "Western GTA distribution"],
    notes: "The western GTA workhorse. Strong for logistics, airport-linked businesses, and regional occupiers balancing labour and highway access.",
  },
  brampton: {
    label: "Brampton",
    vacancy: 4.9,
    rent: "$16.25 - $19.10 PSF net",
    capRate: "5.20% - 5.80%",
    hotspots: ["Airport Road / Steeles", "Orenda trade belt", "Value-driven industrial condos"],
    notes: "Useful for owner-users and value-sensitive industrial occupiers that still need practical truck access and dependable shipping utility.",
  },
  vaughan: {
    label: "Vaughan",
    vacancy: 5.3,
    rent: "$18.25 - $23.25 PSF net",
    capRate: "5.15% - 5.75%",
    hotspots: ["400-series frontage", "Showroom-flex clusters", "Customer-access industrial"],
    notes: "Vaughan blends industrial utility with stronger customer-facing presentation. Good for hybrid users needing showroom plus backend function.",
  },
  richmondhill: {
    label: "Richmond Hill",
    vacancy: 7.1,
    rent: "$22 - $29 PSF gross",
    capRate: "5.30% - 5.95%",
    hotspots: ["North GTA office growth", "Service dispatch footprint", "Last-mile satellite hub"],
    notes: "North GTA coverage node with useful talent access, clean office posture, and more manageable economics than the downtown core.",
  },
};

const SCENARIOS = {
  current: { label: "Current pulse", multiplier: 1, tone: "Balanced market read." },
  landlord: { label: "Landlord-favouring", multiplier: -0.5, tone: "Tighter concessions, stronger landlord posture." },
  tenant: { label: "Tenant-favouring", multiplier: 0.7, tone: "More leverage, softer rent posture, more incentive pressure." },
};

const DOTS = [
  { key: "toronto", x: 40, y: 64 },
  { key: "mississauga", x: 24, y: 62 },
  { key: "brampton", x: 15, y: 42 },
  { key: "vaughan", x: 36, y: 34 },
  { key: "richmondhill", x: 52, y: 25 },
];

export default function MarketIntelligenceHub() {
  const [regionKey, setRegionKey] = React.useState("mississauga");
  const [scenarioKey, setScenarioKey] = React.useState("current");
  const region = REGIONS[regionKey];
  const scenario = SCENARIOS[scenarioKey];
  const adjustedVacancy = Math.max(1.2, region.vacancy + scenario.multiplier).toFixed(1);

  return (
    <section className="market-intel">
      <div className="market-intel__header">
        <div>
          <div className="eyebrow">Live market data demo</div>
          <h2>Vacancy-rate map and market pulse layer</h2>
        </div>
        <p>
          This is a live demo layer for the site build. It lets users shift scenario posture, click GTA regions,
          and read the market through vacancy, rent, cap-rate, and hotspot logic instead of a flat list of places.
        </p>
      </div>

      <div className="market-intel__scenario-bar" role="tablist" aria-label="Market scenario">
        {Object.entries(SCENARIOS).map(([key, item]) => (
          <button type="button" key={key}
            className={scenarioKey === key ? "is-active" : ""}
            onClick={() => setScenarioKey(key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="market-intel__grid">
        <div className="market-intel__map-card">
          <div className="market-intel__map-title">GTA hotspot map</div>
          <div className="market-intel__map" role="img" aria-label="Illustrated GTA hotspot map with clickable region markers">
            <div className="market-intel__map-shape" />
            {DOTS.map((dot) => (
              <button type="button" key={dot.key}
                className={`market-intel__dot ${regionKey === dot.key ? "is-active" : ""}`}
                style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
                onClick={() => setRegionKey(dot.key)}
                aria-label={`Select ${REGIONS[dot.key].label}`}
              >
                <span />
                <small>{REGIONS[dot.key].label}</small>
              </button>
            ))}
          </div>
          <div className="market-intel__mini-list">
            {DOTS.map((dot) => (
              <button key={dot.key} type="button" onClick={() => setRegionKey(dot.key)} className={regionKey === dot.key ? "is-active" : ""}>
                {REGIONS[dot.key].label}
              </button>
            ))}
          </div>
        </div>

        <div className="market-intel__stats-card">
          <div className="market-intel__stats-head">
            <div>
              <div className="market-intel__label">Selected region</div>
              <h3>{region.label}</h3>
            </div>
            <div className="market-intel__tone">{scenario.tone}</div>
          </div>

          <div className="market-intel__metrics">
            <article>
              <small>Vacancy rate</small>
              <strong>{adjustedVacancy}%</strong>
            </article>
            <article>
              <small>Indicative rent</small>
              <strong>{region.rent}</strong>
            </article>
            <article>
              <small>Cap-rate band</small>
              <strong>{region.capRate}</strong>
            </article>
          </div>

          <div className="market-intel__notes">
            <p>{region.notes}</p>
            <div className="market-intel__hotspots">
              {region.hotspots.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
