import {
  RelationshipTypes,
  SexTypes,
  ApplicationSubmittedStatus,
  DebtTypes,
  SubmissionStatus,
} from 'models';
import { mapEnumToHumanReadableValues, mapEnumToList } from './mappers';

/**
 * This constants must be in sync with the variables in
 * index.css > :root
 */
export const COLORS = {
  PRIMARY: '#010101',
  SECONDARY: {
    DEFAULT: '#55B949',
    ACCENT: {
      DARK: '#439539',
    },
  },
  CANVAS: '#F5F5F5',
  ON_SECONDARY: '#010101',
};

/**
 * This constant is used to iterate through the sex list types(keys) and values
 */
export const SEX_TYPES_LIST = mapEnumToList(SexTypes);

/**
 * This constant is used to get sex values according to the sex type(key)
 */
export const SEX_VALUES_MAP = mapEnumToHumanReadableValues(SexTypes);

/**
 * This constant is used to iterate through the relationship list types(keys) and values
 */
export const RELATIONSHIP_TYPES_LIST = mapEnumToList(RelationshipTypes);

/**
 * This constant is used to get relationship values according to the relationship type(key)
 */
export const RELATIONSHIP_VALUES_MAP =
  mapEnumToHumanReadableValues(RelationshipTypes);

/**
 * This constant is used to iterate through the application submitted status(keys) and values
 */
export const APPLICATION_SUBMITTED_STATUS_LIST = mapEnumToList(
  ApplicationSubmittedStatus
);

/**
 * This constant is used to get application submitted status values values according to
 * the type(key)
 */
export const APPLICATION_SUBMITTED_STATUS_MAP = mapEnumToHumanReadableValues(
  ApplicationSubmittedStatus
);

export const DEBT_TYPES_LIST = mapEnumToList(DebtTypes);

export const DEBT_TYPES_MAP = mapEnumToHumanReadableValues(DebtTypes);

export const ApplicationRecordTypes = {
  INCOME: 'INCOME',
  SAVING: 'SAVING',
  DEBT: 'DEBT',
};

export const APPLICATION_RECORD_TYPES_LIST = mapEnumToList(
  ApplicationRecordTypes
);

export const APPLICATION_RECORD_TYPES_MAP = mapEnumToHumanReadableValues(
  ApplicationRecordTypes
);

/**
 * This constant is used to iterate through the submissionStatus(keys) and values
 */
export const SUBMISSION_STATUS_LIST = mapEnumToList(SubmissionStatus);

/**
 * This constant is used to get submissionStatus values values according to
 * the type(key)
 */
export const SUBMISSION_STATUS_MAP =
  mapEnumToHumanReadableValues(SubmissionStatus);

/**
 * This constant is used to store the available ethnicity options
 */
export const ETHNICITY_OPTIONS = {
  hispanicOrLatino: 'Hispanic or Latino',
  mexican: 'Mexican',
  puertoRican: 'Puerto Rican',
  cuban: 'Cuban',
  otherHispanicOrLatino: 'Other Hispanic or Latino',
  notHispanicOrLatino: 'Not Hispanic or Latino',
  iDoNotWishToProvideThisInfo: 'I do not wish to provide this info',
};

/**
 * This constant is used to store the available race options
 */
export const RACE_OPTIONS = {
  americanIndianOrAlaskaNative: 'American Indian or Alaska Native',
  nameOfEnrolledOrPrincipalTribe: 'Name of enrolled or principal tribe',
  asian: 'Asian',
  asianIndian: 'Asian Indian',
  chinese: 'Chinese',
  filipino: 'Filipino',
  japanese: 'Japanese',
  korean: 'Korean',
  vietnamese: 'Vietnamese',
  otherAsian: 'Other Asian',
  blackOrAfricanAmerican: 'Black or African American',
  nativeHawaiianOrOtherPacificIslander:
    'Native Hawaiian or other Pacific Islander',
  nativeHawaiian: 'Native Hawaiian',
  guamanianOrChamorro: 'Guamanian or Chamorro',
  samoan: 'Samoan',
  otherPacificIslander: 'Other Pacific Islander',
  white: 'White',
  iDoNotWishToProvideThisInfo: 'I do not wish to provide this information',
};
/**
 * This constant is used to store the default review status
 */
export const DEFAULT_REVIEW_STATUS = 'Pending';
