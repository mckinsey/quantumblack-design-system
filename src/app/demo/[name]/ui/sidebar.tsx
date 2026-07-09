'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { RegistryLogo } from '@/components/registry/registry-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Sidebar,
  SidebarFooter,
  SidebarFooterButton,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuIconButton,
  SidebarMenuItem,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuHeader,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

type RailSize = 'default' | 'lg';

const primaryNav = [
  {
    id: 'home',
    icon: 'home',
    label: 'Home',
    title: 'Home',
    body: 'Overview of your workspace, recent activity, and quick links.',
  },
  {
    id: 'dashboard',
    icon: 'space_dashboard',
    label: 'Dashboard',
    title: 'Dashboard',
    body: 'Metrics, charts, and KPIs for the current project.',
  },
  {
    id: 'flow',
    icon: 'account_tree',
    label: 'Flow',
    title: 'Flow',
    body: 'Pipeline stages, dependencies, and workflow status.',
  },
  {
    id: 'focus',
    icon: 'center_focus_strong',
    label: 'Focus',
    title: 'Focus',
    body: 'Deep work mode — tasks and context for the current sprint.',
  },
] as const;

type NavId = (typeof primaryNav)[number]['id'];

const utilityNav = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'light_mode', label: 'Theme' },
  { icon: 'info', label: 'Info' },
];

function itemTooltip(label: string) {
  return { children: label, hidden: false };
}

function NavMenuContent() {
  return (
    <>
      <SidebarNavMenuHeader>SECTION HEADER</SidebarNavMenuHeader>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton icon="folder">Group Title 1</SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton icon="folder">Group Title 2</SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <Collapsible defaultOpen className="group/collapsible bg-fill-muted">
        <SidebarNavMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarNavMenuButton
              showChevron
              icon="folder"
              badge={
                <Badge size="sm" variant="high-emphasis" outline>
                  Label
                </Badge>
              }>
              Group Title
            </SidebarNavMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarNavMenuSub>
              <SidebarNavMenuSubButton isActive icon="crop_free">
                Sub-item 1
              </SidebarNavMenuSubButton>
              <SidebarNavMenuSubButton icon="crop_free">
                Sub-item 2
              </SidebarNavMenuSubButton>
              <SidebarNavMenuSubButton icon="crop_free">
                Sub-item 3
              </SidebarNavMenuSubButton>
            </SidebarNavMenuSub>
          </CollapsibleContent>
        </SidebarNavMenuItem>
      </Collapsible>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton icon="folder">Group Title 3</SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuHeader>SECTION HEADER</SidebarNavMenuHeader>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton icon="folder">Group Title 3</SidebarNavMenuButton>
      </SidebarNavMenuItem>
    </>
  );
}

