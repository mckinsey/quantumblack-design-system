/**
 * Compare the Figma snapshot against the CSS snapshot and produce an audit.
 *
 * Inputs (read from `scripts/sync-tokens/.cache/`):
 *   - figma-snapshot.json   (produced by `npm run tokens:fetch`)
 *   - css-snapshot.json     (produced by `npm run tokens:parse`)
 *
 * Outputs (written to `scripts/sync-tokens/.cache/`):
 *   - tokens-diff.json      machine-readable diff
 *   - tokens-audit.md       human-readable audit report
 *
 * The audit categorises every discrepancy into one of:
 *
 *   1. NEW IN FIGMA          variable exists in Figma, no CSS counterpart
 *   2. CSS-ONLY              variable exists in globals.css, no Figma equivalent
 *   3. VALUE DRIFT           name matches, resolved value differs (per mode)
 *   4. MISSING --color ALIAS semantic token exists but @theme inline doesn't
 *                            expose a `--color-*` Tailwind utility for it
 *   5. CONSUMER COUNTS       for any DRIFT token, count usages in src/
 *
 * The script writes files only — it never modifies globals.css. The agent
 * (or human) reads the audit and proposes targeted edits.
 *
 * Run: `npm run tokens:diff`
 */
import * as fs from 'node:fs';
import * as path from 'node:path';
import { execSync } from 'node:child_process';

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..');
const CACHE_DIR = path.join(SCRIPT_DIR, '.cache');
const MAPPING_PATH = path.join(SCRIPT_DIR, 'token-mapping.json');
const FIGMA_SNAPSHOT = path.join(CACHE_DIR, 'figma-snapshot.json');
const CSS_SNAPSHOT = path.join(CACHE_DIR, 'css-snapshot.json');
const DIFF_JSON = path.join(CACHE_DIR, 'tokens-diff.json');
const AUDIT_MD = path.join(CACHE_DIR, 'tokens-audit.md');

// ---------- types (mirror the shape written by parse / fetch) ----------

interface TokenMapping {
  figmaFileKey: string;
  stripPrefixes: string[];
  stripInfixes?: string[];
  modeAliases: { light: string[]; dark: string[]; radius?: string[] };
  collectionScope: { include: string[]; exclude: string[] };
  overrides: Record<string, string>;
  ignoreFigmaVariables: string[];
  ignoreCssTokens: string[];
}

interface CssSnapshot {
  sourcePath: string;
  extractedAt: string;
  tokenCount: number;
  tokens: Record<string, {
    theme?: { rawValue: string; resolvedValue: string | null };
    light?: { rawValue: string; resolvedValue: string | null };
    dark?: { rawValue: string; resolvedValue: string | null };
    radius?: { rawValue: string; resolvedValue: string | null };
  }>;
  unresolved: string[];
}

interface FigmaSnapshot {
  fileKey: string;
  fetchedAt: string;
  source: 'rest' | 'mcp';
  collections: Array<{ id: string; name: string; defaultMode: string; modes: string[] }>;
  variableCount: number;
  variables: Array<{
    figmaName: string;
    collection: string;
    type: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
    valuesByMode: Record<string, { raw: unknown; resolved: string | null }>;
    scopes: string[];
  }>;
}

// ---------- name mapping ----------

// Tailwind v4 colour families. Variables matching `--color-{family}-{shade}`
// are externally provided by `@import 'tailwindcss'`; we trust their runtime
// values and only verify Figma references them by name (no value comparison).
const TAILWIND_FAMILIES = new Set([
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink',
  'rose', 'gray', 'zinc', 'neutral', 'stone',
  // Note: 'slate' deliberately omitted — QBDS overrides it with its own ramp.
]);

function isTailwindPrimitiveCssName(name: string): boolean {
  const m = name.match(/^--color-([a-z]+)-(\d+)$/);
  if (!m) return false;
  return TAILWIND_FAMILIES.has(m[1]);
}

