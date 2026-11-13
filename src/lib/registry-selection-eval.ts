import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);

export interface RegistryCatalogItem {
  name: string;
  type: string;
  title: string;
  description: string;
}

export interface SelectionCase {
  id: string;
  prompt: string;
  expect: string[];
  expectPrimary?: string;
  forbid?: string[];
  notes?: string;
}

export interface LlmSelectionResponse {
  install: string[];
  reason?: string;
}

interface RegistryJson {
  items: Array<{
    name: string;
    type: string;
    title?: string;
    description?: string;
  }>;
}

const SELECTION_TYPES = new Set(['registry:ui', 'registry:example']);

export function loadSelectionCases(casesPath?: string): SelectionCase[] {
  const file =
    casesPath ?? path.join(REPO_ROOT, 'evals/component-selection.cases.json');
  const raw = readFileSync(file, 'utf8');
  const parsed = JSON.parse(raw) as { cases: SelectionCase[] };

  return parsed.cases;
}

export function loadRegistryCatalog(
  registryPath?: string,
): RegistryCatalogItem[] {
  const file = registryPath ?? path.join(REPO_ROOT, 'registry.json');
  const raw = readFileSync(file, 'utf8');
  const registry = JSON.parse(raw) as RegistryJson;

  return registry.items
    .filter(item => SELECTION_TYPES.has(item.type))
    .map(item => ({
      name: item.name,
      type: item.type,
      title: item.title ?? item.name,
      description: item.description?.trim() ?? '',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function formatCatalogForPrompt(items: RegistryCatalogItem[]): string {
  return items
    .map(item => {
      const kind = item.type === 'registry:example' ? 'example' : 'ui';
      const desc = item.description || '(no description)';
      return `- ${item.name} (${kind}) — ${item.title}: ${desc}`;
    })
    .join('\n');
}

export const REGISTRY_SELECTION_SYSTEM_PROMPT = `You select QBDS registry items for a coding task.

Rules:
- registry:ui items are installable primitives (single components under components/ui).
- registry:example items are recipes: composed patterns built from multiple primitives (forms, date picker field, tag groups).
- Prefer registry:example when the user asks for a finished pattern (e.g. "date picker", "signup form", "filter chips row").
- Prefer registry:ui when the user asks for one building block (e.g. "button", "calendar grid only", "text field").
- Return only names that exist in the catalog.
- install must list the minimal set to satisfy the task (usually 1 item; add a second only if clearly required).

Respond with JSON only:
{"install":["name"],"reason":"one short sentence"}`;

export function buildUserPrompt(
  task: string,
  catalog: RegistryCatalogItem[],
): string {
  return `Task:\n${task}\n\nCatalog:\n${formatCatalogForPrompt(catalog)}`;
}

export function scoreCase(
  selectionCase: SelectionCase,
  response: LlmSelectionResponse,
): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  const install = response.install ?? [];

  if (!Array.isArray(install) || install.length === 0) {
    errors.push('install is empty or missing');
    return { ok: false, errors };
  }

  const missing = selectionCase.expect.filter(name => !install.includes(name));
  if (missing.length > 0) {
    errors.push(`missing expected: ${missing.join(', ')}`);
  }

  if (
    selectionCase.expectPrimary &&
    install[0] !== selectionCase.expectPrimary
  ) {
    errors.push(
      `primary mismatch: got "${install[0] ?? ''}", want "${selectionCase.expectPrimary}"`,
    );
  }

  const forbidden = (selectionCase.forbid ?? []).filter(name =>
    install.includes(name),
  );
  if (forbidden.length > 0) {
    errors.push(`forbidden picked: ${forbidden.join(', ')}`);
  }

  return { ok: errors.length === 0, errors };
}

export function parseLlmJson(content: string): LlmSelectionResponse {
  const parsed = JSON.parse(content) as LlmSelectionResponse;
  if (!parsed || !Array.isArray(parsed.install)) {
    throw new Error('Invalid JSON: install must be an array');
  }
  return parsed;
}
