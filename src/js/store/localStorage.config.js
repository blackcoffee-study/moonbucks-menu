const cafeStorage = window.localStorage;

export const getStorage = (key) => {
  return JSON.parse(cafeStorage.getItem(key));
};

export const setStorage = (key, value) => {
  cafeStorage.setItem(key, JSON.stringify(value));
};
