import { z } from 'zod';

const phoneSchema = z
  .string()
  .regex(
    /\(\d{3}\)\s\d{3}-\d{4}/i,
    'Invalid phone number, must be in format (000) 000-0000'
  );

export const unemployedSchema = z.object({
  currentlyUnemployed: z.enum(['Yes', 'No']),
});

const employmentSchema = z.object({
  employerName: z.string().min(1),
  employerAddress: z.string().min(1),
  startDate: z.string(),
  businessType: z.string().min(1),
  businessPhone: phoneSchema,
});

export const currentEmploymentSchema = employmentSchema.extend({
  firstJob: z.string(),
});

export const previousEmploymentSchema = employmentSchema.extend({
  endDate: z.string(),
});
