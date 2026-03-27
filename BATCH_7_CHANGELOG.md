# Batch 7 changelog

## What was completed

- Replaced uncontrolled remote placeholder imagery with local branded SVG image assets under `public/images/`
- Updated homepage collage, listing cards, and property detail pages to use the controlled image system
- Standardized image aspect ratios and reserved image space to reduce layout shift
- Simplified font loading by removing the external Google font dependency and using a local premium serif fallback stack
- Added accessibility improvements across shared UI and forms: stronger focus states, improved labels, `aria-live` success states, modal keyboard escape handling, and better tap-target support
- Added Vercel Analytics and Speed Insights integration hooks at the root app level
- Added custom event tracking for hero CTAs, checklist opens, shortlist requests, property inquiries, guide opens, tool interactions, and contact actions
- Kept the warehouse route secondary and refined its page copy so it reads like a supporting interactive feature
- Marked the older standalone warehouse/game source as legacy/non-marketing code in the README and legacy entry files
- Added `.gitignore` so `dist/`, `node_modules/`, and `package-lock.json` stay out of the repo going forward
- Removed `dist/` from the packaged project so the repo stays source-first and Vercel can rebuild cleanly

## Notes

- Web Analytics page views work on all plans once Analytics is enabled in Vercel.
- Custom events require the plan support documented by Vercel for Web Analytics events.
- Speed Insights also needs to be enabled in the Vercel project dashboard after deployment.
