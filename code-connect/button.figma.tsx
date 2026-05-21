import figma from '@figma/code-connect/react';

import { Button } from '@/components/ui/button';
import { IconShell } from '@/components/ui/icon-shell';

figma.connect(Button, '<QBDS_BUTTON_TEXT>', {
  props: {
    variant: figma.enum('Type', {
      primary: 'default',
      'primary-accent': 'accent',
      'secondary-filled': 'secondary',
      'secondary-outline': 'outline',
      ghost: 'ghost',
    }),
    size: figma.enum('Size', {
      '2xm': 'xxs',
      xsm: 'xs',
      sm: 'sm',
      reg: 'default',
      lg: 'lg',
    }),
    disabled: figma.enum('State', {
      enabled: false,
      disabled: true,
      loading: true,
      hover: false,
      focused: false,
      pressed: false,
      'dropdown-open': false,
      'toggle-on': false,
    }),
    labelContent: figma.boolean('CTA-label', {
      true: figma.string('CTA-Label'),
      false: figma.string('Label'),
    }),
    leading: figma.boolean('Leading-Icon', {
      true: figma.children('Leading*'),
      false: undefined,
    }),
    trailing: figma.boolean('Trailing-Icon', {
      true: figma.children('Trailing*'),
      false: undefined,
    }),
  },
  example: ({ variant, size, disabled, labelContent, leading, trailing }) => (
    <Button disabled={disabled} size={size} variant={variant}>
      {leading}
      {labelContent}
      {trailing}
    </Button>
  ),
});

figma.connect(Button, '<QBDS_BUTTON_ICON>', {
  props: {
    variant: figma.enum('Type', {
      primary: 'default',
      'primary-accent': 'accent',
      'secondary-filled': 'secondary',
      'secondary-outline': 'outline',
      ghost: 'ghost',
    }),
    size: figma.enum('Size', {
      '2xsm': 'icon-xs',
      sm: 'icon-sm',
      reg: 'icon',
      lg: 'icon-lg',
    }),
    iconSize: figma.enum('Size', {
      '2xsm': 'sm',
      sm: 'sm',
      reg: 'sm',
      lg: 'default',
    }),
    disabled: figma.enum('State', {
      enabled: false,
      disabled: true,
      loading: true,
      hover: false,
      focused: false,
      pressed: false,
      'toggle-on': false,
    }),
    className: figma.enum('Shape', {
      square: '',
      circle: 'rounded-full',
    }),
    icon: figma.instance('Icon'),
  },
  example: ({ variant, size, iconSize, disabled, className, icon }) => (
    <Button
      className={className}
      disabled={disabled}
      size={size}
      variant={variant}>
      <IconShell size={iconSize}>{icon}</IconShell>
    </Button>
  ),
});
