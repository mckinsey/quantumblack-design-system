import {
  type PlaygroundSpec,
  playgroundSpecSchema,
} from './playground-ai-types';

function extractJsonObject(text: string): string {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    return fenced[1].trim();
  }

  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model output.');
  }

  return text.slice(start, end + 1);
}

export function parsePlaygroundSpec(raw: string): PlaygroundSpec {
  const json = extractJsonObject(raw.trim());
  const parsed = JSON.parse(json) as unknown;
  return playgroundSpecSchema.parse(parsed);
}
