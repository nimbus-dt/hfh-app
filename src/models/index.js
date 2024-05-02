// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Sexs = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

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

const { User, RootForm, Form, Decision, FormAnswer, Note, Property, TestCycle, ApplicantOptional, Asset, Debt, Income, TestApplication, EmploymentInfo, Member, Record, Written, Checklist, ApplicantInfo, Habitat, ApplicantProps, AffiliateProps, GalleryItem, OptionalSections, WrittenQuestion, RecordQuestion, CheckQuestion, HabitatProps } = initSchema(schema);

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
  Sexs,
  UserTypes,
  RootFormStatusTypes,
  ApplicationTypes,
  SubmissionStatus,
  ApplicantProps,
  AffiliateProps,
  GalleryItem,
  OptionalSections,
  WrittenQuestion,
  RecordQuestion,
  CheckQuestion,
  HabitatProps
};