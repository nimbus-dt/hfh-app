/**
 * @typedef {Object} Alert
 * @property {('default'|'info'|'error'|'warning'|'success')} variation - The type of the action.
 * @property {string} heading - The heading of the action.
 * @property {string} body - The body of the action.
 */
/**
 * Creates an alert object
 * @param {('default'|'info'|'error'|'warning'|'success')} variation - The type of the action.
 * @param {string} heading - The heading of the action.
 * @param {string} body - The body of the action.
 * @returns {Alert}
 */
export const createAlert = (variation, heading, body) => ({
  variation,
  heading,
  body,
});
