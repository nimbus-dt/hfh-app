import { z } from 'zod';
import { searchableOptionSchema, zipCodeSchema } from 'utils/schemas';
import states from '../../../../assets/jsons/states.json';

export const maritalStatusValues = [
  'Married',
  'Separated',
  'Unmarried(single, divorced, widowed, civil union, domestic partnership, registered reciprocal beneficiary relationship)',
];

export const ownerShipValues = ['Own', 'Rent'];

export const unmarriedRelationshipTypesValues = [
  'Civil union',
  'Domestic partnership',
  'Register reciprocal beneficiary relationship',
  'Other',
];

export const creditTypes = [
  'I am applying for individual credit.',
  'I am applying for joint credit.',
  'Each borrower intends to apply for joint credit.',
];

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
  birthDate: z.string(),
  maritalStatus: z.enum(maritalStatusValues),
});

export const coApplicantBasicSchema = basicInfoSchema.extend({
  sex: z.enum(['Male', 'Female', 'Other']),
  relationship: z.string().min(1),
  otherRelationship: z.string().min(1).optional(),
});

export const addressSchema = z.object({
  street: z.string().min(1),
  state: z.enum(states.map((state) => state.abbreviation)),
  city: z.object({
    query: z.string().optional(),
    selectedCity: searchableOptionSchema,
  }),
  zipCode: zipCodeSchema,
  ownershipStatus: z.enum(ownerShipValues),
  monthsLivedHere: z.coerce.number().int().positive(),
});

export const unmarriedAddendumSchema = z.object({
  notSpouseButSimilarPropertyRights: z.enum(['Yes', 'No']),
  relationshipType: z.enum(unmarriedRelationshipTypesValues).optional(),
  otherRelationshipType: z.string().min(0).optional(),
  state: z.string().min(0).optional(),
});

export const typeOfCreditSchema = z.object({
  creditType: z.enum(creditTypes),
  totalNumberOfBorrowers: z.coerce.number().positive().optional(),
  yourInitials: z.string().min(1).optional(),
});

export const coApplicantSchema = z.object({
  hasCoApplicant: z.enum(['Yes', 'No']),
});
