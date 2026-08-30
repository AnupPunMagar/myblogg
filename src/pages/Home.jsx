import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import SearchFilterBar from "../components/SearchFilterBar";
import GoogleAd from "../components/GoogleAd";
import "./Home.css";

export default function Home({ posts, loading, error }) {
  const { category: categoryParam } = useParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categoryParam || "All");

  React.useEffect(() => {
    setCategory(categoryParam || "All");
  }, [categoryParam]);

  const published = useMemo(() => posts.filter((p) => p.published), [posts]);

  const filtered = useMemo(() => {
    return published.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = query.trim().toLowerCase();
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [published, category, query]);

  const [featured, ...rest] = filtered;

  return (
    <div className="home-page">
      <section className="home-hero container">
        <span className="eyebrow">MyBlog</span>
        <h1>Stories worth slowing down for.</h1>
        <p className="home-hero__sub">
          News, people, travel, and everyday ideas — written simply, updated often.
        </p>
      </section>

      <div className="container">
        <GoogleAd slot="1111111111" minHeight={90} />
      </div>

      <div className="container">
        <SearchFilterBar
          query={query}
          onQueryChange={setQuery}
          category={category}
          onCategoryChange={setCategory}
        />

        {loading ? (
          <p className="home-empty">Loading posts...</p>
        ) : error ? (
          <p className="home-empty">
            Couldn't load posts right now ({error}). Try refreshing the page.
          </p>
        ) : filtered.length === 0 ? (
          <p className="home-empty">No posts match your search yet. Try a different keyword or category.</p>
        ) : (
          <>
            {featured && (
              <div className="home-featured">
                <BlogCard post={featured} featured />
              </div>
            )}

            <div className="home-grid">
              {rest.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
