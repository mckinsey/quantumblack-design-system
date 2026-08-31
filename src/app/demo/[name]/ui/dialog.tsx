'use client';

import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogContextLabel,
  DialogDescription,
  DialogFooter,
  DialogFooterActions,
  DialogFooterLink,
  DialogHeader,
  type DialogSize,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { type DemoExample, createLegacyDemo } from '@/lib/demo-utils';
import { cn } from '@/lib/utils';

const CONTEXT = 'CONTEXT LABEL';
const TITLE = 'Modal title';
const INTRO =
  'Optional intro message that appears above the body slot. Use it to set context for the action or summarise concisely the important details';

const BODY =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.';

const LONG_BODY = Array.from(
  { length: 12 },
  (_, i) =>
    `Section ${i + 1}. ${BODY} Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
).join('\n\n');

function dialogBtnSize(size: DialogSize) {
  return size === 'lg' ? 'lg' : 'default';
}

function dialogIconShellSize(size: DialogSize) {
  return size === 'default' || size === 'lg' ? 'lg' : 'default';
}

function bodyTextClass(size: DialogSize) {
  return size === 'default' || size === 'lg'
    ? 'paragraph-large-primary'
    : 'paragraph-regular-primary';
}

function DialogTitleIcon({ size }: { size: DialogSize }) {
  return (
    <IconShell
      size={dialogIconShellSize(size)}
      type="neutral"
      variant="primary">
      <Icon icon="backup" />
    </IconShell>
  );
}

function DialogFooterButtons({ size }: { size: DialogSize }) {
  const btnSize = dialogBtnSize(size);

  return (
    <ButtonGroup spacing="spaced">
      <DialogClose render={<Button variant="outline" size={btnSize} />}>
        Close
      </DialogClose>
      <DialogClose render={<Button variant="default" size={btnSize} />}>
        Submit
      </DialogClose>
    </ButtonGroup>
  );
}

function DialogFooterLinkButton({ size }: { size: DialogSize }) {
  return (
    <Button variant="ghost" size={dialogBtnSize(size)}>
      Learn more
    </Button>
  );
}

function DialogComposition({
  size = 'default',
  showContextLabel = true,
  showIcon = true,
  showDescription = true,
  showBody = true,
  showFooterLink = true,
  bodyText = BODY,
  bodyClassName,
}: {
  size?: DialogSize;
  showContextLabel?: boolean;
  showIcon?: boolean;
  showDescription?: boolean;
  showBody?: boolean;
  showFooterLink?: boolean;
  bodyText?: string;
  bodyClassName?: string;
}) {
  return (
    <>
      <DialogHeader>
        {showContextLabel && <DialogContextLabel>{CONTEXT}</DialogContextLabel>}
        <DialogTitle
          icon={showIcon ? <DialogTitleIcon size={size} /> : undefined}>
          {TITLE}
        </DialogTitle>
      </DialogHeader>
      <DialogBody>
        {showDescription && <DialogDescription>{INTRO}</DialogDescription>}
        {showBody && (
          <p
            className={cn(
              bodyTextClass(size),
              'text-fg-primary',
              bodyClassName,
            )}>
            {bodyText}
          </p>
        )}
      </DialogBody>
      <DialogFooter>
        {showFooterLink && (
          <DialogFooterLink>
            <DialogFooterLinkButton size={size} />
          </DialogFooterLink>
        )}
        <DialogFooterActions>
          <DialogFooterButtons size={size} />
        </DialogFooterActions>
      </DialogFooter>
    </>
  );
}

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
      <DialogContent size="default">
        <DialogComposition size="default" />
      </DialogContent>
    </Dialog>
  );
}

export function DialogScrollableContent() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Open scrollable dialog</Button>}
      />
      <DialogContent size="default">
        <DialogComposition size="default" bodyText={LONG_BODY} />
      </DialogContent>
    </Dialog>
  );
}

export function DialogSizes() {
  const sizes: DialogSize[] = ['xs', 'sm', 'default', 'lg'];

  return (
    <div className="flex flex-wrap items-center gap-4">
      {sizes.map(size => (
        <Dialog key={size}>
          <DialogTrigger
            render={<Button variant="outline">{`Open ${size}`}</Button>}
          />
          <DialogContent size={size}>
            <DialogComposition size={size} />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export const examples: DemoExample[] = [
  {
    name: 'DialogDemo',
    title: 'Default',
    description:
      'Default-size dialog with context label, icon, intro, body, and footer actions.',
  },
  {
    name: 'DialogSizes',
    title: 'Sizes',
    description: 'xs, sm, default, and lg width variants.',
  },
  {
    name: 'DialogScrollableContent',
    title: 'Scrollable content',
    description:
      'Long body scrolls inside the dialog while header and footer stay fixed.',
  },
];

export const dialog = createLegacyDemo('dialog', examples, {
  DialogDemo: <DialogDemo />,
  DialogSizes: <DialogSizes />,
  DialogScrollableContent: <DialogScrollableContent />,
});
