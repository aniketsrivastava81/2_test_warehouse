import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";

function upsertMeta(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    element.setAttribute(key, value);
  });

  return element;
}

function upsertLink(selector, attributes) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    element.setAttribute(key, value);
  });

  return element;
}

function normalizeBase(url) {
  return url.replace(/\/$/, "");
}

function normalizePath(pathname = "/") {
  if (!pathname) return "/";
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function buildAbsoluteUrl(base, pathname) {
  const normalizedBase = normalizeBase(base);
  const normalizedPath = normalizePath(pathname);
  return normalizedPath === "/" ? normalizedBase : `${normalizedBase}${normalizedPath}`;
}

function resolveTitle(title) {
  return title ? `${title} | ${SITE.brandName}` : `${SITE.brandName} | ${SITE.titleSuffix}`;
}

function getPreviewState() {
  const productionHost = new URL(SITE.productionUrl).hostname.replace(/^www\./, "");

  if (typeof window === "undefined") {
    return {
      isPreview: false,
      hostname: productionHost,
    };
  }

  const hostname = window.location.hostname.replace(/^www\./, "");
  const isLocal = hostname === "localhost" || hostname === "127.0.0.1";
  const isPreview = isLocal || hostname.endsWith(".vercel.app") || hostname !== productionHost;

  return { isPreview, hostname };
}

export default function SEO({
  title,
  description,
  pathname,
  image,
  type = "website",
  canonicalPath,
  forceNoindex = false,
  keywords,
}) {
  const location = useLocation();

  useEffect(() => {
    const currentPath = canonicalPath || pathname || location.pathname || "/";
    const canonicalUrl = buildAbsoluteUrl(SITE.productionUrl, currentPath);
    const socialImage = image ? buildAbsoluteUrl(SITE.productionUrl, image) : buildAbsoluteUrl(SITE.productionUrl, SITE.socialPreviewPath);
    const pageTitle = resolveTitle(title);
    const pageDescription = description || SITE.defaultDescription;
    const { isPreview } = getPreviewState();
    const robotsValue = forceNoindex || isPreview ? "noindex,nofollow" : "index,follow";

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', {
      name: "description",
      content: pageDescription,
    });

    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: robotsValue,
    });

    upsertMeta('meta[name="googlebot"]', {
      name: "googlebot",
      content: robotsValue,
    });

    const keywordsTag = document.head.querySelector('meta[name="keywords"]');
    if (keywords?.length) {
      upsertMeta('meta[name="keywords"]', {
        name: "keywords",
        content: keywords.join(", "),
      });
    } else if (keywordsTag) {
      keywordsTag.remove();
    }

    upsertMeta('meta[property="og:title"]', {
      property: "og:title",
      content: pageTitle,
    });

    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: pageDescription,
    });

    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });

    upsertMeta('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });

    upsertMeta('meta[property="og:image"]', {
      property: "og:image",
      content: socialImage,
    });

    upsertMeta('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE.brandName,
    });

    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });

    upsertMeta('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: pageTitle,
    });

    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: pageDescription,
    });

    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: socialImage,
    });

    upsertLink('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });
  }, [canonicalPath, description, forceNoindex, image, keywords, location.pathname, pathname, title, type]);

  return null;
}

export function buildCanonicalPath(pathname) {
  return normalizePath(pathname);
}
