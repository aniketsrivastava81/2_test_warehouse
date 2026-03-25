import React from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Guides</div>
            <h1 style={{ marginTop: "8px" }}>Neighbourhood guides and leasing strategy content</h1>
          </div>
          <p>
            Batch 1 turns the old stacked blog layout into a cleaner guides index with shareable
            individual routes.
          </p>
        </div>

        <div className="grid grid-2">
          {BLOG_POSTS.map((post) => (
            <article className="card soft" key={post.slug}>
              <div className="badges" style={{ marginBottom: "10px" }}>
                <span className="pill"><strong>{post.tag}</strong></span>
                <span className="pill">{post.date}</span>
              </div>
              <h2 style={{ margin: "0 0 10px 0" }}>{post.title}</h2>
              <p className="muted">{post.excerpt}</p>
              <div className="footer-actions" style={{ marginTop: "16px" }}>
                <Link className="btn btn-primary btn-sm" to={`/guides/${post.slug}`}>
                  Read guide
                </Link>
                <Link className="btn btn-ghost btn-sm" to="/listings">
                  Browse listings
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
