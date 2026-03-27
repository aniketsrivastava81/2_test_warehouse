import React, { useEffect, useRef, useState } from 'react';

function getFrameHeight(iframe) {
  try {
    const doc = iframe?.contentDocument;
    if (!doc) return 1200;
    const body = doc.body;
    const html = doc.documentElement;
    return Math.max(
      body?.scrollHeight || 0,
      body?.offsetHeight || 0,
      html?.clientHeight || 0,
      html?.scrollHeight || 0,
      html?.offsetHeight || 0,
      1200,
    );
  } catch {
    return 1200;
  }
}

export default function ArchiveToolsEmbed() {
  const iframeRef = useRef(null);
  const [height, setHeight] = useState(1500);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return undefined;

    let cleanup = () => {};

    const attachObservers = () => {
      const nextHeight = getFrameHeight(iframe);
      setHeight(nextHeight);

      try {
        const doc = iframe.contentDocument;
        if (!doc) return;

        const resize = () => setHeight(getFrameHeight(iframe));
        resize();

        const win = iframe.contentWindow;
        const observer = new ResizeObserver(() => resize());
        observer.observe(doc.body);
        observer.observe(doc.documentElement);

        doc.addEventListener('click', resize, true);
        doc.addEventListener('input', resize, true);
        win?.addEventListener('resize', resize);

        const interval = window.setInterval(resize, 700);

        cleanup = () => {
          observer.disconnect();
          doc.removeEventListener('click', resize, true);
          doc.removeEventListener('input', resize, true);
          win?.removeEventListener('resize', resize);
          window.clearInterval(interval);
        };
      } catch {
        cleanup = () => {};
      }
    };

    iframe.addEventListener('load', attachObservers);
    if (iframe.contentDocument?.readyState === 'complete') attachObservers();

    return () => {
      iframe.removeEventListener('load', attachObservers);
      cleanup();
    };
  }, []);

  return (
    <section id="tool-legacy-suite" className="tools-v2-card tools-v2-card-large archive-tools-shell tools-v2-reveal on">
      <div className="tools-v2-head archive-tools-head">
        <div>
          <span className="tools-v2-tag">Archive / Legacy Tools</span>
          <h2>The deeper underwriting layer lives here without disturbing the working front-stack logic.</h2>
          <p>
            This suite carries the extended calculators from the remade tools file: condo conversion, DSCR,
            IRR, cash-on-cash, lease audit, CAM reconciliation, mark-to-market, occupancy ratio,
            breakeven, exit velocity, hold period, disposition, site selection, land value,
            parking, capital stack, loan constants, refinance, and equity multiple.
          </p>
        </div>
        <div className="archive-tools-actions">
          <a className="button button-secondary small-button" href="/legacy-tools-suite.html" target="_blank" rel="noreferrer">
            Open standalone suite
          </a>
        </div>
      </div>

      <div className="archive-tools-frame-wrap">
        <iframe
          ref={iframeRef}
          className="archive-tools-frame"
          src="/legacy-tools-suite.html"
          title="KOLT legacy and advanced tools suite"
          scrolling="no"
          style={{ height: `${height}px` }}
        />
      </div>

      <div className="tools-v2-decision-row archive-tools-footnotes">
        <article>
          <h3>Why this stays separate</h3>
          <p>The front tools remain the clean first-pass decision environment. The archive layer handles deeper underwriting once a user wants second-pass math.</p>
        </article>
        <article>
          <h3>What stayed intact</h3>
          <p>The working front-stack logic was preserved. The additional archive tools were brought over as a dedicated suite so nothing gets lost in the app transition.</p>
        </article>
        <article>
          <h3>Best use</h3>
          <p>Run the core stack first, shortlist the asset, then open the archive suite for heavier diligence and capital-structure follow-through.</p>
        </article>
      </div>
    </section>
  );
}
