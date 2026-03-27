# Batch 1 changelog

This project folder includes the Batch 1 implementation plus the small prerequisite cleanup needed to make Batch 1 safe to build on.

## No separate pre-step required
There was no extra manual step you needed to do before Batch 1. I handled the prerequisite cleanup inside the project itself:
- identified the live React app entry path
- documented live vs legacy files in `README.md`
- added a central site config in `src/config/site.js`
- cleaned up the route map and added temporary legacy redirects
- added missing core routes/pages for Services, About, Contact, and individual Guides
- rebuilt the shared header and footer
- added a mobile sticky CTA
- kept the warehouse route secondary instead of primary navigation
- preserved the current demo/localStorage behavior so the site still works without backend setup

## Important note
This is **Batch 1 only**. Later batches still need to improve:
- homepage positioning and section structure
- listings data model and detail-page depth
- tools page refactor
- SEO component, structured data, robots, sitemap, and Vercel preview noindex logic
- image/font cleanup, analytics, and final QA

## Build check
A production build was run successfully after these changes.
