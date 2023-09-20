import { SEX_VALUES_MAP } from './constants';

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
