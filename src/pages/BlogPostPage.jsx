import React from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug) || BLOG_POSTS[0];

  return (
    <>
      <section className="page-hero slim-hero article-hero page-hero-premium">
        <div className="container page-hero-inner article-width article-shell-premium">
          <div className="eyebrow">{post.category} - {post.region}</div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-meta">{post.readTime} - {post.date}</div>
          <div className="detail-point featured-takeaway article-takeaway">{post.takeaway}</div>
        </div>
      </section>

      <section className="section">
        <div className="container detail-grid article-layout-grid">
          <div className="detail-main-card detail-main-card-premium article-body">
            {post.sections ? post.sections.map((section) => (
              <div key={section.heading} className="article-section-block"><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => (<p key={paragraph}>{paragraph}</p>))}</div>
            )) : post.body.map((paragraph, index) => (<p key={index}>{paragraph}</p>))}
            <div className="article-actions"><Link to="/tools" className="button button-primary">Apply this with the tools</Link><Link to="/listings" className="button button-secondary">Review active listings</Link></div>
          </div>

          <aside className="detail-side-card detail-side-card-premium">
            <div className="eyebrow">Checklist</div>
            <h3>Use the guide properly</h3>
            <div className="principle-list">{post.checklist.map((item) => (<div key={item} className="detail-point">{item}</div>))}</div>
            {post.highlights ? <div className="mt-5"><div className="eyebrow">Highlights</div><div className="mt-3 flex flex-wrap gap-2">{post.highlights.map((item) => (<span key={item} className="rounded-full border border-black/10 bg-[#faf7f4] px-3 py-2 text-sm text-black/76">{item}</span>))}</div></div> : null}
          </aside>
        </div>
      </section>

      <CTASection eyebrow="Next step" title="Good content should change the next move, not just fill the page." body="Take the framework into the tools, then test it against the live opportunity set." primaryLabel="Back to Guides" primaryTo="/guides" secondaryLabel="Review Markets" secondaryTo="/markets" />
    </>
  );
}
