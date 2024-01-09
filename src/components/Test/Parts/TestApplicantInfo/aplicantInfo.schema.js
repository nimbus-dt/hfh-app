import { z } from 'zod';

export const maritalStatusValues = [
  'Married',
  'Separated',
  'Unmarried(single, divorced, widowed, civil union, domestic partnership, registered reciprocal beneficiary relationship)',
];

export const ownerShipValues = ['Own', 'Rent'];

const phoneSchema = z
  .string()
  .regex(
    /\(\d{3}\)\s\d{3}-\d{4}/i,
    'Invalid phone number, must be in format (000) 000-0000'
  );

const optionalPhoneSchema = z
  .union([z.string().length(0), phoneSchema])
  .optional()
  .transform((phone) => (phone === '' ? undefined : phone));

export const basicInfoSchema = z.object({
  fullName: z.string().min(1),
  altOrFormerName: z.string(),
  socialSecurityNumber: z
    .string()
    .regex(
      /\d{3}-\d{2}-\d{4}/i,
      'Invalid social security number, must be a 9 digit number in format AAA-GG-SSSS'
    ),
  cellPhone: phoneSchema,
  homePhone: optionalPhoneSchema,
  workPhone: optionalPhoneSchema,
  age: z.coerce.number().int().positive(),
  birthDate: z.string(),
  maritalStatus: z.enum(maritalStatusValues),
});

export const addressSchema = z.object({
  address: z.string().min(1),
  ownershipStatus: z.enum(ownerShipValues),
  monthsLivedHere: z.coerce.number().int().positive(),
});
