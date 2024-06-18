/**
 *  Returns wheter an object is empty (it has no properties) or no
 * @param {?Object} objectValue
 * @returns {boolean}
 */
export const isObjectEmpty = (objectValue: object) =>
  Boolean(objectValue && Object.keys(objectValue).length === 0);

type TPaths = { path: string; value: unknown }[];

/**
 * Flattens and object to an array of paths and values
 * @param object Object to be flatten
 * @returns The array of paths and values of the object
 */
export const flattenObject = (object: unknown): TPaths => {
  if (typeof object !== 'object') {
    return [];
  }

  const paths: TPaths = [];
  for (const key in object) {
    const val = (object as { [key: string]: unknown })[key];
    if (typeof val === 'object') {
      const subPaths = flattenObject(val);
      subPaths.forEach((e) => {
        paths.push({
          path: [key, e.path].join('.'),
          value: e.value,
        });
      });
    } else {
      const path = { path: key, value: val };
      paths.push(path);
    }
  }
  return paths;
};

/**
 * Gets the value of an object at a given path
 * @param object The object to get the value from
 * @param path The path to get the value from
 * @returns The value of the object at the given path
 */
export const getValueFromPath = (object: object, path: string) => {
  const pathArray = path.split('.');
  let value: unknown = object;
  for (const key of pathArray) {
    if (typeof value === 'object' && value && key in value) {
      value = (value as { [key: string]: unknown })[key];
    }
  }
  return value;
};
