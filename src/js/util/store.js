export const saveDataonLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
