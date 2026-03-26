import React from "react";
import { Link, useParams } from "react-router-dom";
import CTASection from "../components/CTASection";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug) || BLOG_POSTS[0];

  return (
    <>
      <section className="page-hero slim-hero article-hero">
        <div className="container page-hero-inner article-width">
          <div className="eyebrow">{post.category}</div>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <div className="article-meta">{post.readTime}</div>
        </div>
      </section>

      <section className="section">
        <div className="container article-width article-body">
          {post.body.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="article-actions">
            <Link to="/tools" className="button button-primary">Apply this with the tools</Link>
            <Link to="/listings" className="button button-secondary">Return to opportunities</Link>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="The guide gives the answer. The rest of the site helps the user use it."
        body="That transition is what turns content into conversion infrastructure."
        primaryLabel="Back to Guides"
        primaryTo="/guides"
        secondaryLabel="Review Markets"
        secondaryTo="/markets"
      />
    </>
  );
}
