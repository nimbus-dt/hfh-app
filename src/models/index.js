// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RootFormStatusTypes = {
  "ACTIVE": "ACTIVE",
  "PENDING": "PENDING"
};

const ApplicationTypes = {
  "ONLINE": "ONLINE",
  "PAPER": "PAPER"
};

const SubmissionStatus = {
  "SUBMITTED": "SUBMITTED",
  "UNSUBMITTED": "UNSUBMITTED",
  "RETURNED": "RETURNED"
};

const { RootForm, Form, Decision, FormAnswer, Note, Property, TestCycle, ApplicantOptional, Asset, Debt, Income, TestApplication, EmploymentInfo, Member, Record, Written, Checklist, ApplicantInfo, Habitat, GalleryItem, OptionalSections, WrittenQuestion, RecordQuestion, CheckQuestion, HabitatProps } = initSchema(schema);

export {
  RootForm,
  Form,
  Decision,
  FormAnswer,
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
  RootFormStatusTypes,
  ApplicationTypes,
  SubmissionStatus,
  GalleryItem,
  OptionalSections,
  WrittenQuestion,
  RecordQuestion,
  CheckQuestion,
  HabitatProps
};