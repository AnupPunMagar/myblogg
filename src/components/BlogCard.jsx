import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogCard({ post, featured = false }) {
  return (
    <article className={`blog-card ${featured ? "blog-card--featured" : ""}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card__image-wrap">
        <img src={post.image} alt={post.title} loading="lazy" />
      </Link>
      <div className="blog-card__body">
        <span className="tag">{post.category}</span>
        <h3 className="blog-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__desc">{post.description}</p>
        <div className="blog-card__meta">
          <span className="blog-card__date">{formatDate(post.date)}</span>
          <Link to={`/blog/${post.slug}`} className="blog-card__more">
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}

export { formatDate };
