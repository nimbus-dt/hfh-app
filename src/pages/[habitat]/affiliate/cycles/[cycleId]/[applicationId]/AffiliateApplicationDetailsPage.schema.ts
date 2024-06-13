import { EditorState } from 'lexical';
import { ReviewStatus } from 'models';
import { z } from 'zod';

export const baseSchema = z.object({
  message: z.custom<EditorState>(),
});

export const decideSchema = baseSchema.extend({
  status: z.custom<keyof typeof ReviewStatus>(),
});

export type TDecideSchema = z.infer<typeof decideSchema>;
