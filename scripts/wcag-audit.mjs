import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = path.join(ROOT, 'src');
const INDEX = path.join(ROOT, 'index.html');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jsx|js|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}
function linesOf(text) { return text.split(/\r?\n/); }
function issue(type, file, line, snippet, severity = 'warning') {
  return { type, file, line, snippet: (snippet || '').trim().slice(0, 240), severity };
}
function lineForOffset(text, offset) { return text.slice(0, offset).split(/\r?\n/).length; }

function blocks(tag, text) {
  const regex = new RegExp(`<${tag}\\b[\\s\\S]*?>`, 'g');
  return [...text.matchAll(regex)].map((m) => ({ raw: m[0], index: m.index ?? 0 }));
}

function findIssues(file, text) {
  const issues = [];
  const lines = linesOf(text);

  for (const m of blocks('img', text)) {
    if (!/\balt=/.test(m.raw)) issues.push(issue('IMG_MISSING_ALT', file, lineForOffset(text, m.index), m.raw, 'error'));
  }
  for (const m of blocks('iframe', text)) {
    if (!/\btitle=/.test(m.raw)) issues.push(issue('IFRAME_MISSING_TITLE', file, lineForOffset(text, m.index), m.raw, 'error'));
  }
  for (const m of blocks('button', text)) {
    if (!/\btype=/.test(m.raw)) issues.push(issue('BUTTON_MISSING_TYPE', file, lineForOffset(text, m.index), m.raw, 'warning'));
  }
  for (const tag of ['input', 'select', 'textarea']) {
    for (const m of blocks(tag, text)) {
      if (!/\bid=/.test(m.raw)) issues.push(issue('FIELD_MISSING_ID', file, lineForOffset(text, m.index), m.raw, 'warning'));
    }
  }
  for (const m of blocks('a', text)) {
    if (/target="_blank"/.test(m.raw)) {
      const safeRel = /rel=/.test(m.raw) && /(noreferrer|noopener)/.test(m.raw);
      if (!safeRel) issues.push(issue('A_TARGET_BLANK_REL', file, lineForOffset(text, m.index), m.raw, 'error'));
    }
  }

  // line-oriented heuristics
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    if (/^<(div|span|article)\b/.test(trimmed)) {
      const tagClose = trimmed.indexOf('>');
      const head = tagClose >= 0 ? trimmed.slice(0, tagClose + 1) : trimmed;
      if (/onClick=/.test(head)) {
        const hasRole = /role=/.test(head);
        const hasTab = /tabIndex=/.test(head);
        if (!hasRole || !hasTab) issues.push(issue('NON_INTERACTIVE_CLICKABLE', file, i + 1, trimmed, 'warning'));
      }
    }
    if (/text-black\/(42|45|54|55|60)/.test(trimmed) && /text-\[0\.(68|72|78)rem\]/.test(trimmed)) {
      issues.push(issue('LOW_CONTRAST_SMALL_TEXT_TOKEN', file, i + 1, trimmed, 'warning'));
    }
  });

  return issues;
}

const files = walk(SRC);
let all = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  all = all.concat(findIssues(file, text));
}
if (fs.existsSync(INDEX)) {
  const indexText = fs.readFileSync(INDEX, 'utf8');
  if (/Megha Mehta/i.test(indexText)) all.push(issue('OUTDATED_DEFAULT_METADATA', INDEX, 1, 'index.html still contains legacy Megha Mehta branding in the default title/meta.', 'warning'));
  if (/cdnjs\.cloudflare\.com\/ajax\/libs\/materialize/i.test(indexText)) all.push(issue('EXTERNAL_FRAMEWORK_COLLISION_RISK', INDEX, 1, 'index.html still loads Materialize CSS/JS, which can override component styling and focus behavior.', 'warning'));
}
const byType = all.reduce((acc, item) => ((acc[item.type] ||= []).push(item), acc), {});
const mdEscape = (s) => String(s).replace(/\|/g, '\\|');
let report = `# Accessibility / WCAG-Oriented Static Audit\n\n`;
report += `This scan is stronger than the earlier pass but is still a **static code audit**, not a full browser + assistive-tech conformance certification.\n\n`;
report += `Checks included:\n- img alt text\n- iframe title\n- target=_blank rel safety\n- button type\n- form field id presence\n- clickable non-interactive elements\n- low-contrast small-text utility tokens\n- outdated default metadata / framework-collision risk in index.html\n\n`;
report += `Scanned: ${files.length} source files\nFindings: ${all.length}\n\n`;
for (const [type, items] of Object.entries(byType)) {
  report += `## ${type} (${items.length})\n\n| Severity | File | Line | Snippet |\n|---|---|---:|---|\n`;
  for (const it of items.slice(0, 100)) report += `| ${it.severity} | ${mdEscape(path.relative(ROOT, it.file))} | ${it.line} | \`${mdEscape(it.snippet)}\` |\n`;
  report += `\n`;
}
if (all.length === 0) report += `## Result\n\nNo issues were flagged by this static audit. A manual keyboard / screen-reader pass is still recommended before calling the site WCAG-ready.\n`;
const outPath = path.join(ROOT, 'WCAG_AUDIT_REPORT.md');
fs.writeFileSync(outPath, report, 'utf8');
console.log('Accessibility static audit complete.');
console.log(`Files scanned: ${files.length}`);
console.log(`Issues found: ${all.length}`);
console.log(`Report written to: ${outPath}`);
if (all.length > 0) process.exitCode = 1;
