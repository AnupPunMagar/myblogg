import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import "./AdminGate.css";

// There is deliberately no sign-up form here. Create the one admin account
// yourself from the Supabase dashboard (Authentication -> Users -> Add
// user), so only accounts you create can ever log in.
export default function AdminGate({ children }) {
  const [session, setSession] = useState(null);
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (signInError) setError(signInError.message);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
  }

  if (!ready) return null;

  if (!session) {
    return (
      <div className="admin-gate container">
        <form className="admin-gate__card" onSubmit={handleSubmit}>
          <span className="eyebrow">Admin</span>
          <h1>Sign in</h1>
          <p>Sign in with your admin account to manage posts.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="admin-gate__error">{error}</p>}
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-gate__bar container">
        <span>
          Signed in as <strong>{session.user.email}</strong>
        </span>
        <button className="btn btn-outline" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      {children}
    </div>
  );
}
