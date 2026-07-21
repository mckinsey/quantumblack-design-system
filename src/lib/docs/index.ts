const docsByName = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function docsKey(name: string): string {
  return `./${name}.md`;
}

/** Markdown body for a registry component, if `src/lib/docs/<name>.md` exists. */
export function getComponentDocs(name: string): string | undefined {
  const content = docsByName[docsKey(name)];
  if (!content?.trim()) return undefined;
  return content;
}
