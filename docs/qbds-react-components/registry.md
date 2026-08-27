# publish

## Description

QBDS binding for step `publish` (registry).

## Prompt

Add one `registry:ui` entry for `{name}` in `registry.json`. Copy nearest sibling — do not invent shape.

Checklist:

1. Copy nearest sibling entry
2. `dependencies` — npm packages imported by `src/components/ui/{name}.tsx`
3. `registryDependencies` — every `@/components/ui/<dep>` as `__REGISTRY_URL__/r/<dep>.json`; include `theme` and `utils`
4. `files` — ui file only (demo only for recipes / multi-part controls)
5. Run `npm run registry:build`

No separate `{name}-demo` entry.

## Output

`registry.json` entry + `public/r/{name}.json` after build.
