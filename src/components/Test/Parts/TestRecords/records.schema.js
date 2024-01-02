import { z } from 'zod';

export const recordsSchema = z.record(z.array(z.instanceof(File)));
