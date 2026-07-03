import { cleanup, render } from '@testing-library/react';
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
    expect(() =>
      render(
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent>Help text</TooltipContent>
        </Tooltip>,
      ),
    ).not.toThrow();
  });

  it.each([
    { side: 'top', align: 'start' },
    { side: 'bottom', align: 'center' },
    { side: 'left', align: 'end' },
    { side: 'right', align: 'center' },
  ] as const)('accepts side="$side" align="$align"', ({ side, align }) => {
    expect(() =>
      render(
        <Tooltip open>
          <TooltipTrigger>Trigger</TooltipTrigger>
          <TooltipContent side={side} align={align}>
            Help text
          </TooltipContent>
        </Tooltip>,
      ),
    ).not.toThrow();
  });
});
