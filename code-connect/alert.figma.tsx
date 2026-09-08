import figma from '@figma/code-connect/react';

import {
  Alert,
  AlertClose,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@/components/ui/alert';
import { Icon } from '@/components/ui/icon';

figma.connect(Alert, '<QBDS_ALERT_BANNER>', {
  props: {
    layout: figma.enum('layout', {
      modal: 'modal',
      long: 'long',
    }),
    title: figma.boolean('hasTitle', {
      true: <AlertTitle>{figma.string('title')}</AlertTitle>,
      false: undefined,
    }),
    description: figma.string('description'),
    icon: figma.boolean('hasAlertIcon', {
      true: (
        <AlertIcon>
          <Icon icon="info" />
        </AlertIcon>
      ),
      false: undefined,
    }),
    actions: figma.enum('type', {
      'alert-dialog': figma.children('Button Group*'),
      alert: undefined,
    }),
  },
  example: ({ layout, title, description, icon, actions }) => (
    <Alert layout={layout}>
      {icon}
      <AlertContent>
        {title}
        <AlertDescription>{description}</AlertDescription>
        {actions}
      </AlertContent>
      <AlertClose />
    </Alert>
  ),
});
