const { z } = require('zod');

export const searchableOptionSchema = z.object({
  id: z.union([z.string().min(1), z.number()]),
  label: z.string(),
});
