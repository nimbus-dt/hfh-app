import { z } from 'zod';
import { searchableOptionSchema } from 'utils/schemas';
import states from '../../../../assets/jsons/states.json';

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
  employerStreet: z.string().min(1),
  employerState: z.enum(states.map((state) => state.abbreviation)),
  employerCity: z.object({
    query: z.string().optional(),
    selectedCity: searchableOptionSchema,
  }),
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
