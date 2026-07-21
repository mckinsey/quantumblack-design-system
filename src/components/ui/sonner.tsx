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
  readonly action?: React.ReactNode;
  readonly cancel?: React.ReactNode;
  readonly testId?: string;
}

interface ToastProps {
  readonly id: string | number;
  readonly message: string;
  readonly type: ToastType;
  readonly options?: ToastOptions;
}

const toastTypeConfig = {
  success: {
    borderClass: 'border-l-stroke-status-success',
    iconClass: 'text-status-success',
    iconName: 'check_circle',
  },
  error: {
    borderClass: 'border-l-stroke-status-error',
    iconClass: 'text-status-error',
    iconName: 'cancel',
  },
  warning: {
    borderClass: 'border-l-stroke-status-warning',
    iconClass: 'text-status-warning',
    iconName: 'error',
  },
  info: {
    borderClass: 'border-l-stroke-status-focus',
    iconClass: 'text-status-information',
    iconName: 'info',
  },
  default: {
    borderClass: 'border-l-stroke-primary',
    iconClass: 'text-fg-secondary',
    iconName: 'playlist_add_check',
  },
} as const;

type ToastConfigKey = keyof typeof toastTypeConfig;

const getToastConfig = (type: ToastType) => {
  if (type in toastTypeConfig) {
    return toastTypeConfig[type as ToastConfigKey];
  }

  return toastTypeConfig.info;
};

const getDefaultIcon = (config: ReturnType<typeof getToastConfig>) => (
  <IconShell type="custom" className={config.iconClass}>
    <Icon icon={config.iconName} />
  </IconShell>
);

function getCancelComponent(
  cancel: ToastOptions['cancel'],
  id: string | number,
): React.ReactNode {
  if (cancel === null) {
    return null;
  }

  if (cancel !== undefined) {
    return cancel;
  }

  return (
    <Button
      variant="ghost"
      size="icon-xxs"
      onClick={() => sonnerToast.dismiss(id)}
      aria-label="Close toast">
      <IconShell type="neutral" hoverable size="sm">
        <Icon icon="close" />
      </IconShell>
    </Button>
  );
}

const Toast = memo(function Toast({ id, message, type, options }: ToastProps) {
  const { action, cancel, className, icon, testId } = options || {};

  const config = getToastConfig(type);
  const displayIcon = icon === undefined ? getDefaultIcon(config) : icon;
  const cancelComponent = getCancelComponent(cancel, id);

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live={type === 'error' ? 'assertive' : 'polite'}
      data-slot="toast"
      className={cn(
        'bg-fill-onsurface-ui-3 shadow-elevation-2 flex h-[44px] items-center gap-2 border-l-4 py-2 pr-3 pl-4',
        config.borderClass,
        className,
      )}
      {...(testId && { 'data-testid': testId })}>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        {displayIcon !== null && (
          <div data-slot="toast-icon" className="flex shrink-0 items-center">
            {displayIcon}
          </div>
        )}

        <div className="flex min-w-0 flex-1 items-center">
          <p
            data-slot="toast-message"
            className="paragraph-regular-primary text-fg-secondary">
            {message}
          </p>
          {action}
        </div>
      </div>

      {cancelComponent !== null && (
        <div
          data-slot="toast-dismiss"
          className="flex shrink-0 items-center self-stretch">
          {cancelComponent}
        </div>
      )}
    </div>
  );
});

function createToast(type: ToastType) {
  return (message: string, options?: ToastOptions) => {
    const {
      action: _action,
      cancel: _cancel,
      testId: _testId,
      ...sonnerOptions
    } = options || {};

    return sonnerToast.custom(
      id => <Toast id={id} message={message} type={type} options={options} />,
      sonnerOptions,
    );
  };
}

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
      expand={props.expand ?? true}
      {...props}
    />
  );
};

export { Toaster, toast };
