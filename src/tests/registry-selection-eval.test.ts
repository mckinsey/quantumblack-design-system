/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest';

import {
  loadRegistryCatalog,
  loadSelectionCases,
  scoreCase,
} from '@/lib/registry-selection-eval';

describe('registry-selection-eval', () => {
  it('loads catalog with ui and example items', () => {
    const catalog = loadRegistryCatalog();
    const names = new Set(catalog.map(i => i.name));
    expect(names.has('button')).toBe(true);
    expect(names.has('form')).toBe(true);
    expect(names.has('date-picker')).toBe(true);
  });

  it('scores expected and forbidden installs', () => {
    const pass = scoreCase(
      {
        id: 'x',
        prompt: 'p',
        expect: ['button'],
        expectPrimary: 'button',
      },
      { install: ['button'] },
    );
    expect(pass.ok).toBe(true);

    const fail = scoreCase(
      {
        id: 'y',
        prompt: 'p',
        expect: ['date-picker'],
        forbid: ['calendar'],
      },
      { install: ['calendar'] },
    );
    expect(fail.ok).toBe(false);
  });

  it('has unique case ids', () => {
    const cases = loadSelectionCases();
    const ids = cases.map(c => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
