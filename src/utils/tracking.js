import { track } from "@vercel/analytics";

export function trackEvent(name, data = undefined) {
  try {
    track(name, data);
  } catch {
    // Keep the UI resilient even when analytics is blocked or unavailable.
  }
}
