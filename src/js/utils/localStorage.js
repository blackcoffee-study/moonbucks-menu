const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = (key) => {
  const value = localStorage.getItem(key);
  return JSON.parse(value);
};

export { setLocalStorage, getLocalStorage }