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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';

const basePath = import.meta.env.VITE_BASE_PATH ?? '';

const TITLE =
  'Descriptive card title that summarises the content in a clear, scannable way.';
const DESCRIPTION =
  'A short supporting description that gives readers extra context about the card content.';
const LONG_TITLE =
  'Descriptive card title that summarises the content in a clear, scannable way and continues with more detail for clamp demos.';
const LONG_DESCRIPTION =
  'A short supporting description that gives readers extra context about the card content and continues with additional lines so truncation and fixed-height boxes are visible in demos.';

function SignpostBadge() {
  return (
    <Badge outline variant="high-emphasis" withIcon>
      <IconShell size="sm" type="neutral" variant="secondary">
        <Icon icon="new_releases" />
      </IconShell>
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

function StatsFooter({ iconSize = 'sm' }: { iconSize?: 'sm' | 'default' }) {
  return (
    <>
      <CardStatGroup>
        <CardStat>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="visibility" />
          </IconShell>
          21
        </CardStat>
        <CardStat>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="favorite" />
          </IconShell>
          8
        </CardStat>
        <CardStat>
          <IconShell size={iconSize} type="neutral" variant="secondary">
            <Icon icon="download" />
          </IconShell>
          3
        </CardStat>
      </CardStatGroup>
      <CardAction>
        <BookmarkAction />
      </CardAction>
    </>
  );
}

export function CardDemo() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardAction>
          <Button variant="ghost" size="sm">
            Sign Up
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <form className="mt-3">
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}

export function CardSimple() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>You have 3 unread messages.</CardDescription>
        <p className="paragraph-regular-primary text-fg-secondary mt-3">
          Check your inbox for the latest updates from your team.
        </p>
      </CardContent>
    </Card>
  );
}

export function CardWithAction() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardAction>
          <Button size="sm">Add Member</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Manage your team members and roles.</CardDescription>
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between">
            <span className="paragraph-regular-primary">John Doe</span>
            <span className="paragraph-small-primary text-fg-secondary">
              Admin
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="paragraph-regular-primary">Jane Smith</span>
            <span className="paragraph-small-primary text-fg-secondary">
              Member
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CardWithFooter() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <CardTitle>Delete Project</CardTitle>
        <CardDescription>
          This action cannot be undone. This will permanently delete your
          project and remove all associated data.
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Cancel</Button>
        <Button variant="default">Delete</Button>
      </CardFooter>
    </Card>
  );
}

