export const store = {
  setItem(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getItem() {
    return JSON.parse(localStorage.getItem("menu"));
  },
};
