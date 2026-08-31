# publish

QBDS binding for step `publish` (registry).

- Add one `registry:ui` entry for `{name}` in `registry.json` — copy nearest sibling, do not invent shape
- `dependencies` — every npm package imported by `src/components/ui/{name}.tsx` (include `class-variance-authority` when the file imports `cva`)
- `registryDependencies` — only `@/components/ui/<dep>` actually imported by the component file, as `__REGISTRY_URL__/r/<dep>.json`; always include `theme` and `utils`. Do not add imports used only in demos or Code Connect templates
- Enforced by `src/tests/registry-dependencies.test.ts`
- `files` — ui file only (demo only for recipes / multi-part controls)
- Run `npm run registry:build`
- No separate `{name}-demo` entry
