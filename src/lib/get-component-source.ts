import { promises as fs } from 'fs';
import path from 'path';

import type { Component } from './registry';

export interface ComponentSource {
  filename: string;
  content: string;
  language: string;
}

function isSafeRegistryRelativeFilePath(relativePath: string): boolean {
  if (path.isAbsolute(relativePath)) {
    return false;
  }

  const normalized = path.normalize(relativePath);
  const hasParentSegment = normalized.split(path.sep).some(s => s === '..');

  if (hasParentSegment) {
    return false;
  }

  return normalized.startsWith(`src${path.sep}`);
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
      if (!isSafeRegistryRelativeFilePath(file.path)) {
        console.error('Skipped unsafe or non-src registry path: %s', file.path);
        continue;
      }

      const normalized = path.normalize(file.path);
      const filePath = path.join(root, normalized);
      const relativeToRoot = path.relative(root, filePath);

      if (relativeToRoot.startsWith('..') || path.isAbsolute(relativeToRoot)) {
        console.error('Skipped path outside project: %s', file.path);
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
