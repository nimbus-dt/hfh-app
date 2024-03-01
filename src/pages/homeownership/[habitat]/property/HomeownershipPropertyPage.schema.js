import { positiveMoneyNumberSchema, yesNoSchema } from 'utils/schemas';
import { z } from 'zod';

export const ownRealStateSchema = z.object({
  ownRealState: yesNoSchema,
});

export const mortgagePaymentSchema = z.object({
  montlyMortgage: positiveMoneyNumberSchema,
  unpaidBalance: positiveMoneyNumberSchema,
});

export const rentPaymentSchema = z.object({
  montlyRent: positiveMoneyNumberSchema,
});

export const landOwnershipSchema = z.object({
  ownLand: yesNoSchema,
  montlyPayment: positiveMoneyNumberSchema.optional(),
});
