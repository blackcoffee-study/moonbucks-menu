export const saveDataonLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const category = {
  name: 'espresso',
  menus: [],
};

export const loadData = () => {
  const { name } = category;
  category.menus = loadDataFromLocalStorage(name) || [];
};
