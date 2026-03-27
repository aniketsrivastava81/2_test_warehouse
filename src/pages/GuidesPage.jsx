import { useMemo } from 'react';
import LegacyHtmlBlock from '../components/LegacyHtmlBlock';
import blogHtmlRaw from '../legacy/blog_main.html?raw';
import { BLOG_POSTS } from '../lib/siteData';
import { escapeHTML, transformLegacyLinks } from '../lib/siteUtils';

export default function GuidesPage() {
  const html = useMemo(() => transformLegacyLinks(blogHtmlRaw), []);

  const handleReady = (root) => {
    const mount = root.querySelector('[data-blog]');
    const cta = root.querySelector('[data-blog-cta]');
    if (mount) {
      mount.innerHTML = BLOG_POSTS.map((post) => `
        <article class="card soft" id="${escapeHTML(post.slug)}">
          <div class="badges" style="margin-bottom:10px">
            <span class="pill"><strong>${escapeHTML(post.tag)}</strong></span>
            <span class="pill">${escapeHTML(post.date)}</span>
          </div>
          <h2 style="margin:0 0 10px 0">${escapeHTML(post.title)}</h2>
          <p class="muted">${escapeHTML(post.excerpt)}</p>
          <div class="hr"></div>
          <div class="blog-body">${post.contentHtml}</div>
        </article>
      `).join('');
    }
    if (cta) {
      cta.innerHTML = `
        <div class="inline-callout">
          <div>
            <div class="kicker">Next step</div>
            <div><strong>Want a shortlist?</strong> Tell us your timeline, use, and budget range—we’ll bring 3–5 options and negotiate from leverage.</div>
          </div>
          <a class="btn btn-primary" href="/listings">Browse listings</a>
        </div>`;
    }
  };

  return <LegacyHtmlBlock as="main" id="main" className="section" html={html} onReady={handleReady} />;
}
