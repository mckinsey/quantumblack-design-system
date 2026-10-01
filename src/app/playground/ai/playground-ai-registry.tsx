import * as React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import {
  type PlaygroundChild,
  type PlaygroundNode,
  type PlaygroundSpec,
} from './playground-ai-types';

const registry: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FieldGroup,
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSet,
  FieldLegend,
  Input,
  Textarea,
  Checkbox,
  Button,
  Label,
  Separator,
  Alert,
  AlertTitle,
  AlertDescription,
  Badge,
};

function renderChild(child: PlaygroundChild, key: number): React.ReactNode {
  if (typeof child === 'string') {
    return child;
  }

  return <PlaygroundAiNode key={key} node={child} />;
}

function PlaygroundAiNode({ node }: { node: PlaygroundNode }) {
  const Component = registry[node.type];

  if (!Component) {
    return (
      <div
        className="paragraph-small text-status-error rounded-md border border-dashed p-2"
        data-slot="playground-ai-unknown">
        Unknown component: {node.type}
      </div>
    );
  }

  const props = { ...(node.props ?? {}) } as Record<string, unknown>;
  const children = node.children?.map((child, index) =>
    renderChild(child, index),
  );

  return <Component {...props}>{children}</Component>;
}

export function PlaygroundAiPreview({ spec }: { spec: PlaygroundSpec }) {
  return (
    <div
      className="flex flex-col gap-4"
      data-slot="playground-ai-preview"
      aria-label={spec.summary ?? 'Generated UI preview'}>
      {spec.summary ? (
        <p className="paragraph-small text-fg-secondary">{spec.summary}</p>
      ) : null}
      <PlaygroundAiNode node={spec.root} />
    </div>
  );
}
