import React, { useState } from "react";
import "./StaticPage.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="container static-page">
      <span className="eyebrow">Get in touch</span>
      <h1>Contact Us</h1>
      <p className="static-page__lead">
        Questions, story tips, or feedback — send a note and we'll get back to you.
      </p>

      {sent ? (
        <div className="contact-success">
          Thanks for reaching out. We'll reply soon.
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            <span>Name</span>
            <input type="text" required placeholder="Your name" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" required placeholder="you@example.com" />
          </label>
          <label>
            <span>Message</span>
            <textarea rows={5} required placeholder="How can we help?" />
          </label>
          <button type="submit" className="btn">Send Message</button>
        </form>
      )}
    </div>
  );
}
