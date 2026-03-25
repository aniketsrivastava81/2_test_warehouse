# Megha Mehta React Migration

This is a Vite + React commercial real-estate demo project prepared for Vercel deployment.

## Live app structure
These are the main website files that should be treated as the live marketing app:
- `src/main.jsx`
- `src/App.jsx`
- `src/components/Layout.jsx`
- `src/components/Header.jsx`
- `src/components/Footer.jsx`
- `src/components/LeadMagnetModal.jsx`
- `src/components/MobileStickyCTA.jsx`
- `src/pages/HomePage.jsx`
- `src/pages/ServicesPage.jsx`
- `src/pages/AboutPage.jsx`
- `src/pages/ContactPage.jsx`
- `src/pages/PropertyListPage.jsx`
- `src/pages/PropertyDetailPage.jsx`
- `src/pages/ToolsPage.jsx`
- `src/pages/BlogPage.jsx`
- `src/pages/BlogPostPage.jsx`
- `src/pages/WarehousePage.jsx`
- `src/data/siteData.js`
- `src/config/site.js`

## Legacy / secondary files
These are present for reference or older experiments and should not be treated as the main website unless intentionally revived later:
- `src/main.js`
- `src/core/*`
- `src/game/*`
- `src/world/*`
- `src/input/*`
- `src/fx/*`
- `src/ui/*`
- `src/lib/*`
- `src/legacy/*`
- `index_old.html`
- `dist/*`

## Included routes
- `/` — homepage
- `/services` — services
- `/about` — advisor-style about page
- `/contact` — contact + lead form
- `/listings` — searchable listings + map
- `/listings/:slug` — listing detail page
- `/tools` — commercial tools page
- `/guides` — blog/guides index
- `/guides/:slug` — guide detail page
- `/warehouse` — warehouse + 3D pallet game page

Legacy redirects remain in place for older paths like `/blog`, `/property-list`, and `/property-details`.

## Run locally
```bash
npm install
npm run dev
```

## Deployment note
`vercel.json` includes a rewrite to `index.html` so React Router routes work correctly on Vercel.

## Notes
- Lead capture, shortlist requests, and tour/contact requests store demo data in `localStorage`.
- Listings and guides content live in `src/data/siteData.js`.
- The warehouse page remains isolated as a secondary demo experience.
- No `package-lock.json` is included in this folder.
