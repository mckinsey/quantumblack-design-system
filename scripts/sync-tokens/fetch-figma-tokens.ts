/**
 * Fetch all variables from the QBDS Figma file via the Variables REST API,
 * normalise them, and write a snapshot to disk.
 *
 * Output: `scripts/sync-tokens/.cache/figma-snapshot.json`
 *
 * Auth: requires `FIGMA_ACCESS_TOKEN` in env. The token must:
 *   - be a Personal Access Token (PAT) from a user on an Enterprise Figma plan
 *   - have the `file_variables:read` scope enabled
 *
 * If your token / plan does not have this access the script will exit with a
 * 403 and print fallback instructions for using the Figma plugin MCP from an
 * agent session instead. The MCP path produces the same on-disk snapshot.
 *
 * File key: read from `token-mapping.json` (`figmaFileKey`) so it stays in
 * sync with the rest of the pipeline.
 *
 * Run: `npm run tokens:fetch`
 */
import * as fs from 'node:fs';
import * as path from 'node:path';

const SCRIPT_DIR = __dirname;
const CACHE_DIR = path.join(SCRIPT_DIR, '.cache');
const MAPPING_PATH = path.join(SCRIPT_DIR, 'token-mapping.json');
const OUT_PATH = path.join(CACHE_DIR, 'figma-snapshot.json');

interface TokenMapping {
  figmaFileKey: string;
  collectionScope: { include: string[]; exclude: string[] };
}

interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface FigmaVariableAlias {
  type: 'VARIABLE_ALIAS';
  id: string;
}

type FigmaValue = number | string | boolean | FigmaColor | FigmaVariableAlias;

interface FigmaMode {
  modeId: string;
  name: string;
}

interface FigmaCollection {
  id: string;
  name: string;
  modes: FigmaMode[];
  defaultModeId: string;
  remote: boolean;
  hiddenFromPublishing: boolean;
}

interface FigmaVariable {
  id: string;
  name: string;
  key: string;
  variableCollectionId: string;
  resolvedType: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: Record<string, FigmaValue>;
  remote: boolean;
  hiddenFromPublishing: boolean;
  scopes?: string[];
}

interface FigmaVariablesResponse {
  status?: number;
  error?: boolean;
  message?: string;
  meta: {
    variableCollections: Record<string, FigmaCollection>;
    variables: Record<string, FigmaVariable>;
  };
}

interface NormalisedVariable {
  figmaName: string;
  collection: string;
  type: 'BOOLEAN' | 'FLOAT' | 'STRING' | 'COLOR';
  valuesByMode: Record<string, NormalisedValue>;
  scopes: string[];
}

interface NormalisedValue {
  raw: FigmaValue;
  resolved: string | null;
}

interface FigmaSnapshot {
  fileKey: string;
  fetchedAt: string;
  source: 'rest' | 'mcp';
  collections: Array<{
    id: string;
    name: string;
    defaultMode: string;
    modes: string[];
  }>;
  variableCount: number;
  variables: NormalisedVariable[];
}

// ---------- colour conversion (mirrors scripts/migrate-primitives-to-oklch.ts) ----------

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function rgbaToOklch(r: number, g: number, b: number, alpha: number): string {
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

function isAlias(v: FigmaValue): v is FigmaVariableAlias {
  return typeof v === 'object' && v !== null && 'type' in v && (v as { type: string }).type === 'VARIABLE_ALIAS';
}

function isColor(v: FigmaValue): v is FigmaColor {
  return typeof v === 'object' && v !== null && 'r' in v && 'g' in v && 'b' in v;
}

/**
 * Convert a single mode value to its CSS-equivalent string. Aliases are
 * resolved by following the variable graph; cycles return null.
 */
function resolveValue(
  value: FigmaValue,
  variables: Record<string, FigmaVariable>,
  modeId: string,
  defaultModeId: string,
  seen: Set<string> = new Set(),
): string | null {
  if (isAlias(value)) {
    if (seen.has(value.id)) return null;
    const target = variables[value.id];
    if (!target) return null;
    // Prefer the requested mode; fall back to the target's default mode.
    const targetValue = target.valuesByMode[modeId] ?? target.valuesByMode[Object.keys(target.valuesByMode)[0]];
    const nextSeen = new Set(seen);
    nextSeen.add(value.id);
    return resolveValue(targetValue, variables, modeId, defaultModeId, nextSeen);
  }
  if (isColor(value)) {
    return rgbaToOklch(value.r, value.g, value.b, value.a);
  }
  if (typeof value === 'number') {
    // Distinguish float pixel values vs unit-less numbers.
    return Number.isInteger(value) ? `${value}px` : `${value}`;
  }
  if (typeof value === 'string') return value;
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  return null;
}

// ---------- REST fetch ----------

async function fetchFromRest(fileKey: string, token: string): Promise<FigmaVariablesResponse> {
  const url = `https://api.figma.com/v1/files/${fileKey}/variables/local`;
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': token },
  });
  if (res.status === 403) {
    throw new Error(
      [
        'Figma API returned 403 Forbidden.',
        '',
        'The Variables REST API requires:',
        '  1. A Figma Enterprise plan (the QBDS file must live in an Enterprise team),',
        '  2. A Personal Access Token with the `file_variables:read` scope enabled.',
        '',
        'To regenerate a token with the correct scope:',
        '  https://www.figma.com/developers/api#access-tokens',
        '  → Make sure to tick "File variables: Read" when creating the PAT.',
        '',
        'Fallback: run the sync from a Cursor agent session and ask it to use',
        'the Figma plugin MCP (`get_variables` / `use_figma`) to extract the same',
        'data, then drop the resulting JSON at:',
        `  ${path.relative(process.cwd(), OUT_PATH)}`,
        '',
        'See `.cursor/skills/qbds-sync-tokens/SKILL.md` for the agent-driven path.',
      ].join('\n'),
    );
  }
  if (res.status === 404) {
    throw new Error(
      `Figma file ${fileKey} not found (or token lacks access). Verify the file key in token-mapping.json.`,
    );
  }
  if (!res.ok) {
    throw new Error(`Figma API error ${res.status} ${res.statusText}: ${await res.text()}`);
  }
  return (await res.json()) as FigmaVariablesResponse;
}

