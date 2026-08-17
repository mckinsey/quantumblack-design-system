import { type ReactNode } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardMedia,
  CardTitle,
} from '@/components/ui/card';
import { FieldLabel, FieldSet } from '@/components/ui/field';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';
const AVATAR = `${basePath}/users/avatar-1.jpg`;
const DUMMY = 'https://placehold.co';

const TITLE =
  'Descriptive card title that summarises the content in a clear, scannable way.';
const DESCRIPTION =
  'A short supporting description that gives readers extra context about the card content.';

function demoImg(w: number, h: number, label: string) {
  return `${DUMMY}/${w}x${h}?text=${encodeURIComponent(label)}`;
}

function DemoRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start gap-6">{children}</div>;
}

function CardDivider() {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className="border-stroke-divider h-0 w-12 border-0 border-b border-solid"
    />
  );
}

function SignpostBadge() {
  return (
    <Badge outline variant="high-emphasis" withIcon>
      <IconShell
        size="sm"
        type="neutral"
        variant="secondary"
        className="group-data-[size=sm]/card:hidden">
        <Icon icon="new_releases" />
      </IconShell>
      Label
    </Badge>
  );
}

function MoreAction() {
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="More options"
        className="group-data-[size=sm]/card:hidden">
        <IconShell hoverable>
          <Icon icon="more_vert" />
        </IconShell>
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="More options"
        className="hidden group-data-[size=sm]/card:inline-flex">
        <IconShell hoverable>
          <Icon icon="more_vert" />
        </IconShell>
      </Button>
    </>
  );
}

function BookmarkAction() {
  return (
    <>
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Bookmark"
        className="group-data-[size=sm]/card:hidden">
        <IconShell hoverable>
          <Icon icon="bookmark_add" />
        </IconShell>
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label="Bookmark"
        className="hidden group-data-[size=sm]/card:inline-flex">
        <IconShell hoverable>
          <Icon icon="bookmark_add" />
        </IconShell>
      </Button>
    </>
  );
}

function StatsFooter() {
  return (
    <>
      <div className="flex items-center gap-5 group-data-[size=sm]/card:gap-4">
        <div className="label-large-primary text-fg-secondary group-data-[size=sm]/card:label-regular-primary flex items-center gap-1">
          <IconShell
            size="default"
            type="neutral"
            variant="secondary"
            className="group-data-[size=sm]/card:hidden">
            <Icon icon="visibility" />
          </IconShell>
          <IconShell
            size="sm"
            type="neutral"
            variant="secondary"
            className="hidden group-data-[size=sm]/card:inline-flex">
            <Icon icon="visibility" />
          </IconShell>
          21
        </div>
        <div className="label-large-primary text-fg-secondary group-data-[size=sm]/card:label-regular-primary flex items-center gap-1">
          <IconShell
            size="default"
            type="neutral"
            variant="secondary"
            className="group-data-[size=sm]/card:hidden">
            <Icon icon="favorite" />
          </IconShell>
          <IconShell
            size="sm"
            type="neutral"
            variant="secondary"
            className="hidden group-data-[size=sm]/card:inline-flex">
            <Icon icon="favorite" />
          </IconShell>
          8
        </div>
        <div className="label-large-primary text-fg-secondary group-data-[size=sm]/card:label-regular-primary flex items-center gap-1">
          <IconShell
            size="default"
            type="neutral"
            variant="secondary"
            className="group-data-[size=sm]/card:hidden">
            <Icon icon="download" />
          </IconShell>
          <IconShell
            size="sm"
            type="neutral"
            variant="secondary"
            className="hidden group-data-[size=sm]/card:inline-flex">
            <Icon icon="download" />
          </IconShell>
          3
        </div>
      </div>
      <CardAction>
        <BookmarkAction />
      </CardAction>
    </>
  );
}

function DataRows() {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="label-large-primary group-data-[size=sm]/card:label-regular-primary flex w-full items-start justify-between">
        <span className="text-fg-secondary flex items-center gap-0.5">
          Last updated
        </span>
        <span className="paragraph-large-primary text-fg-primary group-data-[size=sm]/card:paragraph-regular-primary text-right">
          20/06/2026
        </span>
      </div>
      <div className="label-large-primary group-data-[size=sm]/card:label-regular-primary flex w-full items-start justify-between">
        <span className="text-fg-secondary flex items-center gap-0.5">
          Date Created
        </span>
        <span className="paragraph-large-primary text-fg-primary group-data-[size=sm]/card:paragraph-regular-primary text-right">
          12/04/2026
        </span>
      </div>
    </div>
  );
}

function StandardCardContent() {
  return (
    <>
      <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
      <CardDescription className="line-clamp-3 h-[3lh]">
        {DESCRIPTION}
      </CardDescription>
      <CardDivider />
      <DataRows />
    </>
  );
}

