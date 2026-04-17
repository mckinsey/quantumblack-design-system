import { promises as fs } from 'fs';
import path from 'path';

import type { Component } from './registry';

export interface ComponentSource {
  filename: string;
  content: string;
  language: string;
}

/** One path segment under `src/` (registry paths only use safe names). */
const SAFE_REGISTRY_SEGMENT = /^[a-zA-Z0-9][a-zA-Z0-9_.-]*$/;

/** Next.js dynamic route folder, e.g. `[name]`. */
const DYNAMIC_ROUTE_SEGMENT = /^\[[a-zA-Z0-9_-]+\]$/;

function isSafeRegistryPathSegment(segment: string): boolean {
  return (
    SAFE_REGISTRY_SEGMENT.test(segment) || DYNAMIC_ROUTE_SEGMENT.test(segment)
  );
}

/**
 * Sanitize registry `file.path` (CWE-22): reject absolute paths, `..`, and
 * segments outside our allowlist before any `path.join` / `readFile`.
 * Matches the “sanitize input, then join” pattern from Wiz remediation docs.
 */
function sanitizeRegistryPathInput(userPath: string): string[] | null {
  if (path.isAbsolute(userPath)) {
    return null;
  }

  const posixStyle = userPath.split(path.sep).join('/');
  const normalized = path.posix.normalize(posixStyle);
  const segments = normalized.split('/').filter(s => s.length > 0);

  if (segments.length === 0 || segments[0] !== 'src') {
    return null;
  }

  if (segments.some(s => s === '..' || !isSafeRegistryPathSegment(s))) {
    return null;
  }

  return segments;
}

/**
 * Resolve a sanitized registry-relative path under `projectRoot` using only
 * per-segment joins (never `path.join(root, fullUserString)`).
 */
function resolveRegistrySourcePath(
  projectRoot: string,
  userPath: string,
): string | null {
  const sanitizedSegments = sanitizeRegistryPathInput(userPath);

  if (!sanitizedSegments) {
    return null;
  }

  let resolved = projectRoot;

  for (const segment of sanitizedSegments) {
    resolved = path.join(resolved, segment);
  }

  const relativeToRoot = path.relative(projectRoot, resolved);

  if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
    return null;
  }

  return resolved;
}

/**
 * Read component source files from the filesystem
 */
export async function getComponentSource(
  component: Component,
): Promise<ComponentSource[]> {
  if (!component.files || component.files.length === 0) {
    return [];
  }

  const sources: ComponentSource[] = [];

  const root = path.resolve(process.cwd());

  for (const file of component.files) {
    try {
      const filePath = resolveRegistrySourcePath(root, file.path);

      if (!filePath) {
        console.error('Skipped unsafe or non-src registry path: %s', file.path);
        continue;
      }

      const content = await fs.readFile(filePath, 'utf-8');

      // Determine language from file extension
      const ext = path.extname(file.path).slice(1);
      const language = getLanguageFromExtension(ext);

      // Get just the filename for display
      const filename = path.basename(file.path);

      sources.push({
        filename,
        content,
        language,
      });
    } catch (error) {
      console.error('Failed to read registry file: %s', file.path, error);
      // Continue with other files even if one fails
    }
  }

  return sources;
}

/**
 * Map file extensions to language identifiers for syntax highlighting
 */
function getLanguageFromExtension(ext: string): string {
  const languageMap: Record<string, string> = {
    ts: 'typescript',
    tsx: 'tsx',
    js: 'javascript',
    jsx: 'jsx',
    css: 'css',
    json: 'json',
    md: 'markdown',
    mdx: 'mdx',
  };

  return languageMap[ext] || 'typescript';
}

/**
 * Get dependencies from component
 */
export function getComponentDependencies(_component: Component): string[] {
  // This would need to parse the component files to extract dependencies
  // For now, return empty array - can be enhanced later
  return [];
}
