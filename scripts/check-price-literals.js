const fs = require('fs');
const path = require('path');

const root = process.cwd();

/**
 * Non-blocking report of every hardcoded `$NNN`-style price literal outside
 * lib/data/ (the single source of truth for tier/solution pricing). Prices are
 * intentionally spelled out in FAQ and blog prose across the site, so this is
 * a manual-review aid for "did I miss a stale price mention?" when a price
 * changes -- it does not fail the build.
 */
const SCAN_DIRS = ['app', 'components', 'content/blog'];
const SCAN_EXTENSIONS = new Set(['.ts', '.tsx', '.mdx']);
const PRICE_PATTERN = /\$\d[\d,]*(?:\.\d+)?\+?/g;

function walk(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.next') continue;
      walk(full, files);
    } else if (SCAN_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

function main() {
  const files = SCAN_DIRS.flatMap((dir) => {
    const full = path.join(root, dir);
    return fs.existsSync(full) ? walk(full) : [];
  });

  let totalMatches = 0;
  const report = [];

  for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
      const matches = line.match(PRICE_PATTERN);
      if (matches) {
        totalMatches += matches.length;
        report.push({ file: path.relative(root, file), line: i + 1, matches, text: line.trim().slice(0, 140) });
      }
    });
  }

  console.log(`\nPrice-literal report -- ${totalMatches} match(es) across ${SCAN_DIRS.join(', ')} (excludes lib/data/).\n`);
  console.log('This is informational only (does not fail the build). Review before changing a tier or solution price.\n');

  for (const r of report) {
    console.log(`${r.file}:${r.line}  [${r.matches.join(', ')}]`);
    console.log(`  ${r.text}`);
  }

  console.log(`\n${report.length} line(s) flagged. Canonical prices live in lib/data/pricing.ts and lib/data/templates.ts.\n`);
}

main();
