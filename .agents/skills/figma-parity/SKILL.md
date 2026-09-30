---
name: figma-parity
description: Verify or update an existing QBDS component against Figma (tokens, variants, states, demos). Use when reviewing or changing src/components/ui/, demos, or code-connect/ from a Figma spec — not for greenfield (create-qbds-component) or token sync (figma-token-sync). Triggers — "figma parity", "match the Figma spec", "review against Figma", or a figma.com URL with existing component code.
---

# Workflow

Run in order. Ask for a Figma URL/node if missing.

1. Optional: run [figma-extract](../figma-extract/SKILL.md) if you do not already have a component inventory.
2. [Prepare](reference/prepare.md) — MCP settings, sources of truth, repo patterns.
3. [Alignment table](reference/alignment.md) — Figma axes ↔ React API ↔ Code Connect.
4. [Variant × state matrix](reference/variant-state-matrix.md) — tokens, layout, states per cell.
5. [Acceptance checklist](reference/checklist.md) — complete before PR.

Show the JSON from steps 3–4 and the finished checklist (step 5) when reporting parity.
