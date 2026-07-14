'use client';

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';

export type TabSize = 'default' | 'lg' | 'xl';

export interface TabsTriggerProps extends React.ComponentProps<
  typeof TabsPrimitive.Tab
> {
  size?: TabSize;
}

export type TabsContentProps = React.ComponentProps<typeof TabsPrimitive.Panel>;

export interface TabsProps extends React.ComponentProps<
  typeof TabsPrimitive.Root
> {
  size?: TabSize;
  /** Hides the full-width divider under the tab row. Default shows the tertiary baseline from Tab-Group. */
  hideBaseline?: boolean;
  /** When true, triggers use horizontal padding and sit flush with no gap. When false, compact triggers with gap between tabs. */
  padded?: boolean;
}

export type TabsListProps = React.ComponentProps<typeof TabsPrimitive.List>;

interface TabsSizeContextValue {
  size?: TabSize;
}

const TabsSizeContext = React.createContext<TabsSizeContextValue | undefined>(
  undefined,
);

const useTabsSizeContext = () => {
  const context = React.useContext(TabsSizeContext);

  return context;
};

interface TabsLayoutContextValue {
  hideBaseline?: boolean;
  padded?: boolean;
}

const TabsLayoutContext = React.createContext<
  TabsLayoutContextValue | undefined
>(undefined);

const useTabsLayoutContext = () => {
  const context = React.useContext(TabsLayoutContext);

  return context;
};

const defaultStyles = {
  tabs: 'w-full',
  tabList: {
    base: 'flex relative box-border',
    baseline:
      "before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-stroke-tertiary before:content-['']",
    hideBaseline: 'before:content-none',
    compact: {
      default: 'gap-3',
      lg: 'gap-3',
      xl: 'gap-5',
    },
    scrollbar:
      'scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:h-0',
  },
  tab: {
    base: 'box-border relative align-top text-center text-ellipsis overflow-visible inline-flex items-center justify-center gap-1 select-none outline-none transition-all duration-200',
    padding: {
      default: 'px-3 py-2',
      lg: 'px-4 pt-2 pb-3',
      xl: 'px-6 py-3',
    },
    paddingCompact: {
      default: 'py-2',
      lg: 'pt-2 pb-3',
      xl: 'py-3',
    },
    font: {
      default: 'paragraph-regular-primary',
      lg: 'label-large-primary',
      xl: 'headings-h4-regular',
    },
    animatedHoverBorder:
      "after:absolute after:bottom-[-1px] after:left-0 after:h-px after:w-full after:bg-stroke-tertiary-hover after:content-[''] after:scale-x-0 after:origin-center after:transition-transform after:duration-200 [&:not([data-active])]:hover:after:scale-x-100",
    inactive: {
      border:
        '[&:not([data-active])]:border-b [&:not([data-active])]:border-b-stroke-tertiary',
      text: '[&:not([data-active])]:text-fg-secondary',
      cursor: '[&:not([data-active])]:cursor-pointer',
    },
    active: {
      border: 'data-active:border-b data-active:border-b-stroke-active',
      text: 'data-active:text-fg-primary',
      cursor: 'data-active:cursor-default',
    },
    focused: {
      color:
        'focus-visible:[&:not([data-active])]:border-b-stroke-status-focus focus-visible:data-active:border-b-stroke-status-focus',
      widthLarge:
        'focus-visible:[&:not([data-active])]:border-b-2 focus-visible:data-active:border-b-2',
      text: 'focus-visible:text-fg-primary',
    },
    disabled: {
      border: 'data-disabled:border-b data-disabled:border-b-stroke-tertiary',
      text: 'data-disabled:text-fg-disabled',
      cursor: 'data-disabled:cursor-not-allowed',
    },
  },
  tabPanel: {
    base: 'block py-5 text-fg-primary',
  },
};

function TabsRoot({
  children,
  className,
  size = 'default',
  hideBaseline = false,
  padded = true,
  ...props
}: TabsProps) {
  return (
    <TabsSizeContext.Provider value={{ size }}>
      <TabsLayoutContext.Provider value={{ hideBaseline, padded }}>
        <TabsPrimitive.Root
          data-slot="tabs"
          className={cn(defaultStyles.tabs, className)}
          {...props}>
          {children}
        </TabsPrimitive.Root>
      </TabsLayoutContext.Provider>
    </TabsSizeContext.Provider>
  );
}

function TabsList({ className, ...props }: TabsListProps) {
  const sizeContext = useTabsSizeContext();
  const size = sizeContext?.size ?? 'default';
  const layoutContext = useTabsLayoutContext();
  const hideBaseline = layoutContext?.hideBaseline ?? false;
  const padded = layoutContext?.padded ?? true;

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        defaultStyles.tabList.base,
        defaultStyles.tabList.scrollbar,
        !hideBaseline && defaultStyles.tabList.baseline,
        hideBaseline && defaultStyles.tabList.hideBaseline,
        !padded && defaultStyles.tabList.compact[size],
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  disabled,
  size: triggerSize,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const sizeContext = useTabsSizeContext();
  const size = triggerSize ?? sizeContext?.size ?? 'default';
  const layoutContext = useTabsLayoutContext();
  const hideBaseline = layoutContext?.hideBaseline ?? false;
  const padded = layoutContext?.padded ?? true;

  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      disabled={disabled}
      className={cn(
        defaultStyles.tab.base,
        padded
          ? defaultStyles.tab.padding[size]
          : defaultStyles.tab.paddingCompact[size],
        defaultStyles.tab.font[size],
        defaultStyles.tab.disabled.border,
        defaultStyles.tab.disabled.text,
        defaultStyles.tab.disabled.cursor,
        !disabled && defaultStyles.tab.inactive.border,
        !disabled && defaultStyles.tab.inactive.text,
        !disabled && defaultStyles.tab.inactive.cursor,
        !disabled && defaultStyles.tab.active.border,
        !disabled && defaultStyles.tab.active.text,
        !disabled && defaultStyles.tab.active.cursor,
        defaultStyles.tab.focused.color,
        size === 'xl' && defaultStyles.tab.focused.widthLarge,
        defaultStyles.tab.focused.text,
        !hideBaseline &&
          '[&:not([data-active])]:border-b-transparent [&:not([data-active])]:hover:border-b-transparent',
        !disabled && defaultStyles.tab.animatedHoverBorder,
        className,
      )}
      {...props}>
      {children}
    </TabsPrimitive.Tab>
  );
}

function TabsContent({ className, ...props }: TabsContentProps) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn(defaultStyles.tabPanel.base, className)}
      {...props}
    />
  );
}

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent };
