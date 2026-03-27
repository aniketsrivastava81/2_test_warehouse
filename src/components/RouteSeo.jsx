import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import StructuredData from "./StructuredData";
import { SITE } from "../config/site";
import { BLOG_POSTS, LISTINGS, getListingBySlug, getPostBySlug } from "../data/siteData";

function absolute(path = "/") {
  const base = SITE.productionUrl.replace(/\/$/, "");
  return path === "/" ? base : `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function buildBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: absolute(item.path) })),
  };
}

function buildOrganizationSchema() {
  return { "@context": "https://schema.org", "@type": "Organization", name: SITE.brandName, url: SITE.productionUrl, logo: absolute(SITE.socialPreviewPath), description: SITE.defaultDescription };
}

function buildWebsiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: SITE.brandName, url: SITE.productionUrl, description: SITE.defaultDescription };
}

function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "RealEstateAgent"],
    name: SITE.brandName,
    url: SITE.productionUrl,
    image: absolute(SITE.socialPreviewPath),
    telephone: SITE.primaryPhone,
    email: SITE.inquiryEmail,
    address: { "@type": "PostalAddress", streetAddress: SITE.officeAddress, addressLocality: "Toronto", addressRegion: "ON", addressCountry: "CA" },
    areaServed: SITE.serviceAreas.map((area) => ({ "@type": "City", name: area })),
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer service", telephone: SITE.primaryPhone, email: SITE.inquiryEmail, areaServed: "Greater Toronto Area" }],
    description: `${SITE.defaultDescription} Coverage includes Peel, Halton, York, Toronto, and the broader Golden Horseshoe industrial market.`,
  };
}

function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    articleSection: post.region,
    author: { "@type": "Organization", name: SITE.brandName },
    publisher: { "@type": "Organization", name: SITE.brandName, logo: { "@type": "ImageObject", url: absolute(SITE.socialPreviewPath) } },
    mainEntityOfPage: absolute(`/guides/${post.slug}`),
  };
}

function buildPage(title, description, canonicalPath, keywords = [], extra = {}) {
  return { title, description, canonicalPath, keywords, structuredData: [[`${canonicalPath}-breadcrumbs`, buildBreadcrumbSchema([{ name: "Home", path: "/" }, ...(canonicalPath === "/" ? [] : [{ name: title, path: canonicalPath }])])]], ...extra };
}

export default function RouteSeo() {
  const location = useLocation();
  const page = useMemo(() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      return {
        title: "Toronto Industrial Real Estate Advisory | GTA Industrial Condo Conversions",
        description: `${SITE.defaultDescription} Built for Peel, Halton, York, Toronto, Mississauga, Brampton, Vaughan, and the broader Golden Horseshoe industrial market.`,
        canonicalPath: "/",
        keywords: ["Toronto industrial real estate", "GTA industrial condo conversions", "supply chain real estate", "E2 E3 zoning", "truck-level loading facilities", "warehouse advisory Toronto"],
        structuredData: [["organization", buildOrganizationSchema()], ["website", buildWebsiteSchema()], ["local-business", buildLocalBusinessSchema()], ["home-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }])]],
      };
    }

    if (pathname === "/services") return buildPage("Services", "Tenant, landlord, owner-user, investment, land, and portfolio advisory paths structured around NOI, leasing velocity, industrial condo conversions, and zoning discipline across the GTA.", "/services", ["commercial real estate services", "tenant representation GTA", "industrial condo conversions", "NOI optimization", "E2 E3 zoning strategy"]);
    if (pathname === "/listings") return buildPage("Listings", "Browse industrial, warehouse, office, retail, and land opportunities framed through scarcity, floor-plan access, corridor logic, and commercial usefulness across the GTA.", "/listings", ["GTA commercial listings", "industrial listings Toronto", "warehouse opportunities GTA", "truck-level loading facilities", "industrial condos GTA"]);
    if (pathname === "/tools") return buildPage("Tools", "Decision tools for occupancy cost, lease-vs-buy logic, submarket comparison, warehouse fit, and hidden commercial tradeoffs.", "/tools", ["commercial real estate tools", "occupancy cost calculator", "warehouse fit checklist", "supply chain real estate tools"]);
    if (pathname === "/guides") return buildPage("GTA Insights", "Commercial real estate guides that sharpen shortlists, market comparisons, and negotiation posture across the GTA and Golden Horseshoe.", "/guides", ["commercial real estate guides", "GTA market guide", "industrial shortlist framework"]);
    if (pathname === "/about") return buildPage("About KOLT Realty", "Learn how KOLT Realty positions itself as a consultancy-first GTA industrial and commercial real estate advisor with stronger local-market, zoning, and capital-stack fluency.", "/about", ["about KOLT Realty", "Toronto industrial real estate advisor", "Peel Halton York industrial"]);
    if (pathname === "/contact") return buildPage("Contact", "Contact KOLT Realty through the multi-step requirement brief, 2026 GTA Industrial Scarcity Report capture, sample inbox, sample WhatsApp routing, and direct phone details.", "/contact", ["contact KOLT Realty", "industrial scarcity report", "commercial real estate GTA"]);
    if (pathname === "/markets") return buildPage("Markets", "GTA and Golden Horseshoe markets explained through occupancy, corridor access, labour logic, customer reach, and real commercial usefulness.", "/markets", ["GTA markets", "Peel Halton York commercial markets", "industrial corridors GTA"]);
    if (pathname === "/asset-classes") return buildPage("Asset Classes", "Industrial, warehouse, office, retail, flex, and land asset classes explained through fit, value, and decision quality.", "/asset-classes", ["asset classes commercial real estate", "industrial office retail land"]);
    if (pathname === "/why-kolt") return buildPage("Why KOLT", "See why KOLT is designed to give users sharper checklists, stronger scarcity framing, and more institutional commercial confidence before outreach begins.", "/why-kolt", ["why KOLT Realty", "commercial real estate differentiation", "industrial condo conversions GTA"]);
    if (pathname === "/checklists") return buildPage("Checklists", "Practical decision checklists for industrial, office, retail, warehouse, owner-user, and development real estate moves across the GTA.", "/checklists", ["commercial real estate checklist", "industrial checklist GTA", "owner-user checklist"]);
    if (pathname === "/warehouse") return buildPage("Warehouse Demo", "Interactive warehouse review experience framed as a branded KOLT decision layer.", "/warehouse", ["warehouse demo", "industrial interactive showcase"], { forceNoindex: true });
    if (pathname === "/listing-type-2") return buildPage("Interactive Showcase", "Immersive industrial presentation route designed to deepen attention and move users back into the commercial journey.", "/listing-type-2", ["interactive industrial showcase", "commercial warehouse presentation"], { forceNoindex: true });

    if (pathname.startsWith("/guides/")) {
      const slug = pathname.replace("/guides/", "");
      const post = getPostBySlug(slug) || BLOG_POSTS[0];
      return { title: post.title, description: post.excerpt, canonicalPath: `/guides/${post.slug}`, keywords: [post.category, post.region, "commercial real estate guide", SITE.brandName], type: "article", structuredData: [["guide-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: post.title, path: `/guides/${post.slug}` }])], ["guide-article", buildArticleSchema(post)]] };
    }

    if (pathname.startsWith("/listings/")) {
      const slug = pathname.replace("/listings/", "");
      const listing = getListingBySlug(slug) || LISTINGS[0];
      return { title: `${listing.title} in ${listing.location}`, description: `${listing.teaser} ${listing.size} ${listing.category} opportunity in ${listing.location} with ${listing.loading} and ${listing.zoning}.`, canonicalPath: `/listings/${listing.slug}`, keywords: [listing.category, listing.location, listing.status, "commercial listing GTA", "truck-level loading", "industrial real estate Toronto"], structuredData: [["listing-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Listings", path: "/listings" }, { name: listing.title, path: `/listings/${listing.slug}` }])], ["listing-offer", { "@context": "https://schema.org", "@type": "Offer", name: listing.title, category: listing.category, description: listing.teaser, availability: "https://schema.org/InStock", url: absolute(`/listings/${listing.slug}`) }]] };
    }

    return { title: SITE.brandName, description: SITE.defaultDescription, canonicalPath: pathname, keywords: [SITE.brandName], structuredData: [["organization", buildOrganizationSchema()]] };
  }, [location.pathname]);

  return (
    <>
      <SEO title={page.title} description={page.description} pathname={page.canonicalPath} canonicalPath={page.canonicalPath} type={page.type} forceNoindex={page.forceNoindex} keywords={page.keywords} />
      {page.structuredData.map(([id, data]) => (<StructuredData key={id} id={id} data={data} />))}
    </>
  );
}