/**
 * Normalise a Figma variable name to its expected CSS custom-property name.
 *
 *   "DS-Primitives/Spacing/16"  -> "--spacing-16"   (after stripPrefixes)
 *   "Tokens/Text/Primary"       -> "--text-primary"
 *   "Surface/Bg/Primary"        -> "--surface-bg-primary"
 *   "blue/600"                  -> "--color-blue-600"  (Tailwind family)
 *   "slate/50"                  -> "--slate-50"       (CSS has --slate-50, QBDS-custom)
 *
 * Strategy: kebab-case the name, then prefer whichever of `--color-X` or `--X`
 * actually exists in the CSS snapshot. For Tailwind palette families that
 * QBDS doesn't override, default to the `--color-` form even when not in
 * snapshot (Tailwind injects them at build time). Explicit overrides win.
 */
function figmaNameToCssToken(
  name: string,
  mapping: TokenMapping,
  cssTokens: CssSnapshot['tokens'],
): string {
  let working = name;
  for (const prefix of mapping.stripPrefixes) {
    if (working.startsWith(prefix)) {
      working = working.slice(prefix.length);
      break;
    }
  }
  for (const infix of mapping.stripInfixes ?? []) {
    if (infix.startsWith('_comment')) continue;
    working = working.split(infix).join('');
  }
  if (mapping.overrides[name]) return mapping.overrides[name];
  if (mapping.overrides[working]) return mapping.overrides[working];
  // Normalise Unicode dash variants (en-dash, em-dash, figure-dash) to ASCII
  // hyphen, then kebab-case. Figma libraries sometimes use `–` for visual
  // grouping, e.g. `Elevations/Shade–01`.
  const kebab = working
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')   // Unicode dashes -> ASCII hyphen
    .replace(/_/g, '-')                  // Underscores -> hyphen (e.g. Shade_T)
    .replace(/\s+/g, '-')
    .replace(/\//g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')                 // Collapse runs of hyphens
    .replace(/^-|-$/g, '');              // Trim leading/trailing hyphens
  const plain = `--${kebab}`;
  const colorPrefixed = `--color-${kebab}`;
  // Prefer whichever form exists in CSS. If both exist, prefer plain (the
  // primitive declaration site, not the @theme alias).
  if (cssTokens[plain]) return plain;
  if (cssTokens[colorPrefixed]) return colorPrefixed;
  // Tailwind palette primitives are not declared locally but exist at runtime
  // via `@import 'tailwindcss'`. Map them to the --color-* form so the diff
  // can recognise them as externally-provided.
  if (isTailwindPrimitiveCssName(colorPrefixed)) return colorPrefixed;
  return plain;
}

/**
 * Map a Figma mode name to the CSS-snapshot mode key.
 * Mode-invariant collections (single mode) map to `light` (the :root values).
 */
function figmaModeToCssMode(modeName: string, mapping: TokenMapping): 'light' | 'dark' | 'radius' {
  const lower = modeName.toLowerCase();
  if (mapping.modeAliases.dark.some((a) => a.toLowerCase() === lower)) return 'dark';
  if (mapping.modeAliases.radius?.some((a) => a.toLowerCase() === lower)) return 'radius';
  return 'light';
}

// ---------- value comparison ----------

/**
 * Compare two resolved CSS values for "design equivalence".
 *
 * Tolerance tuned to absorb noise from:
 *   - Tailwind palette quantisation (<0.02% L drift between Figma's stored
 *     primitive values and our hardcoded Tailwind v4 palette table)
 *   - Figma's RGBA-to-oklch conversion vs our own
 *   - Token authors rounding to 2 decimal places in either tool
 *
 * It still catches a single-shade drift (e.g. red-600 vs red-700 differs
 * by ~7% L) and family swaps (e.g. cyan vs sky differs by ~20deg hue).
 *
 * String values (e.g. font weight names) drop quotes before comparison so
 * `'Light'` matches `Light`.
 */
function valuesEquivalent(a: string | null, b: string | null): boolean {
  if (a === null || b === null) return false;
  const stripQuotes = (s: string) => s.replace(/^['"]|['"]$/g, '');
  const norm = (s: string) => stripQuotes(s.replace(/\s+/g, ' ').trim()).toLowerCase();
  const aN = norm(a);
  const bN = norm(b);
  if (aN === bN) return true;

  const oklchRe = /^oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+))?\s*\)$/;
  const aM = aN.match(oklchRe);
  const bM = bN.match(oklchRe);
  if (aM && bM) {
    const [, aL, aC, aH, aA = '1'] = aM;
    const [, bL, bC, bH, bA = '1'] = bM;
    const close = (x: string, y: string, tol: number) => Math.abs(parseFloat(x) - parseFloat(y)) < tol;
    return (
      close(aL, bL, 1.0) &&    // lightness within 1.0% (one shade is ~7%)
      close(aC, bC, 0.03) &&   // chroma within 0.03
      close(aH, bH, 3.0) &&    // hue within 3deg (a family swap is ~20deg)
      close(aA, bA, 0.02)      // alpha within 0.02 (Figma rounds to 2 dp)
    );
  }
  return false;
}

