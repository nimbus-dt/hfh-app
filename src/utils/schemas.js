const { z } = require('zod');

export const searchableOptionSchema = z.object({
  id: z.union([z.string().min(1), z.number()]),
  label: z.string(),
});

export const zipCodeSchema = z.union([
  z
    .string()
    .regex(
      /\b\d{5}\b/g,
      'Invalid Zip Code should be in the format 12345 or 12345-6789'
    ),
  z
    .string()
    .regex(
      /\b\d{5}-\d{4}\b/g,
      'Invalid Zip Code should be in the format 12345 or 12345-6789'
    ),
]);
