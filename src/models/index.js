// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ApplicationTimeStatus = {
  "CURRENT": "CURRENT",
  "PAST": "PAST"
};

const ApplicationSubmittedStatus = {
  "ACCEPTED": "ACCEPTED",
  "PENDING": "PENDING",
  "REJECTED": "REJECTED"
};

const DebtTypes = {
  "MEDICAL": "MEDICAL",
  "STUDENT_LOANS": "STUDENT_LOANS",
  "COLLECTIONS": "COLLECTIONS",
  "CAR": "CAR",
  "PERSONAL_LOANS": "PERSONAL_LOANS",
  "INSTALLMENT_LOANS": "INSTALLMENT_LOANS",
  "CREDIT_CARD": "CREDIT_CARD",
  "CHILD_SUPPORT": "CHILD_SUPPORT",
  "ALIMONY": "ALIMONY",
  "OTHER": "OTHER"
};

const IncomeTypes = {
  "SALARIED_EMPLOYMENT": "SALARIED_EMPLOYMENT",
  "HOURLY_EMPLOYMENT": "HOURLY_EMPLOYMENT",
  "SELF_EMPLOYMENT": "SELF_EMPLOYMENT",
  "SOCIAL_SECURITY_DISABILITY_INSURANCE": "SOCIAL_SECURITY_DISABILITY_INSURANCE",
  "SOCIAL_SECURITY_BENEFITS": "SOCIAL_SECURITY_BENEFITS",
  "SUPPLEMENTAL_SECURITY_INCOME": "SUPPLEMENTAL_SECURITY_INCOME",
  "HOUSING_VOUCHER": "HOUSING_VOUCHER",
  "CHILD_SUPPORT": "CHILD_SUPPORT",
  "ALIMONY_SUPPORT": "ALIMONY_SUPPORT",
  "VETERANS_AFFAIR_COMPENSATION": "VETERANS_AFFAIR_COMPENSATION",
  "PENSION_PAYMENTS": "PENSION_PAYMENTS",
  "MILITARY_ENTITLEMENTS": "MILITARY_ENTITLEMENTS",
  "OTHER": "OTHER"
};

const SexTypes = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const RelationshipTypes = {
  "SPOUSE": "SPOUSE",
  "SON": "SON",
  "DAUGHTER": "DAUGHTER",
  "NEPHEW": "NEPHEW",
  "NIECE": "NIECE",
  "PARENT": "PARENT",
  "SIBLING": "SIBLING",
  "OTHER": "OTHER"
};

const { ContactForm, UserProps, DebtRecord, SavingRecord, IncomeRecord, HouseholdMember, Application, Habitat } = initSchema(schema);

export {
  ContactForm,
  UserProps,
  DebtRecord,
  SavingRecord,
  IncomeRecord,
  HouseholdMember,
  Application,
  Habitat,
  ApplicationTimeStatus,
  ApplicationSubmittedStatus,
  DebtTypes,
  IncomeTypes,
  SexTypes,
  RelationshipTypes
};