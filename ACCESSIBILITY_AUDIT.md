# Accessibility / WCAG audit (Pass 5)

This pass adds a cookie consent banner, an FAQ chatbot, scheduling (Google Calendar template), and two new utility pages (Amenity Finder + Commute Analysis). It also includes a lightweight **static accessibility scan** and fixes.

## Automated checks (run locally)

- Command: `npm run audit:wcag`
- Scope: `src/**/*.jsx|js|ts|tsx`
- Scan rules (static):
  - `<img>` tags missing `alt`
  - `<a target="_blank">` missing `rel="noopener noreferrer"`
  - `<button>` missing `type`
  - form fields missing `id` (helps label association and testing)

**Result:** 0 findings in the current source tree (see `WCAG_AUDIT_REPORT.md`).

## Manual WCAG-oriented review checklist

### Keyboard / focus
- [x] Skip link exists and is focusable (`Layout.jsx`)
- [x] Cookie banner: focusable buttons, dismissable via standard buttons
- [x] Chatbot: open/close via keyboard; input is reachable and labeled
- [x] Global focus style via `:focus-visible` (added)

### Forms
- [x] Inputs/selects/textarea have stable `id`s
- [x] Form buttons have explicit `type`
- [x] Errors are announced using `role="alert"` where applicable (Amenity/Commute)

### Semantics / ARIA
- [x] Primary navigation has `aria-label`
- [x] Chatbot panel uses `role="dialog"` and labeled
- [x] Decorative UI is marked `aria-hidden` where appropriate

### Motion / cognitive strain
- [x] `prefers-reduced-motion: reduce` disables marquee and reduces animation

### Color / contrast (spot check)
- Focus ring: high-contrast red outline against light backgrounds.
- Primary CTA red on white is strong; supporting text uses `rgba` values—verify final contrast in production when brand colors are locked.

## Known limits

- This is a SPA, so a “full” crawl requires a headless browser (e.g., Playwright + axe). That is not added here; instead we:
  - enforced common structural fixes at source level,
  - added reduced-motion support,
  - and generated a source-level audit report.

## Next recommended step (when deploying)

Run an axe + Lighthouse pass against a deployed preview URL:
- Axe DevTools / `@axe-core/playwright`
- Lighthouse accessibility report

