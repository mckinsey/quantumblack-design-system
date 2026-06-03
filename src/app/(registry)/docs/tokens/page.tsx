import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import {
  REGISTRY_CATEGORY_INTROS,
  type Token,
  type TokenColor,
  filterRegistryColorTokens,
  filterTokens,
  formatTailwindDisplay,
  formatTokenDescription,
  getCategories,
  groupByCategory,
  loadColorTokens,
  tokenAnchor,
} from '@/lib/tokens';
import { cn } from '@/lib/utils';
import globalsCss from '@/styles/globals.css?raw';

const tokens = filterRegistryColorTokens(loadColorTokens(globalsCss));
const categories = getCategories(tokens);

const LIGHT_CANVAS = '#ffffff';
const DARK_CANVAS = '#141721';
/** Neutral panel for dark-mode elevation previews — shadows need a light surface. */
const ELEVATION_DARK_PREVIEW_SURFACE = '#e5e5e5';

const TOKEN_ROW_GRID =
  'sm:grid sm:grid-cols-[4.5rem_minmax(0,1fr)_8.75rem_8.75rem] sm:gap-x-4';

const ELEVATION_SHADOW_CLASS = {
  'shadow-elevation-0': 'shadow-elevation-0',
  'shadow-elevation-1': 'shadow-elevation-1',
  'shadow-elevation-2': 'shadow-elevation-2',
  'shadow-elevation-3': 'shadow-elevation-3',
  'shadow-elevation-4': 'shadow-elevation-4',
} as const;

function elevationShadowClass(tailwind: string): string | null {
  const key = tailwind.trim() as keyof typeof ELEVATION_SHADOW_CLASS;
  return ELEVATION_SHADOW_CLASS[key] ?? null;
}

/** Figma-style transparency grid behind alpha < 1 swatches. */
const CHECKERBOARD: React.CSSProperties = {
  backgroundColor: '#ffffff',
  backgroundImage:
    'linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc), linear-gradient(45deg, #cccccc 25%, transparent 25%, transparent 75%, #cccccc 75%, #cccccc)',
  backgroundSize: '5px 5px',
  backgroundPosition: '0 0, 2.5px 2.5px',
};

function isTransparentHex8(hex: string): boolean {
  return /^#[\da-f]{8}$/i.test(hex) && hex.slice(7, 9).toLowerCase() !== 'ff';
}

function ColorSwatch({ hex, onLight }: { hex: string; onLight: boolean }) {
  const borderClass = onLight
    ? 'border border-[#14172129]'
    : 'border border-[#ffffff29]';

  if (!isTransparentHex8(hex)) {
    return (
      <div
        className={cn('size-7 shrink-0 rounded-full', borderClass)}
        style={{ backgroundColor: hex }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={cn(
        'relative size-7 shrink-0 overflow-hidden rounded-full',
        borderClass,
      )}
      aria-hidden>
      <div className="absolute inset-0" style={CHECKERBOARD} />
      <div className="absolute inset-0" style={{ backgroundColor: hex }} />
    </div>
  );
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(id);
  }, [copied]);

  useEffect(() => {
    if (!copyFailed) return;
    const id = window.setTimeout(() => setCopyFailed(false), 2000);
    return () => window.clearTimeout(id);
  }, [copyFailed]);

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      className="size-6 shrink-0 p-0"
      aria-label={
        copied ? 'Copied' : copyFailed ? 'Copy failed' : `Copy ${value}`
      }
      onClick={() => {
        if (!navigator.clipboard?.writeText) {
          setCopied(false);
          setCopyFailed(true);
          return;
        }
        void navigator.clipboard
          .writeText(value)
          .then(() => {
            setCopyFailed(false);
            setCopied(true);
          })
          .catch(() => {
            setCopied(false);
            setCopyFailed(true);
          });
      }}>
      <Icon
        icon={copied ? 'check' : copyFailed ? 'error' : 'content_copy'}
        size="sm"
      />
    </Button>
  );
}

function ModeChip({
  label,
  canvas,
  color,
}: {
  label: string;
  canvas: string;
  color: TokenColor;
}) {
  const onLight = canvas === LIGHT_CANVAS;
  const title = color.alias ? `${color.hex} · ${color.alias}` : color.hex;

  return (
    <div
      className="border-stroke-tertiary grid h-[3.25rem] w-[8.75rem] grid-cols-[1.75rem_1fr] items-center gap-2 border px-2"
      style={{ backgroundColor: canvas }}
      title={title}>
      <ColorSwatch hex={color.hex} onLight={onLight} />
      <div className="min-w-0">
        <p
          className={
            onLight
              ? 'paragraph-small-emphasised text-[#14172199]'
              : 'paragraph-small-emphasised text-[#ffffff99]'
          }>
          {label}
        </p>
        <p
          className={
            onLight
              ? 'paragraph-small-primary truncate font-mono text-[#141721]'
              : 'paragraph-small-primary truncate font-mono text-[#ffffff]'
          }>
          {color.hex}
        </p>
      </div>
    </div>
  );
}

function ElevationChip({
  canvas,
  shadowClass,
  darkScope,
}: {
  canvas: string;
  shadowClass: string;
  darkScope: boolean;
}) {
  const onLight = canvas === LIGHT_CANVAS;

  return (
    <div
      className={cn(
        'border-stroke-tertiary flex h-[3.25rem] w-[8.75rem] items-center justify-center border px-2',
        darkScope && 'dark',
      )}
      style={{ backgroundColor: canvas }}
      aria-label={onLight ? 'Light mode shadow' : 'Dark mode shadow'}
      role="img">
      <div
        className={cn(
          'size-9 shrink-0 rounded-sm',
          onLight && 'bg-surface-primary',
          shadowClass,
        )}
        style={
          onLight
            ? undefined
            : { backgroundColor: ELEVATION_DARK_PREVIEW_SURFACE }
        }
        aria-hidden
      />
    </div>
  );
}

