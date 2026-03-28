import React, { useEffect } from 'react';
import { SITE } from '../config/site';

export default function PrivacyPage() {
  useEffect(() => {
    document.title = `Privacy | ${SITE.brandName}`;
  }, []);

  return (
    <div className="premium-page-scroll">
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container">
          <div className="page-hero-inner">
            <div className="eyebrow">Privacy</div>
            <h1>Privacy notice (template).</h1>
            <p>
              This is a short privacy template for the demo build. Replace with your final brokerage privacy policy, cookie categories, and retention rules before launch.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          <div className="tools-v2-card privacy-card">
            <span className="tools-v2-tag">What we collect</span>
            <h2>Information you provide</h2>
            <p>
              If you submit a form (scarcity report, requirement brief, inquiry), we may store your contact details and requirements so the advisory team can respond.
            </p>

            <div className="privacy-grid">
              <article>
                <h3>Preference cookies</h3>
                <p>Used to remember consent choices and basic UI preferences.</p>
              </article>
              <article>
                <h3>Performance signals</h3>
                <p>Used to understand which pages and tools are being used so the experience can be improved.</p>
              </article>
              <article>
                <h3>No sensitive profiling</h3>
                <p>This build does not intentionally collect sensitive personal information.</p>
              </article>
              <article>
                <h3>Contact</h3>
                <p>If you need something removed, email <a href={`mailto:${SITE.primaryEmail}`}>{SITE.primaryEmail}</a>.</p>
              </article>
            </div>

            <p className="mb-0 text-black/70">
              Cookie consent is stored locally (localStorage) and mirrored as a simple cookie named <code>kolt_cookie_consent</code>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
