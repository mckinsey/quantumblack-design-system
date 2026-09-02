---
name: create-qbds-component
description: End-to-end QBDS skill — spec through registry for a new component from Figma. Use when src/components/ui/<name>.tsx does not exist. Triggers — "add a new component", "create the <name> component", "build <name> from Figma", or a figma.com URL for a missing ui file. Do not use for updates (figma-parity), token sync (figma-token-sync), or Code Connect-only edits (code-connect).
---

# Workflow

Execute the following steps strictly in order. Do not start Step 2 until Step 1 is fully completed and verified.
After each step, stop show the output to user, take permission and then go to the next step

1. Run [figma-extract](../figma-extract/SKILL.md) skill and use the output for the next step.
2. [reference](../../../docs/qbds-react-components/reference.md)
3. [api](../../../docs/qbds-react-components/props.md) + [composition](../../../docs/qbds-react-components/composition.md) → [api_gate](../../../docs/qbds-react-components/api-gate.md)
   Confirm with the user once before moving to next steps
4. [build](../../../docs/qbds-react-components/build.md)
5. [demo](../../../docs/qbds-react-components/demos.md)
6. [tests](../../../docs/qbds-react-components/tests.md) — after `demo`; tests smoke-render every demo example
7. [code_connect](../code-connect/SKILL.md)
8. [publish](../../../docs/qbds-react-components/registry.md)
9. [exit_gate](../../../docs/qbds-react-components/exit-gate.md)
