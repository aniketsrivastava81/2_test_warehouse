import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  const featured = BLOG_POSTS[0];
  const remainder = BLOG_POSTS.slice(1);
  const byRegion = remainder.reduce((acc, post) => {
    const key = post.region || "GTA";
    acc[key] = acc[key] || [];
    acc[key].push(post);
    return acc;
  }, {});

  return (
    <>
      <section className="page-hero slim-hero page-hero-premium">
        <div className="container page-hero-inner">
          <div className="eyebrow">GTA Insights</div>
          <h1>The commercial intelligence layer behind the KOLT experience.</h1>
          <p>Each guide is written to make the user think more clearly, compare more intelligently, and feel that KOLT holds the most useful frameworks in the GTA and Golden Horseshoe market.</p>
        </div>
      </section>

      <section className="section section-soft-borderless">
        <div className="container blog-feature-grid">
          <article className="insight-card insight-featured-card">
            <div className="insight-meta"><span>{featured.category}</span><span>{featured.readTime}</span><span>{featured.region}</span></div>
            <h2>{featured.title}</h2>
            <p>{featured.excerpt}</p>
            <div className="detail-point featured-takeaway">{featured.takeaway}</div>
            <div className="mt-4 flex flex-wrap gap-2">{featured.highlights?.map((item) => (<span key={item} className="rounded-full border border-black/10 bg-white px-3 py-2 text-sm text-black/76">{item}</span>))}</div>
            <Link to={`/guides/${featured.slug}`} className="button button-primary">Read the featured guide</Link>
          </article>
          <div className="blog-feature-aside">
            {remainder.slice(0, 2).map((post) => (
              <Link key={post.slug} to={`/guides/${post.slug}`} className="blog-mini-card"><strong>{post.title}</strong><p>{post.excerpt}</p><span>{post.region}</span></Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading-row"><div><div className="eyebrow">Regional guide library</div><h2>Not filler content - actual decision frameworks by region.</h2></div><p>The GTA Insights area now reads like a real regional intelligence layer instead of a placeholder blog shell.</p></div>
        <div className="container blog-region-groups">
          {Object.entries(byRegion).map(([region, posts]) => (
            <section key={region} className="blog-region-group">
              <div className="blog-region-group__head"><h3>{region}</h3><span>{posts.length} guide{posts.length > 1 ? 's' : ''}</span></div>
              <div className="insight-grid">{posts.map((post) => (<BlogCard key={post.slug} post={post} />))}</div>
            </section>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Continue the journey" title="Read, compare, then move back into the market with a better frame." body="The guides exist to sharpen decisions, then hand the user back to the tools and the active opportunities." primaryLabel="Open the Tools" primaryTo="/tools" secondaryLabel="See Listings" secondaryTo="/listings" />
    </>
  );
}
