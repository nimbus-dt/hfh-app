import { z } from 'zod';

export const writtenSchema = z.record(z.string().min(1));