function TokenRow({ token }: { token: Token }) {
  const tailwindDisplay = formatTailwindDisplay(token.tailwind);
  const tailwindCopy = token.tailwind
    .split(',')
    .map(s => s.trim())
    .join(' ');
  const chipSpan = token.description ? 'sm:row-span-3' : 'sm:row-span-2';
  const elevationShadow = elevationShadowClass(token.tailwind);
  const showElevationPreviews =
    token.category === 'Elevations' && elevationShadow !== null;
  const showSwatches =
    !showElevationPreviews &&
    !token.patternOnly &&
    token.light?.hex &&
    token.dark?.hex;

  return (
    <li
      id={tokenAnchor(token.name)}
      className={cn(
        TOKEN_ROW_GRID,
        'border-stroke-divider flex scroll-mt-20 flex-col gap-2 border-b py-3 last:border-b-0 sm:grid sm:gap-y-1',
      )}>
      <div className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-4 gap-y-1 sm:contents">
        <span className="paragraph-small-emphasised text-fg-tertiary sm:col-start-1 sm:row-start-1 sm:self-baseline">
          Figma
        </span>
        <span className="paragraph-regular-primary text-fg-primary inline-flex min-w-0 items-center gap-0.5 font-semibold sm:col-start-2 sm:row-start-1 sm:self-baseline">
          <span className="min-w-0 truncate">{token.name}</span>
          <CopyBtn value={token.name} />
        </span>

        <span className="paragraph-small-emphasised text-fg-tertiary sm:col-start-1 sm:row-start-2 sm:self-baseline">
          Tailwind
        </span>
        <span className="paragraph-regular-primary text-fg-primary inline-flex min-w-0 items-center gap-0.5 font-mono sm:col-start-2 sm:row-start-2 sm:self-baseline">
          <code className="min-w-0 truncate">{tailwindDisplay}</code>
          <CopyBtn value={tailwindCopy} />
        </span>

        {token.description && (
          <p className="paragraph-small-primary text-fg-secondary col-span-2 sm:col-span-1 sm:col-start-2 sm:row-start-3">
            {formatTokenDescription(token.description)}
          </p>
        )}
      </div>

      {showSwatches || showElevationPreviews ? (
        <div className="flex justify-end gap-2 sm:contents">
          <div
            className={cn(
              'sm:col-start-3 sm:row-start-1 sm:self-center',
              chipSpan,
            )}>
            {showElevationPreviews ? (
              <ElevationChip
                canvas={LIGHT_CANVAS}
                shadowClass={elevationShadow!}
                darkScope={false}
              />
            ) : (
              <ModeChip
                label="Light"
                canvas={LIGHT_CANVAS}
                color={token.light!}
              />
            )}
          </div>
          <div
            className={cn(
              'sm:col-start-4 sm:row-start-1 sm:self-center',
              chipSpan,
            )}>
            {showElevationPreviews ? (
              <ElevationChip
                canvas={DARK_CANVAS}
                shadowClass={elevationShadow!}
                darkScope
              />
            ) : (
              <ModeChip label="Dark" canvas={DARK_CANVAS} color={token.dark!} />
            )}
          </div>
        </div>
      ) : (
        <p className="paragraph-small-primary text-fg-tertiary sm:col-span-2 sm:col-start-3 sm:row-span-2">
          {token.patternOnly
            ? 'Pattern token — see TOKENS.md'
            : 'Could not resolve colour from globals.css'}
        </p>
      )}
    </li>
  );
}

export default function TokensPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = useMemo(
    () => filterTokens(tokens, query, activeCategory),
    [query, activeCategory],
  );

  const grouped = useMemo(() => groupByCategory(filtered), [filtered]);

  return (
    <main className="bg-surface-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[52rem]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Design Tokens
            </h1>
            <p className="paragraph-large-primary text-fg-secondary">
              QBDS colours and elevation shadows in one place: the Figma name,
              the Tailwind class to paste into your code, and a light/dark
              preview (swatches or shadow samples).
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="search"
              placeholder="Search…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="sm:max-w-xs"
              aria-label="Search tokens"
            />
            <label className="paragraph-small-primary text-fg-secondary flex items-center gap-2">
              Category
              <select
                value={activeCategory}
                onChange={e => setActiveCategory(e.target.value)}
                className="border-stroke-tertiary bg-surface-primary text-fg-primary paragraph-small-primary border px-2 py-1">
                <option value="all">All</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {grouped.length === 0 ? (
            <p className="paragraph-regular-primary text-fg-secondary">
              No tokens match your search.
            </p>
          ) : (
            grouped.map(([category, sectionTokens]) => (
              <section key={category} className="flex flex-col gap-2">
                <h2 className="headings-h3-semibold text-fg-primary">
                  {category}
                </h2>
                {REGISTRY_CATEGORY_INTROS[category] && (
                  <p className="paragraph-small-primary text-fg-secondary -mt-1">
                    {REGISTRY_CATEGORY_INTROS[category]}
                  </p>
                )}
                <ul className="border-stroke-tertiary border-t">
                  {sectionTokens.map(t => (
                    <TokenRow
                      key={`${t.category}-${t.name}-${t.cssVar ?? t.tailwind}`}
                      token={t}
                    />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
