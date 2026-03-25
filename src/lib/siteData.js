// Deprecated secondary path.
// Keep this file as a thin re-export so src/data/siteData.js remains the single live source of truth.
export {
  LISTINGS,
  BLOG_POSTS,
  TOOL_SECTIONS,
  SUBMARKET_SNAPSHOTS,
  getListingBySlug,
  getRelatedListings,
  getPostBySlug,
} from "../data/siteData";
