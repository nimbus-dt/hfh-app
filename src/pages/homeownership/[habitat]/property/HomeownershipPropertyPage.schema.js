import { moneyNumberSchema, yesNoSchema } from 'utils/schemas';
import { z } from 'zod';

export const ownRealStateSchema = z.object({
  ownRealState: yesNoSchema,
});

export const mortagePaymentSchema = z.object({
  montlyMortage: moneyNumberSchema,
  unpaidBalance: moneyNumberSchema,
});

export const rentPaymentSchema = z.object({
  montlyRent: moneyNumberSchema,
});

export const landOwnershipSchema = z.object({
  ownLand: yesNoSchema,
  montlyPayment: moneyNumberSchema.optional(),
});
