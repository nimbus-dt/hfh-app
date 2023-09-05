/**
 * Returns a string with all the clases joined by empty space
 * @param {...string} classes
 * @returns {string}
 */
export const concatClassNames = (...classes) =>
  classes.filter(Boolean).join(' ');
