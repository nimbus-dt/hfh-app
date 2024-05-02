import { z } from 'zod';

export const newPaperApplicationSchema = z.object({
  name: z.string().min(1),
  submittedDate: z.string().min(1),
  reviewStatus: z.string(),
  application: z.array(z.instanceof(File)),
});
