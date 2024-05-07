import { EditorState } from 'lexical';
import { ReviewStatus } from 'models';
import { z } from 'zod';

export const returnSchema = z.object({
  message: z.custom<EditorState>(),
});

export const decideSchema = returnSchema.extend({
  status: z.custom<keyof typeof ReviewStatus>(),
});

export type TReturnSchema = z.infer<typeof returnSchema>;

export type TDecideSchema = z.infer<typeof decideSchema>;