// ---------- consumer counting ----------

const consumerCache = new Map<string, number>();

/**
 * Count how many src/ files reference a CSS token (excluding globals.css
 * itself, where it's defined). Uses ripgrep for speed; falls back to 0 on
 * error so the audit still completes.
 */
function countConsumers(token: string): number {
  if (consumerCache.has(token)) return consumerCache.get(token)!;
  try {
    // Match the token name as a whole word, ignoring its definition site.
    // We look in src/components and src/app primarily, plus globals.css for
    // self-references (e.g. one semantic token aliasing another).
    const cmd = `rg --no-messages --count-matches -F ${JSON.stringify(token)} src/components src/app src/styles 2>/dev/null || true`;
    const out = execSync(cmd, { cwd: REPO_ROOT, encoding: 'utf8' });
    let total = 0;
    for (const line of out.split('\n')) {
      const m = line.match(/:(\d+)$/);
      if (m) total += parseInt(m[1], 10);
    }
    // Subtract the definition lines in globals.css (1 in :root, optionally 1 in .dark, 1 in @theme inline).
    const definitionsInGlobals = (() => {
      try {
        const css = fs.readFileSync(path.join(REPO_ROOT, 'src/styles/globals.css'), 'utf8');
        const re = new RegExp(`^\\s*${token.replace(/-/g, '\\-')}\\s*:`, 'gm');
        return (css.match(re) ?? []).length;
      } catch {
        return 0;
      }
    })();
    const consumers = Math.max(0, total - definitionsInGlobals);
    consumerCache.set(token, consumers);
    return consumers;
  } catch {
    consumerCache.set(token, 0);
    return 0;
  }
}

// ---------- diff ----------

interface DiffEntry {
  cssToken: string;
  figmaName: string | null;
  collection: string | null;
  type: 'NEW_IN_FIGMA' | 'CSS_ONLY' | 'VALUE_DRIFT' | 'MISSING_COLOR_ALIAS';
  details: {
    light?: { figma: string | null; css: string | null };
    dark?: { figma: string | null; css: string | null };
    radius?: { figma: string | null; css: string | null };
    consumers?: number;
    note?: string;
  };
}

interface Diff {
  generatedAt: string;
  figmaFileKey: string;
  summary: {
    totalFigmaVariables: number;
    totalCssTokens: number;
    newInFigma: number;
    cssOnly: number;
    valueDrift: number;
    missingColorAlias: number;
    inSync: number;
  };
  entries: DiffEntry[];
}

