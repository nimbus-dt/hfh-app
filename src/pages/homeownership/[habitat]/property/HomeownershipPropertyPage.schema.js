import { moneyNumberSchema, yesNoSchema } from 'utils/schemas';
import { z } from 'zod';

export const ownRealStateSchema = z.object({
  ownRealState: yesNoSchema,
});

export const mortgagePaymentSchema = z.object({
  montlyMortgage: moneyNumberSchema,
  unpaidBalance: moneyNumberSchema,
});

export const rentPaymentSchema = z.object({
  montlyRent: moneyNumberSchema,
});

export const landOwnershipSchema = z.object({
  ownLand: yesNoSchema,
  montlyPayment: moneyNumberSchema.optional(),
});
