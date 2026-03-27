import React, { useMemo, useState } from "react";

const LANES = ["Inbound", "Buffer", "Outbound"];

export default function StorageFlowLabTool() {
  const [pallets, setPallets] = useState([2, 3, 1]);
  const total = useMemo(() => pallets.reduce((sum, value) => sum + value, 0), [pallets]);

  const move = (from, to) => {
    setPallets((current) => {
      const next = [...current];
      if (next[from] <= 0) return current;
      next[from] -= 1;
      next[to] += 1;
      return next;
    });
  };

  const stack = (lane) => setPallets((current) => current.map((value, index) => index === lane ? value + 1 : value));
  const clear = (lane) => setPallets((current) => current.map((value, index) => index === lane ? Math.max(0, value - 1) : value));

  return (
    <section id="tool-storage-flow-lab" className="tools-v2-card tools-v2-card-large">
      <div className="tools-v2-head">
        <div>
          <span className="tools-v2-tag">Tool 9 · Storage Flow Lab</span>
          <h2>Small interactive module that makes warehouse information feel alive.</h2>
          <p>
            This is the attention-grabber. It is deliberately simple, but it turns storage flow, staging balance, and outbound readiness into something the user can touch instead of passively read.
          </p>
        </div>
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
              <div className="tools-v2-lane-actions">
                <button type="button" onClick={() => stack(laneIndex)}>+ Pallet</button>
                <button type="button" onClick={() => clear(laneIndex)}>- Pallet</button>
              </div>
            </div>
          ))}
        </div>

        <div className="tools-v2-lab-actions">
          <button type="button" onClick={() => move(0, 1)}>Move inbound → buffer</button>
          <button type="button" onClick={() => move(1, 2)}>Move buffer → outbound</button>
          <button type="button" onClick={() => setPallets([2, 3, 1])}>Reset flow</button>
        </div>

        <div className="tools-v2-decision-row">
          <article><h3>Live pallets</h3><p>{total} pallets currently placed across the lab.</p></article>
          <article><h3>What it teaches</h3><p>Even a light interaction makes staging, choke points, and outbound readiness feel more real to the end user.</p></article>
          <article><h3>How it helps KOLT</h3><p>This is the kind of interactive layer that makes the page memorable and distinctly not generic brokerage content.</p></article>
        </div>
      </div>
    </section>
  );
}
