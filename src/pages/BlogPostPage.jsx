import React from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug) || BLOG_POSTS[0];

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

        <div className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Keep moving</div>
              <div><strong>Turn the insight into action.</strong> Compare listings, run a tool, or start the conversation.</div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/listings">Browse listings</Link>
              <Link className="btn btn-secondary" to="/contact">Book consult</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
