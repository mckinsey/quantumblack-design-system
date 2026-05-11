import { useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import tokensData from '@/data/tokens.json';

interface TokenLeaf {
  alias: string | null;
  hex: string;
  oklch: string;
}

interface Token {
  name: string;
  category: string;
  cssVar: string;
  description: string;
  scopes: string[];
  light: TokenLeaf;
  dark: TokenLeaf;
}

interface TokensFile {
  name: string;
  type: string;
  description: string;
  source: { figmaCollection: string; generatedFrom: string };
  generatedAt: string;
  count: number;
  tokens: Token[];
}

const data = tokensData as unknown as TokensFile;

const CATEGORY_ORDER = [
  'Surface',
  'Fill',
  'Text',
  'Border',
  'Status',
  'StatesLayer-Overlay',
  'Elevations',
];

function tokenAnchor(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function Swatch({ leaf, label }: { leaf: TokenLeaf; label: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="paragraph-small-emphasised text-fg-secondary">
        {label}
      </span>
      <div
        className="border-stroke-tertiary h-12 w-full border"
        style={{
          backgroundColor: leaf.hex,
          backgroundImage:
            'linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.04) 75%), linear-gradient(45deg, rgba(0,0,0,0.04) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.04) 75%)',
          backgroundSize: '12px 12px',
          backgroundPosition: '0 0, 6px 6px',
        }}
        aria-label={`${label} swatch ${leaf.hex}`}
      />
      <dl className="flex flex-col gap-0.5">
        {leaf.alias && (
          <div className="flex gap-2">
            <dt className="paragraph-small-primary text-fg-tertiary w-12 shrink-0">
              Alias
            </dt>
            <dd className="paragraph-small-primary text-fg-secondary truncate">
              {leaf.alias}
            </dd>
          </div>
        )}
        <div className="flex gap-2">
          <dt className="paragraph-small-primary text-fg-tertiary w-12 shrink-0">
            Hex
          </dt>
          <dd className="paragraph-small-primary text-fg-secondary font-mono">
            {leaf.hex}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="paragraph-small-primary text-fg-tertiary w-12 shrink-0">
            OKLCH
          </dt>
          <dd className="paragraph-small-primary text-fg-secondary truncate font-mono">
            {leaf.oklch}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function TokenCard({ token }: { token: Token }) {
  return (
    <div
      id={tokenAnchor(token.name)}
      className="border-stroke-tertiary bg-surface-bg-primary flex scroll-mt-24 flex-col gap-4 border p-4">
      <div className="flex flex-col gap-1">
        <h3 className="paragraph-large-primary text-fg-primary font-semibold">
          {token.name}
        </h3>
        <code className="paragraph-small-primary text-fg-secondary font-mono">
          {token.cssVar}
        </code>
      </div>

      {token.description && (
        <p className="paragraph-regular-primary text-fg-secondary">
          {token.description}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Swatch leaf={token.light} label="Light" />
        <Swatch leaf={token.dark} label="Dark" />
      </div>

      {token.scopes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {token.scopes.map(scope => (
            <span
              key={scope}
              className="border-stroke-tertiary text-fg-secondary paragraph-small-primary border px-2 py-0.5 font-mono">
              {scope}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TokensPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const seen = new Set(data.tokens.map(t => t.category));
    const ordered = CATEGORY_ORDER.filter(c => seen.has(c));
    const extras = [...seen].filter(c => !ordered.includes(c)).sort();
    return [...ordered, ...extras];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.tokens.filter(t => {
      if (activeCategory !== 'all' && t.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.cssVar.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.scopes.some(s => s.toLowerCase().includes(q))
      );
    });
  }, [query, activeCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, Token[]>();
    for (const t of filtered) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)?.push(t);
    }
    return [...map.entries()].sort(([a], [b]) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [filtered]);

  return (
    <main className="bg-surface-bg-base min-h-screen w-full p-5 md:p-10">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="headings-h1-regular text-fg-primary">
              Design Tokens
            </h1>
            <p className="paragraph-large-primary text-fg-secondary">
              Semantic color tokens from the QBDS DS_Themes collection. Each
              token resolves to a Light and Dark mode value via aliases on the
              Mist / Slate / status primitive ramps.
            </p>
            <p className="paragraph-small-primary text-fg-tertiary">
              Source: {data.source.figmaCollection} · {data.count} tokens ·
              generated {new Date(data.generatedAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              type="search"
              placeholder="Search by name, CSS variable, description, or scope…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="sm:max-w-md"
              aria-label="Search tokens"
            />
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory}>
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map(cat => (
                <TabsTrigger key={cat} value={cat}>
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value={activeCategory} className="pt-4">
              {grouped.length === 0 && (
                <p className="paragraph-regular-primary text-fg-secondary">
                  No tokens match your search.
                </p>
              )}
              <div className="flex flex-col gap-10">
                {grouped.map(([category, tokens]) => (
                  <section
                    key={category}
                    id={`category-${tokenAnchor(category)}`}
                    className="flex flex-col gap-4">
                    <h2 className="headings-h3-semibold text-fg-primary">
                      {category}
                      <span className="paragraph-regular-primary text-fg-tertiary ml-2 font-normal">
                        ({tokens.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      {tokens.map(t => (
                        <TokenCard key={t.cssVar} token={t} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
