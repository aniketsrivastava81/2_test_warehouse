# KOLT Realty Comprehensive Remake Checklist

Merged from the two uploaded checklist blocks and mapped to the actual React/Vite codebase.

## 1) Core blockers

### Tools page
- [x] Gate controls rendering, not just visibility
- [x] Tool DOM is hidden before acknowledgement
- [x] Unlock mounts the tools and scrolls into view
- [x] Hash anchor support works after unlock
- [x] Locked state shows a designed placeholder instead of blank space
- [x] Quick-jump map expanded to all tool sections
- [x] Compare CTA added in hero rail
- [x] Market Pulse badge added

**Files edited**
- `src/pages/ToolsPage.jsx`
- `src/components/tools/ToolsAccessGate.jsx`

### Listings page
- [x] Featured listing section added above the fold
- [x] Cards rebuilt with full image treatment and gradient overlay
- [x] Cards now show sqft, clear height, zoning, and loading
- [x] Status/tag chips added (Featured / New / Off-market / etc.)
- [x] Hover lift and image zoom strengthened
- [x] Private Vault authority block added
- [x] Filtering preserved

**Files edited**
- `src/pages/PropertyListPage.jsx`
- `src/components/ListingCard.jsx`
- `src/data/siteData.js`

### Property detail page
- [x] Full gallery hero with thumbnail switching
- [x] Sticky right rail with CTA stack
- [x] Key metrics strip added
- [x] Description cleaned into readable sections
- [x] Financial snapshot added
- [x] Embedded map added
- [x] Download brochure CTA added
- [x] Print one-sheet CTA added
- [x] Request analysis CTA added
- [x] Related opportunities section added

**Files edited**
- `src/pages/PropertyDetailPage.jsx`
- `src/data/siteData.js`

## 2) Visual system refinement
- [x] Spacing pushed toward a more premium editorial rhythm on remade pages
- [x] Stronger hero typography used on homepage, listings, markets, asset classes, and property detail
- [x] KOLT red used as accent rather than flood color
- [x] Harsher boxy layouts replaced with mixed image/text storytelling blocks
- [x] Layered cards and proof strips added across key pages

**Files edited**
- `src/pages/HomePage.jsx`
- `src/pages/PropertyListPage.jsx`
- `src/pages/PropertyDetailPage.jsx`
- `src/pages/MarketsPage.jsx`
- `src/pages/AssetClassesPage.jsx`

## 3) Homepage flow
- [x] Hero rebuilt with active-status signal
- [x] Trust strip added
- [x] Featured listing preview added
- [x] Services preview added
- [x] Tools teaser added
- [x] Market snapshot added
- [x] Process steps added
- [x] Private Vault / off-market teaser added
- [x] Testimonial / proof layer added
- [x] CTA flow preserved

**Files edited**
- `src/pages/HomePage.jsx`
- `src/data/siteData.js`

## 4) Markets page
- [x] Region cards rebuilt with images
- [x] 2–3 market insights added per region
- [x] Typical use cases added per region
- [x] CTA links added back into listings and tools

**Files edited**
- `src/pages/MarketsPage.jsx`

## 5) Asset classes page
- [x] Each asset class now has description, use case, and KOLT approach
- [x] Cards rebuilt with image-led storytelling
- [x] CTA routing added back into listings and guides

**Files edited**
- `src/pages/AssetClassesPage.jsx`

## 6) Data/content enrichment
- [x] Listing dataset expanded with address, zoning, loading, clear height, gallery, financial snapshot, and map query
- [x] Existing copy preserved in spirit but upgraded for a more institutional CRE tone
- [x] “Market Pulse · March 2026” signal introduced
- [x] Micro-copy made more advisory and less generic

**Files edited**
- `src/data/siteData.js`

## 7) Still not fully implemented in this pass
- [ ] In-iframe KOLT wall/pallet branding inside the warehouse scene itself
- [ ] Live WhatsApp / direct dial with approved real contact info
- [ ] True PDF brochure generation per listing
- [ ] Live market data / vacancy-rate map integration
- [ ] Video testimonials
- [ ] AI zoning chat assistant

## 8) Verification path
- [ ] Install dependencies
- [ ] Run production build
- [ ] Fix any compile/runtime errors
- [ ] Package final folder and zip
