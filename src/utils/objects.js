/**
 *  Returns wheter an object is empty (it has no properties) or no
 * @param {?Object} objectValue
 * @returns {boolean}
 */
export const isObjectEmpty = (objectValue) =>
  Boolean(objectValue && Object.keys(objectValue).length === 0);
