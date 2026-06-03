import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { loadColorTokens, oklchToHex, parseTokensMarkdown } from '@/lib/tokens';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

describe('tokens from TOKENS.md + globals.css', () => {
  const globalsCss = fs.readFileSync(
    path.join(REPO_ROOT, 'src/styles/globals.css'),
    'utf8',
  );
  const tokensMd = fs.readFileSync(
    path.join(REPO_ROOT, 'docs/TOKENS.md'),
    'utf8',
  );

  it('parses colour tables from TOKENS.md', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    expect(parsed.length).toBeGreaterThan(50);
    expect(parsed.some(t => t.name === 'Surface/Primary')).toBe(true);
    expect(parsed.some(t => t.tailwind.includes('text-fg-primary'))).toBe(
      true,
    );
  });

  it('resolves concrete semantic colours from globals.css', () => {
    const tokens = loadColorTokens(globalsCss);
    const primary = tokens.find(t => t.cssVar === '--surface-primary');
    expect(primary?.light?.hex).toMatch(/^#[\da-f]{8}$/);
    expect(primary?.dark?.hex).toMatch(/^#[\da-f]{8}$/);
  });

  it('resolves status fill colours from globals.css', () => {
    expect(oklchToHex('oklch(62.7% 0.194 149.214)')).toMatch(/^#[\da-f]{8}$/);
    const tokens = loadColorTokens(globalsCss);
    const success = tokens.find(
      t => t.category === 'Status' && t.cssVar === '--status-success',
    );
    expect(success?.patternOnly).toBe(false);
    expect(success?.light?.hex).toMatch(/^#[\da-f]{8}$/);
    expect(success?.dark?.hex).toMatch(/^#[\da-f]{8}$/);
  });
});
