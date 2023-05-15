// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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
  "OTHER": "OTHER"
};

const SexTypes = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
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

const { UserProps, DebtRecord, SavingRecord, IncomeRecord, HouseholdMember, Application, Habitat } = initSchema(schema);

export {
  UserProps,
  DebtRecord,
  SavingRecord,
  IncomeRecord,
  HouseholdMember,
  Application,
  Habitat,
  ApplicationSubmittedStatus,
  DebtTypes,
  IncomeTypes,
  SexTypes,
  RelationshipTypes
};