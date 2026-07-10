'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

type SidebarNavSize = 'default' | 'lg';
type SidebarNavSide = 'left' | 'right';

const sidebarIconWidth: Record<SidebarNavSize, string> = {
  default: '4rem',
  lg: '5rem',
};

type SidebarNavContextProps = {
  size: SidebarNavSize;
  side: SidebarNavSide;
  isMobile: boolean;
};

const SidebarNavContext = React.createContext<SidebarNavContextProps | null>(
  null,
);

function useSidebarNav() {
  const context = React.useContext(SidebarNavContext);
  if (!context) {
    throw new Error('useSidebarNav must be used within a SidebarNav.');
  }

  return context;
}

function SidebarNav({
  size = 'default',
  side = 'left',
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'nav'> & {
  size?: SidebarNavSize;
  side?: SidebarNavSide;
}) {
  const isMobile = useIsMobile();

  const value = React.useMemo<SidebarNavContextProps>(
    () => ({ size, side, isMobile }),
    [size, side, isMobile],
  );

  return (
    <SidebarNavContext.Provider value={value}>
      <TooltipProvider delayDuration={0}>
        <nav
          aria-label="Primary"
          data-slot="sidebar-nav"
          data-side={side}
          data-size={size}
          style={
            {
              '--sidebar-width': sidebarIconWidth[size],
              '--sidebar-width-icon': sidebarIconWidth[size],
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'bg-surface-primary text-fg-primary relative flex h-full w-auto flex-row gap-0.5',
            side === 'right' && 'flex-row-reverse',
            className,
          )}
          {...props}>
          {children}
        </nav>
      </TooltipProvider>
    </SidebarNavContext.Provider>
  );
}

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

/**
 * This is the offset for the tooltip of the icon button.
 */
const tooltipOffsetForIconButton: Record<SidebarNavSize, number> = {
  default: -20,
  lg: -24,
};

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
  const { isMobile, size: ctxSize } = useSidebarNav();
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
  const { isMobile } = useSidebarNav();

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
  const { size, side } = useSidebarNav();
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

function SidebarNavMenuHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { size } = useSidebarNav();

  return (
    <div
      role="heading"
      aria-level={2}
      data-slot="sidebar-nav-menu-header"
      className={cn(
        'text-fg-tertiary uppercase',
        size === 'lg'
          ? 'paragraph-large-primary pt-3 pr-3 pb-2 pl-2'
          : 'paragraph-regular-primary px-2 pt-3 pb-2',
        className,
      )}
      {...props}
    />
  );
}

function SidebarNavMenuItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-nav-menu-item"
      className={cn('group/nav-menu-item flex w-full flex-col', className)}
      {...props}
    />
  );
}

const sidebarNavMenuButtonVariants = cva(
  [
    'flex w-full min-w-0 items-center gap-2 text-left outline-hidden ring-stroke-status-focus transition-colors',
    'text-fg-tertiary hover:bg-stateslayer-overlay-hover active:bg-stateslayer-overlay-pressed',
    'focus-visible:ring-2',
    'disabled:pointer-events-none disabled:text-fg-disabled aria-disabled:pointer-events-none aria-disabled:text-fg-disabled',
    'data-[active=true]:text-fg-primary',
  ],
  {
    variants: {
      size: {
        default: 'paragraph-regular-primary px-2 py-3',
        lg: 'paragraph-large-primary p-3',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function SidebarNavMenuButton({
  asChild = false,
  isActive = false,
  badge,
  showChevron = false,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  badge?: React.ReactNode;
  showChevron?: boolean;
}) {
  const { size } = useSidebarNav();
  const Comp = asChild ? Slot : 'button';
  const shellVariant = isActive ? 'primary' : 'secondary';

  return (
    <Comp
      data-slot="sidebar-nav-menu-button"
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarNavMenuButtonVariants({ size }), className)}
      {...props}>
      {showChevron ? (
        <>
          <IconShell
            data-slot="nav-menu-chevron"
            size="sm"
            type="neutral"
            variant={shellVariant}
            className="group-data-[state=open]/collapsible:hidden">
            <Icon icon="chevron_right" />
          </IconShell>
          <IconShell
            data-slot="nav-menu-chevron"
            size="sm"
            type="neutral"
            variant={shellVariant}
            className="hidden group-data-[state=open]/collapsible:inline-flex">
            <Icon icon="expand_more" />
          </IconShell>
        </>
      ) : null}
      <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
      {badge ? <span className="shrink-0">{badge}</span> : null}
    </Comp>
  );
}

function SidebarNavMenuSub({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-nav-menu-sub"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

const sidebarNavMenuSubButtonVariants = cva(
  [
    'flex w-full min-w-0 items-center gap-2 text-left outline-hidden ring-stroke-status-focus transition-colors',
    'text-fg-tertiary hover:bg-stateslayer-overlay-hover active:bg-stateslayer-overlay-pressed',
    'focus-visible:ring-2',
    'disabled:pointer-events-none disabled:text-fg-disabled aria-disabled:pointer-events-none aria-disabled:text-fg-disabled',
    'data-[active=true]:text-fg-primary',
  ],
  {
    variants: {
      size: {
        default: 'paragraph-regular-primary pl-8 pr-2 py-2',
        lg: 'paragraph-large-primary pl-11 pr-3 py-2',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function SidebarNavMenuSubButton({
  asChild = false,
  isActive = false,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
}) {
  const { size } = useSidebarNav();
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-nav-menu-sub-button"
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarNavMenuSubButtonVariants({ size }), className)}
      {...props}>
      <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
    </Comp>
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
  SidebarNavMenuButton,
  SidebarNavMenuHeader,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  useSidebarNav,
  useSidebarNavMenuOverlay,
};
