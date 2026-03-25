import { CheckCircle } from '@/components/icons/CheckCircle';
import { ErrorIcon } from '@/components/icons/ErrorIcon';
import { Info } from '@/components/icons/Info';
import { Warning } from '@/components/icons/Warning';
import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// ============================================================================
// Shared Helpers
// ============================================================================

const MODAL_DESCRIPTION =
  'Make your message concise and straightforward. Strive for a two-line alert that clearly conveys your message.';
const LONG_DESCRIPTION =
  'Make your message brief; target a one-line alert that conveys clearly your point.';

function ActionButtons() {
  return (
    <div className="flex gap-3 pt-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

// ============================================================================
// Example Components (New Format)
// ============================================================================

/**
 * Basic modal alert with icon and close button
 */
export function AlertDemo() {
  return (
    <Alert layout="modal">
      <AlertIcon>
        <Info className="text-[25px]" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>{MODAL_DESCRIPTION}</AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

/**
 * Modal alert with action buttons
 */
export function AlertWithButtons() {
  return (
    <Alert layout="modal">
      <AlertIcon>
        <Info className="text-[25px]" />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>{MODAL_DESCRIPTION}</AlertDescription>
        <ActionButtons />
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

/**
 * Long layout banner alert
 */
export function AlertLongLayout() {
  return (
    <Alert layout="long">
      <AlertIcon>
        <Info className="text-[25px]" />
      </AlertIcon>
      <AlertContent className="flex-row items-center gap-3 pt-0">
        <AlertTitle className="shrink-0">Alert Title</AlertTitle>
        <AlertDescription className="line-clamp-1">
          {LONG_DESCRIPTION}
        </AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

/**
 * Long layout with action buttons
 */
export function AlertLongWithButtons() {
  return (
    <Alert layout="long">
      <AlertIcon>
        <Info className="text-[25px]" />
      </AlertIcon>
      <AlertContent className="flex-row items-center gap-3 pt-0">
        <AlertTitle className="shrink-0">Alert Title</AlertTitle>
        <AlertDescription className="line-clamp-1">
          {LONG_DESCRIPTION}
        </AlertDescription>
      </AlertContent>
      <div className="flex shrink-0 items-center gap-3">
        <Button variant="default">Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </div>
      <AlertClose />
    </Alert>
  );
}

/**
 * Different alert variants with custom icons
 */
export function AlertVariants() {
  const variants = [
    {
      color: 'text-status-success',
      icon: <CheckCircle className="text-[25px]" />,
      title: 'Success!',
      description: 'Your changes have been saved successfully.',
    },
    {
      color: 'text-status-warning',
      icon: <Warning className="text-[25px]" />,
      title: 'Warning',
      description: 'Please review your changes before proceeding.',
    },
    {
      color: 'text-status-error',
      icon: <ErrorIcon className="text-[25px]" />,
      title: 'Error',
      description: 'Something went wrong. Please try again.',
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      {variants.map(v => (
        <Alert key={v.title} layout="modal">
          <AlertIcon className={v.color}>{v.icon}</AlertIcon>
          <AlertContent>
            <AlertTitle>{v.title}</AlertTitle>
            <AlertDescription>{v.description}</AlertDescription>
          </AlertContent>
          <AlertClose />
        </Alert>
      ))}
    </div>
  );
}

/**
 * Alert without icon
 */
export function AlertWithoutIcon() {
  return (
    <Alert layout="modal">
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>
          Make your message concise and straightforward. Strive for a two-line
          alert that clearly conveys your message.
        </AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

// ============================================================================
// Example Metadata
// ============================================================================

export const examples = [
  {
    name: 'AlertDemo',
    title: 'Default',
    description: 'Basic modal alert with icon and close button.',
  },
  {
    name: 'AlertWithButtons',
    title: 'With Action Buttons',
    description: 'Modal alert with primary and secondary action buttons.',
  },
  {
    name: 'AlertLongLayout',
    title: 'Long Layout',
    description: 'Horizontal banner-style alert for compact displays.',
  },
  {
    name: 'AlertLongWithButtons',
    title: 'Long With Buttons',
    description: 'Long layout alert with inline action buttons.',
  },
  {
    name: 'AlertVariants',
    title: 'Status Variants',
    description: 'Success, warning, and error alert styles.',
  },
  {
    name: 'AlertWithoutIcon',
    title: 'Without Icon',
    description: 'Alert without a leading icon.',
  },
];

// ============================================================================
// Legacy Format (for backwards compatibility)
// ============================================================================

export const alert = {
  name: 'alert',
  components: {
    Default: <AlertDemo />,
    'With Action Buttons': <AlertWithButtons />,
    'Long Layout': <AlertLongLayout />,
    'Long With Buttons': <AlertLongWithButtons />,
    'Status Variants': <AlertVariants />,
    'Without Icon': <AlertWithoutIcon />,
  },
};
