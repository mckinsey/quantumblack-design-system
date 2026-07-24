import { describe, expect, it } from 'vitest';

const FIGMA_URL_RE = /https?:\/\/([a-zA-Z0-9-]+\.)?figma\.com\//;

describe('figma-url gitleaks regex', () => {
  it.each([
    'https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=36231-110652',
    'http://figma.com/file/abc',
    'FIGMA_URL_QBDS_CHECKBOX=https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr/QBDS-v2.0.0?node-id=36231-110652',
    'See https://figma.com/design/x',
  ])('blocks %s', line => {
    expect(FIGMA_URL_RE.test(line)).toBe(true);
  });

  it.each([
    'or a figma.com URL alongside work in src/components/ui/',
    'FIGMA_URL_QBDS_CHECKBOX=',
    'FIGMA_URL_QBDS_AVATAR=',
    'documentUrlSubstitutions built from every FIGMA_URL_* env var',
    '<QBDS_BADGE_NUMERIC>',
  ])('allows %s', line => {
    expect(FIGMA_URL_RE.test(line)).toBe(false);
  });
});
