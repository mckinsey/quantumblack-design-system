// @ts-nocheck
// Code Connect mapping for Badge component variants.
// Figma: QBDS-v2.0.0, "❖ ⎯ Badges" page.
//
// The QBDS file ships three pill-shaped Badge component sets, all mapping
// to the shared <Badge> component (format='pill'):
//   - Badge/Icon+Label  -> <Badge withIcon> with a leading icon child
//   - Badge/Label-Only  -> <Badge> with text child only
//   - Badge/Dot+Label   -> <Badge withDot> with a <StatusBadge> as the dot
//
// Variant mapping (shared):
//   Figma size:    sm  -> 'sm'
//                  reg -> 'default'
//                  lg  -> 'lg'             (Dot+Label only)
//
//   Figma type:    high-emphasis / brand-accent / alternative /
//                  error / warning / success -> 1:1 with code <Badge> variants
//
//   Figma outline: 'true' / 'false' (string variant) -> boolean
//                  (Dot+Label has no outline axis; rendered as outlined always)
import figma from '@figma/code-connect';

import { Badge, StatusBadge } from './badge';

// --- Badge/Icon+Label ----------------------------------------------------
figma.connect(
  Badge,
  'https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr?node-id=36781-14394',
  {
    props: {
      variant: figma.enum('type', {
        'high-emphasis': 'high-emphasis',
        'brand-accent': 'brand-accent',
        alternative: 'alternative',
        error: 'error',
        warning: 'warning',
        success: 'success',
      }),
      size: figma.enum('size', {
        sm: 'sm',
        reg: 'default',
      }),
      outline: figma.enum('outline', {
        true: true,
        false: false,
      }),
      showLeadingIcon: figma.boolean('showLeadingIcon'),
      icon: figma.boolean('showLeadingIcon', {
        true: figma.instance('Leading-Icon'),
        false: undefined,
      }),
      label: figma.string('label'),
    },
    example: ({ variant, size, outline, showLeadingIcon, icon, label }) => (
      <Badge
        variant={variant}
        size={size}
        outline={outline}
        format="pill"
        withIcon={showLeadingIcon}>
        {icon}
        {label}
      </Badge>
    ),
  },
);

// --- Badge/Label-Only ----------------------------------------------------
figma.connect(
  Badge,
  'https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr?node-id=37894-59481',
  {
    props: {
      variant: figma.enum('type', {
        'high-emphasis': 'high-emphasis',
        'brand-accent': 'brand-accent',
        alternative: 'alternative',
        error: 'error',
        warning: 'warning',
        success: 'success',
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
    example: ({ variant, size, outline, label }) => (
      <Badge variant={variant} size={size} outline={outline} format="pill">
        {label}
      </Badge>
    ),
  },
);

// --- Badge/Dot+Label -----------------------------------------------------
// This set has no `outline` axis (always rendered as outlined), so `outline`
// is hard-coded `true` in the example. The leading dot is rendered with
// <StatusBadge>; its `variant` is derived from the same Figma `type` axis
// using semantic status tokens (high-emphasis/alternative -> neutral,
// brand-accent -> neutral-brand).
figma.connect(
  Badge,
  'https://www.figma.com/design/iuMWqCsIohoKAUB0tBS0xr?node-id=37926-67507',
  {
    props: {
      variant: figma.enum('type', {
        'high-emphasis': 'high-emphasis',
        'brand-accent': 'brand-accent',
        alternative: 'alternative',
        error: 'error',
        warning: 'warning',
        success: 'success',
      }),
      dot: figma.boolean('showLeadingIcon', {
        true: figma.enum('type', {
          'high-emphasis': <StatusBadge variant="neutral" size="sm" />,
          'brand-accent': <StatusBadge variant="neutral-brand" size="sm" />,
          alternative: <StatusBadge variant="neutral" size="sm" />,
          error: <StatusBadge variant="error" size="sm" />,
          warning: <StatusBadge variant="warning" size="sm" />,
          success: <StatusBadge variant="success" size="sm" />,
        }),
        false: undefined,
      }),
      size: figma.enum('size', {
        sm: 'sm',
        reg: 'default',
        lg: 'lg',
      }),
      showLeadingIcon: figma.boolean('showLeadingIcon'),
      label: figma.string('label'),
    },
    example: ({ variant, size, showLeadingIcon, dot, label }) => (
      <Badge
        variant={variant}
        size={size}
        outline
        format="pill"
        withDot={showLeadingIcon}>
        {dot}
        {label}
      </Badge>
    ),
  },
);
