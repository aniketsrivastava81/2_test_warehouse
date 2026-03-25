import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeadMagnetModal from "./LeadMagnetModal";
import MobileStickyCTA from "./MobileStickyCTA";

export default function Layout() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main" className="site-main">
        <Outlet />
      </main>
      <Footer />
      <MobileStickyCTA />
      <LeadMagnetModal />
    </div>
  );
}
