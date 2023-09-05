import { z } from 'zod';

export const habitatPropsFormSchema = z.object({
  data: z.object({ maxCoapplicants: z.number().int() }),
  preScreen: z.object({
    homeText: z.array(z.object({ text: z.string(), title: z.string() })),
  }),
  prePreScreen: z.object({
    prePreScreenTerms: z.array(
      z.object({ title: z.string(), body: z.string() })
    ),
    prePreScreenQuestions: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        label: z.string(),
        rejectionValue: z.enum(['Yes', 'No']),
        rejectionResultText: z.string(),
      })
    ),
    prePreScreenResultsText: z.object({
      Sorry: z.string(),
      Congratulations: z.string(),
    }),
    prePreScreenHomeText: z.array(
      z.object({ text: z.string(), title: z.string() })
    ),
    prePreScreenStatusPage: z.object({
      ACCEPTED: z.string(),
      PENDING: z.string(),
      REJECTED: z.string(),
    }),
  }),
});
