import React from "react";
import BlogCard from "../components/BlogCard";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Guides</div>
          <h1>Market intelligence designed to make the user feel ahead of the market.</h1>
          <p>
            Every guide is written to reduce noise, sharpen judgment, and reinforce KOLT as the place where the useful framework lives.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container insight-grid">
          {BLOG_POSTS.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Continue the journey"
        title="The guide should naturally lead users into tools, listings, and stronger decisions."
        body="This keeps the content commercially useful instead of turning it into generic blog filler."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="See the Listings"
        secondaryTo="/listings"
      />
    </>
  );
}
