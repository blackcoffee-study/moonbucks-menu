export const setLocalStroage = (name, value) => {
  localStorage.setItem(name, JSON.stringify(value));
};

export const getLocalStorage = (target) => {
  return JSON.parse(localStorage.getItem(target));
};
