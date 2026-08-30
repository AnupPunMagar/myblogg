import React from "react";
import "./StaticPage.css";

export default function PrivacyPolicy() {
  return (
    <div className="container static-page">
      <span className="eyebrow">Legal</span>
      <h1>Privacy Policy</h1>
      <p className="static-page__lead">Last updated August 2026.</p>

      <h2>What we collect</h2>
      <p>
        MyBlog collects only the information you choose to give us, such as your
        name and email address when you use the contact form. We do not sell
        personal information to third parties.
      </p>

      <h2>Cookies and analytics</h2>
      <p>
        We may use basic, privacy-respecting analytics to understand which
        articles are popular. This data is aggregated and not tied to your
        identity.
      </p>

      <h2>Advertising</h2>
      <p>
        Some pages display advertisement placeholders. Any real ad network used
        in production would be disclosed here along with its own data practices.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent through our contact page.
      </p>
    </div>
  );
}
