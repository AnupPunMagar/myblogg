import React, { useMemo, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BlogCard, { formatDate } from "../components/BlogCard";
import GoogleAd from "../components/GoogleAd";
import "./BlogPost.css";

export default function BlogPost({ posts }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const published = useMemo(() => posts.filter((p) => p.published), [posts]);

  const index = published.findIndex((p) => p.slug === slug);
  const post = published[index];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!post) {
    return (
      <div className="container blog-post-missing">
        <h2>Post not found</h2>
        <p>This post may have been unpublished or removed.</p>
        <Link to="/" className="btn">Back to Home</Link>
      </div>
    );
  }

  const prevPost = index > 0 ? published[index - 1] : null;
  const nextPost = index < published.length - 1 ? published[index + 1] : null;

  const related = published
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <article className="blog-post container">
      <div className="blog-post__header">
        <span className="tag">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="blog-post__meta">
          <span>By {post.author}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(post.date)}</span>
        </div>
      </div>

      <div className="blog-post__image">
        <img src={post.image} alt={post.title} />
      </div>

      <div className="blog-post__layout">
        <div className="blog-post__content">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return <h2 key={i}>{para.replace("## ", "")}</h2>;
            }
            return <p key={i}>{para}</p>;
          })}
        </div>

        <aside className="blog-post__sidebar">
          <GoogleAd slot="2222222222" minHeight={250} />
          <div className="blog-post__sidebar-box">
            <span className="eyebrow">Written by</span>
            <p className="blog-post__author">{post.author}</p>
          </div>
          <GoogleAd slot="3333333333" minHeight={100} />
        </aside>
      </div>

      <nav className="blog-post__pagination">
        <button
          className="btn btn-outline"
          disabled={!prevPost}
          onClick={() => prevPost && navigate(`/blog/${prevPost.slug}`)}
        >
          ← Back
        </button>
        <button
          className="btn"
          disabled={!nextPost}
          onClick={() => nextPost && navigate(`/blog/${nextPost.slug}`)}
        >
          Next →
        </button>
      </nav>

      {related.length > 0 && (
        <section className="blog-post__related">
          <h3>Related Posts</h3>
          <div className="blog-post__related-grid">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
