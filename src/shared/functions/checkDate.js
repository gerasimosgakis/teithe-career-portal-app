/**
 * Formats date
 * @param {*} date - date to be formatted
 */
const checkDate = date => {
  if (date && typeof date === "string") {
    return date.slice(0, 7);
  } else if (date && typeof date === "object") {
    return date.toISOString().slice(0, 7);
  } else {
    return "";
  }
};

export default checkDate;
