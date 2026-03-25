import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { LeadMagnetProvider } from "./context/LeadMagnetContext";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PropertyListPage from "./pages/PropertyListPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import ToolsPage from "./pages/ToolsPage";
import WarehousePage from "./pages/WarehousePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

function LegacyPropertyDetailRedirect() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  return <Navigate to={id ? `/listings/${encodeURIComponent(id)}` : "/listings"} replace />;
}

export default function App() {
  return (
    <LeadMagnetProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/listings" element={<PropertyListPage />} />
          <Route path="/listings/:slug" element={<PropertyDetailPage />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/guides" element={<BlogPage />} />
          <Route path="/guides/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/warehouse" element={<WarehousePage />} />
          <Route path="/blog" element={<Navigate to="/guides" replace />} />
          <Route path="/property-list" element={<Navigate to="/listings" replace />} />
          <Route path="/property-details" element={<LegacyPropertyDetailRedirect />} />
          <Route path="/landingpage.html" element={<Navigate to="/" replace />} />
          <Route path="/blog.html" element={<Navigate to="/guides" replace />} />
          <Route path="/propertylist.html" element={<Navigate to="/listings" replace />} />
          <Route path="/propertydetail.html" element={<Navigate to="/listings" replace />} />
          <Route path="/tools.html" element={<Navigate to="/tools" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LeadMagnetProvider>
  );
}
