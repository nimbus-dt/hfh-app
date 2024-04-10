import { z } from 'zod';

export const returnSchema = z.object({
  message: z.string().min(1),
});

export const decideSchema = returnSchema.extend({ status: z.string().min(1) });
