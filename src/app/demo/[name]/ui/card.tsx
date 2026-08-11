import type { ReactNode } from 'react';

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
  const statClass = isSm
    ? 'label-regular-primary text-fg-secondary flex items-center gap-1'
    : 'label-large-primary text-fg-secondary flex items-center gap-1';

  return (
    <>
      <div
        className={
          isSm ? 'flex items-center gap-4' : 'flex items-center gap-5'
        }>
        <div className={statClass}>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="visibility" />
          </IconShell>
          21
        </div>
        <div className={statClass}>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="favorite" />
          </IconShell>
          8
        </div>
        <div className={statClass}>
          <IconShell
            size={isSm ? 'sm' : 'default'}
            type="neutral"
            variant="secondary">
            <Icon icon="download" />
          </IconShell>
          3
        </div>
      </div>
      <CardAction>
        <BookmarkAction size={isSm ? 'icon-xs' : 'icon-sm'} />
      </CardAction>
    </>
  );
}

function DemoRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start gap-6">{children}</div>;
}

function cardWidth(size: CardSize) {
  return size === 'sm' ? 'w-[320px]' : 'w-[360px]';
}

function TextCard({
  size = 'default',
  contrast = 'low',
}: {
  size?: CardSize;
  contrast?: CardContrast;
}) {
  const isSm = size === 'sm';
  const rowClass = isSm
    ? 'label-regular-primary flex w-full items-start justify-between'
    : 'label-large-primary flex w-full items-start justify-between';
  const valueClass = isSm
    ? 'paragraph-regular-primary text-fg-primary text-right'
    : 'paragraph-large-primary text-fg-primary text-right';

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
      <CardContent className="gap-4 pt-(--card-inset)">
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-3 h-[3lh]">
          {DESCRIPTION}
        </CardDescription>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="border-stroke-divider h-0 w-12 border-0 border-b border-solid pt-0"
        />
        <div className="flex w-full flex-col gap-2">
          <div className={rowClass}>
            <span className="text-fg-secondary flex items-center gap-0.5">
              Last updated
            </span>
            <span className={valueClass}>20/06/2026</span>
          </div>
          <div className={rowClass}>
            <span className="text-fg-secondary flex items-center gap-0.5">
              Date Created
            </span>
            <span className={valueClass}>12/04/2026</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <StatsFooter size={size} />
      </CardFooter>
    </Card>
  );
}

function ImageCard({
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
      className={`aspect-[3/4] ${cardWidth(size)}`}>
      <CardMedia className="aspect-video">
        <img src={AVATAR} alt="" />
        <CardHeader>
          <Badge outline variant="high-emphasis">
            Featured
          </Badge>
        </CardHeader>
      </CardMedia>
      <CardContent className="gap-3 pt-6">
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
  );
}

