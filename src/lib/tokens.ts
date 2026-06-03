import tokensMarkdown from '../../docs/TOKENS.md?raw';

/**
 * Fallback palette for `/tokens` swatch resolution only.
 *
 * `loadColorTokens` walks `var(--…)` chains in raw `globals.css`. QBDS mist/slate/brand
 * values are declared in `@theme inline`, but status tokens point at Tailwind utilities
 * (e.g. `--text-error: var(--color-red-700)`). Those `--color-*` names exist at runtime
 * via Tailwind’s default theme — they are not written out in this file — so the walker
 * would stop without these entries and status/text-information swatches would be blank.
 */
const TAILWIND_DEFAULT_COLORS: Record<string, string> = {
  '--color-red-400': 'oklch(70.4% 0.191 22.216)',
  '--color-red-500': 'oklch(63.7% 0.237 25.331)',
  '--color-red-600': 'oklch(57.7% 0.245 27.325)',
  '--color-red-700': 'oklch(50.5% 0.213 27.518)',
  '--color-amber-400': 'oklch(82.8% 0.189 84.429)',
  '--color-amber-500': 'oklch(76.9% 0.188 70.08)',
  '--color-amber-600': 'oklch(66.6% 0.179 58.318)',
  '--color-amber-700': 'oklch(55.5% 0.163 48.998)',
  '--color-green-400': 'oklch(79.2% 0.209 151.711)',
  '--color-green-500': 'oklch(72.3% 0.219 149.579)',
  '--color-green-600': 'oklch(62.7% 0.194 149.214)',
  '--color-green-700': 'oklch(52.7% 0.154 150.069)',
  '--color-cyan-400': 'oklch(78.9% 0.154 211.53)',
  '--color-cyan-500': 'oklch(71.5% 0.143 215.221)',
  '--color-cyan-600': 'oklch(60.9% 0.126 221.723)',
  '--color-cyan-700': 'oklch(52% 0.105 223.128)',
  '--color-sky-400': 'oklch(74.6% 0.16 232.661)',
  '--color-sky-500': 'oklch(68.5% 0.169 237.323)',
  '--color-sky-600': 'oklch(58.8% 0.158 241.966)',
  '--color-sky-700': 'oklch(50% 0.134 242.749)',
};

export interface TokenColor {
  hex: string;
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

function stripTicks(value: string): string {
  return value.replace(/`/g, '').trim();
}

function parseCssVarCell(cell: string): string | null {
  const match = cell.match(/--[a-z0-9-]+/);
  return match?.[0] ?? null;
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
      const cssVar = parseCssVarCell(description);

      tokens.push({
        name,
        category,
        cssVar,
        tailwind,
        description,
        light: null,
        dark: null,
        patternOnly: !cssVar,
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
    const heading = part.slice(0, nl).trim();
    const body = part.slice(nl + 1);

    if (
      heading === 'QBDS Tokens' ||
      heading === 'How to choose a token' ||
      heading === 'Quick rules'
    ) {
      continue;
    }

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

function normalizeHex(value: string): string | null {
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

function parseOklch(value: string): { l: number; c: number; h: number } | null {
  const match = value
    .trim()
    .match(/^oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*\)$/i);
  if (!match) return null;
  let l = Number.parseFloat(match[1]);
  if (match[1].includes('%')) l /= 100;
  return { l, c: Number.parseFloat(match[2]), h: Number.parseFloat(match[3]) };
}

/** OKLCH (D65) → #rrggbbaa for token swatches. */
export function oklchToHex(value: string): string | null {
  const parsed = parseOklch(value);
  if (!parsed) return null;

  const hRad = (parsed.h * Math.PI) / 180;
  const labA = parsed.c * Math.cos(hRad);
  const labB = parsed.c * Math.sin(hRad);
  const labL = parsed.l;

  const l_ = labL + 0.3963377774 * labA + 0.2158037573 * labB;
  const m_ = labL - 0.1055613458 * labA - 0.0638541728 * labB;
  const s_ = labL - 0.0894841775 * labA - 1.291485548 * labB;

  const l3 = l_ ** 3;
  const m3 = m_ ** 3;
  const s3 = s_ ** 3;

  const linear = [
    4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
    -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
    -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3,
  ];

  const toSrgb = (x: number) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;

  const [r, g, b] = linear.map(x =>
    Math.round(Math.min(1, Math.max(0, toSrgb(x))) * 255),
  );

  return `#${[r, g, b].map(n => n.toString(16).padStart(2, '0')).join('')}ff`;
}

function normalizeColorValue(value: string): string | null {
  return normalizeHex(value) ?? oklchToHex(value);
}

function buildPrimitives(globalsCss: string): Map<string, string> {
  const themeBlock =
    globalsCss.match(/@theme inline \{([\s\S]*?)\n\}/)?.[1] ?? '';
  const primitives = parseDeclarations(themeBlock);
  for (const [name, raw] of Object.entries(TAILWIND_DEFAULT_COLORS)) {
    if (!primitives.has(name)) primitives.set(name, raw);
  }
  return primitives;
}

function resolveColorValue(
  raw: string,
  primitives: Map<string, string>,
  semantic: Map<string, string>,
  seen: Set<string>,
): { hex: string; alias: string | null } | null {
  const value = raw.trim();
  const direct = normalizeColorValue(value);
  if (direct) return { hex: direct, alias: null };

  const varMatch = value.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/);
  if (!varMatch) return null;

  const name = varMatch[1];
  if (seen.has(name)) return null;
  seen.add(name);

  const alias = name;
  const next =
    semantic.get(name) ?? primitives.get(name) ?? null;
  if (!next) return null;

  const resolved = resolveColorValue(next, primitives, semantic, seen);
  if (!resolved) return null;
  return { hex: resolved.hex, alias };
}

function attachResolvedColors(tokens: Token[], globalsCss: string): Token[] {
  const primitives = buildPrimitives(globalsCss);
  const lightSemantic = parseDeclarations(extractRuleBlock(globalsCss, ':root'));
  const darkSemantic = parseDeclarations(extractRuleBlock(globalsCss, '.dark'));

  return tokens.map(token => {
    if (token.patternOnly || !token.cssVar) return token;

    const light =
      resolveColorValue(
        lightSemantic.get(token.cssVar) ?? '',
        primitives,
        lightSemantic,
        new Set(),
      ) ?? null;
    const dark =
      resolveColorValue(
        darkSemantic.get(token.cssVar) ?? '',
        primitives,
        darkSemantic,
        new Set(),
      ) ?? null;

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

export function getCategories(tokens: Token[]): string[] {
  const seen = new Set(tokens.map(t => t.category));
  const ordered = CATEGORY_ORDER.filter(c => seen.has(c));
  const extras = [...seen].filter(c => !ordered.includes(c)).sort();
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
