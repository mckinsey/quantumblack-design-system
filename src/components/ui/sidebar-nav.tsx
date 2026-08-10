'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

import { SidebarMenuSub, useSidebar } from './sidebar';

type SidebarNavSize = 'default' | 'lg';

type NavTooltip = string | React.ComponentProps<typeof TooltipContent>;

const sidebarNavIconButtonVariants = cva(
  [
    'group/button peer/menu-button relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-none p-0',
    'ring-stroke-status-focus outline-hidden transition-[width,height,padding,background-color]',
    'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
    'focus-visible:ring-1',
    'active:text-fg-primary',
    'data-[active=true]:text-fg-primary',
    'disabled:pointer-events-none aria-disabled:pointer-events-none aria-disabled:opacity-50',
  ],
  {
    variants: {
      size: {
        default: 'size-16',
        lg: 'size-20',
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

function withNavTooltip(
  button: React.ReactElement,
  tooltip: NavTooltip | undefined,
  opts: { isMobile: boolean; sideOffset?: number },
) {
  if (!tooltip) {
    return button;
  }

  const tip = typeof tooltip === 'string' ? { children: tooltip } : tooltip;
  const { hidden: tooltipHidden, ...tooltipProps } = tip;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        sideOffset={opts.sideOffset}
        hidden={tooltipHidden ?? opts.isMobile}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

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

function SidebarNavIconButton({
  asChild = false,
  isActive = false,
  size: sizeProp,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: NavTooltip;
} & VariantProps<typeof sidebarNavIconButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, size: ctxSize } = useSidebar();
  const size = sizeProp ?? ctxSize;

  const button = (
    <Comp
      data-slot="sidebar-nav-icon-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarNavIconButtonVariants({ size }), className)}
      {...props}
    />
  );

  return withNavTooltip(button, tooltip, {
    isMobile,
    sideOffset: tooltipOffsetForIconButton[size],
  });
}

const sidebarNavUtilityButtonVariants = cva([
  'group/button flex size-8 mx-auto items-center justify-center rounded-none p-0',
  'ring-stroke-status-focus outline-hidden transition-[background-color]',
  'bg-stateslayer-overlay-enabled',
  'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
  'focus-visible:ring-1',
  'disabled:bg-stateslayer-overlay-disabled disabled:pointer-events-none',
  'aria-disabled:bg-stateslayer-overlay-disabled aria-disabled:pointer-events-none',
]);

function SidebarNavUtilityButton({
  asChild = false,
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  tooltip?: NavTooltip;
}) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-nav-utility-button"
      data-sidebar="footer-button"
      className={cn(sidebarNavUtilityButtonVariants(), className)}
      {...props}
    />
  );

  return withNavTooltip(button, tooltip, { isMobile });
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

const sidebarNavMenuButtonVariants = cva(
  [
    'flex w-full min-w-0 items-center gap-2 text-left outline-hidden ring-stroke-status-focus transition-colors',
    'cursor-pointer',
    'text-fg-tertiary hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
    'active:bg-stateslayer-overlay-pressed active:text-fg-primary',
    'focus-visible:ring-2',
    'disabled:pointer-events-none disabled:text-fg-disabled',
    'aria-disabled:pointer-events-none aria-disabled:text-fg-disabled',
    'data-[active=true]:bg-fill-muted data-[active=true]:text-fg-primary data-[active=true]:hover:bg-fill-muted',
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
  showChevron = false,
  className,
  children,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  showChevron?: boolean;
}) {
  const { size } = useSidebar();
  const Comp = asChild ? Slot : 'button';
  const shellVariant = isActive ? 'primary' : 'secondary';
  const chevronShellSize = size === 'lg' ? 'default' : 'sm';
  const chevronSlotClass = chevronShellSize === 'default' ? 'size-6' : 'size-4';

  return (
    <Comp
      data-slot="sidebar-nav-menu-button"
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarNavMenuButtonVariants({ size }), className)}
      {...props}>
      <span
        data-slot="nav-menu-chevron-slot"
        className={cn(
          'inline-flex shrink-0 items-center justify-center',
          chevronSlotClass,
        )}
        aria-hidden={!showChevron}>
        {showChevron ? (
          <>
            <IconShell
              data-slot="nav-menu-chevron"
              size={chevronShellSize}
              type="neutral"
              variant={shellVariant}
              className="group-data-[state=open]/collapsible:hidden">
              <Icon icon="chevron_right" />
            </IconShell>
            <IconShell
              data-slot="nav-menu-chevron"
              size={chevronShellSize}
              type="neutral"
              variant={shellVariant}
              className="hidden group-data-[state=open]/collapsible:inline-flex">
              <Icon icon="expand_more" />
            </IconShell>
          </>
        ) : null}
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
    </Comp>
  );
}

const sidebarNavMenuPanelWidth: Record<SidebarNavSize, string> = {
  default: 'w-66',
  lg: 'w-76',
};

function SidebarNavMenu({
  mode = 'overlay',
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
  const menuRef = React.useRef<HTMLElement>(null);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = openProp ?? uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);

      if (openProp === undefined) {
        setUncontrolledOpen(next);
      }
    },
    [onOpenChange, openProp],
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

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      if (menuRef.current?.contains(target)) {
        return;
      }

      if (target.closest('[data-slot="sidebar-nav-rail"]')) {
        return;
      }

      setOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown, true);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown, true);
    };
  }, [mode, open, setOpen]);

  const panelWidth = sidebarNavMenuPanelWidth[size];
  const overlayClosed = mode === 'overlay' && !open;
  const panelPad = cn(
    'bg-surface-primary flex h-full flex-col p-3',
    size === 'lg' && 'px-3 py-4',
  );

  if (mode === 'overlay') {
    return (
      <nav
        ref={menuRef}
        aria-label="Navigation menu"
        aria-hidden={overlayClosed || undefined}
        inert={overlayClosed || undefined}
        data-slot="sidebar-nav-menu"
        data-mode={mode}
        data-state={open ? 'open' : 'closed'}
        className={cn(
          'absolute top-0 bottom-0 z-20 overflow-hidden p-0 transition-[width] duration-250 ease-out',
          side === 'left'
            ? 'left-(--sidebar-width-icon) ml-[2px]'
            : 'right-(--sidebar-width-icon) mr-[2px]',
          open ? [panelWidth, 'overflow-y-auto'] : 'w-0',
          overlayClosed && 'pointer-events-none',
          className,
        )}
        {...props}>
        <div className={cn(panelPad, panelWidth)}>{children}</div>
      </nav>
    );
  }

  return (
    <nav
      ref={menuRef}
      aria-label="Navigation menu"
      data-slot="sidebar-nav-menu"
      data-mode={mode}
      className={cn(
        panelPad,
        'shrink-0 overflow-y-auto',
        panelWidth,
        className,
      )}
      {...props}>
      {children}
    </nav>
  );
}

function SidebarNavMenuSub(props: React.ComponentProps<typeof SidebarMenuSub>) {
  const { className, ...rest } = props;

  return (
    <SidebarMenuSub
      className={cn('mx-0 translate-x-0 gap-0 border-none p-0', className)}
      {...rest}
    />
  );
}

function SidebarNavMenuSubButton({
  className,
  ...props
}: React.ComponentProps<typeof SidebarNavMenuButton>) {
  const { size } = useSidebar();

  return (
    <SidebarNavMenuButton
      data-slot="sidebar-nav-menu-sub-button"
      className={cn('p-2', size === 'lg' && 'px-3 py-2', className)}
      {...props}
    />
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

  return {
    active,
    setActive,
    open,
    setOpen,
    selectActive,
  };
}

export {
  SidebarNav,
  SidebarNavIconButton,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarNavUtilityButton,
  useSidebarNavMenuOverlay,
};
