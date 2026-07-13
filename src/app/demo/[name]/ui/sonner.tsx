'use client';

import { Fragment } from 'react';
import { toast as sonnerToast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { toast } from '@/components/ui/sonner';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/** Renders a button that triggers a specific toast type */
function ToastTrigger({
  type,
  message,
  label,
  className,
}: {
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  message: string;
  label: string;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={className}
      onClick={() => toast[type](message)}>
      {label}
    </Button>
  );
}

/**
 * Default toast notification
 */
export function SonnerDemo() {
  return (
    <ToastTrigger
      type="default"
      message="Your message has been sent"
      label="Show Toast"
    />
  );
}

const toastVariants = [
  { type: 'default', message: 'Short message goes here', label: 'Default' },
  { type: 'error', message: 'Short message goes here', label: 'Error' },
  { type: 'success', message: 'Short message goes here', label: 'Success' },
  { type: 'info', message: 'Short message goes here', label: 'Info' },
  { type: 'warning', message: 'Short message goes here', label: 'Warning' },
] as const;

/**
 * All toast variants rendered in the page
 */
export function SonnerVariants() {
  return (
    <div className="flex flex-row items-center gap-x-4 gap-y-3">
      {toastVariants.map(v => (
        <Fragment key={v.type}>
          <ToastTrigger
            type={v.type}
            message={v.message}
            label={v.label}
            className="w-full"
          />
        </Fragment>
      ))}
    </div>
  );
}

/**
 * Toast with action button
 */
export function SonnerWithAction() {
  const showToastWithAction = () => {
    const toastId = toast.success('Event has been created', {
      action: (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            console.log('Undo clicked');
            sonnerToast.dismiss(toastId);
          }}
          className="underline">
          Undo
        </Button>
      ),
      duration: 10000,
    });
  };

  return (
    <Button variant="outline" onClick={showToastWithAction}>
      Toast with Action
    </Button>
  );
}

/**
 * Custom styled toast
 */
function CustomToast({ id }: { id: string | number }) {
  return (
    <div className="border-l-status-information bg-fill-onsurface-ui-1 flex items-center gap-3 rounded-md border-l-4 px-4 py-3 shadow-lg">
      <div className="flex-1">
        <p className="text-fg-primary text-sm font-medium">
          Custom styled notification
        </p>
        <p className="text-fg-secondary text-sm">
          With additional description text
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => sonnerToast.dismiss(id)}
        className="shrink-0">
        Dismiss
      </Button>
      <button
        onClick={() => sonnerToast.dismiss(id)}
        className="hover:bg-fill-onsurface-ui-2 shrink-0 rounded p-1"
        aria-label="Close">
        <IconShell type="neutral" hoverable size="sm">
          <Icon icon="close" />
        </IconShell>
      </button>
    </div>
  );
}

export function SonnerCustom() {
  return (
    <Button
      variant="outline"
      onClick={() => sonnerToast.custom(id => <CustomToast id={id} />)}>
      Show Custom Toast
    </Button>
  );
}

/**
 * Toast with persistent duration
 */
export function SonnerPersistent() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.info('This toast stays visible', { duration: Infinity })
        }>
        Persistent Toast
      </Button>
      <Button variant="secondary" onClick={() => sonnerToast.dismiss()}>
        Dismiss All
      </Button>
    </div>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

// NOSONAR - Intentional duplication of example metadata pattern across demo files
export const examples = [
  {
    name: 'SonnerDemo',
    title: 'Default',
    description: 'Basic toast notification.',
  },
  {
    name: 'SonnerVariants',
    title: 'All Variants',
    description: 'Each variant with its trigger button side by side.',
  },
  {
    name: 'SonnerWithAction',
    title: 'With Action',
    description: 'Toast with an action button for undo/dismiss.',
  },
  {
    name: 'SonnerCustom',
    title: 'Custom Styled',
    description: 'Fully custom toast with custom layout and styling.',
  },
  {
    name: 'SonnerPersistent',
    title: 'Persistent',
    description: 'Toast that stays visible until manually dismissed.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const sonner = {
  name: 'sonner',
  components: {
    Default: <SonnerDemo />,
    'All Variants': <SonnerVariants />,
    'With Action': <SonnerWithAction />,
    'Custom Styled': <SonnerCustom />,
    Persistent: <SonnerPersistent />,
  },
};
