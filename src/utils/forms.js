/**
 * THE FOLLOWING FUNCTIONS ARE MEANT TO BE USED IN FORMS, IN CONJUCTION WITH
 * REACT-HOOK-FORMS
 */

/**
 * Returns a valid number, undefined if empty value, or the same input if
 * not a valid number
 * Use with setValueAs API
 * @param {Object} value
 * @returns {number | Object | undefined}
 */
export const valueAsNumberOrEmpty = (value) => {
  if (!value) {
    return undefined;
  }

  const parsedValue = parseFloat(value);

  if (Number.isNaN(parsedValue)) {
    return value;
  }

  return parsedValue;
};

/**
 * Returns a valid string, or undefined when empty string
 * Use with setValueAs API
 * @param {Object} value
 * @returns {string | undefined}
 */
export const valueAsStringOrEmpty = (value) => {
  if (!value) {
    return undefined;
  }

  return value;
};
