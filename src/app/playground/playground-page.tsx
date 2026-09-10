import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';

import { type NavId } from '@/app/demo/[name]/ui/sidebar-demo-data';
import { RegistryLogo } from '@/components/registry/registry-logo';
import { ModeToggle } from '@/components/registry/theme-toggle';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { SidebarInset } from '@/components/ui/sidebar';
import { toast } from '@/components/ui/sonner';

import { PlaygroundCards } from './playground-cards';
import { PlaygroundSettingsForm } from './playground-settings-form';
import { PlaygroundSidebar, primaryNav } from './playground-sidebar';

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
          variant="ghost"
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
  const [activeNav, setActiveNav] = useState<NavId>('dashboard');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dashboardToastShown = useRef(false);

  const page = primaryNav.find(item => item.id === activeNav) ?? primaryNav[0];

  useEffect(() => {
    if (activeNav !== 'dashboard' || dashboardToastShown.current) {
      return;
    }

    dashboardToastShown.current = true;
    toast.info('Conversion is up 4.2% week over week.');
  }, [activeNav]);

  return (
    <div className="bg-surface-secondary flex h-svh min-h-svh w-full flex-col overflow-hidden">
      <PlaygroundHeader onOpenSettings={() => setSettingsOpen(true)} />

      <div className="flex min-h-0 flex-1">
        <PlaygroundSidebar
          activeNav={activeNav}
          onActiveNavChange={setActiveNav}
        />

        <SidebarInset className="bg-surface-base min-h-0 overflow-auto">
          <PlaygroundCards
            navId={activeNav}
            title={page.title}
            subtitle={page.subtitle}
            body={page.body}
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
