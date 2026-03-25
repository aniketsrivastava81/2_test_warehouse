import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="card soft blog-card">
      <div className="badges" style={{ marginBottom: "10px" }}>
        <span className="pill"><strong>{post.tag}</strong></span>
        <span className="pill">{post.date}</span>
      </div>
      <h3>{post.title}</h3>
      <p className="muted">{post.excerpt}</p>
      <Link className="btn btn-secondary btn-sm" to={`/guides/${post.slug}`}>
        Read guide
      </Link>
    </article>
  );
}