function NavRailContent({
  active,
  onActive,
  onMenuToggle,
  menuOpen,
}: {
  active: NavId;
  onActive: (id: NavId) => void;
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'lg' : 'default';

  return (
    <SidebarNavRail>
      <SidebarHeader>
        <SidebarMenu>
          {onMenuToggle ? (
            <SidebarMenuItem>
              <SidebarMenuIconButton
                isActive={menuOpen}
                tooltip={itemTooltip('Navigation')}
                onClick={onMenuToggle}>
                <IconShell
                  size={iconSize}
                  variant={menuOpen ? 'primary' : 'secondary'}>
                  <Icon icon="menu" />
                </IconShell>
              </SidebarMenuIconButton>
            </SidebarMenuItem>
          ) : null}
          {primaryNav.map(item => {
            const isActive = active === item.id;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuIconButton
                  isActive={isActive}
                  tooltip={itemTooltip(item.label)}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={isActive ? 'primary' : 'secondary'}>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarMenuIconButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarFooter>
        <SidebarSeparator className="mb-4" />
        <SidebarMenu className="items-center gap-4">
          {utilityNav.map(item => (
            <SidebarMenuItem key={item.label}>
              <SidebarFooterButton tooltip={itemTooltip(item.label)}>
                <IconShell size="default" variant="secondary">
                  <Icon icon={item.icon} />
                </IconShell>
              </SidebarFooterButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        <SidebarSeparator className="mt-4 mb-6" />
        <div className="flex justify-center">
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>
      </SidebarFooter>
    </SidebarNavRail>
  );
}

function LeftNavShell({
  mode,
  withIcons = false,
  fullscreen,
  onToggleFullscreen,
}: {
  mode: 'inline' | 'overlay';
  withIcons?: boolean;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const [active, setActive] = useState<NavId>('home');
  const [navOpen, setNavOpen] = useState(false);
  const page = primaryNav.find(item => item.id === active) ?? primaryNav[0];

  return (
    <div
      className={cn(
        'border-stroke-divider bg-surface-secondary flex w-full flex-col overflow-hidden',
        fullscreen ? 'h-full min-h-svh' : 'h-[720px] rounded-lg border',
      )}>
      <AppHeader
        fullscreen={fullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
      <SidebarProvider size="lg" className="flex min-h-0 flex-1">
        <Sidebar collapsible="none" side="left">
          <NavRailContent
            active={active}
            onActive={setActive}
            menuOpen={mode === 'overlay' ? navOpen : undefined}
            onMenuToggle={
              mode === 'overlay' ? () => setNavOpen(open => !open) : undefined
            }
          />
          <SidebarNavMenu
            mode={mode}
            withIcons={withIcons}
            open={mode === 'overlay' ? navOpen : undefined}
            onOpenChange={mode === 'overlay' ? setNavOpen : undefined}>
            <NavMenuContent />
          </SidebarNavMenu>
        </Sidebar>
        <AppMain title={page.title} body={page.body} />
      </SidebarProvider>
    </div>
  );
}

function AppHeader({
  fullscreen,
  onToggleFullscreen,
}: {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  return (
    <header className="border-stroke-divider bg-surface-primary flex h-[64px] shrink-0 items-center gap-3 border-b px-6">
      <RegistryLogo className="h-6 w-6" />
      <span className="headings-h3-regular text-fg-primary">QuantumBlack</span>
      <Button size="sm" className="ml-auto" onClick={onToggleFullscreen}>
        <Icon icon={fullscreen ? 'close_fullscreen' : 'open_in_full'} />
        {fullscreen ? 'Close fullscreen' : 'Open fullscreen'}
      </Button>
    </header>
  );
}

function AppMain({ title, body }: { title: string; body: string }) {
  return (
    <SidebarInset className="bg-surface-secondary overflow-auto p-8">
      <h1 className="headings-h2-regular text-fg-primary mb-2">{title}</h1>
      <p className="paragraph-small text-fg-secondary">{body}</p>
    </SidebarInset>
  );
}

function FullscreenShell({
  children,
}: {
  children: (props: {
    fullscreen: boolean;
    onToggleFullscreen: () => void;
  }) => ReactNode;
}) {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      {children({
        fullscreen: false,
        onToggleFullscreen: () => setFullscreen(true),
      })}
      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent
          showCloseButton={false}
          className="border-stroke-divider fixed inset-0 flex h-svh max-h-svh w-svw max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 shadow-none sm:max-w-none">
          <DialogTitle className="sr-only">App shell preview</DialogTitle>
          {children({
            fullscreen: true,
            onToggleFullscreen: () => setFullscreen(false),
          })}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function SidebarApp() {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) => (
        <LeftNavShell
          mode="inline"
          fullscreen={fullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}
    </FullscreenShell>
  );
}

export function SidebarNavOverlay() {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) => (
        <LeftNavShell
          mode="overlay"
          withIcons
          fullscreen={fullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}
    </FullscreenShell>
  );
}

function SidebarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border-stroke-divider h-[996px] w-full overflow-hidden rounded-lg border">
      {children}
    </div>
  );
}

export function StandaloneNavMenu() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full justify-center p-6">
        <SidebarProvider size="default">
          <Sidebar collapsible="none">
            <SidebarNavMenu withIcons={false}>
              <NavMenuContent />
            </SidebarNavMenu>
          </Sidebar>
        </SidebarProvider>
      </div>
    </SidebarFrame>
  );
}

export function SidebarNavMenuWithIcons() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full justify-center p-6">
        <SidebarProvider size="default">
          <Sidebar collapsible="none">
            <SidebarNavMenu withIcons>
              <NavMenuContent />
            </SidebarNavMenu>
          </Sidebar>
        </SidebarProvider>
      </div>
    </SidebarFrame>
  );
}

export function SidebarNavMenuLarge() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full justify-center p-6">
        <SidebarProvider size="lg">
          <Sidebar collapsible="none">
            <SidebarNavMenu withIcons={false}>
              <NavMenuContent />
            </SidebarNavMenu>
          </Sidebar>
        </SidebarProvider>
      </div>
    </SidebarFrame>
  );
}

export function SidebarNavMenuLargeWithIcons() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full justify-center p-6">
        <SidebarProvider size="lg">
          <Sidebar collapsible="none">
            <SidebarNavMenu withIcons>
              <NavMenuContent />
            </SidebarNavMenu>
          </Sidebar>
        </SidebarProvider>
      </div>
    </SidebarFrame>
  );
}

function NavRailFrame({ size }: { size: RailSize }) {
  const [active, setActive] = useState<NavId>('home');

  return (
    <SidebarProvider size={size} className="flex h-full min-h-0 w-auto">
      <Sidebar collapsible="none">
        <NavRailContent active={active} onActive={setActive} />
      </Sidebar>
    </SidebarProvider>
  );
}

export function SidebarSizes() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full items-start justify-center gap-8 p-6">
        <NavRailFrame size="default" />
        <NavRailFrame size="lg" />
      </div>
    </SidebarFrame>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SidebarApp',
    title: 'LeftNav (inline)',
    description: 'Icon rail and NavMenu panel side by side inside Sidebar.',
  },
  {
    name: 'SidebarNavOverlay',
    title: 'LeftNav (overlay)',
    description: 'NavMenu slides in from the rail on menu button click.',
  },
  {
    name: 'StandaloneNavMenu',
    title: 'NavMenu standalone',
    description: 'NavMenu only, no icon rail.',
  },
  {
    name: 'SidebarNavMenuWithIcons',
    title: 'NavMenu with icons (reg)',
    description: 'Default size with leading icons on rows.',
  },
  {
    name: 'SidebarNavMenuLarge',
    title: 'NavMenu large',
    description: 'Large size without icons.',
  },
  {
    name: 'SidebarNavMenuLargeWithIcons',
    title: 'NavMenu large with icons',
    description: 'Large size with leading icons.',
  },
  {
    name: 'SidebarSizes',
    title: 'Icon rail sizes',
    description: 'SidebarNavRail at default and lg side by side.',
  },
];

export const sidebar = createLegacyDemo('sidebar', examples, {
  SidebarApp: <SidebarApp />,
  SidebarNavOverlay: <SidebarNavOverlay />,
  StandaloneNavMenu: <StandaloneNavMenu />,
  SidebarNavMenuWithIcons: <SidebarNavMenuWithIcons />,
  SidebarNavMenuLarge: <SidebarNavMenuLarge />,
  SidebarNavMenuLargeWithIcons: <SidebarNavMenuLargeWithIcons />,
  SidebarSizes: <SidebarSizes />,
});
