const { z } = require('zod');

export const searchableOptionSchema = z.object({
  id: z.union([z.string().min(1), z.number()]),
  label: z.string(),
});

const invalidZipCodeMessage =
  'Invalid Zip Code should be in the format 12345 or 12345-6789';

export const zipCodeSchema = z.union([
  z
    .string()
    .min(5, invalidZipCodeMessage)
    .max(5, invalidZipCodeMessage)
    .regex(/\b\d{5}\b/g, invalidZipCodeMessage),
  z
    .string()
    .min(10, invalidZipCodeMessage)
    .max(10, invalidZipCodeMessage)
    .regex(
      /\b\d{5}-\d{4}\b/g,
      'Invalid Zip Code should be in the format 12345 or 12345-6789'
    ),
]);