function buildDiff(
  figma: FigmaSnapshot,
  css: CssSnapshot,
  mapping: TokenMapping,
): Diff {
  const entries: DiffEntry[] = [];
  const ignoreFigma = new Set(mapping.ignoreFigmaVariables.filter((s) => !s.startsWith('_comment')));
  const ignoreCss = new Set(mapping.ignoreCssTokens.filter((s) => !s.startsWith('_comment')));

  let inSync = 0;

  // Index Figma variables by their expected CSS token name.
  const figmaByCssName = new Map<string, FigmaSnapshot['variables'][number]>();
  for (const v of figma.variables) {
    if (ignoreFigma.has(v.figmaName)) continue;
    const cssName = figmaNameToCssToken(v.figmaName, mapping, css.tokens);
    figmaByCssName.set(cssName, v);
  }

  // 1. NEW_IN_FIGMA + VALUE_DRIFT
  for (const [cssName, v] of figmaByCssName.entries()) {
    // Tailwind palette primitives (--color-red-700 etc.) are externally
    // provided by @import 'tailwindcss'. We don't declare them locally and
    // we don't try to override Tailwind's runtime values, so the only thing
    // worth checking is that Figma references them by the right name. If it
    // does, count as in-sync without any value comparison.
    if (isTailwindPrimitiveCssName(cssName)) {
      inSync += 1;
      continue;
    }

    const cssToken = css.tokens[cssName];
    if (!cssToken) {
      entries.push({
        cssToken: cssName,
        figmaName: v.figmaName,
        collection: v.collection,
        type: 'NEW_IN_FIGMA',
        details: {
          note: `Add to globals.css. Figma value(s): ${Object.entries(v.valuesByMode)
            .map(([mode, val]) => `${mode}=${val.resolved}`)
            .join(', ')}`,
        },
      });
      continue;
    }

    // Compare per mode. If the CSS token only exists in @theme inline (e.g.
    // `--font-font-size-12: 12px;`), fall back to that value for the
    // requested mode — it acts as the unconditional baseline.
    const themeFallback = cssToken.theme?.resolvedValue ?? null;
    const driftDetails: DiffEntry['details'] = {};
    let drifted = false;
    for (const [modeName, val] of Object.entries(v.valuesByMode)) {
      const cssMode = figmaModeToCssMode(modeName, mapping);
      const cssVal = cssToken[cssMode]?.resolvedValue ?? themeFallback;
      if (val.resolved === null) continue; // unresolvable Figma value, skip
      if (!valuesEquivalent(val.resolved, cssVal)) {
        drifted = true;
        driftDetails[cssMode] = { figma: val.resolved, css: cssVal };
      }
    }
    if (drifted) {
      driftDetails.consumers = countConsumers(cssName);
      entries.push({
        cssToken: cssName,
        figmaName: v.figmaName,
        collection: v.collection,
        type: 'VALUE_DRIFT',
        details: driftDetails,
      });
    } else {
      inSync += 1;
    }
  }

  // 2. CSS_ONLY
  for (const cssName of Object.keys(css.tokens)) {
    if (ignoreCss.has(cssName)) continue;
    if (figmaByCssName.has(cssName)) continue;
    // Skip primitive ramps that are trivially derived (mist-50, slate-900,
    // mist-50-opacity-8, etc.) — these are intentionally CSS-side primitives
    // referenced via aliases. Heuristic: a single-segment name with a digit
    // suffix is a primitive scale step.
    if (/^--[a-z]+-\d+(?:-opacity-\d+)?$/.test(cssName)) {
      // Only flag as CSS_ONLY if it doesn't appear to be a primitive scale.
      // Most primitives ARE in Figma but under a deeper path (e.g. Color/Mist/50).
      // We skip them here and rely on the override map to surface real mismatches.
      continue;
    }
    // Skip @theme-only `--color-*` aliases — those are wired up automatically
    // when the underlying semantic token exists, so they're not "drift".
    if (cssName.startsWith('--color-')) continue;

    const cssToken = css.tokens[cssName];
    const consumers = countConsumers(cssName);
    entries.push({
      cssToken: cssName,
      figmaName: null,
      collection: null,
      type: 'CSS_ONLY',
      details: {
        consumers,
        light: cssToken.light ? { figma: null, css: cssToken.light.resolvedValue } : undefined,
        dark: cssToken.dark ? { figma: null, css: cssToken.dark.resolvedValue } : undefined,
        note:
          consumers === 0
            ? 'No consumers in src/ — candidate for removal (verify with designer).'
            : `${consumers} consumer reference(s) — propose Figma equivalent or document as CSS-only with sign-off.`,
      },
    });
  }

  // 3. MISSING_COLOR_ALIAS
  // For every semantic token defined in :root (light) or .dark, check if a
  // matching `--color-<token>` alias exists in @theme inline. Without it,
  // Tailwind utilities like `bg-<token>` won't compile.
  for (const [cssName, record] of Object.entries(css.tokens)) {
    if (cssName.startsWith('--color-')) continue;
    if (cssName.startsWith('--text-')) continue; // shadcn shims handled in mapping
    if (cssName.startsWith('--font-')) continue;
    if (cssName.startsWith('--rad-')) continue;
    if (cssName.startsWith('--ds-')) continue; // intentionally not exposed as Tailwind utilities
    if (/^--[a-z]+-\d+(?:-opacity-\d+)?$/.test(cssName)) continue; // primitives
    if (cssName.startsWith('--brand-accents-')) continue;
    if (cssName === '--radius') continue;
    if (!(record.light || record.dark)) continue;
    const aliasName = `--color-${cssName.slice(2)}`;
    if (!css.tokens[aliasName] || !css.tokens[aliasName].theme) {
      entries.push({
        cssToken: cssName,
        figmaName: null,
        collection: null,
        type: 'MISSING_COLOR_ALIAS',
        details: {
          note: `Define \`${aliasName}: var(${cssName});\` inside the @theme inline block to expose a Tailwind utility.`,
        },
      });
    }
  }

  // Sort: drift first (highest impact), then new, then css-only, then alias.
  const order = { VALUE_DRIFT: 0, NEW_IN_FIGMA: 1, CSS_ONLY: 2, MISSING_COLOR_ALIAS: 3 };
  entries.sort((a, b) => {
    if (order[a.type] !== order[b.type]) return order[a.type] - order[b.type];
    return a.cssToken.localeCompare(b.cssToken);
  });

  return {
    generatedAt: new Date().toISOString(),
    figmaFileKey: figma.fileKey,
    summary: {
      totalFigmaVariables: figma.variableCount,
      totalCssTokens: css.tokenCount,
      newInFigma: entries.filter((e) => e.type === 'NEW_IN_FIGMA').length,
      cssOnly: entries.filter((e) => e.type === 'CSS_ONLY').length,
      valueDrift: entries.filter((e) => e.type === 'VALUE_DRIFT').length,
      missingColorAlias: entries.filter((e) => e.type === 'MISSING_COLOR_ALIAS').length,
      inSync,
    },
    entries,
  };
}

