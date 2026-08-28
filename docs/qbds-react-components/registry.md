# publish

QBDS binding for step `publish` (registry).

- Add one `registry:ui` entry for `{name}` in `registry.json` — copy nearest sibling, do not invent shape
- `dependencies` — npm packages imported by `src/components/ui/{name}.tsx`
- `registryDependencies` — every `@/components/ui/<dep>` as `__REGISTRY_URL__/r/<dep>.json`; include `theme` and `utils`
- `files` — ui file only (demo only for recipes / multi-part controls)
- Run `npm run registry:build`
- No separate `{name}-demo` entry
