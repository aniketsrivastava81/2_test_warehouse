import React, { useMemo, useState } from "react";

const LANES = ["Inbound", "Buffer", "Outbound"];

export default function StorageFlowLabTool() {
  const [pallets, setPallets] = useState([3, 4, 2]);
  const [ordersPerHour, setOrdersPerHour] = useState(32);
  const [teamSize, setTeamSize] = useState(6);

  const total = useMemo(() => pallets.reduce((sum, value) => sum + value, 0), [pallets]);
  const throughputScore = useMemo(() => {
    const base = Math.max(35, 100 - Math.abs(pallets[1] - pallets[2]) * 9 - Math.max(0, pallets[0] - teamSize) * 5);
    return Math.max(20, Math.min(100, Math.round(base + teamSize * 2 - Math.max(0, ordersPerHour - 36) * 1.2)));
  }, [ordersPerHour, pallets, teamSize]);

  const bottleneck = useMemo(() => {
    if (pallets[0] > pallets[1] + 2) return "Receiving is outrunning staging. Clear inbound faster or add labour to avoid dock-side backlog.";
    if (pallets[1] > pallets[2] + 2) return "Buffer inventory is stacking up. Outbound rhythm is not keeping pace with staging.";
    if (ordersPerHour > teamSize * 7) return "Order volume is pressuring labour. You likely need a faster handoff between pick, stage, and dispatch.";
    return "Flow is reasonably balanced. The current lane mix feels commercially believable for the selected team size and order pace.";
  }, [ordersPerHour, pallets, teamSize]);

  const move = (from, to) => {
    setPallets((current) => {
      const next = [...current];
      if (next[from] <= 0) return current;
      next[from] -= 1;
      next[to] += 1;
      return next;
    });
  };

  const reset = () => setPallets([3, 4, 2]);

  return (
    <section id="tool-storage-flow-lab" className="tools-v2-card tools-v2-card-large premium-tool">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 9 - Storage Flow Lab</span>
          <h2>Make staging and outbound readiness fully live.</h2>
          <p>
            This is now a proper interactive tool. Users can rebalance pallets, change order pace, and adjust labour to see where the
            warehouse starts feeling operationally tight rather than just visually tidy.
          </p>
        </div>
      </div>

      <div className="premium-tool__grid">
        <div className="premium-tool__panel">
          <div className="storage-flow-config">
            <label>
              <span>Orders per hour ({ordersPerHour})</span>
              <input id="sfl-orders" type="range" min="8" max="60" value={ordersPerHour} onChange={(e) => setOrdersPerHour(Number(e.target.value))} />
            </label>
            <label>
              <span>Floor team ({teamSize})</span>
              <input id="sfl-team" type="range" min="2" max="14" value={teamSize} onChange={(e) => setTeamSize(Number(e.target.value))} />
            </label>
          </div>

          <div className="tools-v2-lab">
            <div className="tools-v2-lanes">
              {LANES.map((lane, laneIndex) => (
                <div className="tools-v2-lane" key={lane}>
                  <strong>{lane}</strong>
                  <div className="tools-v2-pallet-stack">
                    {Array.from({ length: pallets[laneIndex] }).map((_, index) => (
                      <span key={`${lane}-${index}`} className="tools-v2-pallet" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="tools-v2-lab-actions">
              <button type="button" onClick={() => move(0, 1)}>Move inbound -&gt; buffer</button>
              <button type="button" onClick={() => move(1, 2)}>Move buffer -&gt; outbound</button>
              <button type="button" onClick={() => move(2, 1)}>Return outbound -&gt; buffer</button>
              <button type="button" onClick={reset}>Reset flow</button>
            </div>
          </div>
        </div>

        <div className="premium-tool__panel premium-tool__result">
          <div className="premium-tool__kpis premium-tool__kpis--stack">
            <article><small>Total pallets</small><strong>{total}</strong></article>
            <article><small>Throughput score</small><strong>{throughputScore} / 100</strong></article>
            <article><small>Likely pressure point</small><strong>{pallets[1] > pallets[2] ? "Staging" : "Outbound rhythm"}</strong></article>
          </div>
          <p>{bottleneck}</p>
        </div>
      </div>
    </section>
  );
}
