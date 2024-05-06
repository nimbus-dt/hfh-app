import { SubmissionStatus } from 'models';
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

/**
 * This constant is used to store household member relationship options
 */

export const RELATIONSHIP_OPTIONS = [
  'Parent',
  'Child',
  'Sibling',
  'Spouse',
  'Grandparent',
  'Grandchild',
  'Aunt/Uncle',
  'Niece/Nephew',
  'Cousin',
  'Other',
];

export const AUTHENTICATION_STATUS = {
  UNAUTHENTICATED: 'unauthenticated',
  CONFIGURING: 'configuring',
  AUTHENTICATED: 'authenticated',
};

export const ROUTES = {
  HABITAT: ':habitat',
  HABITAT_APPLICANT: 'applicant',
  HABITAT_APPLICANT_REVIEW: 'review',
  HABITAT_APPLICANT_APPLICATIONS: 'applications',
  HABITAT_APPLICANT_DECISIONS: 'decisions',
  HABITAT_APPLICANT_CYCLE: ':cycleId',
  HABITAT_AFFILIATE: 'affiliate',
  HABITAT_AFFILIATE_HOME: 'home',
  HABITAT_AFFILIATE_CYCLES: 'cycles',
  HABITAT_AFFILIATE_CYCLES_CYCLE: ':cycleId',
  HABITAT_AFFILIATE_CYCLES_CYCLE_APPLICATION: ':applicationId',
  HABITAT_AFFILIATE_REPAIRS: 'repairs',
  HABITAT_AFFILIATE_VOLUNTEERS: 'volunteers',
  HABITAT_AFFILIATE_SETTINGS: 'settings',
  HABITAT_AFFILIATE_FORMS: 'forms',
  HABITAT_AFFILIATE_ANALYTICS: 'analytics',
  HABITAT_AFFILIATE_USERS: 'users',
  HABITAT_AFFILIATE_FORM: ':formId',
};
