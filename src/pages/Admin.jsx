import React, { useEffect, useState } from "react";
import { fetchAllPosts, savePost, deletePost, togglePublish } from "../utils/postsApi";
import { slugify } from "../utils/slug";
import "./Admin.css";

const CATEGORIES = ["News", "People", "Travel", "Other"];
const BLANK_FORM = {
  id: null,
  title: "",
  category: "News",
  image: "",
  description: "",
  content: "",
  author: "",
  date: new Date().toISOString().slice(0, 10),
  published: false,
};

export default function Admin({ onPostsChanged }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(BLANK_FORM);
  const [editingId, setEditingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const isEditing = editingId !== null;

  async function refresh() {
    try {
      setLoading(true);
      const data = await fetchAllPosts();
      setPosts(data);
      setLoadError(null);
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setForm(BLANK_FORM);
    setEditingId(null);
  }

  function handleChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleEdit(post) {
    setForm({ ...post });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSubmit(e, publishNow) {
    e.preventDefault();
    if (!form.title.trim()) return;

    setSaving(true);
    try {
      const payload = {
        ...form,
        slug: slugify(form.title),
        published: publishNow !== undefined ? publishNow : form.published,
        image:
          form.image.trim() ||
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
      };
      await savePost(payload);
      resetForm();
      await refresh();
      onPostsChanged?.();
    } catch (err) {
      setLoadError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    try {
      await deletePost(id);
      setConfirmDeleteId(null);
      await refresh();
      onPostsChanged?.();
    } catch (err) {
      setLoadError(err.message);
    }
  }

  async function handleTogglePublish(post) {
    try {
      await togglePublish(post);
      await refresh();
      onPostsChanged?.();
    } catch (err) {
      setLoadError(err.message);
    }
  }

  return (
    <div className="container admin-page">
      <div className="admin-page__header">
        <span className="eyebrow">Admin</span>
        <h1>Manage Blog Posts</h1>
        <p className="admin-page__sub">
          Add, edit, publish, or delete posts. Published posts appear on the homepage
          for every visitor, since they're now stored in a shared database.
        </p>
      </div>

      {loadError && <div className="admin-error-banner">{loadError}</div>}

      <form className="admin-form" onSubmit={(e) => handleSubmit(e, form.published)}>
        <h2>{isEditing ? "Edit Post" : "Add New Post"}</h2>

        <div className="admin-form__grid">
          <label className="admin-field admin-field--full">
            <span>Title</span>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="A short, clear headline"
              required
            />
          </label>

          <label className="admin-field">
            <span>Category</span>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="admin-field">
            <span>Author</span>
            <input
              type="text"
              value={form.author}
              onChange={(e) => handleChange("author", e.target.value)}
              placeholder="Author name"
            />
          </label>

          <label className="admin-field">
            <span>Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </label>

          <label className="admin-field">
            <span>Image URL</span>
            <input
              type="url"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://..."
            />
          </label>

          <label className="admin-field admin-field--full">
            <span>Short Description</span>
            <textarea
              rows={2}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="One or two sentences shown on the homepage card"
            />
          </label>

          <label className="admin-field admin-field--full">
            <span>Full Article Content</span>
            <textarea
              rows={8}
              value={form.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder={"Write the full article here.\n\nSeparate paragraphs with a blank line. Start a line with \"## \" to create a subheading."}
            />
          </label>
        </div>

        <div className="admin-form__actions">
          {isEditing && (
            <button type="button" className="btn btn-outline" onClick={resetForm} disabled={saving}>
              Cancel
            </button>
          )}
          <button
            type="button"
            className="btn btn-outline"
            onClick={(e) => handleSubmit(e, false)}
            disabled={saving}
          >
            Save as Draft
          </button>
          <button type="button" className="btn" onClick={(e) => handleSubmit(e, true)} disabled={saving}>
            {saving ? "Saving..." : isEditing ? "Save & Publish" : "Publish Post"}
          </button>
        </div>
      </form>

      <div className="admin-list">
        <h2>All Posts ({posts.length})</h2>

        {loading ? (
          <p className="admin-empty">Loading posts...</p>
        ) : (
          <div className="admin-table">
            <div className="admin-table__row admin-table__row--head">
              <span>Title</span>
              <span>Category</span>
              <span>Date</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {posts.map((post) => (
              <div className="admin-table__row" key={post.id}>
                <span className="admin-table__title">{post.title}</span>
                <span className="tag">{post.category}</span>
                <span className="admin-table__date">{post.date}</span>
                <span>
                  <button
                    className={
                      "status-pill " +
                      (post.published ? "status-pill--live" : "status-pill--draft")
                    }
                    onClick={() => handleTogglePublish(post)}
                  >
                    {post.published ? "Published" : "Draft"}
                  </button>
                </span>
                <span className="admin-table__actions">
                  <button className="btn btn-outline" onClick={() => handleEdit(post)}>
                    Edit
                  </button>
                  {confirmDeleteId === post.id ? (
                    <>
                      <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                        Confirm
                      </button>
                      <button className="btn btn-outline" onClick={() => setConfirmDeleteId(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button className="btn btn-outline" onClick={() => setConfirmDeleteId(post.id)}>
                      Delete
                    </button>
                  )}
                </span>
              </div>
            ))}
            {posts.length === 0 && (
              <p className="admin-empty">No posts yet. Add your first one above.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
