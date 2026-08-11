import type { ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardAttribution,
  CardContent,
  CardData,
  CardDataLabel,
  CardDataRow,
  CardDataValue,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardStat,
  CardStatGroup,
  CardTitle,
} from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

const TITLE =
  'Descriptive card title that summarises the content in a clear, scannable way.';
const DESCRIPTION =
  'A short supporting description that gives readers extra context about the card content.';

type CardSize = 'sm' | 'default';
type CardContrast = 'low' | 'high';

function SignpostBadge({ withIcon = true }: { withIcon?: boolean }) {
  return (
    <Badge outline variant="high-emphasis" withIcon={withIcon}>
      {withIcon ? (
        <IconShell size="sm" type="neutral" variant="secondary">
          <Icon icon="new_releases" />
        </IconShell>
      ) : null}
      Label
    </Badge>
  );
}

function MoreAction({ size = 'icon-sm' }: { size?: 'icon-sm' | 'icon-xs' }) {
  return (
    <Button variant="ghost" size={size} aria-label="More options">
      <IconShell size="default" type="neutral" variant="secondary">
        <Icon icon="more_vert" />
      </IconShell>
    </Button>
  );
}

function BookmarkAction({
  size = 'icon-sm',
}: {
  size?: 'icon-sm' | 'icon-xs';
}) {
  return (
    <Button
      variant="ghost"
      size={size}
      className="rounded-full"
      aria-label="Bookmark">
      <IconShell size="default" type="neutral" variant="secondary">
        <Icon icon="bookmark_add" />
      </IconShell>
    </Button>
  );
}

function StatsFooter({ size = 'default' }: { size?: CardSize }) {
  const isSm = size === 'sm';

  return (
    <>
      <CardStatGroup>
        <CardStat>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="visibility" />
          </IconShell>
          21
        </CardStat>
        <CardStat>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="favorite" />
          </IconShell>
          8
        </CardStat>
        <CardStat>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="download" />
          </IconShell>
          3
        </CardStat>
      </CardStatGroup>
      <CardAction>
        <BookmarkAction size={isSm ? 'icon-xs' : 'icon-sm'} />
      </CardAction>
    </>
  );
}

function CtaFooter() {
  return (
    <CardAction className="gap-3">
      <Button variant="outline" size="default">
        Share
      </Button>
      <Button variant="default" size="default">
        Learn more
      </Button>
    </CardAction>
  );
}

function DemoRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start gap-6">{children}</div>;
}

function cardWidth(size: CardSize) {
  return size === 'sm' ? 'w-[320px]' : 'w-[360px]';
}

