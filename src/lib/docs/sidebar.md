## Usage

```tsx
import {
  SidebarInset,
  SidebarNav,
  SidebarNavMenu,
  SidebarNavRail,
  SidebarProvider,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar';

export function App() {
  const nav = useSidebarNavMenuOverlay('home');

  return (
    <div className="flex min-h-svh">
      <SidebarProvider layout="nav" size="lg">
        <SidebarNav>
          <SidebarNavRail>{/* rail icons */}</SidebarNavRail>
          <SidebarNavMenu
            mode="overlay"
            open={nav.open}
            onOpenChange={nav.setOpen}>
            {/* nav groups + items */}
          </SidebarNavMenu>
        </SidebarNav>
      </SidebarProvider>
      <SidebarInset>{/* page */}</SidebarInset>
    </div>
  );
}
```

## Composition

LeftNav shell.

```text
SidebarProvider (layout="nav")
├── SidebarNav
│   ├── SidebarNavRail
│   └── SidebarNavMenu
└── SidebarInset
```

For more information, see the [shadcn/ui Sidebar docs](https://ui.shadcn.com/docs/components/base/sidebar).
