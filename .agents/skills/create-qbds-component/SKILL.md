---
name: create-qbds-component
description: End-to-end QBDS skill — spec through registry for a new component from Figma. Use when src/components/ui/<name>.tsx does not exist. Triggers — "add a new component", "create the <name> component", "build <name> from Figma", or a figma.com URL for a missing ui file. Do not use for updates (figma-parity), token sync (figma-token-sync), or Code Connect-only edits (code-connect).
---

# Workflow

Execute the following steps strictly in order. Do not start Step 2 until Step 1 is fully completed and verified.
After each step, pause, show the output to the user, and wait for confirmation before continuing.

1. Run [figma-extract](../figma-extract/SKILL.md) skill and use the output for the next step.
2. [reference](../../../docs/qbds-react-components/reference.md)
3. [api](../../../docs/qbds-react-components/props.md) + [composition](../../../docs/qbds-react-components/composition.md) → **api_gate** (below). Confirm with the user before moving to next steps.
4. [build](../../../docs/qbds-react-components/build.md)
5. [demo](../../../docs/qbds-react-components/demos.md)
6. [tests](../../../docs/qbds-react-components/tests.md) — after `demo`; tests smoke-render every demo example
7. [code_connect](../code-connect/SKILL.md)
8. [publish](../../../docs/qbds-react-components/registry.md)
9. **exit_gate** (below)

## api_gate

Before `build`: output export list (one-line purpose each) + demo plan (`examples[]` names and what each proves). Stop if exports exceed shadcn baseline + QBDS axes from the alignment table, or if the demo plan splits axis values or `show*` toggles into separate examples. Trim per [composition.md](../../../docs/qbds-react-components/composition.md) and [demos.md](../../../docs/qbds-react-components/demos.md).

## exit_gate

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse
```

Fix until all five pass. Triage individually when `&&` hides failures. `npm run prettier:fix` for format. Prop surface change → return to `api`, re-show prop list, continue forward.

Ask before continuing when: Figma axis has no sensible React expression, sibling contradicts shadcn naming, export list exceeds closest shadcn sibling without Figma reason, or a new token is needed.
