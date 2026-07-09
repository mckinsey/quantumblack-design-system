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
    title: 'Good morning, Priya',
    subtitle: 'Acme Corp workspace',
    body: 'You have 3 open tasks and 2 shared dashboards waiting for review. Pick up where you left off or open a starred project from the navigation panel.',
  },
  {
    id: 'dashboard',
    icon: 'space_dashboard',
    label: 'Dashboard',
    title: 'Revenue operations',
    subtitle: 'Q2 2026 · Live',
    body: 'Conversion is up 4.2% week over week. Pipeline coverage sits at 1.4× target. Review the weekly summary and drill into underperforming regions.',
  },
  {
    id: 'flow',
    icon: 'account_tree',
    label: 'Flow',
    title: 'Model training pipeline',
    subtitle: 'Run #1842 · In progress',
    body: 'Feature engineering finished 12 minutes ago. Training stage 3 of 5 is running on the EU cluster. Two upstream jobs are queued behind the current batch.',
  },
  {
    id: 'focus',
    icon: 'center_focus_strong',
    label: 'Focus',
    title: 'Sprint 24',
    subtitle: 'Ends Friday · 2 days left',
    body: 'You are working on parity fixes for the sidebar component. One blocker is assigned to you: align overlay motion with the Figma spec before stand-up.',
  },
] as const;

type NavId = (typeof primaryNav)[number]['id'];

type NavLink = {
  label: string;
  icon: string;
  active?: boolean;
};

type NavGroup = {
  label: string;
  icon: string;
  badge?: string;
  items: NavLink[];
};

type NavSection = {
  header: string;
  links?: NavLink[];
  group?: NavGroup;
};

const pageNav: Record<NavId, { sections: NavSection[] }> = {
  home: {
    sections: [
      {
        header: 'Workspace',
        links: [
          { label: 'Recent activity', icon: 'history', active: true },
          { label: 'Starred', icon: 'star' },
          { label: 'Shared with me', icon: 'group' },
        ],
      },
      {
        header: 'Resources',
        links: [
          { label: 'Documentation', icon: 'menu_book' },
          { label: 'Release notes', icon: 'new_releases' },
        ],
      },
    ],
  },
  dashboard: {
    sections: [
      {
        header: 'Analytics',
        links: [
          { label: 'Overview', icon: 'insights', active: true },
          { label: 'Revenue', icon: 'payments' },
          { label: 'Conversion', icon: 'trending_up' },
        ],
      },
      {
        header: 'Reports',
        group: {
          label: 'Weekly summary',
          icon: 'summarize',
          badge: 'New',
          items: [
            { label: 'EMEA', icon: 'public', active: true },
            { label: 'Americas', icon: 'public' },
            { label: 'APAC', icon: 'public' },
          ],
        },
      },
    ],
  },
  flow: {
    sections: [
      {
        header: 'Pipelines',
        links: [
          { label: 'Data ingestion', icon: 'database', active: true },
          { label: 'Feature engineering', icon: 'hub' },
          { label: 'Model training', icon: 'model_training' },
        ],
      },
      {
        header: 'Monitoring',
        links: [
          { label: 'Job queue', icon: 'queue' },
          { label: 'Alerts', icon: 'notifications_active' },
        ],
      },
    ],
  },
  focus: {
    sections: [
      {
        header: 'Sprint',
        links: [
          { label: 'Current sprint', icon: 'flag', active: true },
          { label: 'Backlog', icon: 'view_list' },
          { label: 'Blockers', icon: 'block' },
        ],
      },
      {
        header: 'Tools',
        links: [
          { label: 'Notes', icon: 'edit_note' },
          { label: 'Focus timer', icon: 'timer' },
        ],
      },
    ],
  },
};

const utilityNav = [
  { icon: 'notifications', label: 'Notifications' },
  { icon: 'settings', label: 'Settings' },
  { icon: 'light_mode', label: 'Theme' },
  { icon: 'info', label: 'Info' },
];

function itemTooltip(label: string) {
  return { children: label, hidden: false };
}

function navIcon(icon: string, active = false) {
  return (
    <IconShell
      size="sm"
      type="neutral"
      variant={active ? 'primary' : 'secondary'}>
      <Icon icon={icon} />
    </IconShell>
  );
}

