import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RouteSeo from "./RouteSeo";
import FloatingInquiryButton from "./FloatingInquiryButton";
import CookieConsentBanner from "./CookieConsentBanner";
import FaqChatbot from "./FaqChatbot";
import ShortlistTray from "./ShortlistTray";

export default function Layout() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <RouteSeo />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBanner />
      <ShortlistTray />
      <FaqChatbot />
      <FloatingInquiryButton />
    </div>
  );
}
