import { describe, expect, it } from 'vitest';

import { parsePlaygroundSpec } from '@/app/playground/ai/parse-playground-spec';

describe('parsePlaygroundSpec', () => {
  it('parses raw JSON', () => {
    const spec = parsePlaygroundSpec(
      '{"summary":"Sign up","root":{"type":"Card","children":["Hello"]}}',
    );
    expect(spec.summary).toBe('Sign up');
    expect(spec.root.type).toBe('Card');
  });

  it('extracts JSON from fenced markdown', () => {
    const spec = parsePlaygroundSpec(
      'Here you go:\n```json\n{"root":{"type":"Button","children":["Go"]}}\n```',
    );
    expect(spec.root.type).toBe('Button');
  });
});
