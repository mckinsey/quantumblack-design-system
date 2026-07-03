import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import { exampleComponentMaps } from '@/app/demo/[name]/index';
import { Renderer } from '@/app/demo/[name]/renderer';
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
