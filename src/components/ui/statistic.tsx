import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { Icon } from '@/components/ui/icon';
import { IconShell } from '@/components/ui/icon-shell';
import { cn } from '@/lib/utils';

type StatisticSize = 'xsm' | 'sm' | 'default' | 'lg' | 'xl';
type StatisticAlign = 'start' | 'end';
type StatisticUnitPosition = 'inline' | 'stacked';
type StatisticSentiment = 'positive' | 'negative' | 'neutral';
type StatisticTrendDirection = 'up' | 'down' | 'none';

type StatisticContextValue = {
  size: StatisticSize;
  align: StatisticAlign;
  unitPosition: StatisticUnitPosition;
};

const StatisticContext = React.createContext<StatisticContextValue>({
  size: 'default',
  align: 'start',
  unitPosition: 'inline',
});

function useStatistic() {
  return React.useContext(StatisticContext);
}

const statisticVariants = cva('group/statistic flex w-fit flex-col gap-2', {
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

const labelClass: Record<StatisticSize, string> = {
  xsm: 'label-small-primary text-fg-secondary',
  sm: 'label-regular-primary text-fg-secondary',
  default: 'label-regular-primary text-fg-secondary',
  lg: 'label-large-primary text-fg-secondary',
  xl: 'label-large-primary text-fg-secondary',
};

const valueClass: Record<StatisticSize, string> = {
  xsm: 'text-2xl leading-8 font-normal tracking-[-0.048px] text-fg-primary',
  sm: 'text-3xl leading-10 font-normal tracking-[-0.064px] text-fg-primary',
  default: 'display-d3-regular text-fg-primary',
  lg: 'display-d2-regular text-fg-primary',
  xl: 'display-d1-regular text-fg-primary',
};

const unitClass: Record<StatisticSize, string> = {
  xsm: 'paragraph-large-primary text-fg-secondary',
  sm: 'paragraph-large-primary text-fg-secondary',
  default: 'paragraph-large-primary text-fg-secondary',
  lg: 'text-2xl leading-8 font-normal tracking-[-0.048px] text-fg-secondary',
  xl: 'text-xl leading-7 font-normal tracking-[-0.04px] text-fg-secondary',
};

const trendValueClass: Record<StatisticSize, string> = {
  xsm: 'paragraph-regular-emphasised-600',
  sm: 'paragraph-regular-emphasised-600',
  default: 'paragraph-large-emphasised',
  lg: 'headings-h4-semibold',
  xl: 'headings-h4-semibold',
};

const trendPctClass: Record<StatisticSize, string> = {
  xsm: 'paragraph-regular-emphasised-600',
  sm: 'paragraph-regular-emphasised-600',
  default: 'paragraph-large-primary',
  lg: 'headings-h4-regular',
  xl: 'headings-h4-regular',
};

const trendContextClass: Record<StatisticSize, string> = {
  xsm: 'paragraph-small-primary text-fg-tertiary',
  sm: 'paragraph-small-primary text-fg-tertiary',
  default: 'paragraph-regular-primary text-fg-tertiary',
  lg: 'paragraph-large-primary text-fg-tertiary',
  xl: 'paragraph-large-primary text-fg-tertiary',
};

const trendMarkIconSize: Record<StatisticSize, 'sm' | 'default'> = {
  xsm: 'sm',
  sm: 'sm',
  default: 'default',
  lg: 'default',
  xl: 'default',
};

const sentimentClass: Record<StatisticSentiment, string> = {
  positive: 'text-fg-trend-positive',
  negative: 'text-fg-trend-negative',
  neutral: 'text-fg-secondary',
};

const trendIcon: Record<Exclude<StatisticTrendDirection, 'none'>, string> = {
  up: 'arrow_circle_up',
  down: 'arrow_circle_down',
};

type StatisticProps = React.ComponentProps<'div'> &
  VariantProps<typeof statisticVariants> & {
    size?: StatisticSize;
    unitPosition?: StatisticUnitPosition;
  };

function Statistic({
  className,
  size = 'default',
  align: alignProp = 'start',
  unitPosition = 'inline',
  ...props
}: StatisticProps) {
  const align = alignProp ?? 'start';

  return (
    <StatisticContext.Provider value={{ size, align, unitPosition }}>
      <div
        data-slot="statistic"
        data-size={size}
        data-align={align}
        data-unit-position={unitPosition}
        className={cn(statisticVariants({ align }), className)}
        {...props}
      />
    </StatisticContext.Provider>
  );
}

function StatisticLabel({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { size, align } = useStatistic();

  return (
    <div
      data-slot="statistic-label"
      className={cn(
        'flex w-full items-center gap-1',
        align === 'end' && 'justify-end',
        className,
      )}
      {...props}>
      <div
        className={cn('flex min-w-0 items-center gap-0.5', labelClass[size])}>
        {children}
      </div>
    </div>
  );
}

function StatisticLabelTrailing({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="statistic-label-trailing"
      className={cn('inline-flex shrink-0 items-center', className)}
      {...props}
    />
  );
}

function StatisticContent({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const { align } = useStatistic();

  return (
    <div
      data-slot="statistic-content"
      className={cn(
        'flex w-full flex-col gap-1',
        align === 'end' && 'items-end',
        className,
      )}
      {...props}
    />
  );
}

function StatisticIcon({ className, ...props }: React.ComponentProps<'div'>) {
  const { align } = useStatistic();

  return (
    <div
      data-slot="statistic-icon"
      className={cn(
        'flex pb-1',
        align === 'end' ? 'justify-end' : 'justify-start',
        className,
      )}
      {...props}
    />
  );
}

function StatisticValue({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { align, unitPosition } = useStatistic();

  return (
    <div
      data-slot="statistic-value"
      className={cn(
        'flex gap-1',
        unitPosition === 'inline'
          ? cn('flex-row items-end', align === 'end' && 'justify-end')
          : cn('flex-col', align === 'end' && 'items-end'),
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function StatisticValueContent({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { size } = useStatistic();

  return (
    <span
      data-slot="statistic-value-content"
      className={cn(valueClass[size], className)}
      {...props}
    />
  );
}

function StatisticUnit({ className, ...props }: React.ComponentProps<'span'>) {
  const { size } = useStatistic();

  return (
    <span
      data-slot="statistic-unit"
      className={cn(unitClass[size], className)}
      {...props}
    />
  );
}

function StatisticTrend({
  className,
  sentiment = 'positive',
  ...props
}: React.ComponentProps<'div'> & { sentiment?: StatisticSentiment }) {
  const { align } = useStatistic();

  return (
    <StatisticTrendContext.Provider value={{ sentiment }}>
      <div
        data-slot="statistic-trend"
        data-sentiment={sentiment}
        className={cn(
          'flex w-full items-center gap-1',
          align === 'end' && 'justify-end',
          className,
        )}
        {...props}
      />
    </StatisticTrendContext.Provider>
  );
}

const StatisticTrendContext = React.createContext<{
  sentiment: StatisticSentiment;
}>({ sentiment: 'positive' });

function useStatisticTrend() {
  return React.useContext(StatisticTrendContext);
}

function StatisticTrendMark({
  className,
  direction = 'up',
  ...props
}: React.ComponentProps<'div'> & { direction?: StatisticTrendDirection }) {
  const { size } = useStatistic();
  const { sentiment } = useStatisticTrend();

  if (direction === 'none' || sentiment === 'neutral') {
    return null;
  }

  return (
    <div
      data-slot="statistic-trend-mark"
      data-direction={direction}
      className={cn('inline-flex shrink-0 items-center', className)}
      {...props}>
      <IconShell
        size={trendMarkIconSize[size]}
        type="custom"
        className={sentimentClass[sentiment]}>
        <Icon icon={trendIcon[direction]} />
      </IconShell>
    </div>
  );
}

function StatisticTrendValue({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const { sentiment } = useStatisticTrend();

  return (
    <div
      data-slot="statistic-trend-value"
      className={cn(
        'inline-flex items-center gap-1',
        sentimentClass[sentiment],
        className,
      )}
      {...props}>
      {children}
    </div>
  );
}

function StatisticTrendDelta({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { size } = useStatistic();

  return (
    <span
      data-slot="statistic-trend-delta"
      className={cn(trendValueClass[size], className)}
      {...props}
    />
  );
}

function StatisticTrendPercentage({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { size } = useStatistic();

  return (
    <span
      data-slot="statistic-trend-percentage"
      className={cn(trendPctClass[size], className)}
      {...props}
    />
  );
}

function StatisticTrendContextText({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  const { size } = useStatistic();

  return (
    <span
      data-slot="statistic-trend-context"
      className={cn(trendContextClass[size], className)}
      {...props}
    />
  );
}

export {
  Statistic,
  StatisticContent,
  StatisticIcon,
  StatisticLabel,
  StatisticLabelTrailing,
  StatisticTrend,
  StatisticTrendContextText,
  StatisticTrendDelta,
  StatisticTrendMark,
  StatisticTrendPercentage,
  StatisticTrendValue,
  StatisticUnit,
  StatisticValue,
  StatisticValueContent,
  statisticVariants,
};

export type {
  StatisticAlign,
  StatisticProps,
  StatisticSentiment,
  StatisticSize,
  StatisticTrendDirection,
  StatisticUnitPosition,
};