// ---------- markdown report ----------

function renderMarkdown(diff: Diff): string {
  const lines: string[] = [];
  lines.push('# QBDS Token Sync Audit');
  lines.push('');
  lines.push(`Generated: \`${diff.generatedAt}\``);
  lines.push(`Figma file: \`${diff.figmaFileKey}\``);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push('| Category | Count | Action |');
  lines.push('|---|---:|---|');
  lines.push(`| In sync | ${diff.summary.inSync} | none |`);
  lines.push(`| Value drift | ${diff.summary.valueDrift} | review per-token (consumer counts shown) |`);
  lines.push(`| New in Figma | ${diff.summary.newInFigma} | additive — safe to add to globals.css |`);
  lines.push(`| CSS-only | ${diff.summary.cssOnly} | propose Figma equivalent OR remove with sign-off |`);
  lines.push(`| Missing \`--color-*\` alias | ${diff.summary.missingColorAlias} | add alias in \`@theme inline\` |`);
  lines.push('');
  lines.push(`Total Figma variables: ${diff.summary.totalFigmaVariables}`);
  lines.push(`Total CSS tokens: ${diff.summary.totalCssTokens}`);
  lines.push('');

  const groups = {
    VALUE_DRIFT: { title: '## 1. Value drift (potentially breaking)', help: 'These tokens exist on both sides but have diverged. Treat the Figma value as source of truth unless the consumer count and review say otherwise. Updating a high-consumer token is a visual change — coordinate with QA.' },
    NEW_IN_FIGMA: { title: '## 2. New in Figma (additive — safe)', help: 'Designer added these in Figma; code does not have them yet. Add to `globals.css` as new tokens. No consumers can break since they don\'t exist in code yet.' },
    CSS_ONLY: { title: '## 3. CSS-only (drift in the other direction)', help: 'These exist in `globals.css` but have no Figma counterpart. Either (a) add them to Figma if they\'re intentional, or (b) remove them from CSS if they were temporary scaffolding. Consumer counts help you decide the impact.' },
    MISSING_COLOR_ALIAS: { title: '## 4. Missing `--color-*` aliases', help: 'These semantic tokens exist in `:root` / `.dark` but have no `--color-*` alias inside `@theme inline`, so Tailwind utilities like `bg-fill-primary` won\'t resolve. Add the alias.' },
  } as const;

  for (const type of Object.keys(groups) as Array<keyof typeof groups>) {
    const items = diff.entries.filter((e) => e.type === type);
    if (items.length === 0) continue;
    const g = groups[type];
    lines.push(g.title);
    lines.push('');
    lines.push(`> ${g.help}`);
    lines.push('');
    lines.push(`Found: **${items.length}**`);
    lines.push('');

    if (type === 'VALUE_DRIFT') {
      lines.push('| CSS Token | Mode | Figma | CSS (current) | Consumers |');
      lines.push('|---|---|---|---|---:|');
      for (const e of items) {
        const consumers = e.details.consumers ?? 0;
        for (const mode of ['light', 'dark', 'radius'] as const) {
          const v = e.details[mode];
          if (!v) continue;
          lines.push(
            `| \`${e.cssToken}\` | ${mode} | \`${v.figma}\` | \`${v.css}\` | ${consumers} |`,
          );
        }
      }
    } else if (type === 'NEW_IN_FIGMA') {
      lines.push('| CSS Token | Figma name | Collection | Suggested values |');
      lines.push('|---|---|---|---|');
      for (const e of items) {
        lines.push(
          `| \`${e.cssToken}\` | \`${e.figmaName}\` | ${e.collection} | ${e.details.note ?? ''} |`,
        );
      }
    } else if (type === 'CSS_ONLY') {
      lines.push('| CSS Token | Light | Dark | Consumers | Note |');
      lines.push('|---|---|---|---:|---|');
      for (const e of items) {
        const lv = e.details.light?.css ?? '—';
        const dv = e.details.dark?.css ?? '—';
        lines.push(
          `| \`${e.cssToken}\` | \`${lv}\` | \`${dv}\` | ${e.details.consumers ?? 0} | ${e.details.note ?? ''} |`,
        );
      }
    } else if (type === 'MISSING_COLOR_ALIAS') {
      lines.push('| CSS Token | Suggested fix |');
      lines.push('|---|---|');
      for (const e of items) {
        lines.push(`| \`${e.cssToken}\` | ${e.details.note ?? ''} |`);
      }
    }
    lines.push('');
  }

  if (diff.entries.length === 0) {
    lines.push('## All clear');
    lines.push('');
    lines.push('No discrepancies found between Figma and `globals.css`. The two are in full parity.');
    lines.push('');
  }

  lines.push('---');
  lines.push('');
  lines.push('## How to use this report');
  lines.push('');
  lines.push('This report is **read-only** — the script never edits `globals.css`. Apply changes by:');
  lines.push('');
  lines.push('1. Reviewing each category above with the design lead.');
  lines.push('2. Asking the agent to apply targeted edits, e.g.:');
  lines.push('   - "Apply the NEW IN FIGMA tokens from the audit."');
  lines.push('   - "Update the VALUE DRIFT entries with 0 consumers."');
  lines.push('   - "For VALUE DRIFT entries with consumers, draft a migration note before changing."');
  lines.push('3. After edits, re-run `npm run tokens:sync` to verify the report goes green.');
  lines.push('4. Run `npm run registry:build` to regenerate `public/r/theme.json` so consumers see the updated tokens.');
  lines.push('');
  lines.push('Add overrides to `scripts/sync-tokens/token-mapping.json` whenever the heuristic name mapping is wrong (e.g. Figma `Surface/Bg/Primary` → CSS `--surface-bg-primary` already works, but a custom path may not).');
  lines.push('');
  lines.push('### Caveats');
  lines.push('');
  lines.push('- **Consumer counts** are direct grep matches on the literal `--token-name` in `src/`. Tokens consumed via Tailwind utilities (e.g. `bg-fill-primary` resolving to `var(--color-fill-primary)`) won\'t appear in this count. Treat consumer=0 as a hint, not authority — confirm with the design lead before deleting anything.');
  lines.push('- **Value drift tolerance** is set to absorb noise from Figma\'s RGBA-to-oklch conversion (~1% L, 0.03 C, 3deg h). A drift inside this band is reported as in-sync.');
  lines.push('- **Tailwind palette primitives** (`--color-red-700` etc.) are externally provided by `@import \'tailwindcss\'`. The audit only verifies Figma references them by name; their values are trusted to match Tailwind\'s runtime defaults.');
  lines.push('');
  return lines.join('\n');
}

