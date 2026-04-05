import React from "react";
import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS } from "../data/siteData";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find((item) => item.slug === slug) || BLOG_POSTS[0];

  return (
    <main className="bg-[#f8f5f0] text-[#161616]">
      <section className="border-b border-black/6 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-10 lg:py-24">
          <div className="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#8b1e24]">{post.category} • {post.region}</div>
          <h1 className="mt-4 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] lg:text-7xl">{post.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-black/70">{post.excerpt}</p>
          <div className="mt-6 text-sm font-medium text-black/52">{post.readTime} • {post.date}</div>
        </div>
      </section>

      <section className="bg-[#f8f5f0]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_300px] lg:px-10 lg:py-16">
          <article className="space-y-10">
            {post.sections.map((section) => (
              <section key={section.heading} className="border-t border-black/8 pt-6">
                <h2 className="text-3xl font-semibold tracking-[-0.04em]">{section.heading}</h2>
                <div className="mt-5 space-y-5 text-lg leading-8 text-black/70">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </article>

          <aside className="lg:sticky lg:top-28 h-max border-t border-black/10 pt-5">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-black/45">Use the guide properly</div>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-black/65">
              {post.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Link to="/tools" className="rounded-full bg-[#111] px-5 py-3 text-center text-sm font-semibold text-white">Apply this with the tools</Link>
              <Link to="/listings" className="rounded-full border border-black/12 px-5 py-3 text-center text-sm font-semibold text-black">Review active listings</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
