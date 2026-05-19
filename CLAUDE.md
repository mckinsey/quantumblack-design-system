# QB Design Library

Vite + React Router + shadcn/ui component registry for the QB Design System.

## Stack

- Vite, React 19, React Router v7, TypeScript, Tailwind CSS v4
- TanStack Query for data fetching on component detail pages
- Components built on Radix UI, styled to the QBDS design spec
- Registry generated via `npx shadcn build` → `public/r/`

## Key commands

```bash
npm run dev             # rebuild registry + dev server (port 4123)
npm run build           # rebuild registry + Vite production build → dist/
npm run preview         # preview production build (port 4123)
npm run registry:build  # rebuild registry only
npm run lint            # ESLint
```

## Adding a new component

1. Add the component to `src/components/ui/`
2. Add a demo in `src/app/demo/[name]/index.tsx` and `src/app/demo/[name]/ui/`
3. Register it in `registry.json` (follow the `alert` / `alert-demo` pattern)
4. Run `npm run registry:build` to regenerate registry files

## Icons

Icons are wrapped in `<IconShell>` to apply QBDS sizing (`sm`/`default`/`lg`), tone (`primary`/`secondary`/`disabled`), and colour (`neutral`/`neutral-inverse`/`accent`) tokens. The raw icon components in `src/components/icons/` are implementation detail — when rendering an icon inside another component or a demo, reach for them through `IconShell`.

Icon component files in `src/components/icons/` are **generated** from `src/components/icons/icons.json` by `scripts/generate-icons.ts`. Do not edit the `.tsx` files by hand — changes will be overwritten the next time the generator runs.

To add a Material Symbol:

1. Append an entry to `src/components/icons/icons.json`, e.g. `{ "name": "Bookmark" }`. The PascalCase `name` is the React component name and is converted to Google's `snake_case` automatically. If the Google name differs (e.g. `ChevronDown` → `keyboard_arrow_down`), add `"source": "keyboard_arrow_down"`.
2. Run `npm run icons:gen`.
3. Commit `icons.json` and the regenerated files together.

The generator fetches **three glyphs per icon** live from Google's `material-design-icons` GitHub master, one for each IconShell size (per ICON-RULES.md §2):

- `sm` → 20dp @ weight 400
- `default` → 24dp @ weight 300
- `lg` → 40dp @ weight 300

Each icon component exposes a `size` prop and picks the matching path. `IconShell` clones its child to forward its own resolved `size` automatically, so consumers don't need to set `size` on the icon directly — just `<IconShell size="sm"><Add /></IconShell>` works. Requires network when running `icons:gen`. Use `npm run icons:check` in CI to fail on drift.

## Before raising a PR

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `registry.json` updated and `npm run registry:build` run (if component added/changed)

## LLM Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.
