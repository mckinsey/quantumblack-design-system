# Stage 4 — Build

Open this **only after** `ui_structure.status` is `confirmed` (or the user said “just build” with a clear brief — plan must already be filled per [SKILL.md § Just build](../SKILL.md#just-build)).

**Job:** implement the confirmed plan. Do not redesign. Do not invent components or tokens that aren’t in `ui_structure`.

If requirements or design change mid-build → pause and follow [re-run.md](re-run.md).

Hard traps (registry names, no CDN, theme toggle, no inventing components): see [SKILL.md](../SKILL.md#hard-traps).

---

## Do this in order

1. **Scaffold if needed**  
   New `delivery.targets` folder → Vite or Next script ([delivery-modes.md](delivery-modes.md) · [setup-qbds-vite.sh](scripts/setup-qbds-vite.sh) / [setup-qbds-next.sh](scripts/setup-qbds-next.sh)). Do not hand-roll.  
   Scripts reject any existing path. If the target already exists but is empty: from its parent run `rmdir <folder>` and proceed only if that succeeds (non-empty stays protected).

2. **Wire QBDS** — Follow [react-qbds-registry.md](shared/react-qbds-registry.md) (`components.json`, `globals.css` after Tailwind, dark default / partial install).

3. **Install from the plan** — Only `ui_structure.installs` (already checked in stage 3). Add via the command in [react-qbds-registry.md](shared/react-qbds-registry.md); missing name → fallbacks there. Do not invent `@qbds/…`.

4. **Assemble the UI**  
   Follow `ui_structure.jsx` and each region’s `components` / `example` / `layout` / `tokens` (already example-prioritized in stage 3, including any `uxAdjustments`). Use UX for domain content / interaction still in scope.  
   Re-fetch the region’s `example` URL if needed and match that composition — do not substitute a different shell/pattern from memory or re-impose pre-adjustment UX chrome. Strip site-only demo imports.  
   Shell recipes: [app-layout-archetypes.md](shared/app-layout-archetypes.md) only when they agree with the chosen example.  
   Stay inside `delivery` + `scope` ([delivery-modes.md § Build](delivery-modes.md#build)).

5. **Build `newComponents`**  
   Each entry from its full spec (`path`, `compose`, `tokens`, `layout`, `behavior`, `states`, `a11y`, `props`, `how`). Honour example citations in `how`. No new local components at build time — that was stage 3.

6. **Charts (only if in the plan)**  
   [chart-best-practices.md](shared/chart-best-practices.md) + [DESIGN.md § Chart colours](https://github.com/mckinsey/quantumblack-design-system/blob/main/docs/DESIGN.md#chart-colours). Re-init on theme toggle.

7. **Finish**  
   Set `build.status`. Record anything that diverged under `build.deviations`.  
   Present per [SKILL.md § Show to the user](../SKILL.md#show-to-the-user-every-stage).
