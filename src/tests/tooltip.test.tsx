import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const componentName = 'tooltip';

afterEach(() => {
  cleanup();
});

describe(`${componentName} — all examples render`, () => {
  it.each(Object.entries(exampleComponentMaps[componentName]))(
    'renders "%s" without crashing',
    (_, Example) => {
      expect(() =>
        render(
          <Renderer>
            <Example />
          </Renderer>,
        ),
      ).not.toThrow();
    },
  );
});

describe(`${componentName} — compound API`, () => {
  it('renders trigger + content when open', () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Help text</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
  });

  it('does not set data-popup-open on trigger when open', () => {
    render(
      <Tooltip open>
        <TooltipTrigger render={<Button variant="outline" />}>
          Trigger
        </TooltipTrigger>
        <TooltipContent>Help text</TooltipContent>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button');

    expect(trigger).toHaveTextContent('Trigger');
    expect(trigger).not.toHaveAttribute('data-popup-open');
  });

  it('forwards delayDuration to provider', () => {
    render(
      <Tooltip open delayDuration={200}>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent>Help text</TooltipContent>
      </Tooltip>,
    );

    expect(screen.getByText('Trigger')).toBeInTheDocument();
  });

  it('applies side and align to TooltipContent', async () => {
    render(
      <Tooltip open>
        <TooltipTrigger>Trigger</TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          Help text
        </TooltipContent>
      </Tooltip>,
    );

    await waitFor(() => {
      const content = document.querySelector('[data-slot="tooltip-content"]');

      expect(content).toHaveAttribute('data-side', 'bottom');
      expect(content).toHaveAttribute('data-align', 'center');
    });
  });
});
