import { stringToHumanReadable } from './strings';

/**
 * Returns a list of key, value pairs according to enum values
 * @param { EnumObject } enumObject
 * @returns { { key: string, value: string }[]}
 */
export const mapEnumToList = (enumObject) => {
  const result = Object.values(enumObject).reduce(
    (sum, enumType) => [
      ...sum,
      {
        key: enumType,
        value: stringToHumanReadable(enumType),
      },
    ],
    []
  );

  return result;
};
