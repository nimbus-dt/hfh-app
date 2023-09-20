import { SexTypes } from 'models';
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

