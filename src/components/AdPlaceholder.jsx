import React from "react";
import "./AdPlaceholder.css";

export default function AdPlaceholder({ label = "Advertisement", size = "medium" }) {
  return (
    <div className={`ad-placeholder ad-placeholder--${size}`}>
      <span className="ad-placeholder__eyebrow">{label}</span>
      <span className="ad-placeholder__dims">Ad space</span>
    </div>
  );
}
