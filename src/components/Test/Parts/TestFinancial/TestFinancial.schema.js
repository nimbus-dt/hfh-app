import { z } from 'zod';

const positiveNumber = z.coerce.number().nonnegative();

const fileArray = z.array(z.instanceof(File));

export const incomeTypes = [
  'Salary/wages (gross)',
  'TANF',
  'Alimony',
  'Child support',
  'Social Security',
  'SSI',
  'Disability',
  'Housing voucher (e.g., Section 8)',
  'Unemployment benefits',
  'VA compensation',
  'Retirement (e.g., pension)',
  'Military entitlements',
  'Other',
];

export const incomeSchema = z.object({
  type: z.enum(incomeTypes),
  otherType: z.string().min(1).optional(),
  source: z.string().min(1),
  monthlyIncome: positiveNumber,
  proofs: fileArray,
});

export const debtTypes = [
  'Auto loan',
  'Installment (e.g., boat, personal loan)',
  'Lease (e.g., furniture, appliances - includes rent-to-own)',
  'Alimony/separate maintenance',
  'Child support',
  'Revolving (e.g., credit cards)',
  'Student loan debt',
  'Open 30 days (balance paid monthly, e.g., travel card)',
  'Medical debt',
  'Other',
];

export const debtSchema = z.object({
  type: z.enum(debtTypes),
  otherType: z.string().min(0).optional(),
  monthlyPayment: positiveNumber,
  unpaidBalance: positiveNumber,
  monthsLeftToPaid: positiveNumber,
  proofs: fileArray,
});

export const assetsTypes = [
  'Cash',
  'Savings Account',
  'Retirement Accounts',
  'Real Estate (Land, Property)',
  'Precious Metals',
  'Government Grants',
  'Bonds',
  'Insurance Policies',
  'Certificates of Deposit (CDs)',
  'Loans Receivable',
  'Collectibles',
  'Other',
];

export const assetsSchema = z.object({
  type: z.enum(assetsTypes),
  otherType: z.string().min(0).optional(),
  heldByOrLocation: z.string().min(0),
  currentValue: positiveNumber,
  proofs: fileArray,
});
