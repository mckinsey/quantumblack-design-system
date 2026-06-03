import tokensMarkdown from '../../docs/TOKENS.md?raw';

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

function normalizeColorValue(value: string): string | null {
  return normalizeHex(value);
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

    const lightRaw =
      lightSemantic.get(token.cssVar) ?? primitives.get(token.cssVar) ?? '';
    const darkRaw =
      darkSemantic.get(token.cssVar) ?? primitives.get(token.cssVar) ?? '';

    const light =
      resolveColorValue(lightRaw, primitives, lightSemantic, new Set()) ??
      null;
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
