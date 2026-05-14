# `scripts/sync-tokens/` — Figma → code token sync

Pulls design tokens from the QBDS Figma file and reports what's drifted from
`src/styles/globals.css`. **Audit-only by design** — these scripts never edit
your CSS. You decide which changes to apply.

## TL;DR

```bash
export FIGMA_ACCESS_TOKEN=figd_...   # PAT with `file_variables:read` scope
npm run tokens:sync                  # fetch + parse + diff
open scripts/sync-tokens/.cache/tokens-audit.md
```

The audit is a markdown report grouping every discrepancy into 4 buckets:
**value drift**, **new in Figma**, **CSS-only**, and **missing `--color-*` alias**.
Hand the report to your designer or ask the agent to apply targeted edits.

## Pipeline

| Step | Script | What it does | Output |
|------|--------|--------------|--------|
| 1 | `npm run tokens:fetch` | Pulls all variables from the Figma file via the Variables REST API. Resolves aliases. Converts colours to `oklch()`. | `.cache/figma-snapshot.json` |
| 2 | `npm run tokens:parse` | Parses `src/styles/globals.css` with postcss. Extracts every `--*` custom property bucketed by selector (`@theme inline`, `:root`, `.dark`, `.radius-mode`). Resolves `var()` chains. | `.cache/css-snapshot.json` |
| 3 | `npm run tokens:diff` | Compares the two snapshots and writes the audit report. Counts `src/` consumers for any drifted token using ripgrep. | `.cache/tokens-diff.json`, `.cache/tokens-audit.md` |
| (all) | `npm run tokens:sync` | Runs steps 1–3 in order. | all of the above |

Snapshots and reports are written to `.cache/` and are gitignored — re-run
`tokens:sync` whenever you want fresh output.

## Configuration

`token-mapping.json` controls how Figma names map to CSS custom-property names.

| Field | Purpose |
|-------|---------|
| `figmaFileKey` | The QBDS Figma file to pull from. Currently `iuMWqCsIohoKAUB0tBS0xr`. |
| `stripPrefixes` | Path prefixes stripped from Figma names before kebab-casing. |
| `modeAliases` | Maps Figma mode names (e.g. "Dark", "Mode 2") to CSS modes (`light` / `dark`). |
| `collectionScope.include` | Only pull variables from these Figma collections (case-insensitive). |
| `overrides` | Explicit one-off mappings: `"Figma/Path": "--css-token-name"`. Use when the heuristic produces the wrong name. |
| `ignoreFigmaVariables` | Figma vars to exclude from the audit (intentionally Figma-only, e.g. internal layout primitives). |
| `ignoreCssTokens` | CSS tokens to exclude from the audit (intentionally CSS-only, e.g. shadcn/Tailwind shims). |

When the audit reports an unexpected discrepancy, the fix is almost always to
add an override or an ignore rule here — not to edit the script.

## Auth

The Figma Variables REST API requires:

1. The QBDS file lives in a team on the **Enterprise** plan.
2. A Personal Access Token (PAT) generated with the **`file_variables:read`**
   scope ticked. (It's not on by default.)

If `npm run tokens:fetch` returns a 403, the script prints fallback
instructions for using the Figma plugin MCP from a Cursor agent session
instead. See `.cursor/skills/qbds-sync-tokens/SKILL.md` for that path.

## What the audit does NOT do

- It does not write to `globals.css`. Edits are always manual / agent-driven.
- It does not run `registry:build`. After you apply edits to `globals.css`,
  run `npm run registry:build` to regenerate `public/r/theme.json` so
  consumers of the registry pick up the new tokens.
- It does not check Figma component variants — only the `Variables` panel.
  Component-level overrides are out of scope.

## Suggested cadence

- **Designer adds/changes a token in Figma** → designer pings dev, dev runs
  `npm run tokens:sync`, reviews the audit, opens a PR with the matching
  edits to `globals.css` + `tokens-reference.md`.
- **CI guard (optional, future)** → run `tokens:sync` nightly; fail if the
  audit reports more than N entries. Keeps drift surfaced quickly.
