import * as fs from 'node:fs';
import * as path from 'node:path';

const DOC_ROUTES = ['/', '/components', '/tokens', '/installation'] as const;

interface RegistryItem {
  name: string;
  type: string;
}

interface RegistryFile {
  items: RegistryItem[];
}

const PAGE_ITEM_TYPES = new Set(['registry:ui', 'registry:example']);

function loadDemoNames(): Set<string> {
  const demoDir = path.join(process.cwd(), 'src/app/demo/[name]/ui');
  const names = fs
    .readdirSync(demoDir)
    .filter(file => file.endsWith('.tsx'))
    .map(file => file.replace(/\.tsx$/, ''))
    .filter(
      name => !name.endsWith('-examples') && name !== 'demo-expand-controls',
    );

  return new Set(names);
}

function loadRegistryItems(): RegistryItem[] {
  const raw = fs.readFileSync(
    path.join(process.cwd(), 'registry.json'),
    'utf8',
  );
  const registry = JSON.parse(raw) as RegistryFile;
  const demos = loadDemoNames();

  return registry.items.filter(
    item => PAGE_ITEM_TYPES.has(item.type) && demos.has(item.name),
  );
}

export type SiteRoute = {
  path: string;
  label: string;
  scope: 'demo' | 'page';
};

export function getSiteRoutes(): SiteRoute[] {
  const docs: SiteRoute[] = DOC_ROUTES.map(route => ({
    path: route,
    label: route === '/' ? 'introduction' : route.slice(1),
    scope: 'page',
  }));

  const registry: SiteRoute[] = loadRegistryItems()
    .map(item => ({
      path: `/registry/${item.name}`,
      label: item.name,
      scope: 'demo' as const,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return [...docs, ...registry];
}
