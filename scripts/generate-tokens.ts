/**
 * Tokens generator / validator.
 *
 * Source of truth: Figma DS_Themes collection.
 * Output: public/r/tokens.json — semantic color tokens with descriptions,
 * scopes, alias chains, HEX (8-digit), and OKLCH values for Light + Dark modes.
 *
 * Why this script exists
 * ----------------------
 * Figma's Variables REST endpoint is enterprise-tier, so we currently extract
 * via the Figma Desktop Bridge (an authoring-time JS context running inside
 * the Figma file). The extraction logic that produced `tokens.json` lives in
 * the bridge — see `docs/tokens-extraction.md` (or ask the design system team)
 * for the snippet to re-run when DS_Themes changes.
 *
 * This script's job is to:
 *   1. Validate the shape of `public/r/tokens.json`.
 *   2. Normalise minor format drift (e.g. trim whitespace, sort categories).
 *   3. Re-write it deterministically so PR diffs stay clean.
 *   4. Print summary stats.
 *
 * Run it whenever you've pasted in a fresh extraction:
 *   npm run tokens:generate
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const TOKENS_PATH = path.join(__dirname, '..', 'src', 'data', 'tokens.json');

interface TokenLeaf {
  alias: string | null;
  hex: string;
  oklch: string;
}

interface Token {
  name: string;
  category: string;
  cssVar: string;
  description: string;
  scopes: string[];
  light: TokenLeaf;
  dark: TokenLeaf;
}

interface TokensFile {
  $schema?: string;
  name: string;
  type: string;
  description: string;
  source: { figmaCollection: string; generatedFrom: string };
  generatedAt: string;
  count: number;
  tokens: Token[];
}

const KNOWN_CATEGORIES = [
  'Surface',
  'Fill',
  'Text',
  'Border',
  'Status',
  'StatesLayer-Overlay',
  'Elevations',
] as const;

function fail(msg: string): never {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function validate(data: unknown): asserts data is TokensFile {
  if (!data || typeof data !== 'object') fail('tokens.json is not an object');
  const d = data as TokensFile;
  if (d.type !== 'registry:tokens')
    fail(`Expected type "registry:tokens", got "${d.type}"`);
  if (!Array.isArray(d.tokens)) fail('Missing or invalid "tokens" array');
  if (d.tokens.length === 0) fail('No tokens in file');

  const seenCssVars = new Set<string>();
  for (const t of d.tokens) {
    if (!t.name) fail(`Token missing name: ${JSON.stringify(t)}`);
    if (!t.cssVar?.startsWith('--'))
      fail(`Invalid cssVar on "${t.name}": ${t.cssVar}`);
    if (seenCssVars.has(t.cssVar)) fail(`Duplicate cssVar: ${t.cssVar}`);
    seenCssVars.add(t.cssVar);
    if (!t.light?.hex || !t.dark?.hex) fail(`Missing hex on "${t.name}"`);
    if (!t.light?.oklch || !t.dark?.oklch) fail(`Missing oklch on "${t.name}"`);
    if (!Array.isArray(t.scopes)) fail(`Invalid scopes on "${t.name}"`);
  }
}

function normalise(data: TokensFile): TokensFile {
  const tokens = data.tokens.map(t => ({
    ...t,
    description: (t.description || '').trim(),
    scopes: [...(t.scopes || [])].sort(),
  }));

  return {
    ...data,
    count: tokens.length,
    tokens,
  };
}

function summarise(data: TokensFile): void {
  const byCategory = new Map<string, number>();
  let withoutDescription = 0;
  for (const t of data.tokens) {
    byCategory.set(t.category, (byCategory.get(t.category) ?? 0) + 1);
    if (!t.description) withoutDescription++;
  }

  console.log(`✓ tokens.json valid — ${data.count} tokens`);
  console.log(`  source: ${data.source.figmaCollection}`);
  console.log(`  generated: ${data.generatedAt}`);
  console.log('  by category:');
  for (const cat of KNOWN_CATEGORIES) {
    if (byCategory.has(cat))
      console.log(`    ${cat.padEnd(22)} ${byCategory.get(cat)}`);
  }
  for (const [cat, n] of byCategory) {
    if (!KNOWN_CATEGORIES.includes(cat as (typeof KNOWN_CATEGORIES)[number])) {
      console.log(`    ${cat.padEnd(22)} ${n}  (unknown category)`);
    }
  }
  if (withoutDescription > 0) {
    console.log(`  ⚠ ${withoutDescription} token(s) without description`);
  }
}

function main(): void {
  if (!fs.existsSync(TOKENS_PATH)) {
    fail(`tokens.json not found at ${TOKENS_PATH}`);
  }

  const raw = fs.readFileSync(TOKENS_PATH, 'utf8');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    fail(`tokens.json is not valid JSON: ${(err as Error).message}`);
  }

  validate(parsed);
  const normalised = normalise(parsed);
  fs.writeFileSync(
    TOKENS_PATH,
    `${JSON.stringify(normalised, null, 2)}\n`,
    'utf8',
  );

  summarise(normalised);
}

main();
