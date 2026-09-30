---
name: figma-parity
description: Ensure implemented QBDS code matches Figma. Use when reviewing or updating a component from a Figma URL. Triggers — "figma parity", "match the Figma spec", or figma.com URL with work in src/components/ui/ or demos.
---

# Workflow

1. Run [figma-extract](../figma-extract/SKILL.md) on the Figma link.
2. Match that output to the code — `src/components/ui/<name>.tsx`, its demo, tokens per [docs/TOKENS.md](../../../docs/TOKENS.md).
3. Spot-check the demo (`npm run dev`) against Figma when visuals are unclear.

Summarize match vs fixes.
