import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

function loadFigmaUrlRe(): RegExp {
  const toml = fs.readFileSync(path.join(REPO_ROOT, '.gitleaks.toml'), 'utf8');
  const match = toml.match(
    /id\s*=\s*"figma-url"[\s\S]*?regex\s*=\s*'''([^']+)'''/,
  );

  if (!match?.[1]) {
    throw new Error('figma-url regex missing from .gitleaks.toml');
  }

  return new RegExp(match[1]);
}

const FIGMA_URL_RE = loadFigmaUrlRe();
const HOST = 'figma' + '.com';

describe('figma-url gitleaks regex', () => {
  it.each([
    `https://www.${HOST}/design/fakeFileKey000000000000/QBDS-v0?node-id=1-2`,
    `http://${HOST}/file/abc`,
    `FIGMA_URL_QBDS_CHECKBOX=https://www.${HOST}/design/fakeFileKey000000000000/QBDS-v0?node-id=1-2`,
    `See https://${HOST}/design/x`,
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
