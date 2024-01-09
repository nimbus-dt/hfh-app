import { z } from 'zod';

export const checklistSchema = z.record(z.enum(['Yes', 'No']));
