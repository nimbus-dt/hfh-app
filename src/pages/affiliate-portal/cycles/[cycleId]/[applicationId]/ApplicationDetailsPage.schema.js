import { z } from 'zod';

export const returnSchema = z.object({
  message: z.any(),
});

export const decideSchema = returnSchema.extend({ status: z.string().min(1) });
