import React from "react";
import { Link, useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import ListingCard from "../components/ListingCard";
import { BLOG_POSTS, getPostBySlug, getRelatedListings } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = getPostBySlug(slug) || BLOG_POSTS[0];
  const relatedPosts = BLOG_POSTS.filter((item) => item.slug !== post.slug).slice(0, 3);
  const relatedListings = getRelatedListings(post.relatedListings || []).slice(0, 2);

  return (
    <section className="section">
      <div className="container">
        <div className="blog-breadcrumbs">
          <Link to="/">Home</Link>
          <span>•</span>
          <Link to="/guides">Guides</Link>
          <span>•</span>
          <span>{post.title}</span>
        </div>

        <div className="section-header">
          <div>
            <div className="kicker">Guide</div>
            <h1 style={{ marginTop: "8px" }}>{post.title}</h1>
          </div>
          <p>{post.excerpt}</p>
        </div>

        <div className="grid grid-2 blog-post-layout" style={{ alignItems: "start" }}>
          <article className="card soft blog-post-shell">
            <div className="badges" style={{ marginBottom: "14px" }}>
              <span className="pill"><strong>{post.tag}</strong></span>
              <span className="pill">{post.date}</span>
              {post.readTime ? <span className="pill">{post.readTime}</span> : null}
            </div>
            <div className="blog-body" dangerouslySetInnerHTML={{ __html: post.contentHtml }}></div>
          </article>

          <aside className="blog-side-rail">
            <div className="card glow compact-card">
              <div className="kicker">Apply the guide</div>
              <h3 style={{ marginTop: "8px" }}>Turn the insight into a cleaner next step.</h3>
              <div className="footer-actions" style={{ marginTop: "12px" }}>
                <Link className="btn btn-primary btn-sm" to="/tools">Open tools</Link>
                <Link className="btn btn-secondary btn-sm" to="/listings">Browse listings</Link>
              </div>
            </div>

            {relatedListings.length ? (
              <div className="card soft" style={{ marginTop: "18px" }}>
                <div className="kicker">Related listings</div>
                <h3 style={{ marginTop: "8px" }}>Spaces worth comparing after this guide</h3>
                <div className="grid" style={{ marginTop: "14px" }}>
                  {relatedListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
                </div>
              </div>
            ) : null}
          </aside>
        </div>

        <section className="section tight">
          <div className="section-header">
            <div>
              <div className="kicker">Keep reading</div>
              <h2>More guides that support the same decision path.</h2>
            </div>
            <p>Use a second guide when you need a stronger comparison before you shortlist properties or start negotiating.</p>
          </div>
          <div className="grid grid-3">
            {relatedPosts.map((item) => <BlogCard key={item.slug} post={item} />)}
          </div>
        </section>

        <div className="section tight">
          <div className="inline-callout">
            <div>
              <div className="kicker">Ready to act?</div>
              <div><strong>Take the guide and move it into a real shortlist, cost comparison, or next conversation.</strong></div>
            </div>
            <div className="footer-actions">
              <Link className="btn btn-primary" to="/contact">Contact Megha</Link>
              <Link className="btn btn-secondary" to="/guides">Back to guides</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
