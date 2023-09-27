import startCase from 'lodash.startcase';

export const stringToHumanReadable = (value) => startCase(value.toLowerCase());
