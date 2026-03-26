import { logger } from './logger';
import { getStoredValue, setStoredValue } from './storage';

const ANALYTICS_KEY = 'betta-analytics-events';

export function trackEvent(name, payload = {}) {
  if (typeof window === 'undefined') return;
  const event = {
    event: name,
    timestamp: new Date().toISOString(),
    ...payload,
  };

  const queue = getStoredValue(ANALYTICS_KEY, []);
  queue.push(event);
  setStoredValue(ANALYTICS_KEY, queue.slice(-120));

  if (import.meta.env.DEV) {
    logger.info('[analytics]', event);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

export function getTrackedEvents() {
  return getStoredValue(ANALYTICS_KEY, []);
}
