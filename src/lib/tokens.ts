import tokensMarkdown from '../../docs/TOKENS.md?raw';

export interface TokenColor {
  /** Resolved 8-digit hex (`#rrggbbaa`) for registry swatches and labels. */
  value: string;
  alias: string | null;
}

export interface Token {
  name: string;
  category: string;
  cssVar: string | null;
  tailwind: string;
  description: string;
  light: TokenColor | null;
  dark: TokenColor | null;
  patternOnly: boolean;
}

const COLOR_DOC_END = '## Typography';

/** Short guidance shown under section headings on `/tokens`. */
export const REGISTRY_CATEGORY_INTROS: Partial<Record<string, string>> = {
  Elevations:
    'Use the composed shadow-elevation-* utilities — not the shade variables directly.',
};

const CATEGORY_ORDER = [
  'Surface',
  'Fill — content',
  'Fill — onSurface',
  'Text',
  'Border / Stroke',
  'Status',
  'State-layer overlays',
  'Brand accent',
  'Elevations',
] as const;

/** Intro sections in TOKENS.md — not token tables. */
const NON_TOKEN_SECTIONS = new Set([
  'QBDS Tokens',
  'How to choose a token',
  'Quick rules',
]);

function stripTicks(value: string): string {
  return value.replace(/`/g, '').trim();
}

/** Strip markdown `#` prefixes — first split chunk is the `# QBDS Tokens` title. */
function normalizeHeading(raw: string): string {
  return raw.replace(/^#+\s*/, '').trim();
}

function parseCssVarCell(cell: string): string | null {
  if (cell.includes('*')) return null;
  const matches = [...cell.matchAll(/--[a-z0-9-]+/g)].map(match => match[0]);
  if (matches.length !== 1) return null;
  return matches[0];
}

function parseTableRows(
  section: string,
  category: string,
  kind: 'semantic' | 'elevation',
): Token[] {
  const lines = section.split('\n');
  const tokens: Token[] = [];

  for (const line of lines) {
    if (!line.startsWith('|') || line.includes('---')) continue;

    const cells = line
      .split('|')
      .map(c => c.trim())
      .filter(Boolean);
    if (cells.length < 3) continue;

    if (kind === 'semantic') {
      if (cells[0] === 'CSS variable') continue;
      const cssVar = parseCssVarCell(cells[0]);
      const tailwind = stripTicks(cells[1]);
      const description = cells[2] ?? '';
      const name = stripTicks(cells[3] ?? '');
      const patternOnly = !cssVar || cssVar.includes('*');

      tokens.push({
        name,
        category,
        cssVar,
        tailwind,
        description,
        light: null,
        dark: null,
        patternOnly,
      });
    } else {
      if (cells[0] === 'Utility') continue;
      const tailwind = stripTicks(cells[0]);
      const description = cells[1] ?? '';
      const name = stripTicks(cells[2] ?? '');

      tokens.push({
        name,
        category,
        cssVar: null,
        tailwind,
        description,
        light: null,
        dark: null,
        patternOnly: true,
      });
    }
  }

  return tokens;
}

export function parseTokensMarkdown(markdown: string): Token[] {
  const colorDoc = markdown.split(COLOR_DOC_END)[0] ?? markdown;
  const parts = colorDoc.split(/^## /m).filter(Boolean);
  const tokens: Token[] = [];

  for (const part of parts) {
    const nl = part.indexOf('\n');
    if (nl === -1) continue;
    const heading = normalizeHeading(part.slice(0, nl).trim());
    const body = part.slice(nl + 1);

    if (NON_TOKEN_SECTIONS.has(heading)) continue;

    const kind = heading === 'Elevations' ? 'elevation' : 'semantic';
    tokens.push(...parseTableRows(body, heading, kind));
  }

  return tokens;
}

function parseDeclarations(block: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /--([a-z0-9-]+)\s*:\s*([^;]+);/g;
  for (const match of block.matchAll(re)) {
    map.set(`--${match[1]}`, match[2].trim());
  }
  return map;
}

function extractRuleBlock(css: string, selector: ':root' | '.dark'): string {
  const re =
    selector === ':root'
      ? /:root\s*\{([\s\S]*?)\n\}/
      : /\.dark\s*\{([\s\S]*?)\n\}/;
  return css.match(re)?.[1] ?? '';
}

/** Evaluate `calc(N / 255)` alpha expressions from globals.css. */
function evaluateCssCalc(value: string): string {
  return value.replace(
    /calc\(\s*(\d+(?:\.\d+)?)\s*\/\s*255\s*\)/gi,
    (_, n: string) => String(Number(n) / 255),
  );
}

function normalizeHex8(value: string): string | null {
  const hex = value.trim();
  if (/^#[\da-fA-F]{8}$/.test(hex)) return hex.toLowerCase();
  if (/^#[\da-fA-F]{6}$/.test(hex)) return `${hex.toLowerCase()}ff`;
  if (/^#[\da-fA-F]{3}$/.test(hex)) {
    const r = hex[1];
    const g = hex[2];
    const b = hex[3];
    return `#${r}${r}${g}${g}${b}${b}ff`;
  }
  return null;
}

function parseOklch(value: string): {
  l: number;
  c: number;
  h: number;
  alpha: number;
} | null {
  const match = value
    .trim()
    .match(
      /^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)$/i,
    );
  if (!match) return null;

  let l = Number.parseFloat(match[1]);
  if (match[1].endsWith('%')) l /= 100;

  return {
    l,
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
    alpha: match[4] !== undefined ? Number.parseFloat(match[4]) : 1,
  };
}

function linearRgbToSrgb(channel: number): number {
  const abs = Math.abs(channel);
  if (abs > 0.0031308) {
    return (Math.sign(channel) || 1) * (1.055 * abs ** (1 / 2.4) - 0.055);
  }
  return channel * 12.92;
}

/** OKLab → sRGB (CSS Color 4 matrices, clamped to the sRGB gamut). */
function oklchToSrgb(
  l: number,
  c: number,
  h: number,
): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const b = c * Math.sin(hRad);

  const lCube = (l + 0.3963377773761749 * a + 0.2158037573099136 * b) ** 3;
  const mCube = (l - 0.1055613458156586 * a - 0.0638541728258133 * b) ** 3;
  const sCube = (l - 0.0894841775298119 * a - 1.2914855480194092 * b) ** 3;

  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

  return [
    clamp01(
      linearRgbToSrgb(
        4.0767416360759574 * lCube -
          3.3077115392580616 * mCube +
          0.2309699031821044 * sCube,
      ),
    ),
    clamp01(
      linearRgbToSrgb(
        -1.2684379732850317 * lCube +
          2.6097573492876887 * mCube -
          0.3413193760026573 * sCube,
      ),
    ),
    clamp01(
      linearRgbToSrgb(
        -0.0041960761386756 * lCube -
          0.7034186179359362 * mCube +
          1.7076146940746117 * sCube,
      ),
    ),
  ];
}

function rgbToHex8(r: number, g: number, b: number, alpha: number): string {
  const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
  const byte = (v: number) =>
    Math.round(clamp01(v) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${byte(r)}${byte(g)}${byte(b)}${byte(alpha)}`;
}

function oklchToHex8(value: string): string | null {
  const oklch = parseOklch(value);
  if (!oklch) return null;
  const [r, g, b] = oklchToSrgb(oklch.l, oklch.c, oklch.h);
  return rgbToHex8(r, g, b, oklch.alpha);
}

/** Convert a resolved CSS color literal to 8-digit hex for the registry UI. */
function cssColorToHex8(value: string): string | null {
  const trimmed = evaluateCssCalc(value.trim());
  const hex = normalizeHex8(trimmed);
  if (hex) return hex;
  if (!/^oklch\(/i.test(trimmed)) return null;
  return oklchToHex8(trimmed);
}

function buildPrimitives(globalsCss: string): Map<string, string> {
  const themeBlock =
    globalsCss.match(/@theme inline \{([\s\S]*?)\n\}/)?.[1] ?? '';
  return parseDeclarations(themeBlock);
}

function resolveColorValue(
  raw: string,
  primitives: Map<string, string>,
  semantic: Map<string, string>,
  seen: Set<string>,
): { value: string; alias: string | null } | null {
  const value = evaluateCssCalc(raw.trim());

  const varMatch = value.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/);
  if (varMatch) {
    const name = varMatch[1];
    if (seen.has(name)) return null;
    seen.add(name);

    const alias = name;
    const next = semantic.get(name) ?? primitives.get(name) ?? null;
    if (!next) return null;

    const resolved = resolveColorValue(next, primitives, semantic, seen);
    if (!resolved) return null;
    return { value: resolved.value, alias };
  }

  const hex8 = cssColorToHex8(value);
  if (!hex8) return null;
  return { value: hex8, alias: null };
}

function attachResolvedColors(tokens: Token[], globalsCss: string): Token[] {
  const primitives = buildPrimitives(globalsCss);
  const lightSemantic = parseDeclarations(
    extractRuleBlock(globalsCss, ':root'),
  );
  const darkSemantic = parseDeclarations(extractRuleBlock(globalsCss, '.dark'));

  return tokens.map(token => {
    if (token.patternOnly || !token.cssVar) return token;

    const lightRaw =
      lightSemantic.get(token.cssVar) ?? primitives.get(token.cssVar) ?? '';
    const darkRaw =
      darkSemantic.get(token.cssVar) ?? primitives.get(token.cssVar) ?? '';

    const light =
      resolveColorValue(lightRaw, primitives, lightSemantic, new Set()) ?? null;
    const dark =
      resolveColorValue(darkRaw, primitives, darkSemantic, new Set()) ?? null;

    return { ...token, light, dark };
  });
}

let parsedMarkdown: Token[] | null = null;

export function loadColorTokens(globalsCss: string): Token[] {
  if (!parsedMarkdown) {
    parsedMarkdown = parseTokensMarkdown(tokensMarkdown);
  }
  return attachResolvedColors(parsedMarkdown, globalsCss);
}

/** True for `*-inverse` catalogue rows (including `*-*-inverse` patterns). */
export function isInverseToken(token: Token): boolean {
  if (token.cssVar?.includes('-inverse')) return true;
  if (token.tailwind.includes('-inverse')) return true;
  if (/inverse/i.test(token.name)) return true;
  return false;
}

/** Subset for the registry `/tokens` page — full catalogue stays in TOKENS.md. */
export function filterRegistryColorTokens(tokens: Token[]): Token[] {
  return tokens.filter(t => !isInverseToken(t));
}

export function getCategories(tokens: Token[]): string[] {
  const seen = new Set(tokens.map(t => t.category));
  const ordered = CATEGORY_ORDER.filter(c => seen.has(c));
  const extras = [...seen]
    .filter(c => !(ordered as readonly string[]).includes(c))
    .sort();
  return [...ordered, ...extras];
}

export function tokenAnchor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

export function filterTokens(
  tokens: Token[],
  query: string,
  activeCategory: string,
): Token[] {
  const q = query.trim().toLowerCase();
  return tokens.filter(t => {
    if (activeCategory !== 'all' && t.category !== activeCategory) return false;
    if (!q) return true;
    return (
      t.name.toLowerCase().includes(q) ||
      (t.cssVar?.toLowerCase().includes(q) ?? false) ||
      t.tailwind.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    );
  });
}

export function groupByCategory(tokens: Token[]): [string, Token[]][] {
  const map = new Map<string, Token[]>();
  for (const t of tokens) {
    if (!map.has(t.category)) map.set(t.category, []);
    map.get(t.category)?.push(t);
  }
  return [...map.entries()].sort(([a], [b]) => {
    const ai = CATEGORY_ORDER.indexOf(a as (typeof CATEGORY_ORDER)[number]);
    const bi = CATEGORY_ORDER.indexOf(b as (typeof CATEGORY_ORDER)[number]);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
}

export function formatTailwindDisplay(tailwind: string): string {
  return tailwind
    .split(',')
    .map(s => s.trim())
    .join(' · ');
}

/** Registry display — trims trailing punctuation from markdown table cells. */
export function formatTokenDescription(description: string): string {
  return description.replace(/[.\s]+$/, '').trim();
}
