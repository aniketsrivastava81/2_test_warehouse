import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`card soft blog-card ${featured ? "blog-card-featured" : ""}`}>
      <div className="badges" style={{ marginBottom: "10px" }}>
        <span className="pill"><strong>{post.tag}</strong></span>
        <span className="pill">{post.date}</span>
        {post.readTime ? <span className="pill">{post.readTime}</span> : null}
      </div>
      <h3>{post.title}</h3>
      <p className="muted">{post.excerpt}</p>
      <Link className="btn btn-secondary btn-sm" to={`/guides/${post.slug}`}>
        Read guide
      </Link>
    </article>
  );
}
