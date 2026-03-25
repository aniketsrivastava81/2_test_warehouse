# Megha Mehta React Migration

This repo currently contains **two parallel systems**:

1. **The live React + Vite marketing site**
2. **Older / secondary warehouse-game and legacy HTML files**

## Live files you should edit first
- `src/main.jsx`
- `src/App.jsx`
- `src/components/Layout.jsx`
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/components/LeadMagnetModal.jsx`
- `src/pages/*` used by `src/App.jsx`
- `src/data/siteData.js`
- `src/config/site.js`
- `src/styles/base.css`
- `src/styles/landing.css`
- `src/styles/app.css`
- `src/styles/react-addons.css`

## Legacy / secondary files
These are **not** the main website entry path and should not be used as the default place for marketing-site edits:
- `src/main.js`
- `src/core/*`
- `src/game/*`
- `src/world/*`
- `src/input/*`
- `src/fx/*`
- `src/ui/*`
- `src/legacy/*`
- `index_old.html`
- `dist/*`
- `src/lib/siteData.js`
- `src/lib/siteUtils.js`
- `src/pages/ListingsPage.jsx`
- `src/pages/GuidesPage.jsx`
- `src/pages/ListingType2Page.jsx`

## Current live routes
- `/` — homepage
- `/services` — services page
- `/listings` — searchable listings + map
- `/listings/:slug` — property detail page
- `/tools` — tools page
- `/guides` — guides index
- `/guides/:slug` — individual guide route
- `/about` — advisor profile page
- `/contact` — contact / lead capture page
- `/warehouse` — secondary warehouse + 3D pallet game route

Legacy routes such as `/blog`, `/property-list`, and `/property-details?id=...` are redirected temporarily.

## CSS source-of-truth note
The live app imports:
- `src/styles/base.css`
- `src/styles/landing.css`
- `src/styles/app.css`
- `src/styles/react-addons.css`

`src/styles/globals.css` currently exists as an archival/duplicate stylesheet and is **not** part of the live import chain.

## Run locally
```bash
npm install
npm run dev
```

## Notes
- The warehouse page is preserved as the approved one-file 3D page and loaded through a React route in an iframe so its camera/game behavior stays intact.
- Lead capture, hero shortlist request, and tour request forms currently store demo data in `localStorage`.
- Listings and guide content live in `src/data/siteData.js`.
- Site-level brand/contact values now live in `src/config/site.js`.
