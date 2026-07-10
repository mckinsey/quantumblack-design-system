'use client';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { cn } from '@/lib/utils';

function Switch({
  className,
  size = 'default',
  ...props
}: SwitchPrimitive.Root.Props & {
  size?: 'sm' | 'default' | 'lg';
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        'peer group/switch relative inline-flex shrink-0 items-center rounded-full transition-all outline-none',
        "after:absolute after:-inset-x-3 after:-inset-y-2 after:content-['']",
        'border-stroke-secondary data-checked:border-stroke-primary-inverse border',
        'bg-fill-muted data-checked:bg-fill-active',
        'focus-visible:outline-stroke-status-focus focus-visible:border-stroke-active focus-visible:outline-[2px]',
        'data-checked:focus-visible:border-stroke-active-inverse data-checked:focus-visible:bg-fill-active',
        'data-disabled:border-stroke-tertiary data-disabled:data-checked:border-stroke-tertiary data-disabled:cursor-not-allowed',
        'data-disabled:data-checked:bg-fill-muted',
        'data-[size=sm]:h-3 data-[size=sm]:w-6 data-[size=sm]:border-[0.5px]',
        'data-[size=default]:h-4 data-[size=default]:w-8',
        'data-[size=lg]:h-5 data-[size=lg]:w-10',
        className,
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block rounded-full ring-0 transition-transform',
          'bg-fill-secondary data-checked:bg-fill-active-inverse',
          'group-data-[size=default]/switch:size-2.5 group-data-[size=lg]/switch:size-3.5 group-data-[size=sm]/switch:size-2',
          'group-data-[size=default]/switch:data-unchecked:translate-x-0.5 group-data-[size=lg]/switch:data-unchecked:translate-x-0.5 group-data-[size=sm]/switch:data-unchecked:translate-x-0.5',
          'group-data-[size=default]/switch:data-checked:translate-x-4.75 group-data-[size=lg]/switch:data-checked:translate-x-5.75 group-data-[size=sm]/switch:data-checked:translate-x-3.5',
          'data-disabled:bg-fill-disabled data-disabled:data-checked:bg-fill-disabled',
        )}
      />
      {size === 'lg' && (
        <span
          className={cn(
            'absolute top-1/2 right-1 block size-1 -translate-y-1/2 rounded-full',
            'border-stroke-secondary border-[0.5px]',
            'group-data-checked/switch:hidden',
            'group-focus-visible/switch:border-stroke-active',
            'group-data-disabled/switch:border-stroke-tertiary',
          )}
        />
      )}
    </SwitchPrimitive.Root>
  );
}

export { Switch };
