# Registry entries

Add one `registry:ui` entry so consumers can `npx shadcn add <name>`. Copy the nearest sibling entry and adjust — don't invent a new shape.

No separate `<name>-demo` entry.

## Checklist

1. Copy the nearest sibling entry in `registry.json`.
2. `dependencies` — npm packages imported by `src/components/ui/<name>.tsx`.
3. `registryDependencies` — every `@/components/ui/<dep>` import from that file, as `__REGISTRY_URL__/r/<dep>.json`. Always include `theme` and `utils` (e.g. both `icon` and `icon-shell` when both are imported).
4. `files` — the ui file only (add the demo only for recipes / multi-part controls).
5. Run `npm run registry:build`.

## Example

Adding `tag`: start from `badge.json` or `button.json` in `registry.json`, swap the file path, then grep `tag.tsx` imports for `registryDependencies`. Rebuild and confirm `public/r/tag.json` exists.
