## What this is

QB **LeftNav**: a fixed **icon rail** plus a **sliding NavMenu panel** beside it.

This is **not** the classic shadcn collapsible sidebar, and **not** a `DropdownMenu` flyout. Shared names like `SidebarProvider` and `SidebarMenuItem` come from shadcn; the product composition is LeftNav only.

| Piece  | Component                        | Job                                                   |
| ------ | -------------------------------- | ----------------------------------------------------- |
| Shell  | `SidebarProvider` + `SidebarNav` | Owns `size` / `side` / `layout`; lays out rail + menu |
| Rail   | `SidebarNavRail`                 | Always-visible icon column                            |
| Flyout | `SidebarNavMenu`                 | Panel beside the rail (`overlay` by default)          |
| Page   | `SidebarInset`                   | Main content                                          |

## Composition

```text
SidebarProvider (layout="nav", size, side)
├── SidebarNav
│   ├── SidebarNavRail
│   │   ├── SidebarHeader → SidebarMenu → SidebarMenuItem → SidebarNavIconButton
│   │   └── SidebarFooter → SidebarMenu → SidebarMenuItem → SidebarNavUtilityButton
│   └── SidebarNavMenu                    // overlay panel; wire with useSidebarNavMenuOverlay
│       └── SidebarGroup → … → SidebarNavMenuButton / SidebarNavMenuSubButton
└── SidebarInset
```

Use `useSidebarNavMenuOverlay` so rail clicks open/close the panel. Nested groups use `Collapsible` + `SidebarNavMenuButton showChevron`, not `DropdownMenu`. See **Examples** below for live shells and source.

## Do / don’t

- **Do** use `SidebarNavIconButton` on the rail and `SidebarNavMenu` for the flyout.
- **Don’t** wrap rail buttons in `DropdownMenu` for primary nav.
- **Don’t** use `SidebarMenuButton` for the LeftNav icon rail.
- **Don’t** expect `SidebarNavMenu` to portal like a popover — it sits beside the rail inside `SidebarNav`.

Classic shadcn pieces (`Sidebar`, `SidebarTrigger`, `SidebarRail`, `collapsible="icon"`) stay exported for the registry app — skip them for LeftNav.
