import figma from '@figma/code-connect/react';

import { Button } from '@/components/ui/button';

figma.connect(Button, '<QBDS_BUTTON_TEXT>', {
  props: {
    variant: figma.enum('type', {
      primary: 'default',
      'primary-accent': 'accent',
      'secondary-filled': 'secondary',
      'secondary-outline': 'outline',
      ghost: 'ghost',
    }),
    size: figma.enum('size', {
      xxsm: 'xxs',
      xsm: 'xs',
      sm: 'sm',
      reg: 'default',
      lg: 'lg',
    }),
    disabled: figma.enum('state', {
      enabled: false,
      hover: false,
      focused: false,
      pressed: false,
      disabled: true,
      loading: false,
      'toggle-on': false,
      'dropdown-open': false,
    }),
    label: figma.string('label'),
    leading: figma.boolean('showLeadingIcon', {
      true: figma.children('Leading-Icon'),
      false: undefined,
    }),
    trailing: figma.boolean('showTrailingIcon', {
      true: figma.children('Trailing-Icon'),
      false: undefined,
    }),
  },
  example: ({ variant, size, disabled, label, leading, trailing }) => (
    <Button disabled={disabled} size={size} variant={variant}>
      {leading}
      {label}
      {trailing}
    </Button>
  ),
});

figma.connect(Button, '<QBDS_BUTTON_ICON>', {
  props: {
    variant: figma.enum('type', {
      primary: 'default',
      'primary-accent': 'accent',
      'secondary-filled': 'secondary',
      'secondary-outline': 'outline',
      ghost: 'ghost',
    }),
    size: figma.enum('size', {
      xxsm: 'icon-xs',
      sm: 'icon-sm',
      reg: 'icon',
      lg: 'icon-lg',
    }),
    disabled: figma.enum('state', {
      enabled: false,
      hover: false,
      focused: false,
      pressed: false,
      disabled: true,
      loading: false,
      'toggle-on': false,
    }),
    className: figma.enum('shape', {
      square: undefined,
      circle: 'rounded-full',
    }),
    icon: figma.children('IconShell'),
  },
  example: ({ variant, size, disabled, className, icon }) => (
    <Button
      className={className}
      disabled={disabled}
      size={size}
      variant={variant}>
      {icon}
    </Button>
  ),
});
