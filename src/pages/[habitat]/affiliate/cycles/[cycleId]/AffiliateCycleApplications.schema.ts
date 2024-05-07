import { ReviewStatus, ApplicationTypes } from 'models';
import { z } from 'zod';

export const applicationsFilterSchema = z.object({
  dateSubmitted: z.string().nullable().optional(),
  type: z
    .enum([ApplicationTypes.ONLINE, ApplicationTypes.PAPER])
    .nullable()
    .optional(),
  reviewStatus: z
    .enum([
      ReviewStatus.ACCEPTED,
      ReviewStatus.PENDING,
      ReviewStatus.DENIED,
      ReviewStatus.RETURNED,
    ])
    .nullable()
    .optional(),
});

export type TApplicationsFilter = z.infer<typeof applicationsFilterSchema>;
