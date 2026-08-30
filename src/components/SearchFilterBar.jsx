import React from "react";
import "./SearchFilterBar.css";

const CATEGORIES = ["All", "News", "People", "Travel", "Other"];

export default function SearchFilterBar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}) {
  return (
    <div className="search-filter-bar">
      <input
        type="search"
        className="search-filter-bar__input"
        placeholder="Search blogs..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label="Search blogs"
      />
      <div className="search-filter-bar__chips">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={
              "chip" + (category === cat ? " chip--active" : "")
            }
            onClick={() => onCategoryChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
