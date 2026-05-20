import figma from '@figma/code-connect/react';

import { Badge, NumericBadge, StatusBadge } from '@/components/ui/badge';

figma.connect(NumericBadge, '<QBDS_BADGE_NUMERIC>', {
  props: {
    variant: figma.enum('type', {
      primary: 'primary',
      secondary: 'secondary',
      accent: 'accent',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'default',
      lg: 'lg',
    }),
    outline: figma.enum('outline', {
      true: true,
      false: false,
    }),
    counterLabel: figma.string('counterLabel'),
  },
  example: ({ variant, size, outline, counterLabel }) => (
    <NumericBadge outline={outline} size={size} variant={variant}>
      {counterLabel}
    </NumericBadge>
  ),
});

figma.connect(Badge, '<QBDS_BADGE_ICON_LABEL>', {
  props: {
    variant: figma.enum('type', {
      'high-emphasis': 'high-emphasis',
      'brand-accent': 'brand-accent',
      alternative: 'alternative',
      error: 'error',
      warning: 'warning',
      success: 'success',
    }),
    format: figma.enum('format', {
      rec: 'rect',
      pill: 'pill',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'default',
    }),
    outline: figma.enum('outline', {
      true: true,
      false: false,
    }),
    icon: figma.boolean('showLeadingIcon', {
      true: figma.children('Leading-Icon*'),
      false: undefined,
    }),
    label: figma.string('label'),
  },
  example: ({ variant, format, size, outline, icon, label }) => (
    <Badge
      format={format}
      outline={outline}
      size={size}
      variant={variant}
      withIcon={true}>
      {icon}
      {label}
    </Badge>
  ),
});

figma.connect(Badge, '<QBDS_BADGE_DOT_LABEL>', {
  props: {
    variant: figma.enum('type', {
      'high-emphasis': 'high-emphasis',
      'brand-accent': 'brand-accent',
      alternative: 'alternative',
      error: 'error',
      warning: 'warning',
      success: 'success',
    }),
    format: figma.enum('format', {
      rec: 'rect',
      pill: 'pill',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'default',
      lg: 'lg',
    }),
    dot: figma.boolean('showLeadingIcon', {
      true: figma.children('Leading-Icon*'),
      false: undefined,
    }),
    label: figma.textContent('value'),
  },
  example: ({ variant, format, size, dot, label }) => (
    <Badge
      format={format}
      outline={true}
      size={size}
      variant={variant}
      withDot={true}>
      {dot}
      {label}
    </Badge>
  ),
});

figma.connect(Badge, '<QBDS_BADGE_LABEL_ONLY>', {
  props: {
    variant: figma.enum('type', {
      'high-emphasis': 'high-emphasis',
      'brand-accent': 'brand-accent',
      neutral: 'alternative',
      error: 'error',
      warning: 'warning',
      success: 'success',
    }),
    format: figma.enum('format', {
      rec: 'rect',
      pill: 'pill',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'default',
    }),
    outline: figma.enum('outline', {
      true: true,
      false: false,
    }),
    label: figma.string('label'),
  },
  example: ({ variant, format, size, outline, label }) => (
    <Badge format={format} outline={outline} size={size} variant={variant}>
      {label}
    </Badge>
  ),
});

figma.connect(StatusBadge, '<QBDS_BADGE_HINT_DOT>', {
  props: {
    variant: figma.enum('status', {
      neutral: 'neutral',
      'neutral-brand': 'neutral-brand',
      error: 'error',
      warning: 'warning',
      success: 'success',
    }),
    size: figma.enum('size', {
      sm: 'sm',
      reg: 'default',
      lg: 'lg',
      xlg: 'xl',
    }),
    outline: figma.enum('outlined', {
      true: true,
      false: false,
    }),
  },
  example: ({ variant, size, outline }) => (
    <StatusBadge outline={outline} size={size} variant={variant} />
  ),
});