// ---------- normalise ----------

function normalise(
  resp: FigmaVariablesResponse,
  scope: { include: string[]; exclude: string[] },
): { collections: FigmaSnapshot['collections']; variables: NormalisedVariable[] } {
  const collections = Object.values(resp.meta.variableCollections);
  const includeSet = new Set(scope.include.map((s) => s.toLowerCase()));
  const excludeSet = new Set(scope.exclude.map((s) => s.toLowerCase()));

  const inScopeCollections = collections.filter((c) => {
    const name = c.name.toLowerCase();
    if (excludeSet.has(name)) return false;
    if (c.remote) return false;
    if (includeSet.size > 0) return includeSet.has(name);
    return true;
  });
  const inScopeIds = new Set(inScopeCollections.map((c) => c.id));

  const collectionsOut = inScopeCollections.map((c) => ({
    id: c.id,
    name: c.name,
    defaultMode: c.modes.find((m) => m.modeId === c.defaultModeId)?.name ?? c.modes[0]?.name ?? '',
    modes: c.modes.map((m) => m.name),
  }));

  // Build modeId -> mode name lookup for output.
  const modeNameById = new Map<string, string>();
  for (const c of inScopeCollections) {
    for (const m of c.modes) modeNameById.set(m.modeId, m.name);
  }

  const variables: NormalisedVariable[] = [];
  const allVariables = resp.meta.variables;

  for (const v of Object.values(allVariables)) {
    if (!inScopeIds.has(v.variableCollectionId)) continue;
    if (v.remote) continue;
    if (v.hiddenFromPublishing) continue;

    const collection = inScopeCollections.find((c) => c.id === v.variableCollectionId)!;
    const valuesByMode: Record<string, NormalisedValue> = {};
    for (const [modeId, raw] of Object.entries(v.valuesByMode)) {
      const modeName = modeNameById.get(modeId) ?? modeId;
      valuesByMode[modeName] = {
        raw,
        resolved: resolveValue(raw, allVariables, modeId, collection.defaultModeId),
      };
    }

    variables.push({
      figmaName: v.name,
      collection: collection.name,
      type: v.resolvedType,
      valuesByMode,
      scopes: v.scopes ?? [],
    });
  }

  variables.sort((a, b) => a.figmaName.localeCompare(b.figmaName));
  return { collections: collectionsOut, variables };
}

// ---------- main ----------

async function main(): Promise<void> {
  const mapping = JSON.parse(fs.readFileSync(MAPPING_PATH, 'utf8')) as TokenMapping;
  const fileKey = mapping.figmaFileKey;
  const token = process.env.FIGMA_ACCESS_TOKEN;

  if (!token) {
    console.error(
      [
        '✗ FIGMA_ACCESS_TOKEN environment variable is not set.',
        '',
        'Set it to a Personal Access Token with `file_variables:read` scope:',
        '  export FIGMA_ACCESS_TOKEN=figd_...',
        '',
        'Generate one at https://www.figma.com/developers/api#access-tokens',
      ].join('\n'),
    );
    process.exit(1);
  }

  console.log(`→ Fetching variables from Figma file ${fileKey} ...`);
  let resp: FigmaVariablesResponse;
  try {
    resp = await fetchFromRest(fileKey, token);
  } catch (err) {
    console.error('✗ Failed to fetch from Figma REST API.');
    console.error('');
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(2);
  }

  const { collections, variables } = normalise(resp, mapping.collectionScope);

  const snapshot: FigmaSnapshot = {
    fileKey,
    fetchedAt: new Date().toISOString(),
    source: 'rest',
    collections,
    variableCount: variables.length,
    variables,
  };

  fs.mkdirSync(CACHE_DIR, { recursive: true });
  fs.writeFileSync(OUT_PATH, JSON.stringify(snapshot, null, 2), 'utf8');

  console.log(`✓ Pulled ${variables.length} variables from ${collections.length} in-scope collection(s)`);
  for (const c of collections) {
    const count = variables.filter((v) => v.collection === c.name).length;
    console.log(`  - ${c.name.padEnd(20)} ${count.toString().padStart(4)} vars  modes=[${c.modes.join(', ')}]`);
  }
  console.log(`  → ${path.relative(path.resolve(__dirname, '..', '..'), OUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
