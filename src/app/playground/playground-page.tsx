import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { type NavId } from '@/app/demo/[name]/ui/sidebar-demo-data';
import { RegistryLogo } from '@/components/registry/registry-logo';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { SidebarInset } from '@/components/ui/sidebar';

import { PlaygroundCards } from './playground-cards';
import { PlaygroundSettingsForm } from './playground-settings-form';
import { PlaygroundSidebar, primaryNav } from './playground-sidebar';

function PlaygroundThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;

    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');

      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    } else {
      document.documentElement.classList.remove('dark');

      if (!savedTheme) {
        localStorage.setItem('theme', 'light');
      }
    }
  }, []);

  function toggleTheme() {
    const next = !isDark;

    setIsDark(next);

    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <IconShell type="neutral" hoverable size="sm">
        <Icon icon={isDark ? 'light_mode' : 'dark_mode'} />
      </IconShell>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

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
        <PlaygroundThemeToggle />
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
  const [settingsOpen, setSettingsOpen] = useState(false);

  const page = primaryNav.find(item => item.id === activeNav) ?? primaryNav[0];

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
