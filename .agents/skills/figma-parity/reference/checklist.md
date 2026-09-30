Complete before PR (also linked from [AGENTS.md](../../../AGENTS.md)).

- [ ] Alignment `rows`: all Figma axes ↔ `cva`/props both ways; SLOT seams covered
- [ ] Every Figma `state` in matrix; if both **focused** and **dropdown-open**, open ≠ focus (fill + IconShell)
- [ ] Code Connect (if any): matches alignment table; open/expanded not collapsed to enabled/`false`
- [ ] `fieldChrome` (when Elements/*): label, helper, feedback, counter per **size**
- [ ] Feedback uses `text-status-error|warning|success|information` where appropriate
- [ ] Matrix: tokens + geometry (+ underline) per cell
- [ ] Light and dark where component appears on both
- [ ] Defaults: Figma, `cva`, registry; demos cover alignment table
- [ ] Spacing from per-cell Figma values; pl/pr verified separately
- [ ] Exported sub-components: demo + test, or un-export
- [ ] Primitive `asChild` / `render` direction; keyboard nav in demo
- [ ] Visual pass: no undocumented ≥2px gaps
- [ ] Exit gate — [create-qbds-component#exit-gate](../../create-qbds-component/SKILL.md#exit-gate)

URL only: parse `node-id`, run workflow, compare to nearest sibling in `src/components/ui/`.
