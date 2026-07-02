'use client';

import React, { memo, useEffect, useState } from 'react';
import {
  type ExternalToast,
  Toaster as Sonner,
  type ToastT,
  type ToasterProps,
  toast as sonnerToast,
} from 'sonner';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type ToastType = NonNullable<ToastT['type']>;

export interface ToastOptions extends Omit<ExternalToast, 'action' | 'cancel'> {
  // Action button - user provides JSX component
  readonly action?: React.ReactNode;
  // Cancel button - user provides JSX component
  // If not provided, default close button is used
  readonly cancel?: React.ReactNode;
}

interface ToastProps {
  readonly id: string | number;
  readonly message: string;
  readonly type: ToastType;
  readonly options?: ToastOptions;
}

type ToastConfigKey = 'success' | 'error' | 'warning' | 'info' | 'default';

const toastTypeConfig = {
  success: {
    borderClass: 'border-l-[var(--border-status-success)]',
    icon: 'check_circle',
    iconClassName: 'text-status-success',
  },
  error: {
    borderClass: 'border-l-[var(--border-status-error)]',
    icon: 'cancel',
    iconClassName: 'text-status-error',
  },
  warning: {
    borderClass: 'border-l-[var(--border-status-warning)]',
    icon: 'error',
    iconClassName: 'text-status-warning',
  },
  info: {
    borderClass: 'border-l-[var(--border-status-focus)]',
    icon: 'info',
    iconClassName: 'text-status-information',
  },
  default: {
    borderClass: 'border-l-[var(--border-primary)]',
    icon: 'playlist_add_check',
    iconClassName: 'text-fill-active',
  },
} as const satisfies Record<
  ToastConfigKey,
  {
    borderClass: string;
    icon: string;
    iconClassName?: string;
  }
>;

const getToastConfig = (type: ToastType) => {
  if (type in toastTypeConfig) {
    return toastTypeConfig[type as ToastConfigKey];
  }

  return toastTypeConfig.info;
};

const getDefaultIcon = (config: ReturnType<typeof getToastConfig>) => (
  <IconShell size="default" variant="primary" className={config.iconClassName}>
    <Icon icon={config.icon} />
  </IconShell>
);

function getCancelComponent(
  cancel: ToastOptions['cancel'],
  id: string | number,
): React.ReactNode {
  if (cancel) {
    return cancel;
  }

  return (
    <Button
      variant="ghost"
      size="icon-xxs"
      onClick={() => sonnerToast.dismiss(id)}
      aria-label="Close toast">
      <IconShell size="sm">
        <Icon icon="close" />
      </IconShell>
    </Button>
  );
}

const Toast = memo(function Toast({ id, message, type, options }: ToastProps) {
  const { action, cancel, className, icon, ...restOptions } = options || {};

  const config = getToastConfig(type);
  const defaultIcon = getDefaultIcon(config);
  const displayIcon = icon || defaultIcon;

  const cancelComponent = getCancelComponent(cancel, id);

  return (
    <div
      className={cn(
        'bg-fill-onsurface-ui-3 shadow-elevation-2 flex h-[44px] items-center gap-2 border-l-4 py-2 pr-3 pl-4',
        config.borderClass,
        className,
      )}
      {...(restOptions.testId && { 'data-testid': restOptions.testId })}>
      <div className="flex items-center gap-2">
        <div className="flex shrink-0 items-center">{displayIcon}</div>

        <div className="flex flex-1 items-center">
          <p className="paragraph-regular-primary text-fg-secondary">
            {message}
          </p>
          {action}
        </div>
      </div>

      {cancelComponent}
    </div>
  );
});

function createToast(type: ToastType) {
  return (message: string, options?: ToastOptions) => {
    // Extract action and cancel from options to prevent Sonner from rendering them separately
    const {
      action: _action,
      cancel: _cancel,
      ...sonnerOptions
    } = options || {};

    return sonnerToast.custom(
      id => <Toast id={id} message={message} type={type} options={options} />,
      sonnerOptions,
    );
  };
}

// Extend sonnerToast with custom toast methods
const toast = Object.assign(sonnerToast, {
  success: createToast('success'),
  error: createToast('error'),
  warning: createToast('warning'),
  info: createToast('info'),
  default: createToast('default'),
});

function useThemeValue(): 'light' | 'dark' {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document === 'undefined') {
      return 'light';
    }

    return document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const observer = new MutationObserver(() => {
      setTheme(
        document.documentElement.classList.contains('dark') ? 'dark' : 'light',
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useThemeValue();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster, toast };
