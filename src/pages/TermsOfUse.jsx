import React from "react";
import "./StaticPage.css";

export default function TermsOfUse() {
  return (
    <div className="container static-page">
      <span className="eyebrow">Legal</span>
      <h1>Terms of Use</h1>
      <p className="static-page__lead">Last updated August 2026.</p>

      <h2>Using this site</h2>
      <p>
        Content on MyBlog is provided for general informational purposes. By
        using this site, you agree to use it lawfully and not to reproduce
        articles without permission.
      </p>

      <h2>Content accuracy</h2>
      <p>
        We aim for accuracy but cannot guarantee every article is free of
        error. Articles reflect the views of their authors at the time of
        publishing.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may be updated from time to time. Continued use of the
        site after changes means you accept the updated terms.
      </p>
    </div>
  );
}
