// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserTypes = {
  "AFFILIATE": "AFFILIATE",
  "APPLICANT": "APPLICANT"
};

const RootFormStatusTypes = {
  "ACTIVE": "ACTIVE",
  "PENDING": "PENDING"
};

const ApplicationTypes = {
  "ONLINE": "ONLINE",
  "PAPER": "PAPER"
};

const SubmissionStatus = {
  "PENDING": "PENDING",
  "ACCEPTED": "ACCEPTED",
  "REJECTED": "REJECTED",
  "RETURNED": "RETURNED"
};

const { User, RootForm, Form, Decision, FormAnswer, Note, Property, TestCycle, ApplicantOptional, Asset, Debt, Income, TestApplication, EmploymentInfo, Member, Record, Written, Checklist, ApplicantInfo, Habitat, GalleryItem, OptionalSections, WrittenQuestion, RecordQuestion, CheckQuestion, HabitatProps } = initSchema(schema);

export {
  User,
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
  UserTypes,
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