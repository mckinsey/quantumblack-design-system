---
name: create-component
description: End-to-end workflow for adding a new QBDS component from a Figma spec — parity, prior art, props/composition, demos, tests, Code Connect, registry. Use when creating a component that does not exist yet in src/components/ui/. Triggers — "add a new component", "create the <name> component", "build <name> from Figma", or a figma.com component-set URL for a missing ui file. Do not use for updates to an existing component (figma-parity), token sync only (figma-token-sync), or Code Connect-only edits (code-connect).
---

# Create a QBDS component

Add a new component from a Figma component-set URL. Your job is to walk eight steps in order — spec through registry — and pass the exit gate.

For updates to an existing component, use [figma-parity](../figma-parity/SKILL.md) instead.

Each step has its own doc in `docs/components/`. Read that doc at each step; don't invent parallel rules.

```mermaid
flowchart TD
    A[Figma component-set URL] --> B[1 Spec · figma-parity]
    B --> C[2 Prior art · shadcn + primitive + sibling]
    C --> D[3 API · props + composition]
    D --> E[4 Build · sibling + TOKENS]
    E --> F[5 Demo]
    F --> G[6 Tests]
    G --> H[7 Code Connect]
    H --> I[8 Registry]
    I --> J{exit gate}
    J -- fail --> D
    J -- pass --> K[Ready for PR]
```

## Steps

1. **Spec** — [figma-parity](../figma-parity/SKILL.md): run _Structure & variants_ → _Tokens_ → _Layout, spacing, typography & states_ on the **component set**. Stop at the alignment table + variant × state matrix; the visual pass happens after step 5 when a demo exists. No code yet. No URL → ask.
2. **Prior art** — Look up shadcn (`npx shadcn@latest search|docs|view <name>`), the primitive docs (Base UI: `https://base-ui.com/react/components/<name>`), and the closest sibling in `src/components/ui/`. Structure from the sibling, naming from shadcn, behaviour from the primitive. Base UI vs Radix: [CLAUDE.md](../../../CLAUDE.md).
3. **API** — [props.md](../../../docs/components/props.md) + [composition.md](../../../docs/components/composition.md). Show the prop table and part list before building. Diverging from shadcn needs a one-line Figma reason.
4. **Build** — [build.md](../../../docs/components/build.md).
5. **Demo** — [demos.md](../../../docs/components/demos.md).
6. **Tests** — [tests.md](../../../docs/components/tests.md).
7. **Code Connect** — [code-connect](../code-connect/SKILL.md).
8. **Registry** — [registry.md](../../../docs/components/registry.md).

## Exit gate

Canonical for all component work — [figma-parity](../figma-parity/SKILL.md) defers to this.

```bash
npm run lint && npm run typecheck && npm run test:unit && npm run registry:build && npm run figma:parse
```

Ask before continuing when: a Figma axis has no sensible React expression, sibling contradicts shadcn naming, or a new token is needed.
