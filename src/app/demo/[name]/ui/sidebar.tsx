'use client';

import { useEffect, useState } from 'react';
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
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSubItem,
  SidebarNav,
  SidebarNavIconButton,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarNavUtilityButton,
  SidebarProvider,
  SidebarSeparator,
  useSidebar,
  useSidebarNavMenuOverlay,
} from '@/components/ui/sidebar';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

import {
  type NavGroup,
  type NavId,
  type NavSection,
  type RailSize,
  findNavItem,
  findShowcaseItem,
  firstItemId,
  firstShowcaseItemId,
  pageNav,
  primaryNav,
  showcaseNavSections,
  utilityNav,
} from './sidebar-demo-data';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

function navIcon(icon: string, active = false, size: 'sm' | 'default' = 'sm') {
  return (
    <IconShell
      size={size}
      type="neutral"
      variant={active ? 'primary' : 'secondary'}>
      <Icon icon={icon} />
    </IconShell>
  );
}

function NavMenuGroupRow({
  groupKey,
  group,
  withIcons = false,
  defaultOpen = false,
  activeRowId,
  onActivate,
  onSelect,
}: {
  groupKey: string;
  group: NavGroup;
  withIcons?: boolean;
  defaultOpen?: boolean;
  activeRowId?: string | null;
  onActivate?: (id: string | null) => void;
  onSelect?: (id: string) => void;
}) {
  const { size } = useSidebar();
  const iconSize = size === 'lg' ? 'default' : 'sm';
  const [open, setOpen] = useState(defaultOpen);
  const groupActive = activeRowId === groupKey;

  return (
    <Collapsible
      open={open}
      onOpenChange={next => {
        setOpen(next);

        if (next) {
          onActivate?.(groupKey);
          return;
        }

        if (groupActive) {
          onActivate?.(null);
        }
      }}
      className={cn('group/collapsible', groupActive && 'bg-fill-muted')}>
      <SidebarMenuItem>
        <CollapsibleTrigger
          render={
            <SidebarNavMenuButton showChevron isActive={groupActive}>
              {withIcons ? navIcon(group.icon, groupActive, iconSize) : null}
              <span>{group.label}</span>
              {group.badge ? (
                <Badge
                  size="sm"
                  variant="high-emphasis"
                  outline
                  className="ml-auto">
                  {group.badge}
                </Badge>
              ) : null}
            </SidebarNavMenuButton>
          }
        />
        <CollapsibleContent>
          <SidebarNavMenuSub>
            {group.items.map(item => {
              const isActive = activeRowId === item.id;

              return (
                <SidebarMenuSubItem key={item.id}>
                  <SidebarNavMenuSubButton
                    isActive={isActive}
                    onClick={() => {
                      onActivate?.(item.id);
                      onSelect?.(item.id);
                    }}>
                    {withIcons ? navIcon(item.icon, isActive, iconSize) : null}
                    <span>{item.label}</span>
                  </SidebarNavMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarNavMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

function NavMenuSectionsContent({
  sections,
  withIcons = false,
  selectedId,
  onSelect,
}: {
  sections: NavSection[];
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [activeRowId, setActiveRowId] = useState<string | null>(
    selectedId ?? null,
  );

  return (
    <>
      {sections.map((section, sectionIndex) => (
        <SidebarGroup key={section.header}>
          <SidebarGroupLabel>{section.header}</SidebarGroupLabel>

          <SidebarMenu>
            {section.groups.map((group, index) => {
              const groupKey = `g:${section.header}:${group.label}`;

              return (
                <NavMenuGroupRow
                  key={groupKey}
                  groupKey={groupKey}
                  group={group}
                  withIcons={withIcons}
                  activeRowId={activeRowId}
                  onActivate={setActiveRowId}
                  onSelect={onSelect}
                  defaultOpen={sectionIndex === 0 && index === 0}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}

function NavMenuShowcaseContent({
  withIcons = false,
  selectedId,
  onSelect,
}: {
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <NavMenuSectionsContent
      sections={showcaseNavSections}
      withIcons={withIcons}
      selectedId={selectedId}
      onSelect={onSelect}
    />
  );
}

function NavMenuContent({
  active = 'home',
  withIcons = false,
  selectedId,
  onSelect,
}: {
  active?: NavId;
  withIcons?: boolean;
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  return (
    <NavMenuSectionsContent
      sections={pageNav[active].sections}
      withIcons={withIcons}
      selectedId={selectedId}
      onSelect={onSelect}
    />
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
                <SidebarNavIconButton
                  isActive={isActive}
                  tooltip={item.label}
                  onClick={() => onActive(item.id)}>
                  <IconShell
                    size={iconSize}
                    variant={isActive ? 'primary' : 'secondary'}>
                    <Icon icon={item.icon} />
                  </IconShell>
                </SidebarNavIconButton>
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
              <SidebarNavUtilityButton tooltip={item.label}>
                <IconShell size="default" hoverable>
                  <Icon icon={item.icon} />
                </IconShell>
              </SidebarNavUtilityButton>
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
  size = 'default',
  sidebarSide = 'left',
  fullscreen,
  onToggleFullscreen,
}: {
  mode: 'inline' | 'overlay';
  withIcons?: boolean;
  showRail?: boolean;
  showNavMenu?: boolean;
  showcaseMenu?: boolean;
  size?: RailSize;
  sidebarSide?: 'left' | 'right';
  fullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  const navOverlay = useSidebarNavMenuOverlay<NavId>('home');
  const [selectedItemId, setSelectedItemId] = useState(() =>
    showcaseMenu ? firstShowcaseItemId() : firstItemId('home'),
  );
  const overlay = showRail && mode === 'overlay';

  useEffect(() => {
    if (showcaseMenu) {
      return;
    }

    setSelectedItemId(firstItemId(navOverlay.active));
  }, [navOverlay.active, showcaseMenu]);

  const pageItem = showcaseMenu
    ? (findShowcaseItem(selectedItemId) ??
      findShowcaseItem(firstShowcaseItemId()))
    : (findNavItem(navOverlay.active, selectedItemId) ??
      findNavItem(navOverlay.active, firstItemId(navOverlay.active)));

  function handleRailActive(id: NavId) {
    if (overlay) {
      navOverlay.selectActive(id);
      return;
    }

    navOverlay.setActive(id);
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
      <div
        className={cn(
          'flex min-h-0 flex-1',
          sidebarSide === 'right' && 'flex-row-reverse',
        )}>
        <SidebarProvider
          layout="nav"
          size={size}
          side={sidebarSide}
          className="h-full min-h-0 w-auto">
          <SidebarNav>
            {showRail ? (
              <NavRailContent
                active={navOverlay.active}
                onActive={handleRailActive}
              />
            ) : null}
            {showNavMenu ? (
              <SidebarNavMenu
                mode={overlay ? undefined : 'inline'}
                open={overlay ? navOverlay.open : undefined}
                onOpenChange={overlay ? navOverlay.setOpen : undefined}>
                {showcaseMenu ? (
                  <NavMenuShowcaseContent
                    withIcons={withIcons}
                    selectedId={selectedItemId}
                    onSelect={setSelectedItemId}
                  />
                ) : (
                  <NavMenuContent
                    key={navOverlay.active}
                    active={navOverlay.active}
                    withIcons={withIcons}
                    selectedId={selectedItemId}
                    onSelect={setSelectedItemId}
                  />
                )}
              </SidebarNavMenu>
            ) : null}
          </SidebarNav>
        </SidebarProvider>
        <AppMain
          title={pageItem?.title ?? ''}
          subtitle={pageItem?.subtitle ?? ''}
          body={pageItem?.body ?? ''}
        />
      </div>
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
    <SidebarInset className="bg-surface-base overflow-auto p-8">
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
    <div className="border-stroke-divider min-h-[1024px] w-full overflow-hidden rounded-lg border">
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
    <SidebarProvider
      layout="nav"
      size={size}
      className="h-[840px] min-h-0 w-auto">
      <SidebarNav className="h-full min-h-0 w-auto">
        <NavRailContent active={active} onActive={setActive} />
      </SidebarNav>
    </SidebarProvider>
  );
}

export function SidebarNavRailSizes() {
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

function NavMenuStandalone({ size }: { size: RailSize }) {
  const [selectedId, setSelectedId] = useState(firstShowcaseItemId);

  return (
    <div className="h-[520px]">
      <SidebarProvider
        layout="nav"
        size={size}
        className="h-full min-h-0 w-auto">
        <SidebarNav className="h-full min-h-0 w-auto">
          <SidebarNavMenu mode="inline" className="h-full">
            <NavMenuShowcaseContent
              withIcons
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </SidebarNavMenu>
        </SidebarNav>
      </SidebarProvider>
    </div>
  );
}

function NavMenuFullscreenTrigger({
  size,
  label,
}: {
  size: RailSize;
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
            withIcons
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

export function SidebarNavMenuDemo() {
  return (
    <div className="border-stroke-divider w-full overflow-hidden rounded-lg border">
      <div className="bg-surface-secondary flex flex-col gap-6 p-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <NavMenuFullscreenTrigger
            size="default"
            label="Open default fullscreen"
          />
          <NavMenuFullscreenTrigger size="lg" label="Open large fullscreen" />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <LabeledSection label="Default">
            <NavMenuStandalone size="default" />
          </LabeledSection>
          <LabeledSection label="Large">
            <NavMenuStandalone size="lg" />
          </LabeledSection>
        </div>
      </div>
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'SidebarApp',
    title: 'Sidebar',
    description:
      'Icon rail opens an overlay NavMenu panel beside the rail. Open fullscreen for the full app shell.',
  },
  {
    name: 'SidebarNavRailSizes',
    title: 'Rail sizes',
    description:
      'Icon rail at default and lg. Open fullscreen for the rail in an app shell.',
  },
  {
    name: 'SidebarNavMenuDemo',
    title: 'NavMenu',
    description:
      'Inline NavMenu at default and lg with icons. Open fullscreen for an app shell preview.',
  },
];

export const sidebar = createLegacyDemo('sidebar', examples, {
  SidebarApp: <SidebarApp />,
  SidebarNavRailSizes: <SidebarNavRailSizes />,
  SidebarNavMenuDemo: <SidebarNavMenuDemo />,
});
