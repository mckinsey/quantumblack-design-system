import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';

const MODAL_DESCRIPTION =
  'Make your message concise and straightforward. Strive for a two-line alert that clearly conveys your message.';
const LONG_DESCRIPTION =
  'Make your message brief; target a one-line alert that conveys clearly your point.';

const INFO_ICON = (
  <IconShell size="lg" variant="primary">
    <Icon icon="info" className="text-status-information" />
  </IconShell>
);

function ActionButtons() {
  return (
    <div className="flex gap-3 pt-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export function AlertDemo() {
  return (
    <Alert layout="modal">
      <AlertIcon>{INFO_ICON}</AlertIcon>
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>{MODAL_DESCRIPTION}</AlertDescription>
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

export function AlertWithButtons() {
  return (
    <Alert layout="modal">
      <AlertIcon>{INFO_ICON}</AlertIcon>
      <AlertContent>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>{MODAL_DESCRIPTION}</AlertDescription>
        <ActionButtons />
      </AlertContent>
      <AlertClose />
    </Alert>
  );
}

export function AlertLongLayout() {
  return (
    <Alert layout="long">
      <AlertIcon>{INFO_ICON}</AlertIcon>
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

export function AlertLongWithButtons() {
  return (
    <Alert layout="long">
      <AlertIcon>{INFO_ICON}</AlertIcon>
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

const ALERT_STATUS_VARIANTS = [
  {
    icon: 'check_circle',
    iconClass: 'text-status-success',
    title: 'Success!',
    description: 'Your changes have been saved successfully.',
  },
  {
    icon: 'warning',
    iconClass: 'text-status-warning',
    title: 'Warning',
    description: 'Please review your changes before proceeding.',
  },
  {
    icon: 'error',
    iconClass: 'text-status-error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
] as const;

export function AlertVariants() {
  return (
    <div className="flex flex-col gap-3">
      {ALERT_STATUS_VARIANTS.map(v => (
        <Alert key={v.title} layout="modal">
          <AlertIcon>
            <IconShell size="lg" variant="primary">
              <Icon icon={v.icon} className={v.iconClass} />
            </IconShell>
          </AlertIcon>
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
