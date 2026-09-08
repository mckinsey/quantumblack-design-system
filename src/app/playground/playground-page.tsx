import { useState } from 'react';
import { Link } from 'react-router';

import {
  type NavId,
  findNavItem,
  firstItemId,
} from '@/app/demo/[name]/ui/sidebar-demo-data';
import { RegistryLogo } from '@/components/registry/registry-logo';
import { ModeToggle } from '@/components/registry/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { SidebarInset } from '@/components/ui/sidebar';

import { PlaygroundCards } from './playground-cards';
import { PlaygroundSettingsForm } from './playground-settings-form';
import { PlaygroundSidebar } from './playground-sidebar';

function PlaygroundHeader({ onOpenSettings }: { onOpenSettings: () => void }) {
  return (
    <header className="border-stroke-divider bg-surface-primary flex h-[72px] shrink-0 items-center gap-3 border-b px-6">
      <RegistryLogo className="h-6 w-6" />
      <span className="headings-h3-regular text-fg-primary">
        QBDS Playground
      </span>
      <span className="paragraph-small text-fg-tertiary hidden sm:inline">
        Live component shell
      </span>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          render={<Link to="/" />}
          nativeButton={false}>
          Back to docs
        </Button>
        <ModeToggle />
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open settings"
          onClick={onOpenSettings}>
          <IconShell hoverable>
            <Icon icon="settings" />
          </IconShell>
        </Button>
      </div>
    </header>
  );
}

export function PlaygroundPage() {
  const [activeNav, setActiveNav] = useState<NavId>('home');
  const [selectedId, setSelectedId] = useState(() => firstItemId('home'));
  const [settingsOpen, setSettingsOpen] = useState(false);

  const page =
    findNavItem(activeNav, selectedId) ??
    findNavItem(activeNav, firstItemId(activeNav));

  return (
    <div className="bg-surface-secondary flex h-svh min-h-svh w-full flex-col overflow-hidden">
      <PlaygroundHeader onOpenSettings={() => setSettingsOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <PlaygroundSidebar
          activeNav={activeNav}
          selectedId={selectedId}
          onActiveNavChange={nav => {
            setActiveNav(nav);
            setSelectedId(firstItemId(nav));
          }}
          onSelect={setSelectedId}
        />

        <SidebarInset className="bg-surface-base min-h-0 overflow-auto">
          <PlaygroundCards
            pageId={selectedId}
            title={page?.title ?? 'Playground'}
            subtitle={page?.subtitle ?? 'QBDS preview'}
            body={
              page?.body ??
              'Pick a page from the sidebar to preview cards and plug in live demos.'
            }
          />
        </SidebarInset>
      </div>

      <PlaygroundSettingsForm
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
      />
    </div>
  );
}