function NoMediaCard({
  size = 'default',
  contrast = 'low',
}: {
  size?: CardSize;
  contrast?: CardContrast;
}) {
  const isSm = size === 'sm';

  return (
    <Card
      size={size}
      contrast={contrast}
      className={`aspect-[3/4] ${cardWidth(size)}`}>
      <CardHeader>
        <SignpostBadge withIcon={!isSm} />
        <CardAction>
          <MoreAction size={isSm ? 'icon-xs' : 'icon-sm'} />
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-3 h-[3lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardData>
        <CardDataRow>
          <CardDataLabel>Last updated</CardDataLabel>
          <CardDataValue>20/06/2026</CardDataValue>
        </CardDataRow>
        <CardDataRow>
          <CardDataLabel>Date Created</CardDataLabel>
          <CardDataValue>12/04/2026</CardDataValue>
        </CardDataRow>
      </CardData>
      <CardFooter>
        <StatsFooter size={size} />
      </CardFooter>
    </Card>
  );
}

function MediaStatsCard({
  size = 'default',
  contrast = 'low',
}: {
  size?: CardSize;
  contrast?: CardContrast;
}) {
  const isSm = size === 'sm';

  return (
    <Card
      size={size}
      contrast={contrast}
      className={`aspect-[3/4] ${cardWidth(size)}`}>
      <CardMedia>
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction size={isSm ? 'icon-xs' : 'icon-sm'} />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent>
        <CardAttribution>
          <Avatar size={isSm ? 'xs' : 'sm'}>
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>LI</AvatarFallback>
          </Avatar>
          <span
            className={
              isSm
                ? 'paragraph-regular-primary text-fg-secondary'
                : 'paragraph-large-primary text-fg-secondary'
            }>
            3 hours ago
          </span>
        </CardAttribution>
        <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-2 h-[2lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <StatsFooter size={size} />
      </CardFooter>
    </Card>
  );
}

function MediaCtaCard({
  size = 'default',
  contrast = 'low',
  ratio = '3:4',
}: {
  size?: CardSize;
  contrast?: CardContrast;
  ratio?: '3:4' | 'auto';
}) {
  const isSm = size === 'sm';
  const rootClass =
    ratio === '3:4' ? `aspect-[3/4] ${cardWidth(size)}` : cardWidth(size);

  return (
    <Card size={size} contrast={contrast} className={rootClass}>
      <CardMedia>
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction size={isSm ? 'icon-xs' : 'icon-sm'} />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent>
        <CardAttribution>
          <Avatar size={isSm ? 'xs' : 'sm'}>
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>LI</AvatarFallback>
          </Avatar>
          <span
            className={
              isSm
                ? 'paragraph-regular-primary text-fg-secondary'
                : 'paragraph-large-primary text-fg-secondary'
            }>
            3 hours ago
          </span>
        </CardAttribution>
        {ratio === 'auto' ? (
          <>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Description</CardDescription>
          </>
        ) : (
          <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        <CtaFooter />
      </CardFooter>
    </Card>
  );
}

function CustomCard({
  size = 'default',
  contrast = 'low',
}: {
  size?: CardSize;
  contrast?: CardContrast;
}) {
  return (
    <Card
      size={size}
      contrast={contrast}
      className={`h-[412px] pb-0 ${cardWidth(size)}`}>
      <CardContent className={size === 'sm' ? 'flex-1 p-6' : 'flex-1 p-7'}>
        <div className="bg-fill-subtle border-stroke-secondary flex flex-1 flex-col items-center justify-center gap-2 border border-dashed">
          <IconShell size="default" type="neutral" variant="secondary">
            <Icon icon="swap_horiz" />
          </IconShell>
          <span className="label-regular-primary text-fg-primary">
            SWAP WITH YOUR CONTENT
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function CardSizes() {
  return (
    <DemoRow>
      <NoMediaCard />
      <NoMediaCard size="sm" />
      <MediaStatsCard />
      <MediaStatsCard size="sm" />
    </DemoRow>
  );
}

export function CardNoMedia() {
  return (
    <DemoRow>
      <NoMediaCard />
      <NoMediaCard size="sm" />
      <NoMediaCard contrast="high" />
      <NoMediaCard size="sm" contrast="high" />
    </DemoRow>
  );
}

export function CardMediaStats() {
  return (
    <DemoRow>
      <MediaStatsCard />
      <MediaStatsCard size="sm" />
      <MediaStatsCard contrast="high" />
      <MediaStatsCard size="sm" contrast="high" />
    </DemoRow>
  );
}

export function CardMediaCta() {
  return (
    <DemoRow>
      <MediaCtaCard />
      <MediaCtaCard size="sm" />
      <MediaCtaCard ratio="auto" />
      <MediaCtaCard size="sm" ratio="auto" />
      <MediaCtaCard contrast="high" />
      <MediaCtaCard size="sm" contrast="high" ratio="auto" />
    </DemoRow>
  );
}

export function CardCustom() {
  return (
    <DemoRow>
      <CustomCard />
      <CustomCard size="sm" />
      <CustomCard contrast="high" />
      <CustomCard size="sm" contrast="high" />
    </DemoRow>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'CardSizes',
    title: 'Sizes',
    description: 'noMedia and media+stats at reg and sm.',
  },
  {
    name: 'CardNoMedia',
    title: 'noMedia',
    description: 'Text-first with data rows, low and high contrast.',
  },
  {
    name: 'CardMediaStats',
    title: 'media+stats',
    description: 'Media block with engagement footer.',
  },
  {
    name: 'CardMediaCta',
    title: 'media+cta',
    description: 'Media block with CTA footer; 3:4 and auto ratio.',
  },
  {
    name: 'CardCustom',
    title: 'custom',
    description: 'Empty content shell for consumer composition.',
  },
];

export const card = createLegacyDemo('card', examples, {
  CardSizes: <CardSizes />,
  CardNoMedia: <CardNoMedia />,
  CardMediaStats: <CardMediaStats />,
  CardMediaCta: <CardMediaCta />,
  CardCustom: <CardCustom />,
});
