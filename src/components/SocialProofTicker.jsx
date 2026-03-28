import React from 'react';

const ITEMS = [
  ' $1B+ represented sales belt ',
  ' 200+ years combined experience ',
  ' $2B+ pipeline assets ',
  ' Peel • Halton • York corridor focus ',
  ' Decision-first advisory journey ',
  ' Scarcity report workflow ',
  ' Warehouse fit + zoning fluency ',
  ' Off-market + on-market screening ',
  ' Tools that reduce blind spots ',
];

export default function SocialProofTicker() {
  const loop = [...ITEMS, ...ITEMS, ...ITEMS];
  return (
    <section className="proof-ticker" aria-label="Social proof ticker">
      <div className="proof-ticker__track" aria-hidden="true">
        {loop.map((item, idx) => (
          <span className="proof-ticker__item" key={`${idx}-${item}`}>{item}</span>
        ))}
      </div>
      <div className="sr-only">
        {ITEMS.join(' · ')}
      </div>
    </section>
  );
}
