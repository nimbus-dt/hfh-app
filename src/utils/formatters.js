import {
  APPLICATION_SUBMITTED_STATUS_MAP,
  RELATIONSHIP_VALUES_MAP,
  SEX_VALUES_MAP,
} from './constants';

/**
 * Returns a string with all the clases joined by empty space
 * @param {...string} classes
 * @returns {string}
 */
export const concatClassNames = (...classes) =>
  classes.filter(Boolean).join(' ');

/**
 * Returns a string with the sex value as a human readable string
 * @param { SexTypes } sexType
 * @returns {string}
 */
export const formatSexValue = (sexType) => SEX_VALUES_MAP[sexType] ?? '';

/**
 * Returns a string with the relationship value as a human readable string
 * @param { RelationshipTypes } relationshipType
 * @returns {string}
 */
export const formatRelationshipValue = (relationshipType) =>
  RELATIONSHIP_VALUES_MAP[relationshipType] ?? '';

/**
 * Returns a string with the application submitted status value as a human
 * readable string
 * @param { ApplicationSubmittedStatus } type
 * @returns {string}
 */
export const formatSubmittedStatus = (type) =>
  APPLICATION_SUBMITTED_STATUS_MAP[type] ?? '';

/**
 * Returns a string with the application submitted status value as a human
 * readable string
 * @param {object} value
 * @returns {string}
 */
export const formatYesNoBoolean = (value) => (value ? 'Yes' : 'No');

