import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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

describe(`${componentName} — structure`, () => {
  it('renders trigger and content slots when open', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Help text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(
      document.querySelector('[data-slot="tooltip-trigger"]'),
    ).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
    expect(
      document.querySelector('[data-slot="tooltip-content"]'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-slot="tooltip-arrow"]'),
    ).toBeInTheDocument();
  });

  it('supports render on the trigger', () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger render={<Button variant="outline" />}>
            Trigger
          </TooltipTrigger>
          <TooltipContent>Help text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Help text');
  });

  it('applies side and align to TooltipContent', async () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side="bottom" align="center">
            Help text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );

    await waitFor(() => {
      const content = document.querySelector('[data-slot="tooltip-content"]');

      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-side', 'bottom');
      expect(content).toHaveAttribute('data-align', 'center');
    });
  });
});
