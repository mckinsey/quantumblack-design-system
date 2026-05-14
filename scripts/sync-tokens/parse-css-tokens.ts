/**
 * Parse `src/styles/globals.css` into a normalised CSS-token snapshot.
 *
 * Output: `scripts/sync-tokens/.cache/css-snapshot.json`
 *
 * The snapshot has this shape:
 *   {
 *     sourcePath: 'src/styles/globals.css',
 *     extractedAt: '2026-...',
 *     tokens: {
 *       '--token-name': {
 *         theme:  { rawValue: 'var(--foo)', resolvedValue: 'oklch(...)' },   // @theme inline
 *         light:  { rawValue: 'oklch(...)', resolvedValue: 'oklch(...)' },   // :root
 *         dark:   { rawValue: 'oklch(...)', resolvedValue: 'oklch(...)' },   // .dark
 *         radius: { rawValue: '8px',         resolvedValue: '8px' }          // .radius-mode
 *       }
 *     },
 *     unresolved: ['--foo', ...]   // tokens whose var() chain could not be resolved
 *   }
 *
 * Why this shape: the diff step needs to compare per-mode resolved values
 * against Figma's per-mode values, AND it needs to know whether a `--color-*`
 * alias exists in `@theme inline` so Tailwind utilities are wired up.
 *
 * Run: `npm run tokens:parse`
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import postcss, { type Declaration, type Root, type Rule, type AtRule } from 'postcss';

const REPO_ROOT = path.resolve(__dirname, '..', '..');
const CSS_PATH = path.join(REPO_ROOT, 'src', 'styles', 'globals.css');
const CACHE_DIR = path.join(__dirname, '.cache');
const OUT_PATH = path.join(CACHE_DIR, 'css-snapshot.json');
const TAILWIND_PALETTE_PATH = path.join(__dirname, 'tailwind-palette.json');

// Load Tailwind v4 default colour palette (oklch values). Used so that
// `var(--color-red-700)` references resolve to the same oklch string Figma
// produces for its own primitives.
const tailwindPaletteRaw = JSON.parse(fs.readFileSync(TAILWIND_PALETTE_PATH, 'utf8')) as Record<string, string>;
const TAILWIND_PALETTE: Record<string, string> = {};
for (const [k, v] of Object.entries(tailwindPaletteRaw)) {
  if (k.startsWith('$')) continue;
  TAILWIND_PALETTE[`--color-${k}`] = v;
}

type Mode = 'theme' | 'light' | 'dark' | 'radius';

interface TokenValue {
  rawValue: string;
  resolvedValue: string | null;
}

interface TokenRecord {
  theme?: TokenValue;
  light?: TokenValue;
  dark?: TokenValue;
  radius?: TokenValue;
}

interface CssSnapshot {
  sourcePath: string;
  extractedAt: string;
  tokenCount: number;
  tokens: Record<string, TokenRecord>;
  unresolved: string[];
}

/**
 * Walk the postcss AST and bucket every `--*` declaration by the selector /
 * at-rule that contains it. We only care about four containers:
 *   - `@theme inline`  -> mode=theme    (Tailwind aliases like --color-*)
 *   - `:root`          -> mode=light    (default values + light mode overrides)
 *   - `.dark`          -> mode=dark     (dark mode overrides)
 *   - `.radius-mode`   -> mode=radius   (rounded radius overrides)
 *
 * Anything else (`@utility`, `@layer`, etc.) is ignored — those are utility
 * classes, not tokens.
 */
function collectRawDeclarations(root: Root): Map<string, Map<Mode, string>> {
  const result = new Map<string, Map<Mode, string>>();

  const record = (mode: Mode, decl: Declaration) => {
    if (!decl.prop.startsWith('--')) return;
    const name = decl.prop;
    if (!result.has(name)) result.set(name, new Map());
    result.get(name)!.set(mode, decl.value);
  };

  root.walk((node) => {
    if (node.type === 'atrule') {
      const at = node as AtRule;
      if (at.name === 'theme' && at.params.trim() === 'inline') {
        at.walkDecls((d) => record('theme', d));
      }
    } else if (node.type === 'rule') {
      const rule = node as Rule;
      const selectors = rule.selectors.map((s) => s.trim());
      if (selectors.includes(':root')) {
        rule.walkDecls((d) => record('light', d));
      } else if (selectors.includes('.dark')) {
        rule.walkDecls((d) => record('dark', d));
      } else if (selectors.includes('.radius-mode')) {
        rule.walkDecls((d) => record('radius', d));
      }
    }
  });

  return result;
}

