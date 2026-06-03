import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

import { loadColorTokens, parseTokensMarkdown } from '@/lib/tokens';

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
    expect(parsed.some(t => t.tailwind.includes('text-fg-primary'))).toBe(true);
  });

  it('resolves concrete semantic colours from globals.css', () => {
    const tokens = loadColorTokens(globalsCss);
    const primary = tokens.find(t => t.cssVar === '--surface-primary');
    expect(primary?.light?.hex).toMatch(/^#[\da-f]{8}$/);
    expect(primary?.dark?.hex).toMatch(/^#[\da-f]{8}$/);
  });

  it('resolves status fill colours from globals.css', () => {
    const tokens = loadColorTokens(globalsCss);
    const success = tokens.find(
      t => t.category === 'Status' && t.cssVar === '--status-success',
    );
    expect(success?.patternOnly).toBe(false);
    expect(success?.light?.hex).toBe('#16a34aff');
    expect(success?.dark?.hex).toBe('#4ade80ff');
  });

  it('resolves brand accent primitives from @theme inline', () => {
    const tokens = loadColorTokens(globalsCss);
    const accent = tokens.find(t => t.cssVar === '--brand-accents-qb-accent');
    expect(accent?.light?.hex).toBe('#00a9f4ff');
    expect(accent?.dark?.hex).toBe('#00a9f4ff');
  });

  it('marks wildcard catalogue rows as pattern-only without a bogus cssVar', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    const fillInverse = parsed.find(
      t => t.tailwind === 'bg-fill-*-inverse' && t.category === 'Fill — content',
    );
    expect(fillInverse?.cssVar).toBeNull();
    expect(fillInverse?.patternOnly).toBe(true);
  });

  it('marks elevation utilities as pattern-only (composed shadows)', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    const elevation = parsed.find(t => t.tailwind === 'shadow-elevation-1');
    expect(elevation?.cssVar).toBeNull();
    expect(elevation?.patternOnly).toBe(true);
    expect(elevation?.light).toBeNull();
  });

  it('defines Tailwind color bridges for all documented brand accents', () => {
    expect(globalsCss).toContain(
      '--color-brand-accents-mckinsey-deep-blue: var(--brand-accents-mckinsey-deep-blue)',
    );
    expect(globalsCss).toContain(
      '--color-brand-accents-mckinsey-electric-blue: var(--brand-accents-mckinsey-electric-blue)',
    );
    expect(globalsCss).toContain(
      '--color-brand-accents-mckinsey-cyan: var(--brand-accents-mckinsey-cyan)',
    );
  });
});
