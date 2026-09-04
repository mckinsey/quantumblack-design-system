import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type StatisticSize = 'xs' | 'sm' | 'default' | 'lg' | 'xl';
type StatisticAlign = 'start' | 'end';
type StatisticUnitPosition = 'inline' | 'stacked';
type StatisticSentiment = 'positive' | 'negative' | 'neutral';

const sentimentText = {
  positive: 'text-fg-trend-positive',
  negative: 'text-fg-trend-negative',
  neutral: 'text-fg-trend-mono',
} as const;

const markSizeClasses =
  'group-data-[size=xl]/statistic:size-8 group-data-[size=xl]/statistic:text-[32px] group-data-[size=lg]/statistic:size-8 group-data-[size=lg]/statistic:text-[32px] group-data-[size=default]/statistic:size-6 group-data-[size=default]/statistic:text-[24px] group-data-[size=sm]/statistic:size-4 group-data-[size=sm]/statistic:text-[16px] group-data-[size=xs]/statistic:size-4 group-data-[size=xs]/statistic:text-[16px]';

const trendValuePrimaryClasses =
  'group-data-[size=xl]/statistic:headings-h3-semibold group-data-[size=xl]/statistic:text-xl group-data-[size=xl]/statistic:leading-7 group-data-[size=lg]/statistic:headings-h3-semibold group-data-[size=lg]/statistic:text-xl group-data-[size=lg]/statistic:leading-7 group-data-[size=default]/statistic:headings-h4-semibold group-data-[size=sm]/statistic:paragraph-regular-emphasised-600 group-data-[size=xs]/statistic:paragraph-regular-emphasised-600';

const trendValueSecondaryClasses =
  'group-data-[size=xl]/statistic:headings-h3-regular group-data-[size=lg]/statistic:headings-h3-regular group-data-[size=default]/statistic:headings-h4-regular group-data-[size=sm]/statistic:paragraph-regular-primary group-data-[size=xs]/statistic:paragraph-regular-primary font-normal';

const TrendContext = React.createContext<{
  sentiment: StatisticSentiment;
} | null>(null);

function useTrendContext() {
  return React.useContext(TrendContext);
}

function resolveSentiment(
  sentiment: StatisticSentiment | undefined,
  ctx: { sentiment: StatisticSentiment } | null,
) {
  return sentiment ?? ctx?.sentiment ?? 'positive';
}

const statisticVariants = cva(
  'group/statistic flex w-fit flex-col gap-1 [&>[data-slot=statistic-label]]:mb-2',
  {
    variants: {
      align: {
        start: 'items-start',
        end: [
          'items-end',
          '[&[data-unit-position=stacked]>[data-slot=statistic-value]]:items-end',
        ],
      },
    },
    defaultVariants: {
      align: 'start',
    },
  },
);

