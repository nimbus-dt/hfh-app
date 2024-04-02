import { Storage } from 'aws-amplify';

/**
 * Downloads a file from a valid URL
 * @param {string} url
 */
export const downloadWithUrl = (url, name) => {
  const a = document.createElement('a');

  a.href = url;

  a.target = '_blank';

  a.setAttribute('download', name);

  a.click();

  a.remove();
};

/**
 * Remove files from S3 bucket
 * @param {string[]} keys
 * @param {string} level
 * @returns {Array}
 */
export const removeFiles = async (keys, level = 'public') => {
  const promisesArr = keys.map((key) =>
    Storage.remove(key, {
      level,
    })
  );
  const results = await Promise.all(promisesArr);
  return results;
};

/**
 * Convert object url to file
 * @param {string} objectUrl
 * @param {string} name
 * @returns {File}
 */

export const fileFromObjectURL = async (objectUrl, name) => {
  const file = await fetch(objectUrl)
    .then((r) => r.blob())
    .then(
      (blobFile) =>
        new File([blobFile], name, { type: `image/${name.split('.').pop()}` })
    );

  return file;
};
