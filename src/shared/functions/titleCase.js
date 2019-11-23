const titleCase = text => {
  return text
    ? text
        .split(" ")
        .map(word => (word = word[0].toUpperCase() + word.slice(1)))
        .join(" ")
    : null;
};

export default titleCase;
