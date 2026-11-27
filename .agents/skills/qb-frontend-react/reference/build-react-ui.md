# Stage 4 — Build

Open this **only after** `ui_structure.status` is `confirmed` (or the user said “just build” with a clear brief — plan must already be filled per [SKILL.md § Just build](../SKILL.md#just-build)).

**Job:** implement the confirmed plan. Do not redesign. Do not invent components or tokens that aren’t in `ui_structure`.

If requirements or design change mid-build → pause and follow [re-run.md](re-run.md).

Design-system specifics (component registry, theming, missing components, install commands) come from the active design-system skill. For QBDS: [`qbds-library`](../../qbds-library/SKILL.md) — [registry.md](../../qbds-library/reference/registry.md).

---

## Do this in order

1. **Scaffold if needed**  
   New `delivery.targets` folder → design-system scaffold script ([delivery-modes.md](delivery-modes.md); QBDS: [`qbds-library` § Scaffold](../../qbds-library/SKILL.md#scaffold)). Do not hand-roll.  
   Scripts reject any existing path. If the target already exists but is empty: from its parent run `rmdir <folder>` and proceed only if that succeeds (non-empty stays protected).

2. **Wire the design system** — theme CSS, config, dark/light default, partial-install steps. QBDS: [registry.md](../../qbds-library/reference/registry.md).

3. **Install from the plan** — Only `ui_structure.installs` (already checked in stage 3). Use the design system’s install command; a missing name uses the documented fallback. Never invent component names. QBDS: [registry.md](../../qbds-library/reference/registry.md).

4. **Assemble the UI**  
   Follow `ui_structure.jsx` and each region’s `components` / `example` / `layout` / `tokens` (already example-prioritized in stage 3, including any `uxAdjustments`). Use UX for domain content / interaction still in scope.  
   Re-fetch the region’s `example` URL if needed and match that composition — do not substitute a different shell/pattern from memory or re-impose pre-adjustment UX chrome. Strip site-only demo imports.  
   Shell recipes: the design system’s layout recipes (QBDS: [app-layout-archetypes.md](../../qbds-library/reference/app-layout-archetypes.md)) only when they agree with the chosen example.  
   Stay inside `delivery` + `scope` ([delivery-modes.md](delivery-modes.md#how-the-mode-shapes-later-stages)).

5. **Build `newComponents`**  
   Each entry from its full spec (`path`, `compose`, `tokens`, `layout`, `behavior`, `states`, `a11y`, `props`, `how`). Honour example citations in `how`. No new local components at build time — that was stage 3.

6. **Charts (only if in the plan)**  
   [charts.md](charts.md) for chart choice; styling/colours from the design-system skill (QBDS: [charts.md](../../qbds-library/reference/charts.md)). Re-init on theme toggle.

7. **Finish**  
   Set `build.status`. Record anything that diverged under `build.deviations`.  
   Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage).