/**
 * Tailwind v4 ships a default colour palette as `--color-{family}-{shade}`
 * custom properties via `@import 'tailwindcss'`. They're not defined in our
 * `globals.css`, so the resolver would otherwise treat them as missing. We
 * recognise them as terminal "external" values and pass them through verbatim
 * (`var(--color-red-700)`) so the diff can compare by primitive reference.
 */
const TAILWIND_FAMILIES = new Set([
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
  'rose', 'slate', 'gray', 'zinc', 'neutral', 'stone',
]);

function isTailwindPrimitive(name: string): boolean {
  const m = name.match(/^--color-([a-z]+)-(\d+)$/);
  if (!m) return false;
  return TAILWIND_FAMILIES.has(m[1]);
}

/**
 * Convert any 6/8-digit HEX literal in a value string to its oklch() equivalent.
 * Mirrors `scripts/migrate-primitives-to-oklch.ts` so the snapshot is colour-
 * notation-normalised: CSS-side primitives stored as `#10121b` become directly
 * comparable to Figma-side primitives stored as `oklch(...)`.
 */
function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function hexToOklch(hex: string): string {
  const m = hex.match(/^#([0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/);
  if (!m) return hex;
  const rgb = m[1];
  const aa = m[2];
  const r = parseInt(rgb.slice(0, 2), 16) / 255;
  const g = parseInt(rgb.slice(2, 4), 16) / 255;
  const b = parseInt(rgb.slice(4, 6), 16) / 255;
  const alpha = aa ? parseInt(aa, 16) / 255 : 1;
  const rL = srgbToLinear(r);
  const gL = srgbToLinear(g);
  const bL = srgbToLinear(b);
  const lL = 0.4122214708 * rL + 0.5363325363 * gL + 0.0514459929 * bL;
  const mL = 0.2119034982 * rL + 0.6806995451 * gL + 0.1073969566 * bL;
  const sL = 0.0883024619 * rL + 0.2817188376 * gL + 0.6299787005 * bL;
  const lC = Math.cbrt(lL);
  const mC = Math.cbrt(mL);
  const sC = Math.cbrt(sL);
  const L = 0.2104542553 * lC + 0.793617785 * mC - 0.0040720468 * sC;
  const a = 1.9779984951 * lC - 2.428592205 * mC + 0.4505937099 * sC;
  const b2 = 0.0259040371 * lC + 0.7827717662 * mC - 0.808675766 * sC;
  const C = Math.sqrt(a * a + b2 * b2);
  let h = (Math.atan2(b2, a) * 180) / Math.PI;
  if (h < 0) h += 360;
  if (C < 0.0001) h = 0;
  const Lp = `${(L * 100).toFixed(2)}%`;
  const Cf = C.toFixed(4);
  const hf = h.toFixed(2);
  return alpha < 0.999
    ? `oklch(${Lp} ${Cf} ${hf} / ${alpha.toFixed(2)})`
    : `oklch(${Lp} ${Cf} ${hf})`;
}

function normaliseColourNotation(value: string): string {
  return value.replace(/#[0-9a-fA-F]{6,8}\b/g, (h) => hexToOklch(h));
}

/**
 * Resolve a CSS value by following `var(--foo)` references through the chain.
 *
 * Strategy: for the requested mode, look up the referenced var. If the
 * referenced var is mode-specific (e.g. `--text-primary` exists in both `light`
 * and `dark`), use the matching mode's value. Otherwise fall back to whichever
 * value is available (`theme` or the other mode).
 *
 * Tailwind v4 built-in primitives (`--color-<family>-<shade>`) are recognised
 * as terminal values and emitted as `var(--color-...)` so the diff can compare
 * them by name against Figma's own primitive references.
 *
 * Returns null if the chain cycles or cannot be resolved.
 */
function resolveValue(
  raw: string,
  mode: Mode,
  decls: Map<string, Map<Mode, string>>,
  seen: Set<string> = new Set(),
): string | null {
  // Match var(--name [, fallback]) — we only follow the primary reference.
  const varRe = /var\(\s*(--[a-z0-9-]+)\s*(?:,[^)]*)?\)/gi;

  let result = raw;
  let changed = true;
  let iterations = 0;
  while (changed && iterations < 50) {
    changed = false;
    iterations += 1;
    result = result.replace(varRe, (_match, refName: string) => {
      if (seen.has(refName)) {
        return `__CYCLE(${refName})__`;
      }
      const refModes = decls.get(refName);
      if (!refModes) {
        // Resolve Tailwind v4 built-in primitives (--color-red-700 etc.) to
        // their actual oklch value via the palette table. Falls back to a
        // verbatim var(...) reference if the family isn't in our table.
        if (TAILWIND_PALETTE[refName]) {
          changed = true;
          return TAILWIND_PALETTE[refName];
        }
        if (isTailwindPrimitive(refName)) {
          return `var(${refName})`;
        }
        return `__MISSING(${refName})__`;
      }
      // Mode-priority: requested mode -> theme -> light -> dark -> radius
      const tryOrder: Mode[] =
        mode === 'dark' ? ['dark', 'theme', 'light', 'radius']
        : mode === 'radius' ? ['radius', 'theme', 'light', 'dark']
        : mode === 'theme' ? ['theme', 'light', 'dark', 'radius']
        : ['light', 'theme', 'dark', 'radius'];
      let chosen: string | undefined;
      for (const m of tryOrder) {
        if (refModes.has(m)) {
          chosen = refModes.get(m)!;
          break;
        }
      }
      if (chosen === undefined) return `__MISSING(${refName})__`;
      changed = true;
      const nextSeen = new Set(seen);
      nextSeen.add(refName);
      const inner = resolveValue(chosen, mode, decls, nextSeen);
      return inner ?? `__UNRESOLVED(${refName})__`;
    });
  }

  if (
    result.includes('__CYCLE(') ||
    result.includes('__MISSING(') ||
    result.includes('__UNRESOLVED(')
  ) {
    return null;
  }
  return normaliseColourNotation(result.trim());
}

function parseCss(input: string): CssSnapshot {
  const root = postcss.parse(input);
  const rawDecls = collectRawDeclarations(root);

  const tokens: Record<string, TokenRecord> = {};
  const unresolved: string[] = [];

  // Sort so output is stable across runs.
  const names = Array.from(rawDecls.keys()).sort();
  for (const name of names) {
    const modes = rawDecls.get(name)!;
    const record: TokenRecord = {};
    for (const [mode, raw] of modes.entries()) {
      const resolved = resolveValue(raw, mode, rawDecls);
      record[mode] = { rawValue: raw, resolvedValue: resolved };
      if (resolved === null) unresolved.push(`${name}@${mode}`);
    }
    tokens[name] = record;
  }

  return {
    sourcePath: path.relative(REPO_ROOT, CSS_PATH),
    extractedAt: new Date().toISOString(),
    tokenCount: names.length,
    tokens,
    unresolved,
  };
}

function main(): void {
  if (!fs.existsSync(CSS_PATH)) {
    console.error(`✗ Could not find ${CSS_PATH}`);
    process.exit(1);
  }
  const input = fs.readFileSync(CSS_PATH, 'utf8');
  const snapshot = parseCss(input);

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(snapshot, null, 2), 'utf8');

  console.log(`✓ Parsed ${snapshot.tokenCount} CSS custom properties from globals.css`);
  console.log(`  → ${path.relative(REPO_ROOT, OUT_PATH)}`);
  if (snapshot.unresolved.length > 0) {
    console.log('');
    console.log(`! ${snapshot.unresolved.length} unresolved var() references:`);
    for (const u of snapshot.unresolved.slice(0, 10)) console.log(`  - ${u}`);
    if (snapshot.unresolved.length > 10) {
      console.log(`  ... and ${snapshot.unresolved.length - 10} more`);
    }
  }
}

main();
