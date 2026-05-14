---
name: qbds-sync-tokens
description: Sync design tokens from the QBDS Figma file into the QBDS code registry (`src/styles/globals.css` and downstream `public/r/theme.json`). Use when the user says "sync tokens", "update tokens from Figma", "pull token changes", "audit token drift", "Figma added a new color", "designer changed a token", or any request to propagate Figma variable changes (colors, spacing, stroke widths, radii, typography) into code. Runs an audit-only diff first, then helps the user apply targeted edits to `globals.css` and rebuild the registry.
---

# QBDS Token Sync (Figma → Code Registry)

This skill orchestrates the **`scripts/sync-tokens/`** pipeline and turns its
audit report into concrete, reviewed edits to `src/styles/globals.css` plus
the downstream registry artifact `public/r/theme.json`.

The pipeline is **audit-only** — scripts never edit CSS. Your job (the agent)
is to (1) run the sync, (2) walk the audit report with the user, (3) apply
the changes they approve, (4) rebuild the registry, (5) open a PR.

## When to use this skill

Trigger on any of:

- "sync tokens from Figma"
- "update tokens", "pull tokens", "audit tokens"
- "designer added a new color / token / variable"
- "Figma changed a value, propagate it"
- "what's drifted between code and Figma?"
- after the user mentions editing the QBDS Figma file's `Variables` panel

## Prerequisites

1. Working directory is the QBDS repo.
2. `FIGMA_ACCESS_TOKEN` is in the environment, **with the `file_variables:read`
   scope**. If the user doesn't have one, walk them through generating it at
   <https://www.figma.com/developers/api#access-tokens> (tick "File variables: Read").
3. `npm install` has been run at least once.
4. The user is on a clean branch dedicated to the sync (create one if needed:
   `git checkout -b chore/sync-tokens-<date>`).

## Workflow

### Step 1 — Run the sync

```bash
npm run tokens:sync
```

This runs three steps under the hood: `tokens:fetch` (Figma REST), `tokens:parse`
(globals.css), `tokens:diff` (audit report). All output lands in
`scripts/sync-tokens/.cache/`:

- `figma-snapshot.json` — normalised Figma variables
- `css-snapshot.json` — normalised CSS custom properties
- `tokens-diff.json` — machine-readable diff
- `tokens-audit.md` — human-readable report (this is what you read with the user)

If `tokens:fetch` returns 403, **do not give up**. The Variables REST API is
Enterprise-only and the user's PAT may lack `file_variables:read`. In that case,
follow the **MCP fallback** below.

### Step 2 — Read the audit with the user

`scripts/sync-tokens/.cache/tokens-audit.md` is grouped into 4 categories.
Read it, then briefly summarise to the user — never just dump the file.
Frame each category by impact:

| Category | Risk | What you propose |
|---|---|---|
| **Value drift** | Visual regression for any consumer | List each token + consumer count. Apply zero-consumer drifts directly; for drifts with consumers, show before/after and ask. |
| **New in Figma** | None (additive) | Apply all by default unless the user says hold. |
| **CSS-only** | None (status quo) | List them. For zero-consumer entries, propose deletion. For others, ask designer or add to `ignoreCssTokens`. |
| **Missing `--color-*` alias** | Tailwind utility doesn't compile | Apply all by default — they're 1-line aliases inside `@theme inline`. |

### Step 3 — Apply approved edits to `src/styles/globals.css`

Edit `globals.css` using `StrReplace` for surgical changes, never wholesale
rewrites. Use the existing structural conventions:

- **Primitives** (`--mist-*`, `--slate-*`, `--color-blue-*`, etc.) live in
  `@theme inline`. Group new ones with their existing scale.
- **`--color-*` aliases** (Tailwind utility surface) live in `@theme inline`,
  organised by token family (Foreground, Stroke, Fill, Surface, Status, etc.).
- **Light-mode semantic values** live in `:root`, grouped by family.
- **Dark-mode overrides** live in `.dark`, mirroring the `:root` groupings.
- **Numerical primitives** (`--ds-spacing-*`, `--ds-stroke-*`, etc.) live in
  `:root`, grouped under "Figma DS-Primitives" comment headers. They are
  intentionally NOT exposed as Tailwind utilities.

