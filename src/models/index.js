// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ApplicationTypes = {
  "ONLINE": "ONLINE",
  "PAPER": "PAPER"
};

const SubmissionStatus = {
  "SUBMITTED": "SUBMITTED",
  "UNSUBMITTED": "UNSUBMITTED",
  "RETURNED": "RETURNED"
};

const { Decision, Note, Property, TestCycle, ApplicantOptional, Asset, Debt, Income, TestApplication, EmploymentInfo, Member, Record, Written, Checklist, ApplicantInfo, Habitat, OptionalSections, WrittenQuestion, RecordQuestion, CheckQuestion, HabitatProps } = initSchema(schema);

export {
  Decision,
  Note,
  Property,
  TestCycle,
  ApplicantOptional,
  Asset,
  Debt,
  Income,
  TestApplication,
  EmploymentInfo,
  Member,
  Record,
  Written,
  Checklist,
  ApplicantInfo,
  Habitat,
  ApplicationTypes,
  SubmissionStatus,
  OptionalSections,
  WrittenQuestion,
  RecordQuestion,
  CheckQuestion,
  HabitatProps
};