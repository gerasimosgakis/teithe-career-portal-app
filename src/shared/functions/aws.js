import { Storage } from "aws-amplify";

export async function s3Upload(file, filename) {
  const stored = await Storage.put(filename, file, {
    contentType: file.type
  });

  return stored.key;
}

export async function s3GetURL(key) {
  const presignedURL = await Storage.get(key);
  return presignedURL;
}

export async function getCV(key) {
  const url = await s3GetURL(key);
  window.open(url, "_blank");
}