When adding a new colour primitive that requires `oklch()` conversion, prefer
running `npm run css:to-oklch` after pasting the HEX value rather than computing
oklch by hand. The script is idempotent.

### Step 4 — Update the docs

Whenever you add/remove tokens, update
`.cursor/skills/qb-design-library/tokens-reference.md` to match. Designers and
consumers read this doc, so it MUST stay in sync.

### Step 5 — Rebuild the registry

```bash
npm run registry:build
```

This regenerates `public/r/theme.json` (the shadcn registry artifact that
ships `globals.css` to consumers). The build also regenerates per-component
JSONs and the API docs. **Verify**: the diff should only touch
`public/r/theme.json` and (if applicable) per-component JSONs that depend on
the theme.

### Step 6 — Re-run the sync to verify green

```bash
npm run tokens:sync
```

The audit summary should show a smaller count for whatever category you just
addressed. If something didn't land, walk the report again.

### Step 7 — Commit and open a PR

Stage only:

- `src/styles/globals.css`
- `.cursor/skills/qb-design-library/tokens-reference.md`
- `public/r/theme.json` (and any other registry JSONs that touched)

Use a commit message like:

```
feat(tokens): sync globals.css with Figma <change description>

- Adds <N> new tokens from Figma <category>
- Updates <N> drifted values (consumer counts: <list>)
- Removes <N> CSS-only entries
- Regenerates public/r/theme.json
```

Open the PR via `gh pr create`. In the PR body, paste the **summary table**
from the audit (not the full report) so reviewers can see scope at a glance.

## MCP fallback (when REST returns 403)

If the REST endpoint isn't accessible (Enterprise plan or scope issue), use
the Figma plugin MCP to extract the same data into the snapshot file the
diff script expects.

1. Confirm the Figma desktop app is open with the QBDS file loaded and the
   plugin MCP connected (look for `plugin-figma-figma` in the available MCP
   servers).
2. Read `.cursor/skills/figma-use/SKILL.md` first (mandatory before calling
   `use_figma`).
3. Use `use_figma` to run a Plugin API script that:
   - Calls `figma.variables.getLocalVariableCollectionsAsync()`
   - For each collection, walks its variables and reads `valuesByMode`
   - Resolves `VARIABLE_ALIAS` references
   - Outputs JSON in the **exact shape** of `figma-snapshot.json` (see the
     `FigmaSnapshot` type in `scripts/sync-tokens/fetch-figma-tokens.ts`)
4. Write the JSON to `scripts/sync-tokens/.cache/figma-snapshot.json` with
   `source: "mcp"` instead of `source: "rest"`.
5. Run `npm run tokens:parse && npm run tokens:diff` to complete the pipeline.

This path is slower (one round-trip per `use_figma` call) but does not
require Enterprise access.

## Mapping pitfalls

The diff uses a **heuristic** to map Figma names to CSS tokens (lowercase +
kebab-case + strip prefixes). When it gets the wrong answer, the audit will
report a "NEW IN FIGMA" entry for a token that actually already exists in
CSS under a slightly different name.

Fix: open `scripts/sync-tokens/token-mapping.json` and add an explicit
override:

```json
{
  "overrides": {
    "Figma/Variable/Path": "--actual-css-token"
  }
}
```

Then re-run `npm run tokens:diff`. The override takes effect immediately —
no fetch needed.

## What this skill explicitly does NOT do

- It does NOT touch Figma. We only read from Figma and write to code.
  If the user wants the reverse direction (push CSS-only tokens into Figma),
  use `figma-generate-library` instead.
- It does NOT run on Figma component variants — only the global `Variables`
  panel.
- It does NOT modify `tailwind.config.*` (there isn't one — Tailwind v4
  reads from `@theme inline`).
- It does NOT auto-merge or auto-push. Always open a PR for human review.

## Useful checks

- See what the audit script considers "in scope": run `npm run tokens:fetch`
  alone and check the per-collection counts in stdout.
- See which CSS tokens are flagged as primitives (and skipped from the
  CSS-only check): grep `parse-css-tokens.ts` for `^--[a-z]+-\d+`.
- See which tokens have zero consumers: open `tokens-diff.json` and look at
  `entries[].details.consumers`.
