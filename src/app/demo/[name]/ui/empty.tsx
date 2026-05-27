import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Icon } from '@/components/ui/icon';

// ============================================================================
// Shared Helpers
// ============================================================================

/** Composes the common EmptyHeader with icon, title, and description */
function EmptyIconHeader({
  icon,
  title,
  description,
  mediaVariant = 'icon',
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  mediaVariant?: 'icon' | 'default';
}) {
  return (
    <EmptyHeader>
      <EmptyMedia variant={mediaVariant}>{icon}</EmptyMedia>
      <EmptyTitle>{title}</EmptyTitle>
      <EmptyDescription>{description}</EmptyDescription>
    </EmptyHeader>
  );
}

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Default empty state
 */
export function EmptyDemo() {
  return (
    <Empty>
      <EmptyIconHeader
        mediaVariant="default"
        icon={
          <Icon icon="crop_free" className="text-fg-secondary text-[48px]" />
        }
        title="No results found"
        description="We couldn't find any items matching your search."
      />
    </Empty>
  );
}

/**
 * Empty state with icon variant
 */
export function EmptyWithIcon() {
  return (
    <Empty className="border-stroke-tertiary border">
      <EmptyIconHeader
        icon={<Icon icon="mail" className="text-fg-secondary" />}
        title="No messages"
        description="You don't have any messages yet. Start a conversation to get going."
      />
    </Empty>
  );
}

/**
 * Empty state with action button
 */
export function EmptyWithAction() {
  return (
    <Empty>
      <EmptyIconHeader
        icon={<Icon icon="layers" className="text-fg-secondary" />}
        title="No projects yet"
        description="Get started by creating your first project."
      />
      <EmptyContent>
        <Button>Create Project</Button>
      </EmptyContent>
    </Empty>
  );
}

/**
 * Empty state with multiple actions
 */
export function EmptyWithMultipleActions() {
  return (
    <Empty className="border-stroke-tertiary border border-dashed">
      <EmptyIconHeader
        icon={<Icon icon="key" className="text-fg-secondary" />}
        title="No API keys"
        description="Create an API key to start integrating with our platform."
      />
      <EmptyContent>
        <div className="flex gap-2">
          <Button>Generate API Key</Button>
          <Button variant="secondary">View Docs</Button>
        </div>
      </EmptyContent>
    </Empty>
  );
}

/**
 * Error empty state
 */
export function EmptyError() {
  return (
    <Empty>
      <EmptyIconHeader
        icon={<Icon icon="error" className="text-status-error" />}
        title="Something went wrong"
        description="We encountered an error loading your content. Please try again."
      />
      <EmptyContent>
        <Button variant="secondary">Retry</Button>
      </EmptyContent>
    </Empty>
  );
}

/**
 * Compact empty state
 */
export function EmptyCompact() {
  return (
    <Empty className="min-h-0 p-8">
      <EmptyHeader>
        <EmptyTitle>No items</EmptyTitle>
        <EmptyDescription className="text-xs">
          There are no items to display.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'EmptyDemo',
    title: 'Default',
    description: 'Basic empty state with icon and message.',
  },
  {
    name: 'EmptyWithIcon',
    title: 'With Icon',
    description: 'Empty state with icon variant and border.',
  },
  {
    name: 'EmptyWithAction',
    title: 'With Action',
    description: 'Empty state with call-to-action button.',
  },
  {
    name: 'EmptyWithMultipleActions',
    title: 'Multiple Actions',
    description: 'Empty state with multiple action buttons.',
  },
  {
    name: 'EmptyError',
    title: 'Error State',
    description: 'Empty state for error scenarios.',
  },
  {
    name: 'EmptyCompact',
    title: 'Compact',
    description: 'Minimal empty state without icon.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const empty = {
  name: 'empty',
  components: {
    Default: <EmptyDemo />,
    'With Icon': <EmptyWithIcon />,
    'With Action': <EmptyWithAction />,
    'Multiple Actions': <EmptyWithMultipleActions />,
    'Error State': <EmptyError />,
    Compact: <EmptyCompact />,
  },
};
