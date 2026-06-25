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

  it('skips the document title and intro sections', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    expect(parsed.some(t => t.category === 'QBDS Tokens')).toBe(false);
    expect(parsed.some(t => t.category === 'How to choose a token')).toBe(
      false,
    );
    expect(parsed.some(t => t.category === 'Quick rules')).toBe(false);
  });

  it('resolves concrete semantic colours from globals.css', () => {
    const tokens = loadColorTokens(globalsCss);
    const primary = tokens.find(t => t.cssVar === '--surface-primary');
    expect(primary?.light?.value).toBe('#ffffffff');
    expect(primary?.light?.alias).toBe('--mist-50');
    expect(primary?.dark?.value).toBe('#181b26ff');
    expect(primary?.dark?.alias).toBe('--slate-800');
  });

  it('resolves distinct dark surface colours', () => {
    const tokens = loadColorTokens(globalsCss);
    const surface = tokens.filter(t => t.category === 'Surface');
    const darkValues = surface.map(t => t.dark?.value);
    expect(new Set(darkValues).size).toBe(surface.length);
    expect(surface.find(t => t.cssVar === '--surface-base')?.dark?.value).toBe(
      '#141721ff',
    );
    expect(
      surface.find(t => t.cssVar === '--surface-tertiary')?.dark?.value,
    ).toBe('#232632ff');
  });

  it('resolves text colours from bridge-notation catalogue rows', () => {
    const tokens = loadColorTokens(globalsCss);
    const primary = tokens.find(
      t => t.category === 'Text' && t.name === 'Text/Primary',
    );
    expect(primary?.patternOnly).toBe(false);
    expect(primary?.cssVar).toBe('--text-primary');
    expect(primary?.light?.value).toMatch(/^#[\da-f]{8}$/);
    expect(primary?.dark?.value).toMatch(/^#[\da-f]{8}$/);
    expect(primary?.light?.value).not.toBe(primary?.dark?.value);
  });

  it('resolves border colours from bridge-notation catalogue rows', () => {
    const tokens = loadColorTokens(globalsCss);
    const divider = tokens.find(
      t => t.category === 'Border / Stroke' && t.name === 'Border/Divider',
    );
    expect(divider?.patternOnly).toBe(false);
    expect(divider?.cssVar).toBe('--border-divider');
    expect(divider?.light?.value).toMatch(/^#[\da-f]{8}$/);
    expect(divider?.dark?.value).toMatch(/^#[\da-f]{8}$/);
  });

  it('resolves status fill colours from globals.css', () => {
    const tokens = loadColorTokens(globalsCss);
    const success = tokens.find(
      t => t.category === 'Status' && t.cssVar === '--status-success',
    );
    expect(success?.patternOnly).toBe(false);
    expect(success?.light?.value).toBe('#16a34aff');
    expect(success?.dark?.value).toBe('#4ade80ff');
  });

  it('resolves brand accent primitives from @theme inline', () => {
    const tokens = loadColorTokens(globalsCss);
    const accent = tokens.find(t => t.cssVar === '--brand-accents-qb-accent');
    expect(accent?.light?.value).toBe('#00a9f4ff');
    expect(accent?.dark?.value).toBe('#00a9f4ff');
  });

  it('resolves all non-pattern registry colours to 8-digit hex', () => {
    const tokens = loadColorTokens(globalsCss);
    for (const token of tokens) {
      if (token.patternOnly) continue;
      if (token.light) expect(token.light.value).toMatch(/^#[\da-f]{8}$/);
      if (token.dark) expect(token.dark.value).toMatch(/^#[\da-f]{8}$/);
    }
  });

  it('marks multi-variable catalogue rows as pattern-only without a bogus cssVar', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    const onSurfaceInverse = parsed.find(
      t =>
        t.tailwind.includes('bg-fill-subtle-inverse') &&
        t.category === 'Fill — onSurface',
    );
    expect(onSurfaceInverse?.cssVar).toBeNull();
    expect(onSurfaceInverse?.patternOnly).toBe(true);
  });

  it('marks wildcard catalogue rows as pattern-only without a bogus cssVar', () => {
    const parsed = parseTokensMarkdown(tokensMd);
    const fillInverse = parsed.find(
      t =>
        t.tailwind === 'bg-fill-*-inverse' && t.category === 'Fill — content',
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
    expect(elevation?.description).toBe('Subtle lift');
    const modal = parsed.find(t => t.tailwind === 'shadow-elevation-3');
    expect(modal?.description).toBe('Modal / popover');
    expect(modal?.description).not.toContain('--elevations');
  });

  it('defines Tailwind color bridges for all documented brand accents', () => {
    const accents = [
      'mckinsey-deep-blue',
      'mckinsey-electric-blue',
      'mckinsey-cyan',
    ] as const;

    for (const name of accents) {
      expect(globalsCss).toMatch(
        new RegExp(
          `--color-brand-accents-${name}:\\s*var\\(\\s*--brand-accents-${name}\\s*\\)`,
        ),
      );
    }
  });
});
