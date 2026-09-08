import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

type CardItem = {
  id: string;
  title: string;
  description: string;
  tag: string;
  updated: string;
};

function cardsForPage(pageId: string): CardItem[] {
  const base = pageId.replace(/[^a-z0-9-]/gi, '-');

  return Array.from({ length: 6 }, (_, i) => ({
    id: `${base}-${i + 1}`,
    title: `Sample card ${i + 1}`,
    description: `Preview content for ${pageId}. Swap in live component demos here.`,
    tag: i % 2 === 0 ? 'Active' : 'Draft',
    updated: `${10 + i}/06/2026`,
  }));
}

function PlaygroundCard({ item }: { item: CardItem }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
        <CardAction>
          <Button variant="ghost" size="icon-sm" aria-label="More options">
            <IconShell hoverable>
              <Icon icon="more_vert" />
            </IconShell>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent className="pb-4">
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center justify-between gap-3">
          <Badge outline variant="high-emphasis">
            {item.tag}
          </Badge>
          <span className="paragraph-small text-fg-tertiary">
            Updated {item.updated}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

export function PlaygroundCards({
  pageId,
  title,
  subtitle,
  body,
}: {
  pageId: string;
  title: string;
  subtitle: string;
  body: string;
}) {
  const items = cardsForPage(pageId);

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <p className="paragraph-small text-fg-tertiary mb-1">{subtitle}</p>
        <h1 className="headings-h2-regular text-fg-primary mb-3">{title}</h1>
        <p className="paragraph-small text-fg-secondary max-w-2xl">{body}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {items.map(item => (
          <PlaygroundCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
