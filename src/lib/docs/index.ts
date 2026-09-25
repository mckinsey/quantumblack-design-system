const docsByName = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function docsKey(name: string): string {
  return `./${name}.md`;
}

const sharedMenusDocs = new Set([
  'dropdown-menu',
  'context-menu',
  'select',
]);

/** Markdown body for a registry component, if `src/lib/docs/<name>.md` exists. */
export function getComponentDocs(name: string): string | undefined {
  const key = sharedMenusDocs.has(name) ? docsKey('menus') : docsKey(name);
  const content = docsByName[key];
  if (!content?.trim()) return undefined;
  return content;
}
