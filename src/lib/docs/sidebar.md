## What this is

QB **LeftNav** — icon rail + sliding NavMenu panel.

Not the classic shadcn collapsible sidebar. Not a `DropdownMenu`. Shared primitives (`SidebarProvider`, `SidebarMenuItem`, …) come from shadcn; this page documents the LeftNav composition only.

For other shadcn sidebar patterns (collapsible, inset, floating), see the [shadcn sidebar docs](https://ui.shadcn.com/docs/components/base/sidebar).

- **Shell** — `SidebarProvider` + `SidebarNav` (`size`, `side`, `layout`)
- **Rail** — `SidebarNavRail` (fixed icon column)
- **Panel** — `SidebarNavMenu` (slides beside the rail; `overlay` by default)
- **Page** — `SidebarInset` (main content)

## Composition

```text
SidebarProvider (layout="nav", size, side)
├── SidebarNav
│   ├── SidebarNavRail
│   │   ├── SidebarHeader → SidebarMenu → SidebarMenuItem → SidebarNavIconButton
│   │   └── SidebarFooter → SidebarMenu → SidebarMenuItem → SidebarNavUtilityButton
│   └── SidebarNavMenu
│       └── SidebarGroup → SidebarNavMenuButton / SidebarNavMenuSubButton
└── SidebarInset
```

Wire rail ↔ panel with `useSidebarNavMenuOverlay`. Nested groups use `Collapsible` + `SidebarNavMenuButton showChevron`. Live shells and source are in **Examples** below.
