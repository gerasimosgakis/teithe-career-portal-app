/**
 * Adds https:// at the start of a link if one is not present
 * @param {*} link - link to be converted to external
 */
const webify = link => {
  if (link && link.length > 0 && link.startsWith("http")) {
    return link;
  } else if (link && link.length > 0 && !link.startsWith("http")) {
    return `https://${link}`;
  } else {
    return "";
  }
};

export default webify;
