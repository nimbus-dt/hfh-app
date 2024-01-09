import {
  APPLICATION_SUBMITTED_STATUS_MAP,
  DEBT_TYPES_MAP,
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

export const formatDebtType = (type) => DEBT_TYPES_MAP[type] ?? '';

/**
 * Returns a string with the application submitted status value as a human
 * readable string
 * @param {object} value
 * @returns {string}
 */
export const formatYesNoBoolean = (value) => (value ? 'Yes' : 'No');

const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
/**
 * Returns a currency string
 * @param {number} value i.e.: 240.4967298
 * @returns {string} i.e.: $240.49
 */
export const formatNumberAsCurrency = (num) => USDollar.format(num);

const Percentage = new Intl.NumberFormat('default', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
/**
 * Returns a percentage string
 * @param {number} ratio i.e.: 0.4958
 * @returns {string} i.e.: 49.58 %
 */
export const formatNumberAsPercentage = (num) => Percentage.format(num);

/**
 * Returns a phone number string with format (XXX) XXX-XXXX
 * @param {string} unformattedNumber i.e.: 8005550100, 800 555 0100, (800) 5550100
 * @returns {string} i.e.: (800) 555‑0100
 */
export const formatPhoneNumber = (unformattedNumber) => {
  const formattedNumber = unformattedNumber
    .replace(/[^\d\b]/g, '')
    .substring(0, 10)
    .replace(/^(\d{1})/, '($1')
    .replace(/^(\(\d{3})(\d{1})/, '$1)$2')
    .replace(/^(\(\d{3}\))(\d{1})/, '$1 $2')
    .replace(/^(\(\d{3}\))\s(\d{3})(\d{1})/, '$1 $2-$3');

  return formattedNumber;
};
