/**
 * CLI entry point for syncing Figma token exports into globals.css.
 *
 * Reads tokens/*.json via tokens-sync.config.json, regenerates only the
 * marked sections in src/styles/globals.css, preserves declaration order,
 * and prints a short summary of added/changed/removed variables.
 *
 * Run: npm run sync:tokens
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  type TokensSyncConfig,
  generateAllSections,
  parseCssCustomProperties,
} from './tokens/sync-core';

const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

const MARKER_BEGIN = (id: string) => `/* qbds:tokens:begin ${id} */`;
const MARKER_END = (id: string) => `/* qbds:tokens:end ${id} */`;

function loadConfig(): TokensSyncConfig {
  return JSON.parse(
    readFileSync(join(rootDir, 'tokens-sync.config.json'), 'utf8'),
  ) as TokensSyncConfig;
}

function indexAfterSelectorBlock(css: string, selector: string): number {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return -1;
  let depth = 0;
  for (let i = css.indexOf('{', start); i < css.length; i++) {
    if (css[i] === '{') depth++;
    else if (css[i] === '}') {
      depth--;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

function semanticSectionEndIndex(css: string): number {
  return (
    indexAfterSelectorBlock(css, '.radius-mode') ??
    indexAfterSelectorBlock(css, '.dark') ??
    indexAfterSelectorBlock(css, ':root') ??
    css.indexOf('\n@utility shadow-elevation-0')
  );
}

function insertMarkersIfMissing(globalsCss: string): string {
  let css = globalsCss;
  if (!css.includes(MARKER_BEGIN('theme-inline'))) {
    css = css.replace(
      '@theme inline {',
      `${MARKER_BEGIN('theme-inline')}\n@theme inline {`,
    );
    css = css.replace(
      /\n}\n\n:root \{/,
      `\n}\n${MARKER_END('theme-inline')}\n\n:root {`,
    );
  }
  if (!css.includes(MARKER_BEGIN('semantic'))) {
    css = css.replace(':root {', `${MARKER_BEGIN('semantic')}\n:root {`);
    const insertAt = semanticSectionEndIndex(css);
    if (insertAt !== -1) {
      css =
        css.slice(0, insertAt) +
        `\n${MARKER_END('semantic')}` +
        css.slice(insertAt);
    }
  }
  return css;
}

function extractSectionContent(globalsCss: string, sectionId: string): string {
  const begin = MARKER_BEGIN(sectionId);
  const end = MARKER_END(sectionId);
  const start = globalsCss.indexOf(begin);
  const endIdx = globalsCss.indexOf(end);
  if (start === -1 || endIdx === -1) return '';
  return globalsCss.slice(start + begin.length, endIdx).replace(/^\n/, '');
}

function patchSection(
  globalsCss: string,
  sectionId: string,
  newContent: string,
): string {
  const begin = MARKER_BEGIN(sectionId);
  const end = MARKER_END(sectionId);
  const start = globalsCss.indexOf(begin);
  const endIdx = globalsCss.indexOf(end);
  if (start === -1 || endIdx === -1) {
    throw new Error(
      `Markers not found for section "${sectionId}". Expected:\n${begin}\n...\n${end}`,
    );
  }
  return `${globalsCss.slice(0, start + begin.length)}\n${newContent}\n${globalsCss.slice(endIdx)}`;
}

function patchAllSections(
  globalsCss: string,
  sections: Record<string, string>,
): string {
  return Object.entries(sections).reduce(
    (css, [id, content]) => patchSection(css, id, content),
    globalsCss,
  );
}

type TokenDiff = {
  added: Array<{ name: string; after: string }>;
  removed: Array<{ name: string; before: string }>;
  changed: Array<{ name: string; before: string; after: string }>;
};

function diffCss(beforeCss: string, afterCss: string): TokenDiff {
  const before = parseCssCustomProperties(beforeCss);
  const after = parseCssCustomProperties(afterCss);
  const added: TokenDiff['added'] = [];
  const removed: TokenDiff['removed'] = [];
  const changed: TokenDiff['changed'] = [];

  for (const [name, value] of after) {
    if (!before.has(name)) added.push({ name, after: value });
    else if (before.get(name) !== value) {
      changed.push({ name, before: before.get(name)!, after: value });
    }
  }
  for (const [name, value] of before) {
    if (!after.has(name)) removed.push({ name, before: value });
  }
  const sort = <T extends { name: string }>(a: T, b: T) =>
    a.name.localeCompare(b.name);
  added.sort(sort);
  removed.sort(sort);
  changed.sort(sort);
  return { added, removed, changed };
}

function formatDiffReport(diff: TokenDiff, maxRows = 50): string {
  const total = diff.added.length + diff.removed.length + diff.changed.length;
  const lines: string[] = [
    `${diff.changed.length} changed, ${diff.added.length} added, ${diff.removed.length} removed`,
  ];
  if (total === 0) {
    lines.push('No token changes.');
    return lines.join('\n');
  }

  const section = (
    title: string,
    rows: Array<{ name: string; before?: string; after?: string }>,
    format: (row: { name: string; before?: string; after?: string }) => string,
  ) => {
    if (!rows.length) return;
    lines.push('', `${title}:`);
    for (const row of rows.slice(0, maxRows)) {
      lines.push(`  ${format(row)}`);
    }
    if (rows.length > maxRows)
      lines.push(`  …and ${rows.length - maxRows} more`);
  };

  section('Changed', diff.changed, r => `${r.name}: ${r.before} → ${r.after}`);
  section('Added', diff.added, r => `${r.name}: ${r.after}`);
  section('Removed', diff.removed, r => `${r.name}: ${r.before}`);
  return lines.join('\n');
}

function main() {
  const config = loadConfig();
  const globalsPath = join(rootDir, config.globalsPath);

  const globalsCss = insertMarkersIfMissing(readFileSync(globalsPath, 'utf8'));
  const existingSections = Object.fromEntries(
    config.sections.map(section => [
      section.id,
      extractSectionContent(globalsCss, section.id),
    ]),
  );
  const sections = generateAllSections(rootDir, config, existingSections);
  const newGlobals = patchAllSections(globalsCss, sections);
  const diff = diffCss(globalsCss, newGlobals);

  console.log(formatDiffReport(diff));

  if (newGlobals === globalsCss) {
    console.log('\n✓ globals.css is already in sync.');
    return;
  }

  writeFileSync(globalsPath, newGlobals, 'utf8');
  console.log(`\n✓ Updated ${config.globalsPath}`);
}

main();