function Statistic({
  className,
  size = 'default',
  align = 'start',
  unitPosition = 'inline',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof statisticVariants> & {
    size?: StatisticSize;
    unitPosition?: StatisticUnitPosition;
  }) {
  return (
    <div
      role="group"
      data-slot="statistic"
      data-size={size}
      data-align={align}
      data-unit-position={unitPosition}
      className={cn(statisticVariants({ align }), className)}
      {...props}
    />
  );
}

function StatisticLabel({
  className,
  align,
  disabled = false,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  align?: StatisticAlign;
  disabled?: boolean;
}) {
  return (
    <div
      data-slot="statistic-label"
      data-align={align}
      data-disabled={disabled ? true : undefined}
      className={cn(
        'flex items-center gap-1',
        align === 'end'
          ? 'w-full justify-end'
          : align === 'start'
            ? 'justify-start'
            : 'justify-start group-data-[align=end]/statistic:w-full group-data-[align=end]/statistic:justify-end',
        'group-data-[size=lg]/statistic:label-large-primary',
        'group-data-[size=xl]/statistic:label-large-primary',
        'group-data-[size=default]/statistic:label-regular-primary',
        'group-data-[size=sm]/statistic:label-small-primary',
        'group-data-[size=xs]/statistic:label-small-primary',
        disabled ? 'text-fg-disabled' : 'text-fg-secondary',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function StatisticIcon({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="statistic-icon"
      className={cn(
        'flex items-center pb-1',
        'group-data-[align=end]/statistic:w-full group-data-[align=end]/statistic:justify-end',
        className,
      )}
      {...props}
    />
  );
}

function StatisticValue({
  className,
  value,
  unit,
  formatter,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  value?: string | number;
  unit?: string;
  formatter?: (value: string | number) => React.ReactNode;
}) {
  if (children) {
    return (
      <div data-slot="statistic-value" className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="statistic-value"
      className={cn(
        'flex gap-1',
        'group-data-[unit-position=inline]/statistic:items-end',
        'group-data-[unit-position=stacked]/statistic:flex-col group-data-[unit-position=stacked]/statistic:items-start',
        className,
      )}
      {...props}>
      <span
        className={cn(
          'text-fg-primary [word-break:break-word] whitespace-nowrap',
          'group-data-[size=xl]/statistic:display-d1-regular',
          'group-data-[size=lg]/statistic:display-d2-regular',
          'group-data-[size=default]/statistic:display-d3-regular',
          'group-data-[size=sm]/statistic:headings-h1-regular',
          'group-data-[size=xs]/statistic:headings-h2-regular',
        )}>
        {value !== undefined ? (formatter ? formatter(value) : value) : null}
      </span>
      {unit ? (
        <span
          className={cn(
            'text-fg-secondary pb-0.5 [word-break:break-word] group-data-[unit-position=stacked]/statistic:pb-0',
            'group-data-[size=xl]/statistic:headings-h2-regular',
            'group-data-[size=lg]/statistic:headings-h3-regular',
            'group-data-[size=default]/statistic:headings-h3-regular',
            'group-data-[size=sm]/statistic:headings-h4-regular',
            'group-data-[size=xs]/statistic:headings-h4-regular',
          )}>
          {unit}
        </span>
      ) : null}
    </div>
  );
}

function StatisticTrend({
  className,
  sentiment = 'positive',
  children,
  ...props
}: React.ComponentProps<'div'> & {
  sentiment?: StatisticSentiment;
}) {
  return (
    <TrendContext.Provider value={{ sentiment }}>
      <div
        data-slot="statistic-trend"
        data-sentiment={sentiment}
        className={cn(
          'flex items-center gap-1',
          'group-data-[align=end]/statistic:w-full group-data-[align=end]/statistic:justify-end',
          className,
        )}
        {...props}>
        {children}
      </div>
    </TrendContext.Provider>
  );
}

function StatisticMark({
  className,
  sentiment,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  sentiment?: StatisticSentiment;
}) {
  const ctx = useTrendContext();
  const resolved = resolveSentiment(sentiment, ctx);

  return (
    <div
      data-slot="statistic-mark"
      aria-hidden
      className={cn('shrink-0', className)}
      {...props}>
      <IconShell
        type="custom"
        variant="primary"
        className={cn(sentimentText[resolved], markSizeClasses)}>
        {children}
      </IconShell>
    </div>
  );
}

function StatisticTrendValueItem({
  variant = 'primary',
  className,
  ...props
}: React.ComponentProps<'span'> & {
  variant?: 'primary' | 'secondary';
}) {
  return (
    <span
      data-slot="statistic-trend-value-item"
      data-variant={variant}
      className={cn(
        variant === 'primary'
          ? trendValuePrimaryClasses
          : trendValueSecondaryClasses,
        className,
      )}
      {...props}
    />
  );
}

function StatisticTrendValue({
  className,
  value,
  percentage,
  sentiment,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  value?: string;
  percentage?: string;
  sentiment?: StatisticSentiment;
}) {
  const ctx = useTrendContext();
  const resolved = resolveSentiment(sentiment, ctx);

  if (children) {
    return (
      <div
        data-slot="statistic-trend-value"
        className={cn(
          'flex items-center gap-1',
          sentimentText[resolved],
          className,
        )}
        {...props}>
        {children}
      </div>
    );
  }

  return (
    <div
      data-slot="statistic-trend-value"
      className={cn(
        'flex items-center gap-1',
        sentimentText[resolved],
        className,
      )}
      {...props}>
      {value ? (
        <StatisticTrendValueItem>{value}</StatisticTrendValueItem>
      ) : null}
      {percentage ? (
        <StatisticTrendValueItem variant="secondary">
          {percentage}
        </StatisticTrendValueItem>
      ) : null}
    </div>
  );
}

function StatisticTrendContext({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="statistic-trend-context"
      className={cn(
        'text-fg-tertiary [word-break:break-word] whitespace-nowrap',
        'group-data-[size=xl]/statistic:label-large-primary',
        'group-data-[size=lg]/statistic:label-large-primary',
        'group-data-[size=default]/statistic:label-regular-primary',
        'group-data-[size=sm]/statistic:label-small-primary',
        'group-data-[size=xs]/statistic:label-small-primary',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function StatisticPeriodRange({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="statistic-period-range"
      className={cn(
        'paragraph-regular-primary text-fg-primary flex w-full max-w-64 items-start justify-between',
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

export {
  Statistic,
  StatisticIcon,
  StatisticLabel,
  StatisticMark,
  StatisticPeriodRange,
  StatisticTrend,
  StatisticTrendContext,
  StatisticTrendValue,
  StatisticTrendValueItem,
  StatisticValue,
  statisticVariants,
};

export type {
  StatisticAlign,
  StatisticSentiment,
  StatisticSize,
  StatisticUnitPosition,
};
