import { z } from 'zod';

export type PlaygroundNode = {
  type: string;
  props?: Record<string, unknown>;
  children?: PlaygroundChild[];
};

export type PlaygroundChild = string | PlaygroundNode;

export type PlaygroundSpec = {
  root: PlaygroundNode;
  summary?: string;
};

export const playgroundNodeSchema: z.ZodType<PlaygroundNode> = z.lazy(() =>
  z.object({
    type: z.string().min(1),
    props: z.record(z.unknown()).optional(),
    children: z.array(z.union([z.string(), playgroundNodeSchema])).optional(),
  }),
);

export const playgroundSpecSchema = z.object({
  root: playgroundNodeSchema,
  summary: z.string().optional(),
});
