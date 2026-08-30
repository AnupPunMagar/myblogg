import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "News", to: "/category/News" },
  { label: "People", to: "/category/People" },
  { label: "Travel", to: "/category/Travel" },
  { label: "Other", to: "/category/Other" },
  { label: "Contact", to: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container site-header__row">
        <Link to="/" className="site-logo" onClick={() => setOpen(false)}>
          MyBlog
        </Link>

        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`site-nav ${open ? "site-nav--open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                "site-nav__link" + (isActive ? " site-nav__link--active" : "")
              }
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <Link to="/admin" className="site-nav__admin" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
