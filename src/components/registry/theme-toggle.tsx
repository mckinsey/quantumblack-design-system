'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const initializeTheme = () => {
      const savedTheme = localStorage.getItem('theme');
      // Default to dark mode if no saved preference
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : true;

      setIsDark(shouldBeDark);

      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
        if (!savedTheme) localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        if (!savedTheme) localStorage.setItem('theme', 'light');
      }
    };

    initializeTheme();

    // Listen for storage events (cross-tab sync)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const newIsDark = e.newValue === 'dark';
        setIsDark(newIsDark);
        if (newIsDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {isDark ? (
        <IconShell type="neutral" hoverable size="sm">
          <Icon icon="light_mode" />
        </IconShell>
      ) : (
        <IconShell type="neutral" hoverable size="sm">
          <Icon icon="dark_mode" />
        </IconShell>
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
