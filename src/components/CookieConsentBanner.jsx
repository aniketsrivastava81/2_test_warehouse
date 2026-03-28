import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'kolt_cookie_consent_v1';

function setConsentCookie(value) {
  try {
    const maxAge = 60 * 60 * 24 * 365; // 1 year
    document.cookie = `kolt_cookie_consent=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  } catch {
    // ignore
  }
}

function readStored() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export default function CookieConsentBanner() {
  const [status, setStatus] = useState(() => (typeof window === 'undefined' ? 'unknown' : (readStored() || 'unknown')));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const current = readStored() || 'unknown';
    setStatus(current);
    setOpen(current === 'unknown');
  }, []);

  const isAccepted = status === 'accepted';
  const isDeclined = status === 'declined';

  const copy = useMemo(() => {
    return {
      title: 'Cookies and privacy',
      body: 'We use cookies to remember preferences, measure basic site performance, and support the lead-capture workflow. You can accept, decline, or review details in the privacy notice.',
    };
  }, []);

  const persist = (next) => {
    setStatus(next);
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setConsentCookie(next);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') setOpen(false);
  };

  return (
    <>
      {open && (
        <div className={`cookie-banner ${open ? 'is-open' : ''}`} role="dialog" aria-modal="false" aria-label="Cookie consent" onKeyDown={handleKeyDown}>
          <div className="cookie-banner__inner">
            <div className="cookie-banner__copy">
              <strong>{copy.title}</strong>
              <p>{copy.body}</p>
              <div className="cookie-banner__meta" aria-label="Cookie status">
                <span className={`cookie-banner__pill ${isAccepted ? 'is-on' : ''}`}>Accepted</span>
                <span className={`cookie-banner__pill ${isDeclined ? 'is-on' : ''}`}>Declined</span>
                <Link to="/privacy" className="cookie-banner__link">Privacy notice</Link>
              </div>
            </div>
            <div className="cookie-banner__actions">
              <button type="button" className="button button-secondary small-button" onClick={() => persist('declined')}>Decline</button>
              <button type="button" className="button button-primary small-button" onClick={() => persist('accepted')}>Accept</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
