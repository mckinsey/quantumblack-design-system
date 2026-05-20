/**
 * @vitest-environment node
 *
 * Ensures registry.json stays aligned with source imports for registry:ui items:
 * - Every item lists `theme` in registryDependencies.
 * - Imports from other UI components in shipped ui/example files are in registryDependencies.
 * - Imports from `@/components/ui/icon` in shipped files declare `icon` in registryDependencies.
 */
import { parse as babelParse } from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
);
const REGISTRY_PATH = path.join(REPO_ROOT, 'registry.json');
const UI_DIR = path.join(REPO_ROOT, 'src/components/ui');
const ICON_MODULE = path.join(REPO_ROOT, 'src/components/ui/icon.tsx');

interface RegistryFileEntry {
  readonly path: string;
  readonly type: string;
}

interface RegistryItem {
  readonly name: string;
  readonly type: string;
  readonly registryDependencies?: readonly string[];
  readonly files?: readonly RegistryFileEntry[];
}

interface RegistryJson {
  readonly items: readonly RegistryItem[];
}

function readRegistry(): RegistryJson {
  const raw = fs.readFileSync(REGISTRY_PATH, 'utf8');

  return JSON.parse(raw) as RegistryJson;
}

function normalizePathKey(p: string): string {
  return p.split(path.sep).join('/');
}

/** Extract registry block names from dependency URLs. */
function registryDepNames(deps: readonly string[] | undefined): Set<string> {
  const names = new Set<string>();

  if (!deps) {
    return names;
  }

  for (const entry of deps) {
    const m = entry.match(/\/r\/([^/]+)\.json$/);

    if (m?.[1]) {
      names.add(m[1]);
    }
  }

  return names;
}

function resolveModuleFile(specifier: string, fromFile: string): string | null {
  const base = specifier.startsWith('@/')
    ? path.join(REPO_ROOT, 'src', specifier.slice(2))
    : specifier.startsWith('.')
      ? path.resolve(path.dirname(fromFile), specifier)
      : null;

  if (!base) {
    return null;
  }

  const clean = base.replace(/\?.*$/, '');

  if (fs.existsSync(clean) && fs.statSync(clean).isFile()) {
    return path.normalize(clean);
  }

  for (const ext of ['.tsx', '.ts']) {
    const withExt = clean + ext;

    if (fs.existsSync(withExt)) {
      return path.normalize(withExt);
    }
  }

  return null;
}

function collectImportSources(content: string, filePath: string): string[] {
  const ast = babelParse(content, {
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
      ['decorators', { decoratorsBeforeExport: false }],
    ],
    sourceFilename: filePath,
  });

  const sources: string[] = [];

  traverse(ast, {
    ImportDeclaration(p) {
      sources.push(p.node.source.value);
    },
    ExportNamedDeclaration(p) {
      if (p.node.source) {
        sources.push(p.node.source.value);
      }
    },
    ExportAllDeclaration(p) {
      sources.push(p.node.source.value);
    },
  });

  return sources;
}

describe('registry.json dependency coverage', () => {
  const registry = readRegistry();

  it('every registry:ui item includes theme in registryDependencies', () => {
    const missingTheme: string[] = [];

    for (const item of registry.items) {
      if (item.type !== 'registry:ui') {
        continue;
      }

      const names = registryDepNames(item.registryDependencies);

      if (!names.has('theme')) {
        missingTheme.push(item.name);
      }
    }

    expect(
      missingTheme,
      `Add "__REGISTRY_URL__/r/theme.json" (or equivalent) to registryDependencies for: ${missingTheme.join(', ')}`,
    ).toEqual([]);
  });

  it('UI and icon imports from shipped files match registry metadata', () => {
    const failures: string[] = [];

    for (const item of registry.items) {
      if (item.type !== 'registry:ui') {
        continue;
      }

      const declaredDeps = registryDepNames(item.registryDependencies);

      const uiDepFiles =
        item.files?.filter(
          f =>
            (f.type === 'registry:ui' &&
              f.path.replace(/\\/g, '/').startsWith('src/components/ui/')) ||
            f.type === 'registry:example',
        ) ?? [];

      const shippedFiles =
        item.files?.filter(
          f =>
            f.type === 'registry:ui' ||
            f.type === 'registry:component' ||
            f.type === 'registry:example',
        ) ?? [];

      const checkUiDeps = (relativePath: string) => {
        const absFile = path.join(REPO_ROOT, relativePath);

        if (!fs.existsSync(absFile)) {
          failures.push(
            `[${item.name}] registry lists missing file on disk: ${relativePath}`,
          );

          return;
        }

        const content = fs.readFileSync(absFile, 'utf8');
        const importSources = collectImportSources(content, absFile);

        for (const spec of importSources) {
          const resolved = resolveModuleFile(spec, absFile);

          if (!resolved) {
            continue;
          }

          const norm = normalizePathKey(resolved);

          if (!norm.startsWith(normalizePathKey(UI_DIR) + '/')) {
            continue;
          }

          const base = path.basename(resolved, path.extname(resolved));

          if (base === item.name) {
            continue;
          }

          if (!declaredDeps.has(base)) {
            failures.push(
              `[${item.name}] ${relativePath} imports UI "${base}" (${spec}) but registryDependencies does not include r/${base}.json`,
            );
          }
        }
      };

      const checkIconModuleDep = (relativePath: string) => {
        const absFile = path.join(REPO_ROOT, relativePath);

        if (!fs.existsSync(absFile)) {
          failures.push(
            `[${item.name}] registry lists missing file on disk: ${relativePath}`,
          );

          return;
        }

        const content = fs.readFileSync(absFile, 'utf8');
        const importSources = collectImportSources(content, absFile);

        for (const spec of importSources) {
          const resolved = resolveModuleFile(spec, absFile);

          if (!resolved) {
            continue;
          }

          if (normalizePathKey(resolved) !== normalizePathKey(ICON_MODULE)) {
            continue;
          }

          if (!declaredDeps.has('icon')) {
            failures.push(
              `[${item.name}] ${relativePath} imports Icon (${spec}) but registryDependencies does not include r/icon.json`,
            );
          }
        }
      };

      for (const entry of uiDepFiles) {
        checkUiDeps(entry.path);
      }

      for (const entry of shippedFiles) {
        checkIconModuleDep(entry.path);
      }
    }

    expect(failures, failures.join('\n')).toEqual([]);
  });
});
