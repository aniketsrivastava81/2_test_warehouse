import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import RouteSeo from "./RouteSeo";

export default function Layout() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <RouteSeo />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
