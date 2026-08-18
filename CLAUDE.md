# QB Design Library

Vite + React Router + shadcn/ui component registry for the QB Design System.

## Stack

- Vite, React 19, React Router v7, TypeScript, Tailwind CSS v4
- TanStack Query for data fetching on component detail pages
- Components built on **Base UI** and **Radix UI** primitives, styled to the QBDS design spec
- Registry generated via `npx shadcn build` → `public/r/`

**Which primitive to use:** Base UI (`@base-ui/react`) is the target for new components and in-flight migrations. Radix (`@radix-ui/*`) remains in the components not yet migrated. Before adding a primitive, check the imports in the file you're editing and in the closest sibling in `src/components/ui/` — do not switch a component from one to the other unless that migration is the task.

## Key commands

```bash
npm run dev             # rebuild registry + dev server (port 4123)
npm run build           # rebuild registry + Vite production build → dist/
npm run preview         # preview production build (port 4123)
npm run registry:build  # rebuild registry only
npm run lint            # ESLint + Prettier (check)
npm run prettier:fix    # apply Prettier formatting
```

## Adding a new component

1. Add the component to `src/components/ui/`
2. Add a demo in `src/app/demo/[name]/index.tsx` and `src/app/demo/[name]/ui/`
3. Register it in `registry.json` (follow the `alert` / `alert-demo` pattern)
4. Run `npm run registry:build` to regenerate registry files
5. When implementing or updating a component **from a Figma spec** (URL, Dev Mode node, or QBDS library component set): read and follow the **figma-parity** skill ([.agents/skills/figma-parity/SKILL.md](.agents/skills/figma-parity/SKILL.md)). It is available to both Cursor and Claude Code — describe the task or share the Figma URL and the agent loads it automatically. Skip for code-only fixes with no design change.

## Icons

Icons use the **Material Symbols Sharp** variable font via `<Icon icon="search" />`. Ligature names are Google's snake_case (e.g. `keyboard_arrow_down`, `check_circle`). No per-icon files or codegen — any icon in the font catalog works.

Wrap icons in `<IconShell>` for QBDS size and opacity. For interactive icons (e.g. in a button), pass `hoverable`. Use `disabled` for disabled state. Passes size to `<Icon>`:

```tsx
<IconShell size="sm" variant="secondary">
  <Icon icon="search" />
</IconShell>

<IconShell hoverable>
  <Icon icon="edit" />
</IconShell>

<IconShell type="custom" className="text-status-success" variant="primary">
  <Icon icon="check" />
</IconShell>
```

Optical-size contract (same as Figma): `sm` → 20dp@wght400, `default` → 24dp@wght300, `lg` → 40dp@wght300 via `fontVariationSettings`. Set `size` on `<Icon>` directly when not using `IconShell`.

Registry: `npx shadcn add icon` ships `icon.tsx` and appends the Google Fonts `@import` to the consumer's CSS.

**Tests (`src/tests/icon-shell.test.tsx`):** functional only — demos render, `data-slot`, children, prop combos don't crash. Do not assert Tailwind classes, opacity tokens, or `cva` output.

## Before raising a PR

PR title and description: [docs/PULL_REQUESTS.md](docs/PULL_REQUESTS.md) (`<type>(<scope>):` format, types, scopes, summary rules).

- [ ] `npm run build` passes
- [ ] `npm run lint` passes
- [ ] `registry.json` updated and `npm run registry:build` run (if component added/changed)
- [ ] Component matched to Figma (new or updated from spec): completed [figma-parity](.agents/skills/figma-parity/SKILL.md) checklist

## LLM Guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

### Token selection

When choosing a color, border, surface, fill, text, or radius token, read [docs/TOKENS.md](docs/TOKENS.md) first. It maps every QBDS semantic CSS variable to its Tailwind utility and intended use, with quick rules for "what NOT to use". Variable definitions live in [src/styles/globals.css](src/styles/globals.css) — that file is the CSS source of truth; TOKENS.md is the usage guide.

### Figma → code token sync

When designers update Figma variables and tokens need to flow into code, read and follow the **figma-token-sync** skill ([.agents/skills/figma-token-sync/SKILL.md](.agents/skills/figma-token-sync/SKILL.md)). Skip for component-only changes with no token updates.

### Figma ↔ code parity

Read and follow the **figma-parity** skill ([.agents/skills/figma-parity/SKILL.md](.agents/skills/figma-parity/SKILL.md)) when you **implement, update, or review** a QBDS component against Figma (user gave a Figma URL/node, or the task is to match the library spec). **Figma MCP output is reference only** — still run the full parity workflow (component description, variant matrix, TOKENS.md, demos/registry). **Do not** use for unrelated work (deps, CI, docs, refactors with no design change).

**How to invoke:** Both skills are committed under `.agents/skills/` (Cursor reads them there directly; Claude Code gets symlinks in `.claude/skills/` on `npm install`), so **Cursor and Claude Code both discover them automatically** by description — just describe the task or share a Figma URL. No `@mention` or rule glob is required.

### Syncing tokens with Figma

When updating tokens from design, follow the **figma-token-sync** skill ([.agents/skills/figma-token-sync/SKILL.md](.agents/skills/figma-token-sync/SKILL.md)). See also [README — Syncing from Figma](README.md#syncing-from-figma) for the post-sync verification commands.

### Component tests

Keep tests **functional**, not visual.

- Assert structure and behavior: renders without crash, `data-slot` / roles, children present, interaction where meaningful.
- Do **not** assert specific CSS classes, opacity values, colours, or `cva()` / `iconVariants()` output — styling is covered by Figma parity and manual/visual review.
- Cover prop combinations with smoke renders (`variant`, `size`, `type`, `hoverable`, `disabled`, etc.) rather than snapshotting class strings.

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
