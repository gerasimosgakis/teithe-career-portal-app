/**
 * IsEmpty Function
 * Checks if value is null or empty string
 * @param {*} value
 */
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default isEmpty;
