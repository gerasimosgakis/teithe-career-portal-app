const checkDate = date => {
  if (date && typeof date === "string") {
    return date.slice(0, 7);
  } else {
    return "";
  }
};

export default checkDate;
