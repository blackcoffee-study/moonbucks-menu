export const getLocalStorage = (id) => JSON.parse(localStorage.getItem(id));
export const setLocalStorage = (id, data) => localStorage.setItem(id, JSON.stringify(data));
