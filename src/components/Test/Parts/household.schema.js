import { z } from 'zod';

export const memberSchema = z.object({
  fullName: z.string().min(1),
  birthDay: z.string(),
  sex: z.enum(['Male', 'Female', 'Other']),
  relationship: z.string().min(1),
  otherRelationship: z.string().min(1).optional(),
});
