import React, { useCallback, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminGate from "./components/AdminGate";
import Home from "./pages/Home";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import { fetchPublishedPosts } from "./utils/postsApi";
import "./App.css";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadPublicPosts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchPublishedPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPublicPosts();
  }, [loadPublicPosts]);

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home posts={posts} loading={loading} error={error} />} />
          <Route
            path="/category/:category"
            element={<Home posts={posts} loading={loading} error={error} />}
          />
          <Route path="/blog/:slug" element={<BlogPost posts={posts} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route
            path="/admin"
            element={
              <AdminGate>
                <Admin onPostsChanged={loadPublicPosts} />
              </AdminGate>
            }
          />
          <Route
            path="*"
            element={
              <div className="container not-found">
                <h1>404</h1>
                <p>That page doesn't exist.</p>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
