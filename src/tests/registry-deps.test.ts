import { describe, expect, it } from 'vitest';

import registry from '@/registry';

const itemNames = new Set(registry.items.map((i: { name: string }) => i.name));

function depsOf(item: { registryDependencies?: string[] }): string[] {
  return (item.registryDependencies ?? []).map((dep: string) =>
    dep.replace(/.*\/r\/(.+)\.json$/, '$1'),
  );
}

describe('registry — all registryDependencies resolve', () => {
  it.each(registry.items)(
    '$name: every registryDependency exists in the registry',
    item => {
      for (const dep of depsOf(item)) {
        expect(
          itemNames.has(dep),
          `"${item.name}" depends on "${dep}" which is not in the registry`,
        ).toBe(true);
      }
    },
  );
});
