/**
 * Downloads a file from a valid URL
 * @param {string} url
 */
export const downloadWithUrl = (url) => {
  const a = document.createElement('a');
  a.href = url;

  a.click();

  a.remove();
};
