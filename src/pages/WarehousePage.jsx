import React from "react";
import { Link } from "react-router-dom";
import CTASection from "../components/CTASection";
import { Reveal } from "../components/motion/Reveal";

const evaluationPoints = [
  "Circulation flow and aisle logic",
  "Truck-level loading and staging behaviour",
  "Visual fit before tours or underwriting",
  "How the asset feels as an operating environment",
];

const supportCards = [
  {
    title: "Branded scene",
    body: "The warehouse itself now carries KOLT branding across walls, pallet wraps, signage, and the in-scene overlay so the experience feels authored instead of detached.",
  },
  {
    title: "Cleaner entry logic",
    body: "A purpose-led intro explains what the user should evaluate before the scene opens and routes them toward the right next step afterward.",
  },
  {
    title: "Stronger exit path",
    body: "Listings, tools, and contact are reachable both around the iframe and from inside the warehouse scene itself.",
  },
];

export default function WarehousePage() {
  return (
    <>
      <section className="page-hero slim-hero warehouse-hero-premium !pt-10 lg:!pt-14 overflow-hidden">
        <div className="container grid gap-6 lg:grid-cols-[1.02fr_.98fr] items-stretch">
          <Reveal className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white px-7 py-8 shadow-luxe lg:px-10 lg:py-10">
            <div className="absolute inset-0 bg-kolt-glow opacity-80" aria-hidden="true" />
            <div className="relative z-[1]">
              <div className="eyebrow">Warehouse Demo</div>
              <h1 className="m-0 max-w-[10ch] text-[clamp(3rem,7vw,6rem)] leading-[0.92] tracking-[-0.07em]">See the asset as an operating environment, not just a listing page.</h1>
              <p className="mt-5 max-w-[58ch] text-[1.04rem] leading-8 text-black/80">
                This route now adds a cleaner entry explanation, stronger branded framing, a more site-native iframe shell, and a direct bridge back into active opportunities.
              </p>
              <div className="warehouse-hero-points mt-6 flex flex-wrap gap-3">
                {evaluationPoints.map((point) => (
                  <span key={point} className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-black/80 shadow-[0_10px_25px_rgba(17,17,17,0.05)]">{point}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80" alt="Industrial warehouse interior" className="h-full min-h-[420px] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute left-4 right-4 bottom-4 rounded-[1.6rem] border border-white/20 bg-white/78 px-5 py-4 backdrop-blur-lg">
              <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24]">KOLT branded environment</div>
              <p className="mb-0 mt-2 text-[0.98rem] leading-7 text-black/78">The iframe shell, control language, and exit path now read like the main KOLT site instead of a one-off demo layer.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section warehouse-shell-section">
        <div className="container">
          <div className="warehouse-preflight-panel">
            <div>
              <div className="eyebrow">Before you enter</div>
              <h2>Use this scene to evaluate loading, circulation, staging, and how the space actually behaves.</h2>
            </div>
            <div className="warehouse-preflight-panel__notes">
              <p>Start with the interior view, move into dock side and wide shot, then route back into listings, tools, or contact once the fit feels clearer.</p>
              <div className="warehouse-preflight-panel__actions">
                <Link className="button button-primary small-button" to="/listings">View live opportunities</Link>
                <Link className="button button-secondary small-button" to="/contact#analysis-workflow">Request analysis</Link>
              </div>
            </div>
          </div>

          <div className="warehouse-frame-shell">
            <div className="warehouse-frame-shell__topbar">
              <div>
                <span>KOLT Realty · Interactive warehouse intelligence</span>
                <strong>Branded walls · pallet wraps · scene signage · direct exit routing</strong>
              </div>
              <div className="warehouse-frame-shell__toplinks">
                <Link to="/listings">Listings</Link>
                <Link to="/tools">Tools</Link>
                <Link to="/contact#analysis-workflow">Contact</Link>
              </div>
            </div>
            <div className="warehouse-frame-wrap frame-large warehouse-frame-premium warehouse-frame-premium-v2 relative overflow-hidden">
              <iframe className="warehouse-frame" src="/warehouse.html" title="KOLT warehouse walkthrough" loading="eager"></iframe>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container warehouse-support-grid grid gap-6 lg:grid-cols-3">
          {supportCards.map((card) => (
            <article key={card.title} className="warehouse-support-card rounded-[1.8rem] border border-black/5 bg-white p-6 shadow-luxe">
              <h3 className="m-0 text-[1.35rem] tracking-[-0.04em]">{card.title}</h3>
              <p className="mb-0 mt-3 text-[0.98rem] leading-7 text-black/78">{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container warehouse-bridge-panel warehouse-bridge-panel-v2 rounded-[2rem] border border-black/5 bg-white p-7 shadow-luxe lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="eyebrow">Exit path</div>
            <h2 className="m-0 max-w-[12ch] text-[clamp(2rem,3vw,3.4rem)] leading-[0.95] tracking-[-0.06em]">Move from visual confidence into the next commercial action.</h2>
          </div>
          <div className="warehouse-bridge-actions mt-5 flex flex-wrap gap-3 lg:mt-0">
            <Link className="button button-primary" to="/listings">View opportunities</Link>
            <Link className="button button-secondary" to="/tools">Open tools</Link>
            <Link className="button button-secondary" to="/contact#analysis-workflow">Request analysis</Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Continue"
        title="Interactive proof works best when it stays inside the main conversion path."
        body="This page now keeps the warehouse layer branded, intentional, and commercially useful instead of feeling like a side experiment."
        primaryLabel="Open Listing Type 2"
        primaryTo="/listing-type-2"
        secondaryLabel="Back to Home"
        secondaryTo="/"
      />
    </>
  );
}
