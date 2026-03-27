import React from "react";
import { Link } from "react-router-dom";

export default function ListingCard({ listing }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-luxe transition-transform duration-300 hover:-translate-y-1.5">
      <div className="relative h-[270px] overflow-hidden">
        <img
          src={listing.image}
          alt={listing.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/16 to-transparent" />

        <div className="absolute left-4 right-4 top-4 flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full border border-white/20 bg-white/82 px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-[#b01f24] backdrop-blur-md">
            {listing.status}
          </span>
          <span className="rounded-full border border-white/20 bg-[#151515]/78 px-3 py-1.5 text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            {listing.tag}
          </span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex flex-wrap gap-2 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/78">
            <span>{listing.location}</span>
            <span>•</span>
            <span>{listing.neighbourhood}</span>
          </div>
          <h3 className="mt-2 text-[1.7rem] font-extrabold leading-[1.02] tracking-[-0.05em] text-white">
            {listing.title}
          </h3>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            [listing.size, "sq ft"],
            [listing.clearHeight, "clear"],
            [listing.zoning, "zoning"],
            [listing.loading, "loading"],
          ].map(([value, label]) => (
            <div key={`${listing.slug}-${label}`} className="rounded-[1.25rem] border border-black/6 bg-[#faf7f4] px-4 py-3">
              <div className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-black/42">{label}</div>
              <div className="mt-1 text-[0.95rem] font-semibold text-black/78">{value}</div>
            </div>
          ))}
        </div>

        <p className="mb-0 mt-5 text-[1rem] leading-7 text-black/68">{listing.teaser}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68 shadow-[0_10px_20px_rgba(17,17,17,0.04)]">
            {listing.corridor}
          </span>
          <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68 shadow-[0_10px_20px_rgba(17,17,17,0.04)]">
            {listing.assetClass}
          </span>
          <span className="rounded-full border border-black/8 bg-white px-3 py-2 text-sm text-black/68 shadow-[0_10px_20px_rgba(17,17,17,0.04)]">
            {listing.rate}
          </span>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-[0.72rem] font-extrabold uppercase tracking-[0.18em] text-black/42">Best fit</div>
            <div className="mt-1 text-[0.98rem] text-black/68">{listing.bestFor.slice(0, 2).join(" • ")}</div>
          </div>
          <Link to={`/listings/${listing.slug}`} className="button button-secondary inline-button">
            View property
          </Link>
        </div>
      </div>
    </article>
  );
}
