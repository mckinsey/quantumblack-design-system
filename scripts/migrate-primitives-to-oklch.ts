/**
 * Migrate primitive HEX literals in `src/styles/globals.css` to `oklch()`.
 *
 * Why
 * ---
 * Semantic tokens (Surface, Text, Fill, Border, Status, etc.) alias the
 * primitive ramps (Mist, Slate, Brand accents). Rewriting only the primitives
 * propagates `oklch()` everywhere automatically — no semantic-layer changes,
 * no component changes, no Tailwind-config changes.
 *
 * What it does
 * ------------
 * Walks the file. For each line of the form
 *   --some-token: #rrggbb;        (6-digit hex, alpha = 1)
 *   --some-token: #rrggbbaa;      (8-digit hex, alpha derived from `aa`)
 * it computes the OKLCH equivalent and rewrites the line. Lines that already
 * use `oklch(...)` or `var(...)` are skipped (idempotent).
 *
 * What it deliberately does NOT touch
 * -----------------------------------
 * - Lines using `var(--...)` (semantic aliases — they inherit automatically)
 * - Anything outside `--<name>: #hex;` (e.g. font sizes, radii, shadow specs)
 * - Comments
 *
 * Run
 * ---
 *   npm run css:to-oklch
 *
 * The conversion is mathematically deterministic: same colour, different
 * notation. Visual regression should be zero.
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const CSS_PATH = path.join(__dirname, '..', 'src', 'styles', 'globals.css');

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

interface OklchValue {
  L: number;
  C: number;
  h: number;
  alpha: number;
}

function rgbaToOklch(
  r: number,
  g: number,
  b: number,
  alpha: number,
): OklchValue {
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
  return { L, C, h, alpha };
}

function formatOklch(o: OklchValue): string {
  const Lp = `${(o.L * 100).toFixed(2)}%`;
  const Cf = o.C.toFixed(4);
  const hf = o.h.toFixed(2);
  return o.alpha < 0.999
    ? `oklch(${Lp} ${Cf} ${hf} / ${o.alpha.toFixed(2)})`
    : `oklch(${Lp} ${Cf} ${hf})`;
}

function parseHex(
  hex: string,
): { r: number; g: number; b: number; alpha: number } | null {
  const m = hex.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/i);
  if (!m) return null;
  const rgb = m[1];
  const aa = m[2];
  return {
    r: parseInt(rgb.slice(0, 2), 16) / 255,
    g: parseInt(rgb.slice(2, 4), 16) / 255,
    b: parseInt(rgb.slice(4, 6), 16) / 255,
    alpha: aa ? parseInt(aa, 16) / 255 : 1,
  };
}

interface ConversionRecord {
  token: string;
  hex: string;
  oklch: string;
}

function migrate(input: string): {
  output: string;
  conversions: ConversionRecord[];
} {
  const conversions: ConversionRecord[] = [];
  // Match lines like:   --token-name: #abc123;     or    --token-name: #abc12345;
  // Capture indent, token name, hex, and trailing chars (semicolon + optional comment)
  const lineRe =
    /^(\s*)(--[a-z0-9-]+):\s*(#[0-9a-fA-F]{6}(?:[0-9a-fA-F]{2})?)\s*;\s*(.*)$/;
  const lines = input.split('\n');
  const out: string[] = [];

  for (const line of lines) {
    const m = lineRe.exec(line);
    if (!m) {
      out.push(line);
      continue;
    }
    const [, indent, token, hex, trailing] = m;
    const parsed = parseHex(hex);
    if (!parsed) {
      out.push(line);
      continue;
    }
    const oklch = formatOklch(
      rgbaToOklch(parsed.r, parsed.g, parsed.b, parsed.alpha),
    );
    conversions.push({ token, hex, oklch });
    const tail = trailing ? ` ${trailing}` : '';
    out.push(`${indent}${token}: ${oklch};${tail}`);
  }

  return { output: out.join('\n'), conversions };
}

function main(): void {
  const input = fs.readFileSync(CSS_PATH, 'utf8');
  const { output, conversions } = migrate(input);

  if (conversions.length === 0) {
    console.log('✓ No HEX primitives found — file already migrated.');
    return;
  }

  fs.writeFileSync(CSS_PATH, output, 'utf8');
  console.log(`✓ Migrated ${conversions.length} primitive(s) to oklch()`);
  console.log('');
  console.log('First 10 conversions:');
  for (const c of conversions.slice(0, 10)) {
    console.log(`  ${c.token.padEnd(36)} ${c.hex.padEnd(11)} → ${c.oklch}`);
  }
  if (conversions.length > 10) {
    console.log(`  … and ${conversions.length - 10} more`);
  }
}

main();