function NavMenuShowcaseContent({
  withIcons = false,
}: {
  withIcons?: boolean;
}) {
  return (
    <>
      {withIcons ? (
        <SidebarNavMenuHeader>Workspace</SidebarNavMenuHeader>
      ) : null}

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Client programs
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Delivery pipeline
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <Collapsible defaultOpen className="group/collapsible bg-fill-muted">
        <SidebarNavMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarNavMenuButton
              showChevron
              badge={
                <Badge size="sm" variant="high-emphasis" outline>
                  Live
                </Badge>
              }>
              {withIcons ? navIcon('folder') : null}
              Shared infrastructure
            </SidebarNavMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarNavMenuSub>
              <SidebarNavMenuSubButton isActive>
                {withIcons ? navIcon('crop_free', true) : null}
                API gateway
              </SidebarNavMenuSubButton>
              <SidebarNavMenuSubButton>
                {withIcons ? navIcon('crop_free') : null}
                Auth service
              </SidebarNavMenuSubButton>
              <SidebarNavMenuSubButton>
                {withIcons ? navIcon('crop_free') : null}
                Data sync
              </SidebarNavMenuSubButton>
            </SidebarNavMenuSub>
          </CollapsibleContent>
        </SidebarNavMenuItem>
      </Collapsible>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Archived projects
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuHeader>Administration</SidebarNavMenuHeader>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Team access
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Integrations
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>

      <SidebarNavMenuItem>
        <SidebarNavMenuButton>
          {withIcons ? navIcon('folder') : null}
          Audit log
        </SidebarNavMenuButton>
      </SidebarNavMenuItem>
    </>
  );
}

function NavMenuContent({
  active = 'home',
  withIcons = false,
}: {
  active?: NavId;
  withIcons?: boolean;
}) {
  const { sections } = pageNav[active];

  return (
    <>
      {sections.map(section => (
        <div key={section.header}>
          <SidebarNavMenuHeader>{section.header}</SidebarNavMenuHeader>

          {section.links?.map(link => (
            <SidebarNavMenuItem key={link.label}>
              <SidebarNavMenuButton isActive={link.active}>
                {withIcons ? navIcon(link.icon, link.active) : null}
                {link.label}
              </SidebarNavMenuButton>
            </SidebarNavMenuItem>
          ))}

          {section.group ? (
            <Collapsible
              defaultOpen
              className="group/collapsible bg-fill-muted">
              <SidebarNavMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarNavMenuButton
                    showChevron
                    badge={
                      section.group.badge ? (
                        <Badge size="sm" variant="high-emphasis" outline>
                          {section.group.badge}
                        </Badge>
                      ) : undefined
                    }>
                    {withIcons ? navIcon(section.group.icon) : null}
                    {section.group.label}
                  </SidebarNavMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarNavMenuSub>
                    {section.group.items.map(item => (
                      <SidebarNavMenuSubButton
                        key={item.label}
                        isActive={item.active}>
                        {withIcons ? navIcon(item.icon, item.active) : null}
                        {item.label}
                      </SidebarNavMenuSubButton>
                    ))}
                  </SidebarNavMenuSub>
                </CollapsibleContent>
              </SidebarNavMenuItem>
            </Collapsible>
          ) : null}
        </div>
      ))}
    </>
  );
}

