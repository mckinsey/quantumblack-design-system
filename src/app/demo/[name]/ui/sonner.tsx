'use client';

import { toast as sonnerToast } from 'sonner';

import { Close } from '@/components/icons/Close';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';

// ============================================================================
// Example Components (New Format)
// ============================================================================

/** Renders a button that triggers a specific toast type */
function ToastTrigger({
  type,
  message,
  label,
}: {
  type: 'default' | 'success' | 'error' | 'warning' | 'info';
  message: string;
  label: string;
}) {
  return (
    <Button variant="outline" onClick={() => toast[type](message)}>
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

/**
 * Success toast notification
 */
export function SonnerSuccess() {
  return (
    <ToastTrigger
      type="success"
      message="Event has been created successfully"
      label="Show Success Toast"
    />
  );
}

/**
 * Error toast notification
 */
export function SonnerError() {
  return (
    <ToastTrigger
      type="error"
      message="Something went wrong. Please try again."
      label="Show Error Toast"
    />
  );
}

/**
 * Warning toast notification
 */
export function SonnerWarning() {
  return (
    <ToastTrigger
      type="warning"
      message="Please review your changes before proceeding"
      label="Show Warning Toast"
    />
  );
}

/**
 * Info toast notification
 */
export function SonnerInfo() {
  return (
    <ToastTrigger
      type="info"
      message="A new version is available"
      label="Show Info Toast"
    />
  );
}

const toastVariants = [
  { type: 'default', message: 'Default notification', label: 'Default' },
  { type: 'success', message: 'Success notification', label: 'Success' },
  { type: 'error', message: 'Error notification', label: 'Error' },
  { type: 'warning', message: 'Warning notification', label: 'Warning' },
  { type: 'info', message: 'Info notification', label: 'Info' },
] as const;

/**
 * All toast variants side by side
 */
export function SonnerVariants() {
  return (
    <div className="flex flex-wrap gap-3">
      {toastVariants.map(v => (
        <ToastTrigger
          key={v.type}
          type={v.type}
          message={v.message}
          label={v.label}
        />
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
        <Close className="text-fg-secondary size-4" />
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
    name: 'SonnerSuccess',
    title: 'Success',
    description: 'Success toast with green styling.',
  },
  {
    name: 'SonnerError',
    title: 'Error',
    description: 'Error toast with red styling.',
  },
  {
    name: 'SonnerWarning',
    title: 'Warning',
    description: 'Warning toast with yellow styling.',
  },
  {
    name: 'SonnerInfo',
    title: 'Info',
    description: 'Informational toast with blue styling.',
  },
  {
    name: 'SonnerVariants',
    title: 'All Variants',
    description: 'All toast variants side by side.',
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
    Success: <SonnerSuccess />,
    Error: <SonnerError />,
    Warning: <SonnerWarning />,
    Info: <SonnerInfo />,
    'All Variants': <SonnerVariants />,
    'With Action': <SonnerWithAction />,
    'Custom Styled': <SonnerCustom />,
    Persistent: <SonnerPersistent />,
  },
};
