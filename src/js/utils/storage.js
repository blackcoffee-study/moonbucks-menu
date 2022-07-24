// @ts-check
/**
 * @typedef JsonableStorageProps
 * @property {(key: string, defaultValue?: *) => *} get
 * @property {(key: string, value: *) => void} set
 *
 * @typedef {Storage & JsonableStorageProps} JsonableStorage
 */

/**
 * @param {Storage} storage
 * @returns {JsonableStorage}
 */
const wrapJsonable = (storage) => {
  /** @type {JsonableStorage} */
  const wrappedStorage = Object.create(Object.getPrototypeOf(storage));

  /**
   * @param {string} key
   * @param {*} defaultValue
   */
  wrappedStorage.get = (key, defaultValue) => {
    try {
      const value = storage.getItem(key);
      if (typeof value !== "string") {
        throw new TypeError(`${key} is not a string`);
      }
      return JSON.parse(value);
    } catch {
      return defaultValue;
    }
  };

  /**
   * @param {string} key
   * @param {*} value
   */
  wrappedStorage.set = function (key, value) {
    storage.setItem(key, JSON.stringify(value));
  };

  return wrappedStorage;
};

export const sessionStore = wrapJsonable(window.sessionStorage);
export const localStore = wrapJsonable(window.localStorage);
