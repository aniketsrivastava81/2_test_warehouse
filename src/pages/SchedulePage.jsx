import React, { useEffect } from 'react';
import { SITE } from '../config/site';

export default function SchedulePage() {
  useEffect(() => {
    document.title = `Schedule | ${SITE.brandName}`;
  }, []);

  const templateUrl = SITE.googleCalendarEmbedUrl;
  const hasTemplate = templateUrl && !templateUrl.includes('YOUR_GOOGLE_CALENDAR');

  return (
    <div className="premium-page-scroll">
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container">
          <div className="page-hero-inner schedule-hero">
            <div className="eyebrow">Scheduling</div>
            <h1>Book time with KOLT.</h1>
            <p>
              This is a Google Calendar embed template. Swap the URL in <b>src/config/site.js</b> to your real appointment schedule link when ready.
            </p>
            <div className="hero-proof-row">
              <span className="proof-chip">Instant booking</span>
              <span className="proof-chip">Timezone aware</span>
              <span className="proof-chip">Works on mobile</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container">
          {!hasTemplate ? (
            <div className="tools-v2-card schedule-placeholder">
              <span className="tools-v2-tag">Template placeholder</span>
              <h2>Add your Google Calendar appointment schedule link.</h2>
              <p>
                Replace <code>googleCalendarEmbedUrl</code> in <code>src/config/site.js</code> with your Google Calendar appointment schedule embed URL.
                Once replaced, the calendar will render here.
              </p>
              <p className="mb-0 text-black/70">
                Tip: use the Google Calendar “Appointment schedules” feature and copy the embed URL.
              </p>
            </div>
          ) : (
            <div className="schedule-embed">
              <iframe
                title="Schedule with KOLT"
                src={templateUrl}
                className="schedule-embed__frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
