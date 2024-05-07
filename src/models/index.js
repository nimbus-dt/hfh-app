// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ReviewStatus = {
  "ACCEPTED": "ACCEPTED",
  "PENDING": "PENDING",
  "DENIED": "DENIED",
  "RETURNED": "RETURNED"
};

const Sexs = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "OTHER": "OTHER"
};

const UserTypes = {
  "AFFILIATE": "AFFILIATE",
  "APPLICANT": "APPLICANT",
  "ADMIN": "ADMIN"
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
  "INCOMPLETE": "INCOMPLETE",
  "COMPLETED": "COMPLETED"
};

const { User, RootForm, Form, Decision, FormAnswer, Note, Property, TestCycle, ApplicantOptional, Asset, Debt, Income, TestApplication, EmploymentInfo, Member, Record, Written, Checklist, ApplicantInfo, Habitat, SidebarName, ApplicantProps, AffiliateProps, GalleryItem, OptionalSections, WrittenQuestion, RecordQuestion, CheckQuestion, HabitatProps } = initSchema(schema);

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
  ReviewStatus,
  Sexs,
  UserTypes,
  RootFormStatusTypes,
  ApplicationTypes,
  SubmissionStatus,
  SidebarName,
  ApplicantProps,
  AffiliateProps,
  GalleryItem,
  OptionalSections,
  WrittenQuestion,
  RecordQuestion,
  CheckQuestion,
  HabitatProps
};