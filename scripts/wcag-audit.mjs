import fs from 'fs';
import path from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const SRC = path.join(ROOT, 'src');

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(jsx|js|tsx|ts)$/.test(entry.name)) out.push(full);
  }
  return out;
}

function linesOf(text) {
  return text.split(/\r?\n/);
}

function findTagIssues(file, text) {
  const issues = [];

  const lines = linesOf(text);

  // IMG without alt
  lines.forEach((line, i) => {
    if (line.includes('<img') && !line.includes('alt=')) {
      issues.push({ type: 'IMG_MISSING_ALT', file, line: i + 1, snippet: line.trim().slice(0, 220) });
    }
  });

  // target=_blank without rel noopener/noreferrer
  lines.forEach((line, i) => {
    if (line.includes('target="_blank"')) {
      const hasRel = line.includes('rel=');
      const safeRel = hasRel && (line.includes('noreferrer') || line.includes('noopener'));
      if (!safeRel) issues.push({ type: 'A_TARGET_BLANK_REL', file, line: i + 1, snippet: line.trim().slice(0, 220) });
    }
  });

  // button without type (common source of accidental form submits)
  lines.forEach((line, i) => {
    const hasBtn = line.includes('<button');
    if (!hasBtn) return;
    const hasType = line.includes('type=');
    if (!hasType) issues.push({ type: 'BUTTON_MISSING_TYPE', file, line: i + 1, snippet: line.trim().slice(0, 220) });
  });

  // inputs/selects/textareas without id (hurts label association)
  lines.forEach((line, i) => {
    const isField = line.includes('<input') || line.includes('<select') || line.includes('<textarea');
    if (!isField) return;
    if (!line.includes('id=')) issues.push({ type: 'FIELD_MISSING_ID', file, line: i + 1, snippet: line.trim().slice(0, 220) });
  });

  return issues;
}

const files = walk(SRC);
let all = [];
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  all = all.concat(findTagIssues(file, text));
}

const byType = all.reduce((acc, item) => {
  acc[item.type] = acc[item.type] || [];
  acc[item.type].push(item);
  return acc;
}, {});

function mdEscape(s) {
  return s.replace(/\|/g, '\\|');
}

let report = `# WCAG / Accessibility Static Audit (Demo)\n\n`;
report += `This is an automated static scan for common accessibility foot-guns (missing alt, missing rel on target=_blank, missing button types, missing field ids).\n\n`;
report += `Scanned: ${files.length} source files\n`;
report += `Findings: ${all.length} potential issues\n\n`;

for (const [type, items] of Object.entries(byType)) {
  report += `## ${type} (${items.length})\n\n`;
  report += `| File | Line | Snippet |\n|---|---:|---|\n`;
  for (const it of items.slice(0, 60)) {
    report += `| ${mdEscape(path.relative(ROOT, it.file))} | ${it.line} | \`${mdEscape(it.snippet)}\` |\n`;
  }
  if (items.length > 60) report += `\n…and ${items.length - 60} more.\n`;
  report += `\n`;
}

const outPath = path.join(ROOT, 'WCAG_AUDIT_REPORT.md');
fs.writeFileSync(outPath, report, 'utf8');

console.log(`WCAG static audit complete.`);
console.log(`Files scanned: ${files.length}`);
console.log(`Issues found: ${all.length}`);
console.log(`Report written to: ${outPath}`);
if (all.length > 0) process.exitCode = 1;