function NoMediaCard({
  className,
  contrast,
  size,
}: {
  className?: string;
  contrast?: 'low' | 'high';
  size?: 'default' | 'sm';
}) {
  return (
    <Card contrast={contrast} size={size} className={className}>
      <CardHeader>
        <SignpostBadge />
        <CardAction>
          <MoreAction />
        </CardAction>
      </CardHeader>
      <CardContent className="gap-4 pt-(--card-inset)">
        <StandardCardContent />
      </CardContent>
      <CardFooter>
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardDemo() {
  return (
    <DemoRow>
      <NoMediaCard className="aspect-[3/4] w-[360px]" />
    </DemoRow>
  );
}

export function CardWithImage() {
  return (
    <DemoRow>
      <Card className="aspect-[3/4] w-[360px]">
        <CardMedia>
          <img src={demoImg(640, 320, 'Featured')} alt="" />
          <CardHeader>
            <Badge outline variant="high-emphasis">
              Featured
            </Badge>
          </CardHeader>
        </CardMedia>
        <CardContent className="gap-3 py-(--card-inset)">
          <CardTitle>Design systems meetup</CardTitle>
          <CardDescription>
            A practical talk on component APIs, accessibility, and shipping
            faster.
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>View Event</Button>
        </CardFooter>
      </Card>
    </DemoRow>
  );
}

export function CardWithImageAndData() {
  return (
    <DemoRow>
      <Card className="aspect-[3/4] w-[360px]">
        <CardMedia>
          <img src={demoImg(640, 320, 'Card')} alt="" />
          <CardHeader>
            <SignpostBadge />
            <CardAction>
              <MoreAction />
            </CardAction>
          </CardHeader>
        </CardMedia>
        <CardContent className="flex-1 gap-3 py-(--card-inset)">
          <div className="flex w-full items-center gap-2 pb-3">
            <Avatar size="sm" className="group-data-[size=sm]/card:hidden">
              <AvatarImage src={AVATAR} />
              <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <Avatar
              size="xs"
              className="hidden group-data-[size=sm]/card:inline-flex">
              <AvatarImage src={AVATAR} />
              <AvatarFallback>LI</AvatarFallback>
            </Avatar>
            <span className="paragraph-large-primary text-fg-secondary group-data-[size=sm]/card:paragraph-regular-primary">
              3 hours ago
            </span>
          </div>
          <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
          <CardDescription className="line-clamp-2 h-[2lh]">
            {DESCRIPTION}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <StatsFooter />
        </CardFooter>
      </Card>
    </DemoRow>
  );
}

export function CardContrast() {
  return (
    <DemoRow>
      <NoMediaCard contrast="low" className="aspect-[3/4] w-[360px]" />
      <NoMediaCard contrast="high" className="aspect-[3/4] w-[360px]" />
    </DemoRow>
  );
}

export function CardSize() {
  return (
    <DemoRow>
      <NoMediaCard className="aspect-[3/4] w-[360px]" />
      <NoMediaCard size="sm" className="aspect-[3/4] w-[320px]" />
    </DemoRow>
  );
}

function LoginCard() {
  return (
    <Card className="w-full max-w-sm [--card-inset:--spacing(5)]">
      <CardHeader className="flex-col items-start justify-start gap-1 pb-(--card-inset)">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="gap-6">
        <FieldSet className="gap-2">
          <FieldLabel htmlFor="card-inset-email">Email</FieldLabel>
          <Input
            id="card-inset-email"
            type="email"
            placeholder="name@example.com"
          />
        </FieldSet>
        <FieldSet className="gap-2">
          <div className="flex items-center justify-between gap-2">
            <FieldLabel htmlFor="card-inset-password">Password</FieldLabel>
            <Button variant="ghost" size="sm" className="h-auto px-0 py-0">
              Forgot your password?
            </Button>
          </div>
          <Input id="card-inset-password" type="password" />
        </FieldSet>
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 pt-(--card-inset)">
        <Button className="w-full">Login</Button>
        <Button variant="outline" className="w-full">
          Signup
        </Button>
      </CardFooter>
    </Card>
  );
}

function EdgeToEdgeCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex-col items-start justify-start gap-1 pb-(--card-inset)">
        <CardTitle>Terms of Service</CardTitle>
        <CardDescription>
          Review the terms before accepting the agreement.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-stroke-divider bg-fill-onsurface-ui-2 -mx-(--card-inset) max-h-48 space-y-4 overflow-y-auto border-y px-(--card-inset) py-4">
          <p className="paragraph-regular-primary text-fg-secondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p className="paragraph-regular-primary text-fg-secondary">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
          <p className="paragraph-regular-primary text-fg-secondary">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Curabitur pretium
            tincidunt lacus.
          </p>
          <p className="paragraph-regular-primary text-fg-secondary">
            Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis
            dis parturient montes, nascetur ridiculus mus. Donec quam felis,
            ultricies nec, pellentesque eu, pretium quis, sem.
          </p>
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2 pt-(--card-inset)">
        <Button variant="outline">Decline</Button>
        <Button>Accept</Button>
      </CardFooter>
    </Card>
  );
}

export function CardOverride() {
  return (
    <DemoRow>
      <LoginCard />
      <EdgeToEdgeCard />
    </DemoRow>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'CardDemo',
    title: 'Default',
    description:
      'A text-first card with a header action, title, supporting copy, metadata rows, and a stats footer.',
  },
  {
    name: 'CardWithImage',
    title: 'With image',
    description:
      'A media area at the top, an overlay badge, supporting text, and a call to action.',
  },
  {
    name: 'CardWithImageAndData',
    title: 'With image and data',
    description:
      'Media with header controls, attribution, title and description, plus engagement stats in the footer.',
  },
  {
    name: 'CardSize',
    title: 'Sizes',
    description: 'Default and small cards side by side to compare density.',
  },
  {
    name: 'CardContrast',
    title: 'Contrast',
    description: 'Low and high surface contrast for the same card layout.',
  },
  {
    name: 'CardOverride',
    title: 'Custom cards',
    description:
      'Login form with 20px inset, or scroll content that stretches edge to edge above the footer.',
  },
];

export const card = createLegacyDemo('card', examples, {
  CardDemo: <CardDemo />,
  CardWithImage: <CardWithImage />,
  CardWithImageAndData: <CardWithImageAndData />,
  CardSize: <CardSize />,
  CardContrast: <CardContrast />,
  CardOverride: <CardOverride />,
});
