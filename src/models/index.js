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
  "INCOMPLETE": "INCOMPLETE",
  "COMPLETED": "COMPLETED"
};

const { User, RootForm, Decision, FormAnswer, Note, TestCycle, TestApplication, Habitat, SidebarName, ApplicantProps, AffiliateProps, GalleryItem, HabitatProps } = initSchema(schema);

export {
  User,
  RootForm,
  Decision,
  FormAnswer,
  Note,
  TestCycle,
  TestApplication,
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
  HabitatProps
};