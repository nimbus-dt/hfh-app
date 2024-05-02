import { SubmissionStatus, ApplicationTypes } from 'models';
import { z } from 'zod';

export const applicationsFilterSchema = z.object({
  dateSubmitted: z.string().nullable().optional(),
  type: z
    .enum([ApplicationTypes.ONLINE, ApplicationTypes.PAPER])
    .nullable()
    .optional(),
  submissionStatus: z
    .enum([
      SubmissionStatus.ACCEPTED,
      SubmissionStatus.PENDING,
      SubmissionStatus.REJECTED,
      SubmissionStatus.RETURNED,
    ])
    .nullable()
    .optional(),
});

export type TApplicationsFilter = z.infer<typeof applicationsFilterSchema>;
