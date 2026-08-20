# Registry entries

One `registry:ui` entry per component (name = file). No separate `<name>-demo` entry.

1. Copy the nearest sibling entry.
2. `dependencies` = npm packages imported by `src/components/ui/<name>.tsx`.
3. `registryDependencies` = **every** `@/components/ui/<dep>` import from that file, as `__REGISTRY_URL__/r/<dep>.json` — always include `theme` + `utils` (e.g. `icon` **and** `icon-shell` when both are imported).
4. `files` = the ui file only (add the demo only for recipes / multi-part controls).
5. Run `npm run registry:build`.
