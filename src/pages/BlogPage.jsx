import React from "react";
import { Link } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPage() {
  return (
    <main className="bg-[#f7f4ef] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="max-w-5xl">
            <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Commercial Real Estate Guides</div>
            <h1 className="mt-4 max-w-[13ch] text-5xl font-semibold leading-[0.92] tracking-[-0.06em] lg:text-7xl">Area-specific commercial real estate guidance for users who need more than generic market commentary.</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">Explore practical guides built around logistics, industrial condo ownership, showroom-flex strategy, and last-mile screening across the Greater Toronto Area and the Golden Horseshoe.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ef]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[320px_1fr] lg:px-10 lg:py-16">
          <aside className="lg:sticky lg:top-28 h-max border-t border-black/10 pt-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Guide index</div>
            <nav className="mt-5 space-y-4">
              {BLOG_POSTS.map((post) => (
                <Link key={post.slug} to={`/guides/${post.slug}`} className="block text-sm leading-6 text-black/72 transition hover:text-black">{post.title}</Link>
              ))}
            </nav>
          </aside>

          <div>
            <div className="mb-8 max-w-3xl">
              <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">Editorial list</div>
              <h2 className="mt-4 text-4xl font-semibold leading-[0.98] tracking-[-0.05em] lg:text-5xl">Featured commercial real estate guides</h2>
            </div>
            <div className="divide-y divide-black/8 border-y border-black/8 bg-white">
              {BLOG_POSTS.map((post) => (
                <article key={post.slug} className="grid gap-4 py-8 lg:grid-cols-[140px_1fr_auto] lg:items-start">
                  <div className="text-xs font-bold uppercase tracking-[0.18em] text-[#8b1e24]">{post.region}</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">{post.category}</div>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] lg:text-3xl">{post.title}</h3>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-black/68">{post.excerpt}</p>
                  </div>
                  <div className="lg:text-right">
                    <div className="text-sm text-black/55">{post.readTime}</div>
                    <Link to={`/guides/${post.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-black">Read Guide <span aria-hidden="true">↗</span></Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