function ImageDataCard({
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
      <CardContent className="flex-1 gap-3 py-6">
        <div className="flex w-full items-center gap-2 pb-3">
          <Avatar size={isSm ? 'xs' : 'sm'}>
            <AvatarImage src={AVATAR} />
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
        </div>
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

export function CardDemo() {
  return (
    <DemoRow>
      <TextCard />
    </DemoRow>
  );
}

export function CardWithImage() {
  return (
    <DemoRow>
      <ImageCard />
    </DemoRow>
  );
}

export function CardWithImageAndData() {
  return (
    <DemoRow>
      <ImageDataCard />
    </DemoRow>
  );
}

export function CardContrast() {
  return (
    <DemoRow>
      <TextCard contrast="low" />
      <TextCard contrast="high" />
    </DemoRow>
  );
}

export function CardSize() {
  return (
    <DemoRow>
      <TextCard size="default" />
      <TextCard size="sm" />
    </DemoRow>
  );
}

export function CardForm() {
  return (
    <DemoRow>
      <Card className="w-[360px]">
        <CardHeader className="flex-col items-start gap-1">
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction className="absolute end-(--card-inset) top-(--card-inset)">
            <Button variant="ghost">Sign Up</Button>
          </CardAction>
        </CardHeader>
        <CardContent className="gap-4 pt-(--card-inset)">
          <FieldSet className="gap-2">
            <FieldLabel htmlFor="card-email">Email</FieldLabel>
            <Input
              id="card-email"
              type="email"
              placeholder="name@example.com"
            />
          </FieldSet>
          <FieldSet className="gap-2">
            <div className="flex items-center justify-between gap-2">
              <FieldLabel htmlFor="card-password">Password</FieldLabel>
              <Button variant="ghost" size="sm" className="h-auto px-0 py-0">
                Forgot your password?
              </Button>
            </div>
            <Input id="card-password" type="password" />
          </FieldSet>
        </CardContent>
        <CardFooter className="flex-col items-stretch gap-2">
          <Button className="w-full">Login</Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </DemoRow>
  );
}

export function CardOverride() {
  return (
    <DemoRow>
      <Card className="w-[280px] [--card-inset:--spacing(4)]">
        <CardHeader className="flex-col items-start gap-1">
          <CardTitle>Tight inset</CardTitle>
          <CardDescription>
            Override with [--card-inset:--spacing(4)].
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-(--card-inset)">
          <p className="paragraph-regular-primary text-fg-secondary">
            All regions read the same inset variable.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="sm">Action</Button>
        </CardFooter>
      </Card>
      <Card className="w-[280px]">
        <CardHeader className="flex-col items-start gap-1">
          <CardTitle>Default inset</CardTitle>
          <CardDescription>
            size=&quot;default&quot; → spacing(7).
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-(--card-inset)">
          <p className="paragraph-regular-primary text-fg-secondary">
            Header, content, and footer share --card-inset.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
      <Card className="w-[280px] [--card-inset:--spacing(8)]">
        <CardHeader className="flex-col items-start gap-1">
          <CardTitle>Roomy inset</CardTitle>
          <CardDescription>
            Override with [--card-inset:--spacing(8)].
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-(--card-inset)">
          <p className="paragraph-regular-primary text-fg-secondary">
            One class on Card scales the whole composition.
          </p>
        </CardContent>
        <CardFooter>
          <Button>Action</Button>
        </CardFooter>
      </Card>
      <Card className="w-[360px]">
        <CardHeader className="flex-col items-start gap-1">
          <CardTitle>Terms of Service</CardTitle>
          <CardDescription>
            Review the terms before accepting the agreement.
          </CardDescription>
        </CardHeader>
        <CardContent className="border-stroke-divider max-h-[160px] overflow-y-auto border-y px-0">
          <div className="space-y-3 px-(--card-inset) py-4">
            <p className="paragraph-regular-primary text-fg-secondary">
              These terms govern your use of the workspace, including access to
              shared documents, project files, and collaboration tools.
            </p>
            <p className="paragraph-regular-primary text-fg-secondary">
              You are responsible for the content you upload and for ensuring
              that your team has the appropriate permissions to view or edit it.
            </p>
            <p className="paragraph-regular-primary text-fg-secondary">
              We may update features or limits as the service evolves. When
              those changes materially affect your workflow, we will notify your
              workspace administrators.
            </p>
            <p className="paragraph-regular-primary text-fg-secondary">
              By continuing, you agree to keep your account credentials secure
              and to follow your organization&apos;s acceptable use policies.
            </p>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Decline</Button>
          <Button>Accept</Button>
        </CardFooter>
      </Card>
    </DemoRow>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'CardDemo',
    title: 'Card',
    description: 'Header, content (title, rows), and footer.',
  },
  {
    name: 'CardWithImage',
    title: 'Card with image',
    description: 'Media with overlay header, content, and footer CTA.',
  },
  {
    name: 'CardWithImageAndData',
    title: 'Card with image and data',
    description: 'Media, attribution, title, description, and stats footer.',
  },
  {
    name: 'CardSize',
    title: 'Size',
    description: 'default vs sm (--card-inset + type scale).',
  },
  {
    name: 'CardContrast',
    title: 'Contrast',
    description: 'low vs high surface fill.',
  },
  {
    name: 'CardOverride',
    title: 'Override',
    description: 'Custom --card-inset and edge-to-edge body.',
  },
  {
    name: 'CardForm',
    title: 'Form',
    description: 'Login composition; gaps set on Content in the demo.',
  },
];

export const card = createLegacyDemo('card', examples, {
  CardDemo: <CardDemo />,
  CardWithImage: <CardWithImage />,
  CardWithImageAndData: <CardWithImageAndData />,
  CardSize: <CardSize />,
  CardContrast: <CardContrast />,
  CardOverride: <CardOverride />,
  CardForm: <CardForm />,
});
