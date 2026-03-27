# Batch 5 changelog

This batch focused on tools, guides/blog, internal linking, and live content structure.

## Completed in Batch 5

- Rebuilt the Tools page into a commercial-only tools hub.
- Removed residential/generic-style tool content and replaced it with:
  - lease vs buy screening
  - cap rate / NOI screening
  - CAM / TMI occupancy budgeting
  - footfall + access scoring
  - GTA submarket comparison
- Split the tools page into reusable components under `src/components/tools/`.
- Upgraded the guides/blog index into a cleaner content page with a featured guide and card-based browsing.
- Strengthened article detail pages with:
  - cleaner structure
  - related listings
  - related guides
  - stronger internal linking to tools, listings, and contact
- Expanded `src/data/siteData.js` so it remains the single live content source for:
  - listings
  - guides/blog posts
  - tool section summaries
  - submarket comparison content
- Updated `src/lib/siteData.js` so it stays a thin deprecated re-export of the live source.
- Added stronger internal links from services, listings, property detail, tools, and guides so the flow feels more like:
  - read
  - compare
  - browse
  - inquire

## New files added

- `src/components/tools/LeaseVsBuyTool.jsx`
- `src/components/tools/CapRateTool.jsx`
- `src/components/tools/CamEstimatorTool.jsx`
- `src/components/tools/FootfallTool.jsx`
- `src/components/tools/SubmarketComparator.jsx`

## Updated files

- `src/data/siteData.js`
- `src/lib/siteData.js`
- `src/components/BlogCard.jsx`
- `src/pages/ToolsPage.jsx`
- `src/pages/BlogPage.jsx`
- `src/pages/BlogPostPage.jsx`
- `src/pages/ServicesPage.jsx`
- `src/pages/PropertyListPage.jsx`
- `src/pages/PropertyDetailPage.jsx`
- `src/styles/app.css`

## Validation

- Build completed successfully after Batch 5 changes.
- `package-lock.json` is not included.
