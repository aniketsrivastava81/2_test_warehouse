import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import ToolsAccessGate from '../components/tools/ToolsAccessGate';
import CapRateTool from '../components/tools/CapRateTool';
import CamEstimatorTool from '../components/tools/CamEstimatorTool';
import LeaseVsBuyTool from '../components/tools/LeaseVsBuyTool';
import FootfallTool from '../components/tools/FootfallTool';
import SubmarketComparator from '../components/tools/SubmarketComparator';
import EquipmentCompatibilityTool from '../components/tools/EquipmentCompatibilityTool';
import HomeValuationTool from '../components/tools/HomeValuationTool';
import RiskResilienceTool from '../components/tools/RiskResilienceTool';
import PremiumWarehouseTool from '../components/tools/PremiumWarehouseTool';
import StorageFlowLabTool from '../components/tools/StorageFlowLabTool';
import CTASection from '../components/CTASection';
import ArchiveToolsEmbed from '../components/ArchiveToolsEmbed';

const STORAGE_KEY = 'kolt_tools_gate_signed';

function useMeta() {
  useEffect(() => {
    document.title = 'KOLT Realty Tools | Full GTA Commercial Real Estate Tool Stack';
    const ensureMeta = (name, content, attr = 'name') => {
      let element = document.head.querySelector(`meta[${attr}='${name}']`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    ensureMeta('description', 'KOLT Realty tools for cap rate, CAM and TMI budgeting, mortgage intelligence, warehouse fit, submarket comparison, risk screening, storage flow, and legacy underwriting calculators across the GTA.');
    ensureMeta('keywords', 'KOLT Realty, GTA commercial real estate tools, cap rate calculator, CAM TMI budget, mortgage DSCR LTV tool, warehouse fit, industrial decision support, submarket comparison GTA, legacy underwriting tools');
    ensureMeta('og:title', 'KOLT Realty Tools', 'property');
    ensureMeta('og:description', 'Core decision tools plus the legacy underwriting suite for GTA commercial and industrial real estate.', 'property');
  }, []);
}

export default function ToolsPage() {
  useMeta();
  const [accepted, setAccepted] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(STORAGE_KEY) === 'yes';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (accepted) window.localStorage.setItem(STORAGE_KEY, 'yes');
      else window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [accepted]);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const revealTargets = Array.from(document.querySelectorAll('.tools-v2-reveal, .tools-v2-stagger'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('on');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [accepted]);

  useLayoutEffect(() => {
    if (!accepted || typeof window === 'undefined') return;
    const targets = document.querySelectorAll('.tools-v2-intro, .tools-v2-stack, .tools-v2-stack > *');
    targets.forEach((target) => target.classList.add('on'));
  }, [accepted]);

  useEffect(() => {
    if (!accepted || typeof window === 'undefined') return;
    const hash = window.location.hash;
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [accepted]);

  const counts = useMemo(() => ({ core: 11, archive: 19, total: 30 }), []);
  const chapters = [
    { label: 'Access Gate', href: '#tools-access-gate' },
    { label: 'Cap Rate', href: '#tool-cap-rate' },
    { label: 'CAM / TMI', href: '#tool-cam-tmi' },
    { label: 'Mortgage', href: '#tool-mortgage-intelligence' },
    { label: 'Footfall', href: '#tool-footfall-access' },
    { label: 'Submarkets', href: '#tool-submarket-comparison' },
    { label: 'Warehouse Fit', href: '#tool-warehouse-fit' },
    { label: 'Risk', href: '#tool-risk-resilience' },
    { label: 'Premium Layer', href: '#tool-premium-warehouse' },
    { label: 'Storage Flow', href: '#tool-storage-flow-lab' },
    { label: 'Home Valuation', href: '#tool-home-valuation' },
    { label: 'Archive Suite', href: '#tool-legacy-suite' },
  ];

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium tools-v2-hero tools-v2-stage tools-v4-hero !pt-10 lg:!pt-14">
        <div className="tools-v2-orb tools-v2-orb-a" aria-hidden="true" />
        <div className="tools-v2-orb tools-v2-orb-b" aria-hidden="true" />
        <div className="container tools-v2-hero-grid tools-v3-hero-grid tools-v4-hero-grid">
          <div className="page-hero-inner tools-v2-hero-main tools-v2-reveal tools-v3-hero-main tools-v4-hero-main">
            <div className="flex flex-wrap gap-2"><div className="eyebrow">KOLT Tools</div><span className="rounded-full border border-black/8 bg-white px-3 py-1 text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/54">Main stack refreshed</span></div>
            <h1>The full KOLT tool stack now lives inside the app instead of beside it.</h1>
            <p>
              The working front-stack logic stays intact. The remade tools file is used as the structural cue,
              and the deeper archive calculators now sit inside the same website flow instead of getting left behind.
            </p>
            <div className="hero-proof-row tools-v2-proof-row">
              <span className="proof-chip">{counts.core} core tools</span>
              <span className="proof-chip">{counts.archive} archive tools</span>
              <span className="proof-chip">{counts.total} total decision tools</span>
              <span className="proof-chip">Gate still required first</span>
              <span className="proof-chip">Working logic preserved</span>
            </div>
            <div className="tools-v2-kpi-row tools-v2-stagger">
              <article>
                <small>Front stack</small>
                <strong>Fast shortlist logic for live opportunities</strong>
              </article>
              <article>
                <small>Archive suite</small>
                <strong>Deeper underwriting after the first pass</strong>
              </article>
              <article>
                <small>Result</small>
                <strong>One route for screening, comparison, and diligence</strong>
              </article>
            </div>
          </div>

          <aside className="tools-v2-hero-rail tools-v2-reveal tools-v3-hero-rail tools-v4-hero-rail">
            <div className="tools-v2-rail-card tools-v2-rail-card-accent overflow-hidden">
              <div className="tools-v3-rail-photo">
                <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" alt="Warehouse team reviewing operations" />
              </div>
              <span className="tools-v2-mini-tag">What changed this pass</span>
              <h2>Old fragments removed. Remade structure absorbed. Main page now carries the full stack.</h2>
              <p>The front-facing tools stay native to the app. The additional legacy calculators are brought in as a dedicated second-layer suite.</p>
            </div>
            <div className="tools-v2-rail-card">
              <span className="tools-v2-mini-tag">Quick map</span>
              <div className="tools-v2-anchor-list">
                {chapters.map((chapter) => (
                  <a key={chapter.href} href={chapter.href}>{chapter.label}</a>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a className="button button-primary small-button" href="#tool-submarket-comparison">Compare submarkets</a>
                <a className="button button-secondary small-button" href="#tool-legacy-suite">Open archive suite</a>
                <a className="button button-secondary small-button" href="/amenities">Amenity finder</a>
                <a className="button button-secondary small-button" href="/commute">Commute analysis</a>
                <a className="button button-secondary small-button" href="/schedule">Schedule</a>
              </div>
            </div>
            <div className="tools-v2-rail-card tools-v2-rail-card-soft">
              <span className="tools-v2-mini-tag">Logic stance</span>
              <ul className="tools-v2-bullet-list">
                <li>Core calculators remain the first-pass experience</li>
                <li>Archive tools stay available for heavier second-pass diligence</li>
                <li>The page now feels like a full decision environment, not a partial tool dump</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section-soft-borderless tools-v2-stage">
        <div className="container tools-v2-page tools-v4-page">
          <ToolsAccessGate accepted={accepted} onAccept={() => setAccepted(true)} metadataReady />

          {!accepted ? (
            <section className="tools-v2-card tools-v2-locked-state tools-v2-reveal tools-v3-locked-state">
              <span className="tools-v2-tag">Locked until acceptance</span>
              <h2>The tool stack stays hidden until the acknowledgement is accepted.</h2>
              <p>
                Tick all acknowledgements above and press <b>Accept and unlock tools</b>. Only then will the full {counts.total}-tool environment become visible here.
              </p>
            </section>
          ) : (
            <>
              <section className="tools-v2-intro tools-v2-card tools-v2-reveal tools-v3-intro tools-v4-intro">
                <div>
                  <span className="tools-v2-mini-tag">Unlocked environment</span>
                  <h2>The core tools are live first. The archive suite sits underneath for the heavier work.</h2>
                </div>
                <p>
                  Start with the fast filters below. Once a property survives that first pass, move into the archive suite for deeper financing,
                  lease, occupancy, disposition, and capital-stack analysis without leaving the website.
                </p>
              </section>
              <div className="tools-v2-stack tools-v2-stagger tools-v3-stack tools-v4-stack">
                <CapRateTool />
                <CamEstimatorTool />
                <LeaseVsBuyTool />
                <FootfallTool />
                <SubmarketComparator />
                <EquipmentCompatibilityTool />
                <RiskResilienceTool />
                <PremiumWarehouseTool />
                <StorageFlowLabTool />
                <ArchiveToolsEmbed />
              </div>
            </>
          )}
        </div>
      </section>

      {accepted && (
        <CTASection
          eyebrow="Next move"
          title={`Use the full ${counts.total}-tool stack against live opportunities.`}
          body="Run the core screen first, then move into the archive suite when the shortlist deserves deeper underwriting and stronger conviction."
          primaryLabel="Browse Listings"
          primaryTo="/listings"
          secondaryLabel="Explore Markets"
          secondaryTo="/markets"
        />
      )}
    </>
  );
}
