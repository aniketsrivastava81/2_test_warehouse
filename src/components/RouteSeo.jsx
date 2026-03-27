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
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absolute(item.path),
    })),
  };
}

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.brandName,
    url: SITE.productionUrl,
    logo: absolute(SITE.socialPreviewPath),
    description: SITE.defaultDescription,
  };
}

function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brandName,
    url: SITE.productionUrl,
    description: SITE.defaultDescription,
  };
}

function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Organization",
      name: SITE.brandName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.brandName,
      logo: {
        "@type": "ImageObject",
        url: absolute(SITE.socialPreviewPath),
      },
    },
    mainEntityOfPage: absolute(`/guides/${post.slug}`),
  };
}

function buildPage(title, description, canonicalPath, keywords = [], extra = {}) {
  return {
    title,
    description,
    canonicalPath,
    keywords,
    structuredData: [
      [
        `${canonicalPath}-breadcrumbs`,
        buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          ...(canonicalPath === "/" ? [] : [{ name: title, path: canonicalPath }]),
        ]),
      ],
    ],
    ...extra,
  };
}

export default function RouteSeo() {
  const location = useLocation();

  const page = useMemo(() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      return {
        title: "GTA Commercial Real Estate Advisory",
        description: SITE.defaultDescription,
        canonicalPath: "/",
        keywords: ["KOLT Realty", "GTA commercial real estate", "industrial space GTA", "warehouse advisory Toronto"],
        structuredData: [
          ["organization", buildOrganizationSchema()],
          ["website", buildWebsiteSchema()],
          ["home-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }])],
        ],
      };
    }

    if (pathname === "/services") return buildPage("Services", "Tenant, landlord, owner-user, investment, land, and portfolio advisory paths structured to reduce decision risk across the GTA.", "/services", ["commercial real estate services", "tenant representation GTA", "owner-user acquisition Toronto"]);
    if (pathname === "/listings") return buildPage("Listings", "Browse industrial, warehouse, office, retail, and land opportunities framed through fit, corridor logic, and commercial usefulness.", "/listings", ["GTA commercial listings", "industrial listings Toronto", "warehouse opportunities GTA"]);
    if (pathname === "/tools") return buildPage("Tools", "Decision tools for occupancy cost, lease-vs-buy logic, submarket comparison, warehouse fit, and hidden commercial tradeoffs.", "/tools", ["commercial real estate tools", "occupancy cost calculator", "warehouse fit checklist"]);
    if (pathname === "/guides") return buildPage("Guides", "Commercial real estate guides that sharpen shortlists, market comparisons, and negotiation posture across the GTA.", "/guides", ["commercial real estate guides", "GTA market guide", "industrial shortlist framework"]);
    if (pathname === "/about") return buildPage("About KOLT Realty", "Learn how KOLT Realty is positioned to organize commercial decisions through sharper filters, useful frameworks, and a stronger user journey.", "/about", ["about KOLT Realty", "commercial real estate platform GTA"]);
    if (pathname === "/contact") return buildPage("Contact", "Contact KOLT Realty through the multi-step requirement brief, public office email, and direct phone details for GTA commercial real estate inquiries.", "/contact", ["contact KOLT Realty", "commercial real estate GTA"]);
    if (pathname === "/markets") return buildPage("Markets", "GTA markets explained through occupancy, corridor access, labour logic, customer reach, and real commercial usefulness.", "/markets", ["GTA markets", "Toronto commercial markets", "industrial corridors GTA"]);
    if (pathname === "/asset-classes") return buildPage("Asset Classes", "Industrial, warehouse, office, retail, flex, and land asset classes explained through fit, value, and decision quality.", "/asset-classes", ["asset classes commercial real estate", "industrial office retail land"]);
    if (pathname === "/why-kolt") return buildPage("Why KOLT", "See why KOLT is designed to give users sharper checklists, better comparisons, and stronger commercial confidence before outreach begins.", "/why-kolt", ["why KOLT Realty", "commercial real estate differentiation"]);
    if (pathname === "/checklists") return buildPage("Checklists", "Practical decision checklists for industrial, office, retail, warehouse, owner-user, and development real estate moves across the GTA.", "/checklists", ["commercial real estate checklist", "industrial checklist GTA", "owner-user checklist"]);
    if (pathname === "/warehouse") return buildPage("Warehouse Demo", "Interactive warehouse review experience framed as a branded KOLT decision layer.", "/warehouse", ["warehouse demo", "industrial interactive showcase"], { forceNoindex: true });
    if (pathname === "/listing-type-2") return buildPage("Interactive Showcase", "Immersive industrial presentation route designed to deepen attention and move users back into the commercial journey.", "/listing-type-2", ["interactive industrial showcase", "commercial warehouse presentation"], { forceNoindex: true });

    if (pathname.startsWith("/guides/")) {
      const slug = pathname.replace("/guides/", "");
      const post = getPostBySlug(slug) || BLOG_POSTS[0];
      return {
        title: post.title,
        description: post.excerpt,
        canonicalPath: `/guides/${post.slug}`,
        keywords: [post.category, "commercial real estate guide", SITE.brandName],
        type: "article",
        structuredData: [
          ["guide-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: post.title, path: `/guides/${post.slug}` }])],
          ["guide-article", buildArticleSchema(post)],
        ],
      };
    }

    if (pathname.startsWith("/listings/")) {
      const slug = pathname.replace("/listings/", "");
      const listing = getListingBySlug(slug) || LISTINGS[0];
      return {
        title: `${listing.title} in ${listing.location}`,
        description: `${listing.teaser} ${listing.size} ${listing.category} opportunity in ${listing.location}.`,
        canonicalPath: `/listings/${listing.slug}`,
        keywords: [listing.category, listing.location, listing.status, "commercial listing GTA"],
        structuredData: [
          ["listing-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Listings", path: "/listings" }, { name: listing.title, path: `/listings/${listing.slug}` }])],
          [
            "listing-offer",
            {
              "@context": "https://schema.org",
              "@type": "Offer",
              name: listing.title,
              category: listing.category,
              description: listing.teaser,
              availability: "https://schema.org/InStock",
              url: absolute(`/listings/${listing.slug}`),
            },
          ],
        ],
      };
    }

    return {
      title: SITE.brandName,
      description: SITE.defaultDescription,
      canonicalPath: pathname,
      keywords: [SITE.brandName],
      structuredData: [["organization", buildOrganizationSchema()]],
    };
  }, [location.pathname]);

  return (
    <>
      <SEO
        title={page.title}
        description={page.description}
        pathname={page.canonicalPath}
        canonicalPath={page.canonicalPath}
        type={page.type}
        forceNoindex={page.forceNoindex}
        keywords={page.keywords}
      />
      {page.structuredData.map(([id, data]) => (
        <StructuredData key={id} id={id} data={data} />
      ))}
    </>
  );
}
