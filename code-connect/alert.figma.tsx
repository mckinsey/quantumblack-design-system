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
    layout: figma.enum('Layout', {
      Modal: 'modal',
      long: 'long',
    }),
    title: figma.boolean('Alert-Title', {
      true: <AlertTitle>{figma.string('Title')}</AlertTitle>,
      false: undefined,
    }),
    description: figma.string('Description'),
    icon: figma.boolean('Show Alert-Icon', {
      true: (
        <AlertIcon>
          <Icon icon="info" />
        </AlertIcon>
      ),
      false: undefined,
    }),
    actions: figma.enum('Type', {
      'Alert-dialog': figma.children('Button Group*'),
      Alert: undefined,
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