// ---------- main ----------

function main(): void {
  if (!fs.existsSync(FIGMA_SNAPSHOT)) {
    console.error('✗ figma-snapshot.json not found. Run `npm run tokens:fetch` first.');
    process.exit(1);
  }
  if (!fs.existsSync(CSS_SNAPSHOT)) {
    console.error('✗ css-snapshot.json not found. Run `npm run tokens:parse` first.');
    process.exit(1);
  }
  const mapping = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8')) as TokenMapping;
  const figma = JSON.parse(fs.readFileSync(FIGMA_SNAPSHOT, 'utf8')) as FigmaSnapshot;
  const css = JSON.parse(fs.readFileSync(CSS_SNAPSHOT, 'utf8')) as CssSnapshot;

  const diff = buildDiff(figma, css, mapping);
  fs.writeFileSync(DIFF_JSON, JSON.stringify(diff, null, 2), 'utf8');
  fs.writeFileSync(AUDIT_MD, renderMarkdown(diff), 'utf8');

  console.log('');
  console.log('═══ QBDS Token Sync Audit ═══');
  console.log(`  in sync:                 ${diff.summary.inSync.toString().padStart(4)}`);
  console.log(`  value drift:             ${diff.summary.valueDrift.toString().padStart(4)}`);
  console.log(`  new in Figma:            ${diff.summary.newInFigma.toString().padStart(4)}`);
  console.log(`  CSS-only:                ${diff.summary.cssOnly.toString().padStart(4)}`);
  console.log(`  missing --color alias:   ${diff.summary.missingColorAlias.toString().padStart(4)}`);
  console.log('');
  console.log(`✓ Wrote ${path.relative(REPO_ROOT, AUDIT_MD)}`);
  console.log(`✓ Wrote ${path.relative(REPO_ROOT, DIFF_JSON)}`);
  console.log('');
  console.log('Next: review the audit and ask the agent to apply specific edits.');
}

main();
