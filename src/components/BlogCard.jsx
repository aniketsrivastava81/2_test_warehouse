import React from "react";
import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <article className="insight-card insight-card-premium">
      <div className="insight-meta">
        <span>{post.category}</span>
        <span>{post.readTime}</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="detail-point chip-point insight-takeaway">{post.takeaway}</div>
      <Link to={`/guides/${post.slug}`} className="text-link">Read guide</Link>
    </article>
  );
}
