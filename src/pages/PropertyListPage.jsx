import React from "react";
import ListingCard from "../components/ListingCard";
import CTASection from "../components/CTASection";
import { LISTINGS } from "../data/siteData";

export default function PropertyListPage() {
  return (
    <>
      <section className="page-hero slim-hero">
        <div className="container page-hero-inner">
          <div className="eyebrow">Listings</div>
          <h1>A curated opportunity set designed to feel useful at first glance.</h1>
          <p>
            This page is built to push the user toward stronger comparison, cleaner filtering, and faster conviction.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container listing-grid">
          {LISTINGS.map((listing) => (
            <ListingCard key={listing.slug} listing={listing} />
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Decision support"
        title="Listings become more valuable when users can compare them properly."
        body="The tools, market guides, and property detail pages are designed to turn browsing into decision quality."
        primaryLabel="Open the Tools"
        primaryTo="/tools"
        secondaryLabel="Read the Guides"
        secondaryTo="/guides"
      />
    </>
  );
}
