/**
 * TitleCase Function
 * Converts text to titleCase format
 * @param {*} text - the text to be converted
 */
const titleCase = text => {
  return text
    ? text
        .split(" ")
        .map(word => (word = word[0].toUpperCase() + word.slice(1)))
        .join(" ")
    : null;
};

export default titleCase;
