import React from "react";
import { Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  const [featuredPost, ...otherPosts] = BLOG_POSTS;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <div className="kicker">Guides</div>
            <h1 style={{ marginTop: "8px" }}>Commercial real-estate guides built to help you compare locations, structure the search, and make cleaner decisions.</h1>
          </div>
          <p>
            Read the guide, run the tool, then move into listings with a better shortlist. The goal here is to make every next step easier,
            not noisier.
          </p>
        </div>

        <section className="card glow blog-feature-shell">
          <div className="section-header" style={{ marginBottom: "12px" }}>
            <div>
              <div className="kicker">Featured guide</div>
              <h2 style={{ marginTop: "8px" }}>{featuredPost.title}</h2>
            </div>
            <p>{featuredPost.excerpt}</p>
          </div>

          <div className="grid grid-2" style={{ alignItems: "start" }}>
            <BlogCard post={featuredPost} featured />
            <div className="card soft compact-card">
              <div className="kicker">Use the guide with the rest of the site</div>
              <h3 style={{ marginTop: "8px" }}>Read → compare → browse → inquire</h3>
              <div className="table-like" style={{ marginTop: "12px" }}>
                <div className="row"><b>Read a guide</b><span>Clarify what matters before you start touring.</span></div>
                <div className="row"><b>Use a tool</b><span>Compare cost, access, or submarket fit side by side.</span></div>
                <div className="row"><b>Browse listings</b><span>Focus only on options that still make sense after that comparison.</span></div>
                <div className="row"><b>Contact Megha</b><span>Move into a shortlist and next-step conversation.</span></div>
              </div>
              <div className="footer-actions" style={{ marginTop: "14px" }}>
                <Link className="btn btn-primary btn-sm" to="/tools">Open tools</Link>
                <Link className="btn btn-secondary btn-sm" to="/listings">Browse listings</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">All guides</div>
              <h2>Choose the guide that matches the decision you are making right now.</h2>
            </div>
            <p>Neighbourhood fit, lease strategy, owner-user buying, retail selection, and warehouse shortlisting all need different questions.</p>
          </div>

          <div className="grid grid-3">
            {otherPosts.map((post) => <BlogCard key={post.slug} post={post} />)}
          </div>
        </section>

        <section className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Next step</div>
              <div><strong>Use the guides to get clear, then move into the real shortlist.</strong></div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/listings">Browse listings</Link>
              <Link className="btn btn-secondary" to="/contact">Talk to Megha</Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
