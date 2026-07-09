'use client';

import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const SIDEBAR_COOKIE_NAME = 'sidebar_state';
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

const sidebarIconWidth = {
  default: '4rem',
  lg: '5rem',
} as const;

type SidebarSize = keyof typeof sidebarIconWidth;

function sidebarSizeStyle(size: SidebarSize, fullWidth = false) {
  const width = sidebarIconWidth[size];

  return {
    '--sidebar-width-icon': width,
    ...(fullWidth ? { '--sidebar-width': width } : {}),
  } as React.CSSProperties;
}

type SidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
  size: SidebarSize;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

function SidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  size = 'default',
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: SidebarSize;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);

  // This is the internal state of the sidebar.
  // We use openProp and setOpenProp for control from outside the component.
  const [_open, _setOpen] = React.useState(defaultOpen);
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    },
    [setOpenProp, open],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile(prev => !prev) : setOpen(prev => !prev);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      size,
    }),
    [
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
      size,
    ],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-slot="sidebar-wrapper"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': sidebarIconWidth[size],
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper has-data-[variant=inset]:bg-surface-primary flex min-h-svh w-full',
            className,
          )}
          {...props}>
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  size: sizeProp,
  className,
  children,
  style,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  size?: SidebarSize;
}) {
  const {
    isMobile,
    state,
    openMobile,
    setOpenMobile,
    size: ctxSize,
  } = useSidebar();
  const size = sizeProp ?? ctxSize;
  const sizeVars = sidebarSizeStyle(size);

  if (collapsible === 'none') {
    return (
      <nav
        aria-label="Primary"
        data-slot="sidebar"
        data-side={side}
        data-size={size}
        style={
          {
            ...sidebarSizeStyle(size, true),
            ...style,
          } as React.CSSProperties
        }
        className={cn(
          'bg-surface-primary text-fg-primary relative flex h-full w-auto flex-row gap-0.5',
          className,
        )}
        {...props}>
        {children}
      </nav>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          {...props}
          data-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          data-size={size}
          className={cn(
            'bg-surface-primary text-fg-primary w-(--sidebar-width) p-0 [&>button]:hidden',
            className,
          )}
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
              ...style,
            } as React.CSSProperties
          }
          side={side}>
          <SheetHeader className="sr-only">
            <SheetTitle>Sidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-fg-primary hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
      data-size={size}
      data-slot="sidebar"
      style={{ ...sizeVars, ...style } as React.CSSProperties}>
      {/* This is what handles the sidebar gap on desktop */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
            : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
        )}
      />
      <div
        data-slot="sidebar-container"
        className={cn(
          'fixed top-14 bottom-0 z-10 hidden h-[calc(100svh-3.5rem)] w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
            : 'border-stroke-divider group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
          className,
        )}
        {...props}>
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-surface-primary group-data-[variant=floating]:border-stroke-divider flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm">
          {children}
        </div>
      </div>
    </div>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn('size-7', className)}
      onClick={event => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}>
      <IconShell type="neutral" hoverable size="sm">
        <Icon icon="menu" />
      </IconShell>
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}

function SidebarRail({ className, ...props }: React.ComponentProps<'button'>) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-border-divider absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'hover:group-data-[collapsible=offcanvas]:bg-surface-primary group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2',
        className,
      )}
      {...props}
    />
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<'main'>) {
  return (
    <main
      data-slot="sidebar-inset"
      className={cn(
        'bg-background relative flex w-full flex-1 flex-col',
        'md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-2',
        className,
      )}
      {...props}
    />
  );
}

function SidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('bg-background h-8 w-full shadow-none', className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn('flex flex-col', className)}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn('mt-auto flex flex-col', className)}
      {...props}
    />
  );
}

function SidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      className={cn(
        'bg-stroke-divider mx-auto data-[orientation=horizontal]:h-[2px] data-[orientation=horizontal]:w-8',
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        'text-fg-primary/70 ring-stroke-status-focus flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        'text-fg-primary ring-stroke-status-focus hover:bg-stateslayer-overlay-hover hover:text-fg-primary absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn('w-full text-sm', className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn('flex w-full min-w-0 flex-col', className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn('group/menu-item relative', className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-none p-2 text-left text-sm outline-hidden ring-stroke-status-focus transition-[width,height,padding] text-fg-secondary hover:bg-stateslayer-overlay-hover hover:text-fg-primary focus-visible:ring-2 active:bg-stateslayer-overlay-pressed active:text-fg-primary disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-fill-onsurface-ui-3 data-[active=true]:font-semibold data-[active=true]:text-fg-primary data-[active=true]:rounded-none data-[state=open]:hover:bg-stateslayer-overlay-hover data-[state=open]:hover:text-fg-primary group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'hover:bg-stateslayer-overlay-hover hover:text-fg-primary',
        outline:
          'bg-surface-base border border-stroke-tertiary hover:bg-stateslayer-overlay-hover hover:text-fg-primary hover:border-stroke-tertiary-hover',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:p-0!',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      aria-current={isActive ? 'page' : undefined}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
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
        hidden={tooltipHidden ?? (state !== 'collapsed' || isMobile)}
        {...tooltipProps}
      />
    </Tooltip>
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
    'data-[active=true]:before:bg-fill-active-inverse data-[active=true]:before:absolute data-[active=true]:before:left-0 data-[active=true]:before:w-1 data-[active=true]:before:content-[""]',
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
const tooltipOffsetForIconButton: Record<SidebarSize, number> = {
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
  const { isMobile, state, size: ctxSize } = useSidebar();
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
        hidden={tooltipHidden ?? (state !== 'collapsed' || isMobile)}
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
  const { isMobile, state } = useSidebar();

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
        hidden={tooltipHidden ?? (state !== 'collapsed' || isMobile)}
        {...tooltipProps}
      />
    </Tooltip>
  );
}

function SidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        'text-fg-primary ring-stroke-status-focus peer-hover/menu-button:text-fg-primary hover:bg-stateslayer-overlay-hover hover:text-fg-primary absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 md:after:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-fg-primary group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        'text-fg-primary pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
        'peer-hover/menu-button:text-fg-primary peer-data-[active=true]/menu-button:text-fg-primary',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}>
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
}

function SidebarMenuSub({ className, ...props }: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        'border-stroke-divider mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
}

function SidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<'li'>) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn('group/menu-sub-item relative', className)}
      {...props}
    />
  );
}

function SidebarMenuSubButton({
  asChild = false,
  size = 'md',
  isActive = false,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-fg-primary ring-stroke-status-focus hover:bg-stateslayer-overlay-hover hover:text-fg-primary active:bg-fill-subtle active:text-fg-primary [&>svg]:text-fg-primary flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:bg-fill-subtle data-[active=true]:text-fg-primary',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
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

const sidebarNavMenuPanelWidth: Record<SidebarSize, string> = {
  default: 'w-60',
  lg: 'w-70',
};

function SidebarNavMenu({
  mode = 'inline',
  side = 'left',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
  children,
  ...props
}: Omit<React.ComponentProps<'nav'>, 'children'> & {
  mode?: 'inline' | 'overlay';
  side?: 'left' | 'right';
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}) {
  const { size } = useSidebar();
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
  const { size } = useSidebar();

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
  const { size } = useSidebar();
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
  const { size } = useSidebar();
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

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarFooterButton,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuIconButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarNavMenu,
  SidebarNavMenuButton,
  SidebarNavMenuHeader,
  SidebarNavMenuItem,
  SidebarNavMenuSub,
  SidebarNavMenuSubButton,
  SidebarNavRail,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
