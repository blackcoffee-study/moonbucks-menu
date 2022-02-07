export default class Store {
  #espresso = [];
  #frappuccino = [];
  #blended = [];
  #desert = [];
  #teavana = [];
  static instance;

  constructor() {
    if (Store.instance) return Store.instance;
    Store.instance = this;
  }

  setMenuList({ category, menuList }) {
    switch (category) {
      case "espresso":
        this.#espresso = menuList;
        break;
      case "frappuccino":
        this.#frappuccino = menuList;
        break;
      case "blended":
        this.#blended = menuList;
        break;
      case "desert":
        this.#desert = menuList;
        break;
      case "teavana":
        this.#teavana = menuList;
        break;
      default:
        break;
    }
  }

  getMenuList({ category }) {
    if (category === "espresso") {
      return this.#espresso;
    }

    if (category === "frappuccino") {
      return this.#frappuccino;
    }

    if (category === "blended") {
      return this.#blended;
    }

    if (category === "desert") {
      return this.#desert;
    }

    if (category === "teavana") {
      return this.#teavana;
    }
  }
}
