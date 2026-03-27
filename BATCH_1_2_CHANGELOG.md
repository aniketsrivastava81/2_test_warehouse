# Batch 1 + Batch 2 changelog

This folder includes prerequisite cleanup plus the first two implementation batches.

## Included prerequisite / foundation work
- Confirmed the live React app entry and layout path
- Added a central site config (`src/config/site.js`)
- Added Vercel SPA rewrite support (`vercel.json`)
- Added reusable components for CTA, lead form, blog cards, and mobile sticky CTA
- Added missing core pages: Services, About, Contact, Blog Post
- Reworked header/footer/navigation around the live route map
- Added a README note identifying live vs legacy files

## Included Batch 1 work
- Cleaner route map in `src/App.jsx`
- New shared shell behavior through `Layout.jsx`
- Mobile sticky CTA component added
- Warehouse kept secondary in nav and messaging

## Included Batch 2 work
- Homepage hero repositioned for GTA commercial real estate
- Trust/proof strip and clearer CTA hierarchy added
- “Who I help” section added
- “Asset classes” section added
- “Service areas” section added
- “How I help / process” section added
- Homepage featured listings preview added
- Homepage guide preview added
- Homepage made visually lighter and more premium than the previous version

## Additional supporting upgrades
- Listing cards now link to slug-based detail pages
- Property list and property detail pages updated to align with the new route structure
- Guides/blog now support both index and detail pages

## Exclusions
- No `package-lock.json`
- No `node_modules`
- `.git` will be excluded from the exported zip
