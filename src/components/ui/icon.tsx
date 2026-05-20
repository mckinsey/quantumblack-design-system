import * as React from 'react';

import { cn } from '@/lib/utils';

export type IconSize = 'sm' | 'default' | 'lg';

export const IconSizeContext = React.createContext<IconSize | undefined>(
  undefined,
);

// QBDS optical-size contract: 20dp@400 → sm, 24dp@300 → default, 40dp@300 → lg.
const SIZE_MAP: Record<
  IconSize,
  { fontSize: number; weight: number; opticalSize: number }
> = {
  sm: { fontSize: 16, weight: 400, opticalSize: 20 },
  default: { fontSize: 24, weight: 300, opticalSize: 24 },
  lg: { fontSize: 32, weight: 300, opticalSize: 40 },
};

function Icon({
  icon,
  size: sizeProp,
  className,
  style,
  ...props
}: React.ComponentProps<'span'> & {
  icon: string;
  size?: IconSize;
}) {
  const sizeFromShell = React.useContext(IconSizeContext);
  const size = sizeProp ?? sizeFromShell ?? 'default';
  const { fontSize, weight, opticalSize } = SIZE_MAP[size];

  return (
    <span
      data-slot="icon-glyph"
      aria-hidden
      className={cn(
        'material-symbols-sharp inline-block leading-none',
        className,
      )}
      style={{
        fontSize,
        fontVariationSettings: `'FILL' 0, 'wght' ${weight}, 'opsz' ${opticalSize}`,
        ...style,
      }}
      {...props}>
      {icon}
    </span>
  );
}

export { Icon, SIZE_MAP };
