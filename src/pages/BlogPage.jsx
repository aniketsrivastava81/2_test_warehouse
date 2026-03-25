import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Guides</div>
            <h1 style={{ marginTop: "8px" }}>Neighbourhood guides, lease strategy, and commercial decision support.</h1>
          </div>
          <p>Instead of dumping full articles on one page, this guide index makes the site feel closer to a real authority platform.</p>
        </div>

        <div className="grid grid-3">
          {BLOG_POSTS.map((post) => <BlogCard key={post.slug} post={post} />)}
        </div>

        <div className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next step</div>
              <div><strong>Use the guides to build confidence, then move into listings or tools.</strong></div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/listings">Browse listings</Link>
              <Link className="btn btn-secondary" to="/tools">Open tools</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
