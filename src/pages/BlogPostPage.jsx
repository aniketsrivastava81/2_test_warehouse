import React, { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = useMemo(() => BLOG_POSTS.find((item) => item.slug === slug), [slug]);

  if (!post) {
    return <Navigate to="/guides" replace />;
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Guide</div>
            <h1 style={{ marginTop: "8px" }}>{post.title}</h1>
          </div>
          <p>{post.excerpt}</p>
        </div>

        <article className="card soft blog-post-shell">
          <div className="badges" style={{ marginBottom: "14px" }}>
            <span className="pill"><strong>{post.tag}</strong></span>
            <span className="pill">{post.date}</span>
          </div>
          <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
        </article>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Keep moving</div>
              <div>
                <strong>Read, compare, then browse listings.</strong> The new guide routes are here
                so content can become its own shareable layer of the site.
              </div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-secondary" to="/guides">Back to guides</Link>
              <Link className="btn btn-primary" to="/listings">Browse listings</Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
