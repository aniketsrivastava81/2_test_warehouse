# Batch 3 changelog

This batch completes the services / about / contact / lead-capture portion of the batched implementation plan.

## What changed
- Upgraded `ServicesPage.jsx` into a fuller commercial-services page with clearer service scopes and process language.
- Upgraded `AboutPage.jsx` into a more credible advisor-style profile page.
- Upgraded `ContactPage.jsx` into a stronger conversion page with reusable lead form integration.
- Rebuilt `LeadForm.jsx` into a reusable configurable form used across the homepage, property detail page, and contact page.
- Moved demo lead-saving logic into `src/utils/leadStorage.js` and updated `LeadMagnetModal.jsx` to use it.
- Replaced the homepage inline shortlist form with the reusable lead form.
- Improved shared contact actions in `Header.jsx`, `Footer.jsx`, and `MobileStickyCTA.jsx`.
- Added styling support in `src/styles/base.css` for the richer batch-3 layouts.

## Notes
- Demo lead handling still uses localStorage intentionally.
- No `package-lock.json` is included in this folder.
- `node_modules` and `.git` are excluded from packaged zips.
