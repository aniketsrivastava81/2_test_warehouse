import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import PropertyListPage from "./pages/PropertyListPage";
import ToolsPage from "./pages/ToolsPage";
import WarehousePage from "./pages/WarehousePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ListingType2Page from "./pages/ListingType2Page";
import MarketsPage from "./pages/MarketsPage";
import AssetClassesPage from "./pages/AssetClassesPage";

export default function App() {
  return (
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
        <Route path="/listing-type-2" element={<ListingType2Page />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/asset-classes" element={<AssetClassesPage />} />

        <Route path="/blog" element={<Navigate to="/guides" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/guides" replace />} />
        <Route path="/property-list" element={<Navigate to="/listings" replace />} />
        <Route path="/property-details" element={<Navigate to="/listings" replace />} />
        <Route path="/landingpage.html" element={<Navigate to="/" replace />} />
        <Route path="/blog.html" element={<Navigate to="/guides" replace />} />
        <Route path="/propertylist.html" element={<Navigate to="/listings" replace />} />
        <Route path="/propertydetail.html" element={<Navigate to="/listings" replace />} />
        <Route path="/tools.html" element={<Navigate to="/tools" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
