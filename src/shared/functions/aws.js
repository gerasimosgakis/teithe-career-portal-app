import { Storage } from "aws-amplify";

/**
 * s3Upload Function
 * Uploads file to s3 bucket and returns the key
 * @param {*} file - File to be uploaded
 * @param {*} filename - Name to be given to the uploaded file
 */
export async function s3Upload(file, filename) {
  const stored = await Storage.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

/**
 * s3GetURL Function
 * Gets the presigned url for an item in the s3 bucket
 * @param {*} key - the key of the item to be get
 */
export async function s3GetURL(key) {
  const presignedURL = await Storage.get(key);
  return presignedURL;
}

/**
 * getCV Function
 * Gets the url for the cv and opens it in a new window
 * @param {*} key - the key of the cv to be downloaded
 */
export async function getCV(key) {
  const url = await s3GetURL(key);
  window.open(url, "_blank");
}
