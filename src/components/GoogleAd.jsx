import React, { useEffect, useRef } from "react";
import "./GoogleAd.css";

// Renders a single Google AdSense ad unit.
//
// Setup required before ads will actually show:
// 1. Replace the client ID in public/index.html (search for "ca-pub-XXXXXXXXXXXXXXXX").
// 2. Replace the `slot` prop below with the ad unit ID from your AdSense dashboard
//    (Ads -> By ad unit -> create a "Display ad" -> copy the data-ad-slot number).
// 3. Your site needs to be approved by AdSense first — until then this renders
//    an empty box, which is expected.
export default function GoogleAd({ slot, minHeight = 100, className = "" }) {
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (window.adsbygoogle) {
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (err) {
      // AdSense script blocked (ad blocker) or not yet loaded — fail silently.
    }
  }, []);

  return (
    <div className={`google-ad ${className}`} style={{ minHeight }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
