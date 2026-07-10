'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { useSidebar } from '@/components/ui/sidebar';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type SidebarNavSize = 'default' | 'lg';

const sidebarMenuIconButtonVariants = cva(
  [
    'peer/menu-button relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-none p-0',
    'ring-stroke-status-focus outline-hidden transition-[width,height,padding,background-color]',
    'group-has-data-[sidebar=menu-action]/menu-item:pr-8',
    'group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
    'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
    'focus-visible:ring-1',
    'active:bg-stateslayer-overlay-active-inverse active:text-fg-primary',
    'data-[active=true]:bg-stateslayer-overlay-active-inverse data-[active=true]:text-fg-primary',
    'data-[active=true]:before:bg-slate-950 data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:w-1 data-[active=true]:before:content-[""]',
    'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
    'data-[state=open]:hover:bg-stateslayer-hover data-[state=open]:hover:text-fg-primary',
  ],
  {
    variants: {
      size: {
        default:
          'size-16 data-[active=true]:before:top-3 data-[active=true]:before:h-10',
        lg: 'size-20 group-data-[collapsible=icon]:p-0! data-[active=true]:before:top-4 data-[active=true]:before:h-12',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const tooltipOffsetForIconButton: Record<SidebarNavSize, number> = {
  default: -20,
  lg: -24,
};

function SidebarNav({
  className,
  children,
  ...props
}: React.ComponentProps<'nav'>) {
  const { side, size } = useSidebar();

  return (
    <nav
      aria-label="Primary"
      data-slot="sidebar-nav"
      data-side={side}
      data-size={size}
      className={cn(
        'bg-surface-primary text-fg-primary relative flex h-full w-auto flex-row gap-0.5',
        side === 'right' && 'flex-row-reverse',
        className,
      )}
      {...props}>
      {children}
    </nav>
  );
}

function SidebarMenuIconButton({
  asChild = false,
  isActive = false,
  size: sizeProp,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuIconButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, size: ctxSize } = useSidebar();
  const size = sizeProp ?? ctxSize;

  const button = (
    <Comp
      data-slot="sidebar-menu-icon-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarMenuIconButtonVariants({ size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  const { hidden: tooltipHidden, ...tooltipProps } = tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        sideOffset={tooltipOffsetForIconButton[size]}
        hidden={tooltipHidden ?? isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

const sidebarFooterButtonVariants = cva([
  'flex size-8 mx-auto items-center justify-center rounded-none p-0',
  'ring-stroke-status-focus outline-hidden transition-[background-color]',
  'bg-stateslayer-overlay-enabled',
  'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
  'focus-visible:ring-1',
  'disabled:bg-stateslayer-overlay-disabled disabled:pointer-events-none',
  'aria-disabled:bg-stateslayer-overlay-disabled aria-disabled:pointer-events-none',
]);

function SidebarFooterButton({
  asChild = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
}) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-footer-button"
      data-sidebar="footer-button"
      className={cn(sidebarFooterButtonVariants(), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  const { hidden: tooltipHidden, ...tooltipProps } = tooltip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={tooltipHidden ?? isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

function SidebarNavRail({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-nav-rail"
      data-sidebar="nav-rail"
      className={cn(
        'bg-surface-primary relative z-30 flex w-(--sidebar-width-icon) shrink-0 flex-col pb-7',
        className,
      )}
      {...props}
    />
  );
}

const sidebarNavMenuPanelWidth: Record<SidebarNavSize, string> = {
  default: 'w-60',
  lg: 'w-70',
};

function SidebarNavMenu({
  mode = 'inline',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'nav'>, 'children'> & {
  mode?: 'inline' | 'overlay';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const { size, side } = useSidebar();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (value: boolean | ((prev: boolean) => boolean)) => {
      const next = typeof value === 'function' ? value(open) : value;
      onOpenChange?.(next);
      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
    },
    [onOpenChange, open, openProp],
  );

  React.useEffect(() => {
    if (mode !== 'overlay' || !open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mode, open, setOpen]);

  const panelWidth = sidebarNavMenuPanelWidth[size];

  return (
    <nav
      aria-label="Navigation menu"
      data-slot="sidebar-nav-menu"
      data-mode={mode}
      data-state={mode === 'overlay' ? (open ? 'open' : 'closed') : undefined}
      className={cn(
        'bg-surface-primary flex flex-col pt-4',
        mode === 'inline' && ['shrink-0 overflow-y-auto', panelWidth],
        mode === 'overlay' && [
          'absolute top-0 bottom-0 z-20 overflow-hidden transition-[width] duration-250 ease-out',
          side === 'left'
            ? 'left-(--sidebar-width-icon) ml-0.5'
            : 'right-(--sidebar-width-icon) mr-0.5',
          open ? [panelWidth, 'overflow-y-auto'] : 'w-0',
          !open && 'pointer-events-none',
        ],
        className,
      )}
      {...props}>
      {children}
    </nav>
  );
}

function useSidebarNavMenuOverlay<TActive>(initialActive: TActive) {
  const [active, setActive] = React.useState(initialActive);
  const [open, setOpen] = React.useState(false);

  const selectActive = React.useCallback(
    (id: TActive) => {
      if (active === id && open) {
        setOpen(false);
        return;
      }

      setActive(id);
      setOpen(true);
    },
    [active, open],
  );

  const close = React.useCallback(() => {
    setOpen(false);
  }, []);

  const openMenu = React.useCallback(() => {
    setOpen(true);
  }, []);

  return {
    active,
    setActive,
    open,
    setOpen,
    selectActive,
    close,
    openMenu,
  };
}

export {
  SidebarFooterButton,
  SidebarMenuIconButton,
  SidebarNav,
  SidebarNavMenu,
  SidebarNavRail,
  useSidebarNavMenuOverlay,
};
