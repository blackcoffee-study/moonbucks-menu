export const menuStore = {
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menu"));
  },
  setLocalStorage(value) {
    localStorage.setItem("menu", JSON.stringify(value));
  },
};
