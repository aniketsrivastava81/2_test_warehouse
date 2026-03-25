import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";
import StructuredData from "./StructuredData";
import { SITE } from "../config/site";
import { BLOG_POSTS, LISTINGS, getListingBySlug, getPostBySlug } from "../data/siteData";

function absolute(path = "/") {
  const base = SITE.productionUrl.replace(/\/$/, "");
  if (path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
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
    email: SITE.primaryEmail,
    telephone: SITE.primaryPhone,
    logo: absolute(SITE.socialPreviewPath),
    sameAs: SITE.socialProfiles,
  };
}

function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.brandName,
    url: SITE.productionUrl,
    description: SITE.defaultDescription,
  };
}

function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `${SITE.brandName} — ${SITE.role}`,
    image: absolute(SITE.socialPreviewPath),
    url: SITE.productionUrl,
    email: SITE.primaryEmail,
    telephone: SITE.primaryPhone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.officeAddress,
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    areaServed: SITE.serviceAreas,
    parentOrganization: {
      "@type": "Organization",
      name: SITE.brokerage,
    },
  };
}

function buildArticleSchema(post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Person",
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

function listingFromLegacyId(id) {
  return LISTINGS.find((item) => item.id === id) || LISTINGS[0];
}

export default function RouteSeo() {
  const location = useLocation();

  const page = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const pathname = location.pathname;

    if (pathname === "/") {
      return {
        title: "GTA Commercial Real Estate Advisory",
        description:
          "Commercial real-estate advisory across the GTA for industrial condos, warehouses, office, retail, and development land with a shortlist-first approach.",
        keywords: ["GTA commercial real estate", "industrial condos Toronto", "warehouse space GTA", "Megha Mehta"],
        type: "website",
        canonicalPath: "/",
        structuredData: [
          ["organization", buildOrganizationSchema()],
          ["website", buildWebSiteSchema()],
          ["local-business", buildLocalBusinessSchema()],
          ["breadcrumbs-home", buildBreadcrumbSchema([{ name: "Home", path: "/" }])],
        ],
      };
    }

    if (pathname === "/services") {
      return {
        title: "Services",
        description:
          "Tenant representation, lease renewal strategy, owner-user acquisition support, industrial and warehouse search, retail plaza advisory, and development support across the GTA.",
        keywords: ["tenant representation GTA", "lease renewal strategy Toronto", "industrial search GTA"],
        canonicalPath: "/services",
        structuredData: [
          ["services-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])],
          ["services-local-business", buildLocalBusinessSchema()],
        ],
      };
    }

    if (pathname === "/about") {
      return {
        title: "About Megha Mehta",
        description:
          "Learn more about Megha Mehta's finance-aware commercial real-estate approach, GTA market coverage, and client process across leasing, ownership, and investment decisions.",
        keywords: ["about Megha Mehta", "GTA commercial realtor", "commercial real estate Toronto advisor"],
        canonicalPath: "/about",
        structuredData: [
          ["about-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])],
          ["about-organization", buildOrganizationSchema()],
        ],
      };
    }

    if (pathname === "/contact") {
      return {
        title: "Contact Megha Mehta",
        description:
          "Book a consultation, request a shortlist, or ask about commercial listings across Toronto, Vaughan, Mississauga, Brampton, Markham, and North York.",
        keywords: ["contact commercial realtor GTA", "book commercial real estate consultation", "Megha Mehta contact"],
        canonicalPath: "/contact",
        structuredData: [
          ["contact-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])],
          ["contact-local-business", buildLocalBusinessSchema()],
        ],
      };
    }

    if (pathname === "/tools") {
      return {
        title: "Commercial Real Estate Tools",
        description:
          "Use commercial tools for lease-vs-buy, cap rate, CAM budgeting, footfall scoring, and GTA submarket comparison before you shortlist spaces.",
        keywords: ["lease vs buy commercial space", "cap rate calculator GTA", "commercial real estate tools"],
        canonicalPath: "/tools",
        structuredData: [
          ["tools-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Tools", path: "/tools" }])],
          ["tools-website", buildWebSiteSchema()],
        ],
      };
    }

    if (pathname === "/guides") {
      return {
        title: "Commercial Real Estate Guides",
        description:
          "Commercial real-estate guides for lease renewals, owner-user buying, warehouse shortlists, and retail plaza fit checks across the GTA.",
        keywords: ["commercial real estate guides", "warehouse leasing guide", "owner-user buying Toronto"],
        canonicalPath: "/guides",
        structuredData: [
          ["guides-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])],
          ["guides-website", buildWebSiteSchema()],
        ],
      };
    }

    if (pathname.startsWith("/guides/")) {
      const slug = pathname.replace("/guides/", "");
      const post = getPostBySlug(slug) || BLOG_POSTS[0];
      return {
        title: post.title,
        description: post.excerpt,
        keywords: [post.tag, "commercial real estate guide", SITE.brandName],
        type: "article",
        canonicalPath: `/guides/${post.slug}`,
        structuredData: [
          ["guide-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }, { name: post.title, path: `/guides/${post.slug}` }])],
          ["guide-article", buildArticleSchema(post)],
        ],
      };
    }

    if (pathname === "/listings") {
      return {
        title: "Commercial Listings",
        description:
          "Browse industrial, office, retail, and development opportunities across the GTA with filters for city, asset class, availability, and size.",
        keywords: ["commercial listings GTA", "industrial condo listings", "warehouse for lease GTA"],
        canonicalPath: "/listings",
        structuredData: [
          ["listings-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Listings", path: "/listings" }])],
          ["listings-local-business", buildLocalBusinessSchema()],
        ],
      };
    }

    if (pathname.startsWith("/listings/") || pathname === "/property-details") {
      const slug = pathname.startsWith("/listings/") ? pathname.replace("/listings/", "") : null;
      const listing = slug ? getListingBySlug(slug) || LISTINGS[0] : listingFromLegacyId(params.get("id"));
      return {
        title: `${listing.title} | ${listing.city}`,
        description: `${listing.heroSummary} ${listing.assetClass} in ${listing.city} with ${listing.sqft.toLocaleString()} SF and ${listing.leaseSale.toLowerCase()} status.`,
        keywords: [listing.assetClass, listing.city, listing.leaseSale, "commercial listing GTA"],
        canonicalPath: `/listings/${listing.slug}`,
        structuredData: [
          ["listing-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Listings", path: "/listings" }, { name: listing.title, path: `/listings/${listing.slug}` }])],
          [
            "listing-local-business",
            {
              "@context": "https://schema.org",
              "@type": "Offer",
              name: listing.title,
              category: listing.assetClass,
              availability: listing.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
              description: listing.heroSummary,
              url: absolute(`/listings/${listing.slug}`),
            },
          ],
        ],
      };
    }

    if (pathname === "/warehouse") {
      return {
        title: "Warehouse Walkthrough",
        description:
          "Explore the warehouse walkthrough and pallet-stack demo as a secondary showcase inside the commercial real-estate site.",
        canonicalPath: "/warehouse",
        forceNoindex: true,
        structuredData: [
          ["warehouse-breadcrumbs", buildBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Warehouse Walkthrough", path: "/warehouse" }])],
        ],
      };
    }

    return {
      title: SITE.brandName,
      description: SITE.defaultDescription,
      canonicalPath: pathname,
      structuredData: [],
    };
  }, [location.pathname, location.search]);

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
