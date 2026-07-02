'use client';

import { useState } from 'react';
import type { ReactNode } from 'react';

import { RegistryLogo } from '@/components/registry/registry-logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
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
  SidebarMenuButton,
  SidebarMenuItem,
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

function NavRail({
  active,
  onActive,
}: {
  active: NavId;
  onActive: (id: NavId) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'lg' : 'default';

  return (
    <Sidebar collapsible="none">
      <SidebarHeader>
        <SidebarMenu>
          {primaryNav.map(item => {
            const isActive = active === item.id;

            return (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={itemTooltip(item.label)}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={
                      isActive && size === 'lg' ? 'primary' : 'secondary'
                    }>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarMenuButton>
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
    </Sidebar>
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
    <header className="border-stroke-divider bg-surface-primary flex h-[72px] shrink-0 items-center gap-3 border-b px-6">
      <RegistryLogo className="h-6 w-6" />
      <span className="headings-h3-regular text-fg-primary">QuantumBlack</span>
      <Button size="sm" className="ml-auto" onClick={onToggleFullscreen}>
        <Icon icon={fullscreen ? 'close_fullscreen' : 'open_in_full'} />
        {fullscreen ? 'Close fullscreen' : 'Open fullscreen'}
      </Button>
    </header>
  );
}

function AppShell({
  fullscreen,
  onToggleFullscreen,
}: {
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const [active, setActive] = useState<NavId>('home');
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
      <SidebarProvider size="default" className="flex min-h-0 flex-1">
        <NavRail active={active} onActive={setActive} />
        <AppMain title={page.title} body={page.body} />
      </SidebarProvider>
    </div>
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

export function SidebarApp() {
  const [fullscreen, setFullscreen] = useState(false);

  return (
    <>
      <AppShell
        fullscreen={false}
        onToggleFullscreen={() => setFullscreen(true)}
      />
      <Dialog open={fullscreen} onOpenChange={setFullscreen}>
        <DialogContent
          showCloseButton={false}
          className="border-stroke-divider fixed inset-0 flex h-svh max-h-svh w-svw max-w-none translate-x-0 translate-y-0 flex-col gap-0 rounded-none border-0 p-0 shadow-none sm:max-w-none">
          <DialogTitle className="sr-only">App shell preview</DialogTitle>
          <AppShell
            fullscreen
            onToggleFullscreen={() => setFullscreen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

function SidebarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border-stroke-divider h-[996px] w-full overflow-hidden rounded-lg border">
      {children}
    </div>
  );
}

function NavRailFrame({ size }: { size: RailSize }) {
  const [active, setActive] = useState<NavId>('home');

  return (
    <SidebarProvider size={size} className="flex h-full min-h-0 w-auto">
      <NavRail active={active} onActive={setActive} />
    </SidebarProvider>
  );
}

export function SidebarNav() {
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
    title: 'App shell',
    description: '72px header with fixed icon rail and scrollable main.',
  },
  {
    name: 'SidebarNav',
    title: 'Nav rail',
    description: 'Icon rail at default (64px) and lg (80px) side by side.',
  },
];

export const sidebar = createLegacyDemo('sidebar', examples, {
  SidebarApp: <SidebarApp />,
  SidebarNav: <SidebarNav />,
});
