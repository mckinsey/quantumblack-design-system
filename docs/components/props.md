# Component props

Prefer shadcn names. `show*` / SLOT / icons → children or composition, not new props. No public `state="…"` enum.

- Figma `type` → React `variant`. Prefer Figma `primary` → `default` for new APIs; if `src/components/ui/<name>.tsx` exists, match that shipped API.
- Figma `reg` → `size="default"`. Ship every size Figma lists (text + icon sets when both exist).
- Interaction: `disabled` prop; hover/focus/pressed/open/loading via CSS, `data-state`, or children — not a loading prop.