function NavRailContent({
  active,
  onActive,
}: {
  active: NavId;
  onActive: (id: NavId) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'lg' : 'default';

  return (
    <SidebarNavRail>
      <SidebarHeader>
        <SidebarMenu>
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
  showRail = true,
  showNavMenu = true,
  showcaseMenu = false,
  size = 'lg',
  fullscreen,
  onToggleFullscreen,
}: {
  mode: 'inline' | 'overlay';
  withIcons?: boolean;
  showRail?: boolean;
  showNavMenu?: boolean;
  showcaseMenu?: boolean;
  size?: RailSize;
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const [active, setActive] = useState<NavId>('home');
  const [navOpen, setNavOpen] = useState(false);
  const page = primaryNav.find(item => item.id === active) ?? primaryNav[0];
  const overlay = showRail && mode === 'overlay';

  function handleRailActive(id: NavId) {
    if (overlay && active === id && navOpen) {
      setNavOpen(false);
      return;
    }

    setActive(id);

    if (overlay) {
      setNavOpen(true);
    }
  }

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
      <SidebarProvider size={size} className="flex min-h-0 flex-1">
        <Sidebar collapsible="none" side="left">
          {showRail ? (
            <NavRailContent active={active} onActive={handleRailActive} />
          ) : null}
          {showNavMenu ? (
            <SidebarNavMenu
              mode={overlay ? 'overlay' : 'inline'}
              open={overlay ? navOpen : undefined}
              onOpenChange={overlay ? setNavOpen : undefined}>
              {showcaseMenu ? (
                <NavMenuShowcaseContent withIcons={withIcons} />
              ) : (
                <NavMenuContent
                  key={active}
                  active={active}
                  withIcons={withIcons}
                />
              )}
            </SidebarNavMenu>
          ) : null}
        </Sidebar>
        <AppMain title={page.title} subtitle={page.subtitle} body={page.body} />
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

function AppMain({
  title,
  subtitle,
  body,
}: {
  title: string;
  subtitle: string;
  body: string;
}) {
  return (
    <SidebarInset className="bg-surface-secondary overflow-auto p-8">
      <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
      <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
      <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
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

function SidebarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="border-stroke-divider h-[996px] w-full overflow-hidden rounded-lg border">
      {children}
    </div>
  );
}

function LabeledSection({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="paragraph-small text-fg-secondary">{label}</span>
      {children}
    </div>
  );
}

export function SidebarApp() {
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

function NavRailFrame({ size }: { size: RailSize }) {
  const [active, setActive] = useState<NavId>('home');

  return (
    <SidebarProvider size={size} className="flex h-[840px] min-h-0 w-auto">
      <Sidebar collapsible="none" className="h-full">
        <NavRailContent active={active} onActive={setActive} />
      </Sidebar>
    </SidebarProvider>
  );
}

export function SidebarSizes() {
  return (
    <SidebarFrame>
      <div className="bg-surface-secondary flex h-full items-start justify-center gap-8 p-6">
        <RailSizeSection size="default" label="Default" />
        <RailSizeSection size="lg" label="Large" />
      </div>
    </SidebarFrame>
  );
}

function RailSizeSection({ size, label }: { size: RailSize; label: string }) {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) =>
        fullscreen ? (
          <LeftNavShell
            mode="inline"
            showNavMenu={false}
            size={size}
            fullscreen
            onToggleFullscreen={onToggleFullscreen}
          />
        ) : (
          <LabeledSection label={label}>
            <Button size="sm" onClick={onToggleFullscreen}>
              <Icon icon="open_in_full" />
              Open fullscreen
            </Button>
            <NavRailFrame size={size} />
          </LabeledSection>
        )
      }
    </FullscreenShell>
  );
}

function NavMenuStandalone({
  size,
  withIcons = false,
}: {
  size: RailSize;
  withIcons?: boolean;
}) {
  return (
    <div className="h-[520px]">
      <SidebarProvider size={size} className="flex h-full min-h-0 w-auto">
        <Sidebar collapsible="none" className="h-full">
          <SidebarNavMenu className="h-full">
            <NavMenuShowcaseContent withIcons={withIcons} />
          </SidebarNavMenu>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}

function NavMenuFullscreenTrigger({
  size,
  withIcons,
  label,
}: {
  size: RailSize;
  withIcons: boolean;
  label: string;
}) {
  return (
    <FullscreenShell>
      {({ fullscreen, onToggleFullscreen }) =>
        fullscreen ? (
          <LeftNavShell
            mode="inline"
            showRail={false}
            showcaseMenu
            withIcons={withIcons}
            size={size}
            fullscreen
            onToggleFullscreen={onToggleFullscreen}
          />
        ) : (
          <Button size="sm" onClick={onToggleFullscreen}>
            <Icon icon="open_in_full" />
            {label}
          </Button>
        )
      }
    </FullscreenShell>
  );
}

export function SidebarNavMenuSizes() {
  return (
    <div className="border-stroke-divider w-full overflow-hidden rounded-lg border">
      <div className="bg-surface-secondary flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <NavMenuFullscreenTrigger
            size="default"
            withIcons={false}
            label="Open default fullscreen"
          />
          <NavMenuFullscreenTrigger
            size="lg"
            withIcons
            label="Open large fullscreen"
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <LabeledSection label="Default">
            <NavMenuStandalone size="default" withIcons={false} />
          </LabeledSection>
          <LabeledSection label="Default · icons">
            <NavMenuStandalone size="default" withIcons />
          </LabeledSection>
          <LabeledSection label="Large">
            <NavMenuStandalone size="lg" withIcons={false} />
          </LabeledSection>
          <LabeledSection label="Large · icons">
            <NavMenuStandalone size="lg" withIcons />
          </LabeledSection>
        </div>
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SidebarApp',
    title: 'LeftNav',
    description:
      'Icon rail where each icon opens its own NavMenu from behind the rail. Open fullscreen for the full app shell.',
  },
  {
    name: 'SidebarSizes',
    title: 'Icon rail sizes',
    description:
      'SidebarNavRail at default and lg, side by side. Open fullscreen for the rail in an app shell.',
  },
  {
    name: 'SidebarNavMenuSizes',
    title: 'NavMenu sizes',
    description:
      'NavMenu at default and lg, with and without icons — matching the Figma variant matrix. Open fullscreen for an app shell preview.',
  },
];

export const sidebar = createLegacyDemo('sidebar', examples, {
  SidebarApp: <SidebarApp />,
  SidebarSizes: <SidebarSizes />,
  SidebarNavMenuSizes: <SidebarNavMenuSizes />,
});
