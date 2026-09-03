import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type StatSize = 'xsm' | 'sm' | 'default' | 'lg' | 'xl';
type StatLabelSize = 'sm' | 'default' | 'lg';
type StatAlign = 'start' | 'end';
type StatSentiment = 'positive' | 'negative' | 'neutral';
type StatTrendDirection = 'up' | 'down' | 'neutral';
type StatUnitPosition = 'inline' | 'stacked';

const statisticVariants = cva('group/statistic flex w-fit flex-col gap-1', {
  variants: {
    align: {
      start: 'items-start text-left',
      end: 'items-end text-right',
    },
  },
  defaultVariants: {
    align: 'start',
  },
});

const statLabelVariants = cva('flex w-fit items-center gap-0.5', {
  variants: {
    size: {
      sm: 'label-small-primary',
      default: 'label-regular-primary',
      lg: 'label-large-primary',
    },
    disabled: {
      true: 'text-fg-disabled',
      false: 'text-fg-secondary',
    },
    align: {
      start: 'justify-start',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    size: 'default',
    disabled: false,
    align: 'start',
  },
});

const statValueClass: Record<StatSize, string> = {
  xsm: 'headings-h2-regular text-fg-primary',
  sm: 'headings-h1-regular text-fg-primary',
  default: 'display-d3-regular text-fg-primary',
  lg: 'display-d2-regular text-fg-primary',
  xl: 'display-d1-regular text-fg-primary',
};

const statUnitClass: Record<StatSize, string> = {
  xsm: 'headings-h4-regular text-fg-secondary',
  sm: 'headings-h3-regular text-fg-secondary',
  default: 'headings-h3-regular text-fg-secondary',
  lg: 'headings-h2-regular text-fg-secondary',
  xl: 'headings-h2-regular text-fg-secondary',
};

const statTrendValueClass: Record<StatSize, string> = {
  xsm: 'paragraph-regular-emphasised-600',
  sm: 'paragraph-regular-emphasised-600',
  default: 'headings-h4-semibold',
  lg: 'headings-h3-semibold',
  xl: 'headings-h3-semibold',
};

const statTrendPctClass: Record<StatSize, string> = {
  xsm: 'paragraph-regular-emphasised-600',
  sm: 'paragraph-regular-emphasised-600',
  default: 'headings-h4-regular',
  lg: 'headings-h3-regular',
  xl: 'headings-h3-regular',
};

const statTrendContextClass: Record<StatSize, string> = {
  xsm: 'label-small-primary text-fg-tertiary',
  sm: 'label-small-primary text-fg-tertiary',
  default: 'label-regular-primary text-fg-tertiary',
  lg: 'label-large-primary text-fg-tertiary',
  xl: 'label-large-primary text-fg-tertiary',
};

const sentimentTextClass: Record<StatSentiment, string> = {
  positive: 'text-success',
  negative: 'text-error',
  neutral: 'text-fg-secondary',
};

const sentimentIconClass: Record<StatSentiment, string> = {
  positive: 'text-success',
  negative: 'text-error',
  neutral: 'text-fg-tertiary',
};

function trendIcon(
  direction: StatTrendDirection,
  markSize: 'sm' | 'lg',
):
  | 'arrow_circle_up'
  | 'arrow_circle_down'
  | 'remove_circle'
  | 'remove_circle_outline' {
  if (direction === 'neutral') {
    return markSize === 'lg' ? 'remove_circle' : 'remove_circle_outline';
  }

  return direction === 'up' ? 'arrow_circle_up' : 'arrow_circle_down';
}

function Statistic({
  className,
  size = 'default',
  align = 'start',
  unitPosition = 'inline',
  ...props
}: React.ComponentProps<'div'> & {
  size?: StatSize;
  align?: StatAlign;
  unitPosition?: StatUnitPosition;
}) {
  return (
    <div
      data-slot="statistic"
      data-size={size}
      data-align={align}
      data-unit-position={unitPosition}
      className={cn(statisticVariants({ align }), className)}
      {...props}
    />
  );
}

function StatLabel({
  className,
  size,
  disabled = false,
  align,
  trailing,
  children,
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof statLabelVariants> & {
    trailing?: React.ReactNode;
  }) {
  return (
    <div
      data-slot="stat-label"
      data-disabled={disabled ? true : undefined}
      className={cn(
        statLabelVariants({ size, disabled, align }),
        !size &&
          'group-data-[size=xsm]/statistic:label-small-primary group-data-[size=sm]/statistic:label-regular-primary group-data-[size=default]/statistic:label-regular-primary group-data-[size=lg]/statistic:label-large-primary group-data-[size=xl]/statistic:label-large-primary',
        !align &&
          'group-data-[align=end]/statistic:justify-end group-data-[align=start]/statistic:justify-start',
        className,
      )}
      {...props}>
      <span data-slot="stat-label-text">{children}</span>
      {trailing ? (
        <span data-slot="stat-label-trailing" className="inline-flex shrink-0">
          {trailing}
        </span>
      ) : null}
    </div>
  );
}

function StatValue({
  className,
  unit,
  unitPosition,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  unit?: React.ReactNode;
  unitPosition?: StatUnitPosition;
}) {
  return (
    <div
      data-slot="stat-value"
      className={cn(
        'flex',
        unitPosition === 'inline' && 'flex-row items-baseline gap-1',
        unitPosition === 'stacked' && 'flex-col items-end gap-2.5',
        !unitPosition &&
          'group-data-[unit-position=inline]/statistic:flex-row group-data-[unit-position=inline]/statistic:items-baseline group-data-[unit-position=inline]/statistic:gap-1 group-data-[unit-position=stacked]/statistic:flex-col group-data-[unit-position=stacked]/statistic:items-end group-data-[unit-position=stacked]/statistic:gap-2.5',
        'group-data-[align=end]/statistic:items-end',
        className,
      )}
      {...props}>
      <span
        data-slot="stat-value-amount"
        className={cn(
          statValueClass.default,
          'group-data-[size=xsm]/statistic:headings-h2-regular group-data-[size=sm]/statistic:headings-h1-regular group-data-[size=default]/statistic:display-d3-regular group-data-[size=lg]/statistic:display-d2-regular group-data-[size=xl]/statistic:display-d1-regular',
          'text-fg-primary',
        )}>
        {children}
      </span>
      {unit ? (
        <span
          data-slot="stat-value-unit"
          className={cn(
            statUnitClass.default,
            'group-data-[size=xsm]/statistic:headings-h4-regular group-data-[size=sm]/statistic:headings-h3-regular group-data-[size=default]/statistic:headings-h3-regular group-data-[size=lg]/statistic:headings-h2-regular group-data-[size=xl]/statistic:headings-h2-regular',
            'text-fg-secondary',
          )}>
          {unit}
        </span>
      ) : null}
    </div>
  );
}

function StatTrendRow({
  className,
  sentiment = 'positive',
  direction = 'up',
  value,
  percentage,
  context,
  ...props
}: React.ComponentProps<'div'> & {
  sentiment?: StatSentiment;
  direction?: StatTrendDirection;
  value?: React.ReactNode;
  percentage?: React.ReactNode;
  context?: React.ReactNode;
}) {
  return (
    <div
      data-slot="stat-trend-row"
      data-sentiment={sentiment}
      className={cn(
        'flex items-center gap-1',
        'group-data-[align=end]/statistic:justify-end',
        className,
      )}
      {...props}>
      <IconShell
        size="sm"
        type="custom"
        className={cn(
          sentimentIconClass[sentiment],
          'group-data-[size=lg]/statistic:hidden group-data-[size=xl]/statistic:hidden',
        )}>
        <Icon icon={trendIcon(direction, 'sm')} />
      </IconShell>
      <IconShell
        size="default"
        type="custom"
        className={cn(
          sentimentIconClass[sentiment],
          'hidden group-data-[size=lg]/statistic:inline-flex group-data-[size=xl]/statistic:inline-flex',
        )}>
        <Icon icon={trendIcon(direction, 'lg')} />
      </IconShell>
      {(value || percentage) && (
        <span
          data-slot="stat-trend-values"
          className="inline-flex items-center gap-1">
          {value ? (
            <span
              data-slot="stat-trend-value"
              className={cn(
                statTrendValueClass.default,
                sentimentTextClass[sentiment],
                'group-data-[size=xsm]/statistic:paragraph-regular-emphasised-600 group-data-[size=sm]/statistic:paragraph-regular-emphasised-600 group-data-[size=default]/statistic:headings-h4-semibold group-data-[size=lg]/statistic:headings-h3-semibold group-data-[size=xl]/statistic:headings-h3-semibold',
                sentiment === 'neutral' && 'text-fg-secondary',
              )}>
              {value}
            </span>
          ) : null}
          {percentage ? (
            <span
              data-slot="stat-trend-percentage"
              className={cn(
                statTrendPctClass.default,
                sentimentTextClass[sentiment],
                'group-data-[size=xsm]/statistic:paragraph-regular-emphasised-600 group-data-[size=sm]/statistic:paragraph-regular-emphasised-600 group-data-[size=default]/statistic:headings-h4-regular group-data-[size=lg]/statistic:headings-h3-regular group-data-[size=xl]/statistic:headings-h3-regular',
                sentiment === 'neutral' && 'text-fg-secondary',
              )}>
              {percentage}
            </span>
          ) : null}
        </span>
      )}
      {context ? (
        <span
          data-slot="stat-trend-context"
          className={cn(
            statTrendContextClass.default,
            'group-data-[size=xsm]/statistic:label-small-primary group-data-[size=sm]/statistic:label-small-primary group-data-[size=default]/statistic:label-regular-primary group-data-[size=lg]/statistic:label-large-primary group-data-[size=xl]/statistic:label-large-primary',
            'text-fg-tertiary',
          )}>
          {context}
        </span>
      ) : null}
    </div>
  );
}

const statPeriodRangeVariants = cva(
  'text-fg-secondary inline-flex items-baseline gap-1',
  {
    variants: {
      size: {
        sm: 'label-small-primary',
        default: 'label-regular-primary',
        lg: 'label-large-primary',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

function StatPeriodRange({
  className,
  range,
  qualifier,
  size = 'default',
  ...props
}: React.ComponentProps<'div'> &
  VariantProps<typeof statPeriodRangeVariants> & {
    range: React.ReactNode;
    qualifier?: React.ReactNode;
  }) {
  return (
    <div
      data-slot="stat-period-range"
      className={cn(statPeriodRangeVariants({ size }), className)}
      {...props}>
      <span data-slot="stat-period-range-text">{range}</span>
      {qualifier ? (
        <span data-slot="stat-period-range-qualifier">{qualifier}</span>
      ) : null}
    </div>
  );
}

export {
  StatLabel,
  StatPeriodRange,
  Statistic,
  StatTrendRow,
  StatValue,
  statLabelVariants,
  statPeriodRangeVariants,
  statisticVariants,
};

export type {
  StatAlign,
  StatLabelSize,
  StatSentiment,
  StatSize,
  StatTrendDirection,
  StatUnitPosition,
};
