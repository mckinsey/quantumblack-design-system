import { Search } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';

import { RegistryLogo } from '@/components/registry/registry-logo';
import { ModeToggle } from '@/components/registry/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { getUIPrimitives } from '@/lib/registry';
import { cn } from '@/lib/utils';

const navItems = [
  { title: 'Docs', path: '/' },
  { title: 'Components', path: '/components' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Memoize components list to avoid recalculating on every render
  const allComponents = useMemo(() => getUIPrimitives() ?? [], []);

  const closeModal = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  // Handle keyboard shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, closeModal]);

  // Focus management for modal
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const filteredComponents = searchQuery
    ? allComponents
        .filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 8)
    : [];

  const handleSearchSelect = useCallback(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
  }, []);

  return (
    <>
      <header className="border-stroke-tertiary bg-surface-bg-base sticky top-0 z-50 w-full border-b">
        <div className="flex h-14 items-center px-4 md:px-6">
          {/* Brand */}
          <Link to="/" className="mr-6 flex items-center">
            <RegistryLogo className="h-6 w-6" />
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'paragraph-regular-primary hover:text-fg-primary transition-colors',
                  pathname === item.path
                    ? 'text-fg-primary'
                    : 'text-fg-secondary',
                )}>
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Right side - Search and Theme Toggle */}
          <div className="ml-auto flex items-center gap-2">
            {/* Search button */}
            <Button
              variant="outline"
              className="text-fg-secondary hover:text-fg-primary hidden h-9 items-center gap-2 px-3 md:flex"
              onClick={() => setIsSearchOpen(true)}>
              <Search className="size-4" />
              <span className="paragraph-small-primary">Search...</span>
              <kbd className="border-stroke-tertiary bg-fill-subtle paragraph-code-text text-fg-tertiary pointer-events-none hidden h-5 items-center gap-1 border px-1.5 select-none sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Mobile search button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}>
              <Search className="size-5" />
            </Button>

            {/* Theme toggle */}
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 bg-black/50"
          onClick={closeModal}
          onKeyDown={e => {
            if (e.key === 'Escape') {
              closeModal();
            }
          }}>
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Search components"
            className="border-stroke-tertiary bg-surface-bg-base fixed top-20 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 border p-0"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}>
            {/* Search Input */}
            <div className="border-stroke-tertiary border-b">
              <InputGroup className="border-0 bg-transparent">
                <InputGroupAddon align="inline-start">
                  <Search className="size-4" />
                </InputGroupAddon>
                <InputGroupInput
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search components..."
                  className="h-12"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <InputGroupAddon align="inline-end">
                  <kbd className="border-stroke-tertiary bg-fill-subtle paragraph-code-text text-fg-tertiary pointer-events-none hidden h-5 items-center border px-1.5 select-none sm:flex">
                    ESC
                  </kbd>
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Search Results */}
            {searchQuery && (
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredComponents.length > 0 ? (
                  <div className="space-y-1">
                    <div className="px-2 py-1.5">
                      <span className="paragraph-small-emphasised text-fg-secondary">
                        Components
                      </span>
                    </div>
                    {filteredComponents.map(component => (
                      <Link
                        key={component.name}
                        to={`/registry/${component.name}`}
                        className="hover:bg-stateslayer-overlay-hover flex items-center gap-2 px-2 py-2 transition-colors"
                        onClick={handleSearchSelect}>
                        <span className="paragraph-regular-primary text-fg-primary">
                          {component.title}
                        </span>
                        {component.description && (
                          <span className="paragraph-small-primary text-fg-tertiary truncate">
                            — {component.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="px-2 py-6 text-center">
                    <span className="paragraph-small-primary text-fg-secondary">
                      No results found.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Quick Links when no search */}
            {!searchQuery && (
              <div className="p-2">
                <div className="px-2 py-1.5">
                  <span className="paragraph-small-emphasised text-fg-secondary">
                    Quick Links
                  </span>
                </div>
                <Link
                  to="/"
                  className="hover:bg-stateslayer-overlay-hover flex items-center gap-2 px-2 py-2 transition-colors"
                  onClick={handleSearchSelect}>
                  <span className="paragraph-regular-primary text-fg-primary">
                    Introduction
                  </span>
                </Link>
                <Link
                  to="/components"
                  className="hover:bg-stateslayer-overlay-hover flex items-center gap-2 px-2 py-2 transition-colors"
                  onClick={handleSearchSelect}>
                  <span className="paragraph-regular-primary text-fg-primary">
                    Components
                  </span>
                </Link>
                <Link
                  to="/installation"
                  className="hover:bg-stateslayer-overlay-hover flex items-center gap-2 px-2 py-2 transition-colors"
                  onClick={handleSearchSelect}>
                  <span className="paragraph-regular-primary text-fg-primary">
                    Installation
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
