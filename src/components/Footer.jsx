import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__row">
        <div>
          <div className="site-logo-footer">MyBlog</div>
          <p className="site-footer__tag">Stories worth slowing down for.</p>
        </div>
        <nav className="site-footer__links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-use">Terms of Use</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="container">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} MyBlog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