export function CardQbdsDefault() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardHeader>
        <SignpostBadge />
        <CardAction>
          <MoreAction />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-3 h-[3lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardQbdsMedia() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardMedia>
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent className="flex-1">
        <CardAttribution>
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <span className="paragraph-large-primary text-fg-secondary">
            3 hours ago
          </span>
        </CardAttribution>
        <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-2 h-[2lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardQbdsCta() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardMedia>
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent className="flex-1">
        <CardAttribution>
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-2.jpg`} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <span className="paragraph-large-primary text-fg-secondary">
            3 hours ago
          </span>
        </CardAttribution>
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="outline" size="default">
          Share
        </Button>
        <Button variant="default" size="default">
          Learn more
        </Button>
      </CardFooter>
    </Card>
  );
}

function SizeSample({ size }: { size?: 'sm' | 'default' }) {
  const isSm = size === 'sm';
  return (
    <Card
      size={size}
      className="aspect-[3/4] w-[360px] data-[size=sm]:w-[320px]">
      <CardHeader>
        <SignpostBadge />
        <CardAction>
          <MoreAction size={isSm ? 'icon-xs' : 'icon-sm'} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-3 h-[3lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <StatsFooter iconSize={isSm ? 'sm' : 'default'} />
      </CardFooter>
    </Card>
  );
}

export function CardQbdsSizes() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <SizeSample />
      <SizeSample size="sm" />
    </div>
  );
}

export function CardQbdsContrast() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Card className="aspect-[3/4] w-[360px]">
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
          <CardDescription className="line-clamp-2 h-[2lh]">
            Default — bg-fill-onsurface-ui-1
          </CardDescription>
        </CardContent>
        <CardFooter>
          <StatsFooter />
        </CardFooter>
      </Card>
      <Card className="bg-fill-onsurface-ui-2 aspect-[3/4] w-[360px]">
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
          <CardDescription className="line-clamp-2 h-[2lh]">
            High contrast — className=&quot;bg-fill-onsurface-ui-2&quot;
          </CardDescription>
        </CardContent>
        <CardFooter>
          <StatsFooter />
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardQbdsRatio() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      {[1, 2, 3].map(i => (
        <Card key={i} className="aspect-[3/4] w-[280px]">
          <CardHeader>
            <SignpostBadge />
            <CardAction>
              <MoreAction />
            </CardAction>
          </CardHeader>
          <CardContent className="flex-1">
            <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
            <CardDescription className="line-clamp-2 h-[2lh]">
              {DESCRIPTION}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <StatsFooter />
          </CardFooter>
        </Card>
      ))}
      <Card className="w-[280px]">
        <CardMedia>
          <CardHeader>
            <SignpostBadge />
            <CardAction>
              <MoreAction />
            </CardAction>
          </CardHeader>
        </CardMedia>
        <CardContent>
          <CardTitle>Card title</CardTitle>
          <CardDescription>
            Description hugs content — no aspect class
          </CardDescription>
        </CardContent>
        <CardFooter className="justify-end gap-3">
          <Button variant="outline" size="sm">
            Share
          </Button>
          <Button size="sm">Learn more</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function CardQbdsMediaRatios() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Card className="w-[360px]">
        <CardMedia>
          <CardHeader>
            <SignpostBadge />
            <CardAction>
              <MoreAction />
            </CardAction>
          </CardHeader>
        </CardMedia>
        <CardContent>
          <CardTitle>Default media — aspect 2:1</CardTitle>
          <CardDescription>{DESCRIPTION}</CardDescription>
        </CardContent>
      </Card>
      <Card className="w-[360px]">
        <CardMedia className="aspect-video">
          <CardHeader>
            <SignpostBadge />
            <CardAction>
              <MoreAction />
            </CardAction>
          </CardHeader>
        </CardMedia>
        <CardContent>
          <CardTitle>className=&quot;aspect-video&quot; — 16:9</CardTitle>
          <CardDescription>{DESCRIPTION}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export function CardQbdsLines() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Card className="aspect-[3/4] w-[320px]">
        <CardHeader>
          <SignpostBadge />
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-2 h-[2lh]">{LONG_TITLE}</CardTitle>
          <CardDescription className="line-clamp-2 h-[2lh]">
            {LONG_DESCRIPTION}
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="aspect-[3/4] w-[320px]">
        <CardHeader>
          <SignpostBadge />
        </CardHeader>
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-3 h-[3lh]">{LONG_TITLE}</CardTitle>
          <CardDescription className="line-clamp-3 h-[3lh]">
            {LONG_DESCRIPTION}
          </CardDescription>
        </CardContent>
      </Card>
      <Card className="w-[320px]">
        <CardHeader>
          <SignpostBadge />
        </CardHeader>
        <CardContent>
          <CardTitle>{LONG_TITLE}</CardTitle>
          <CardDescription>{LONG_DESCRIPTION}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}

export function CardQbdsAttribution() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Card className="w-[320px]">
        <CardContent>
          <CardAttribution className="pb-0">
            <Avatar size="default">
              <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <span className="paragraph-large-emphasised text-fg-primary">
              Alex Rivera
            </span>
            <span className="paragraph-regular-primary text-fg-secondary">
              ·
            </span>
            <span className="paragraph-large-primary text-fg-secondary">
              5 min read
            </span>
          </CardAttribution>
        </CardContent>
      </Card>
      <Card className="w-[320px]">
        <CardContent>
          <CardAttribution className="items-start pb-0">
            <Avatar size="lg">
              <AvatarImage src={`${basePath}/users/avatar-2.jpg`} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1">
                <span className="paragraph-large-emphasised text-fg-primary">
                  Alex Rivera
                </span>
                <span className="paragraph-regular-primary text-fg-secondary">
                  ·
                </span>
                <span className="paragraph-large-primary text-fg-secondary">
                  5 min read
                </span>
              </div>
              <span className="paragraph-regular-primary text-fg-secondary">
                Additional metadata
              </span>
            </div>
          </CardAttribution>
        </CardContent>
      </Card>
      <Card size="sm" className="w-[280px]">
        <CardContent>
          <CardAttribution className="pb-0">
            <Avatar size="sm">
              <AvatarImage src={`${basePath}/users/avatar-3.jpg`} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <span className="paragraph-regular-emphasised-600 text-fg-primary">
              Alex Rivera
            </span>
            <span className="paragraph-small-primary text-fg-secondary">·</span>
            <span className="paragraph-regular-primary text-fg-secondary">
              5 min read
            </span>
          </CardAttribution>
        </CardContent>
      </Card>
      <Card size="sm" className="w-[280px]">
        <CardContent>
          <CardAttribution className="items-start pb-0">
            <Avatar size="default">
              <AvatarImage src={`${basePath}/users/avatar-4.jpg`} />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="paragraph-regular-emphasised-600 text-fg-primary">
                Alex Rivera
              </span>
              <span className="paragraph-small-primary text-fg-secondary">
                Additional metadata
              </span>
            </div>
          </CardAttribution>
        </CardContent>
      </Card>
    </div>
  );
}

export function CardQbdsData() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <Card className="w-[360px]">
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
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
          <StatsFooter />
        </CardFooter>
      </Card>
      <Card className="w-[360px]">
        <CardContent>
          <CardTitle>Four data rows</CardTitle>
        </CardContent>
        <CardData>
          <CardDataRow>
            <CardDataLabel>
              Owner
              <IconShell size="sm" type="neutral" variant="secondary">
                <Icon icon="info" />
              </IconShell>
            </CardDataLabel>
            <CardDataValue>Alex Rivera</CardDataValue>
          </CardDataRow>
          <CardDataRow>
            <CardDataLabel>Last updated</CardDataLabel>
            <CardDataValue>20/06/2026</CardDataValue>
          </CardDataRow>
          <CardDataRow>
            <CardDataLabel>Date Created</CardDataLabel>
            <CardDataValue>12/04/2026</CardDataValue>
          </CardDataRow>
          <CardDataRow>
            <CardDataLabel>Status</CardDataLabel>
            <CardDataValue>Published</CardDataValue>
          </CardDataRow>
        </CardData>
      </Card>
    </div>
  );
}

export function CardArticleMedia() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardMedia>
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent className="flex-1">
        <CardAttribution>
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-1.jpg`} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <span className="paragraph-large-primary text-fg-secondary">
            3 hours ago
          </span>
        </CardAttribution>
        <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-2 h-[2lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardPromoCtas() {
  return (
    <Card className="w-[360px]">
      <CardMedia className="aspect-video">
        <CardHeader>
          <SignpostBadge />
          <CardAction>
            <MoreAction />
          </CardAction>
        </CardHeader>
      </CardMedia>
      <CardContent>
        <CardAttribution>
          <Avatar size="sm">
            <AvatarImage src={`${basePath}/users/avatar-2.jpg`} />
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
          <span className="paragraph-large-primary text-fg-secondary">
            3 hours ago
          </span>
        </CardAttribution>
        <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
        <CardDescription className="line-clamp-2 h-[2lh]">
          {DESCRIPTION}
        </CardDescription>
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="outline" size="default">
          Share
        </Button>
        <Button size="default">Learn more</Button>
      </CardFooter>
    </Card>
  );
}

export function CardDataSummary() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardHeader>
        <SignpostBadge />
        <CardAction>
          <MoreAction />
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
      <CardFooter className="mt-auto">
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardCompact() {
  return (
    <Card size="sm" className="aspect-[3/4] w-[320px]">
      <CardHeader>
        <Badge outline variant="high-emphasis">
          Label
        </Badge>
        <CardAction>
          <MoreAction size="icon-xs" />
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
      <CardFooter className="mt-auto">
        <StatsFooter iconSize="sm" />
      </CardFooter>
    </Card>
  );
}

export function CardLongCopy() {
  return (
    <Card className="aspect-[3/4] w-[360px]">
      <CardHeader>
        <SignpostBadge />
        <CardAction>
          <MoreAction />
        </CardAction>
      </CardHeader>
      <CardContent className="flex-1 gap-0">
        <CardTitle className="line-clamp-3 h-[3lh]">{TITLE}</CardTitle>
        <CardDescription className="mt-3 line-clamp-3 h-[3lh]">
          {DESCRIPTION}
        </CardDescription>
        <div className="mt-4 flex flex-col gap-2">
          <CardDataRow>
            <CardDataLabel>Last updated</CardDataLabel>
            <CardDataValue>20/06/2026</CardDataValue>
          </CardDataRow>
          <CardDataRow>
            <CardDataLabel>Date Created</CardDataLabel>
            <CardDataValue>12/04/2026</CardDataValue>
          </CardDataRow>
        </div>
      </CardContent>
      <CardFooter>
        <StatsFooter />
      </CardFooter>
    </Card>
  );
}

export function CardQbdsClickable() {
  return (
    <a
      href="#card"
      className="focus-visible:ring-stroke-status-focus block rounded-sm outline-none focus-visible:ring-2">
      <Card className="aspect-[3/4] w-[360px]">
        <CardMedia>
          <CardHeader>
            <SignpostBadge />
          </CardHeader>
        </CardMedia>
        <CardContent className="flex-1">
          <CardTitle className="line-clamp-2 h-[2lh]">{TITLE}</CardTitle>
          <CardDescription className="line-clamp-2 h-[2lh]">
            Whole card wrapped in a link — focus ring on the consumer.
          </CardDescription>
        </CardContent>
        <CardFooter>
          <CardStatGroup>
            <CardStat>
              <IconShell size="sm" type="neutral" variant="secondary">
                <Icon icon="visibility" />
              </IconShell>
              21
            </CardStat>
          </CardStatGroup>
        </CardFooter>
      </Card>
    </a>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'CardDemo',
    title: 'Default',
    description: 'Card with header, content, and footer actions.',
  },
  {
    name: 'CardSimple',
    title: 'Simple',
    description: 'Basic card with title, description, and content.',
  },
  {
    name: 'CardWithAction',
    title: 'With Action',
    description: 'Card with an action button in the header.',
  },
  {
    name: 'CardWithFooter',
    title: 'With Footer',
    description: 'Card with footer action buttons.',
  },
  {
    name: 'CardQbdsDefault',
    title: 'QBDS — Default',
    description: 'noMedia+stats archetype at reg size with 3:4 ratio.',
  },
  {
    name: 'CardQbdsMedia',
    title: 'QBDS — Media + Stats',
    description:
      'Media block with header overlay, attribution, and stats footer.',
  },
  {
    name: 'CardQbdsCta',
    title: 'QBDS — Media + CTA',
    description: 'Media card with secondary and primary footer buttons.',
  },
  {
    name: 'CardQbdsSizes',
    title: 'QBDS — Sizes',
    description: 'size="default" vs size="sm" — typography, padding, and gaps.',
  },
  {
    name: 'CardQbdsContrast',
    title: 'QBDS — Contrast',
    description:
      'Default bg-fill-onsurface-ui-1 vs className="bg-fill-onsurface-ui-2".',
  },
  {
    name: 'CardQbdsRatio',
    title: 'QBDS — Ratio',
    description:
      'className="aspect-[3/4]" grid rhythm vs auto-height content hug.',
  },
  {
    name: 'CardQbdsMediaRatios',
    title: 'QBDS — Media Ratios',
    description: 'CardMedia default 2:1 vs className="aspect-video" (16:9).',
  },
  {
    name: 'CardQbdsLines',
    title: 'QBDS — Lines',
    description:
      'line-clamp-2 h-[2lh] vs line-clamp-3 h-[3lh] vs unclamped copy.',
  },
  {
    name: 'CardQbdsAttribution',
    title: 'QBDS — Attribution',
    description: 'Inline and stacked attribution at reg and sm.',
  },
  {
    name: 'CardQbdsData',
    title: 'QBDS — Data Rows',
    description: 'CardData with 2 and 4 Label+Entry rows, optional info icon.',
  },
  {
    name: 'CardArticleMedia',
    title: 'Example — Article',
    description: 'Figma Examples: article with media.',
  },
  {
    name: 'CardPromoCtas',
    title: 'Example — Promo',
    description: 'Figma Examples: promo with CTAs.',
  },
  {
    name: 'CardDataSummary',
    title: 'Example — Data Summary',
    description: 'Figma Examples: data summary with Label+Entry rows.',
  },
  {
    name: 'CardCompact',
    title: 'Example — Compact',
    description: 'Figma Examples: compact sm card.',
  },
  {
    name: 'CardLongCopy',
    title: 'Example — Long Copy',
    description: 'Figma Examples: long copy with inline data rows.',
  },
  {
    name: 'CardQbdsClickable',
    title: 'QBDS — Clickable',
    description: 'Whole card wrapped in a link; focus ring on the consumer.',
  },
];

export const card = createLegacyDemo('card', examples, {
  CardDemo: <CardDemo />,
  CardSimple: <CardSimple />,
  CardWithAction: <CardWithAction />,
  CardWithFooter: <CardWithFooter />,
  CardQbdsDefault: <CardQbdsDefault />,
  CardQbdsMedia: <CardQbdsMedia />,
  CardQbdsCta: <CardQbdsCta />,
  CardQbdsSizes: <CardQbdsSizes />,
  CardQbdsContrast: <CardQbdsContrast />,
  CardQbdsRatio: <CardQbdsRatio />,
  CardQbdsMediaRatios: <CardQbdsMediaRatios />,
  CardQbdsLines: <CardQbdsLines />,
  CardQbdsAttribution: <CardQbdsAttribution />,
  CardQbdsData: <CardQbdsData />,
  CardArticleMedia: <CardArticleMedia />,
  CardPromoCtas: <CardPromoCtas />,
  CardDataSummary: <CardDataSummary />,
  CardCompact: <CardCompact />,
  CardLongCopy: <CardLongCopy />,
  CardQbdsClickable: <CardQbdsClickable />,
});
