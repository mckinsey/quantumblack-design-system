# api — composition

Decide which sub-components to export and what goes in slots. Do this together with [props.md](./props.md).

- List each part: name and what it holds
- Optional UI (headers, footers, slots, wrapper frames) becomes either a named part or `children`
- For each Figma property, pick one: **prop**, **child**, **demo-only**, or **don't export**
- Show the part list and prop table before writing any code
- Don't start `build` until both are agreed

This file is the source of truth for exports vs slots. Host-specific rules (e.g. QBDS) extend it — don't repeat them here.
