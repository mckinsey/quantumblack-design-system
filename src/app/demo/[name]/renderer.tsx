'use client';

import { type ReactNode, useEffect } from 'react';

export function Renderer({ children }: { children: ReactNode }) {
  useEffect(() => {
    const setTheme = (theme: string | null) => {
      const isDark = theme === 'dark';
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // Set initial theme from localStorage
    const initialTheme = localStorage.getItem('theme');
    setTheme(initialTheme);

    // Listen for storage events (cross-tab sync)
    function onStorage(e: StorageEvent) {
      if (e.key === 'theme') {
        setTheme(e.newValue);
      }
    }

    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return children;
}
