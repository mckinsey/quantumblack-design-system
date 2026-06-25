import figma from '@figma/code-connect/react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NumericBadge, StatusBadge } from '@/components/ui/badge';

figma.connect(Avatar, '<QBDS_AVATAR>', {
  props: {
    size: figma.enum('size', {
      'xxs-20': 'xxs',
      'xsm-24': 'xs',
      'sm-28': 'sm',
      'reg-36': 'default',
      'lg-48': 'lg',
      'xlg-64': 'xl',
    }),
    disabled: figma.enum('state', {
      enabled: false,
      hover: false,
      focused: false,
      pressed: false,
      disabled: true,
    }),

    // The following are Figma component properties with no matching prop on the
    // React `Avatar`. Instead of primitive booleans, each maps to a piece of
    // layout (a sub-component) so Code Connect renders the right composition.

    // showPhoto -> the <AvatarImage> child (src is filled in by the consumer).
    photo: figma.boolean('showPhoto', {
      true: <AvatarImage src="" />,
      false: undefined,
    }),

    // showUserInitials gates the fallback text. When off, both Figma `Label`
    // layers are hidden, so no fallback text is rendered.
    fallbackText: figma.boolean('showUserInitials', {
      true: figma.string('userInitials'),
      false: undefined,
    }),

    // showCounterTop -> the notification <NumericBadge>, positioned top-right.
    counter: figma.boolean('showCounterTop', {
      true: (
        <NumericBadge
          variant="primary"
          className="absolute -top-1 -right-1 font-mono tabular-nums">
          9
        </NumericBadge>
      ),
      false: undefined,
    }),

    // showStatus -> the online <StatusBadge>, positioned bottom-right.
    status: figma.boolean('showStatus', {
      true: (
        <StatusBadge
          variant="success"
          className="absolute -right-0.5 -bottom-0.5"
        />
      ),
      false: undefined,
    }),
  },
  example: props => (
    <div className="relative w-fit">
      <Avatar size={props.size} disabled={props.disabled}>
        {props.photo}
        <AvatarFallback>{props.fallbackText}</AvatarFallback>
      </Avatar>
      {props.counter}
      {props.status}
    </div>
  ),
});
