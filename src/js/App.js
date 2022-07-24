import MenuItem from "./components/MenuItem.js";
import { select } from "./utils/dom.js";
import { localStore } from "./utils/storage.js";

export default class App {
  /**
   * @type {HTMLFormElement}
   * @readonly
   */
  #menuForm = select("#espresso-menu-form");

  /**
   * @type {HTMLUListElement}
   * @readonly
   */
  #menuList = select("#espresso-menu-list");

  /**
   * @type {HTMLInputElement}
   * @readonly
   */
  #menuInput = select("#espresso-menu-name");

  /**
   * @type {HTMLHeadingElement}
   * @readonly
   */
  #menuTitle = select("main h2");

  /**
   * @type {HTMLSpanElement}
   * @readonly
   */
  #menuCount = select(".menu-count");

  /**
   * @typedef {"espresso" | "frappuccino" | "blended" | "teavana" | "desert"} MenuCategory
   * @typedef {{name: string, isSoldOut: boolean}} MenuItem
   * @typedef {{selectedCategory: MenuCategory, menuList: MenuItem[]}} State
   *
   * @type {State}
   */
  #state = {
    selectedCategory: "espresso",
    menuList: localStore.get("espresso.menuList", []),
  };

  constructor() {
    this.init();
    this.render();
  }

  init() {
    this.#menuForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.appendMenuItem();
    });

    this.#menuList.addEventListener("click", ({ target }) => {
      if (!target) {
        return;
      }
      const menuItem = target.closest("moon-menu-item");
      const clickedIndex = Array.from(this.#menuList.children).indexOf(
        menuItem,
      );
      if (target.classList.contains("menu-edit-button")) {
        this.editMenuItem(clickedIndex, menuItem);
      } else if (target.classList.contains("menu-remove-button")) {
        this.removeMenuItem(clickedIndex);
      } else if (target.classList.contains("menu-sold-out-button")) {
        this.toggleSoldOutMenuItem(clickedIndex, menuItem);
      }
    });

    select("nav").addEventListener("click", ({ target }) => {
      if (!target) {
        return;
      }
      if ("categoryName" in target.dataset) {
        /** @type {MenuCategory} */
        const selectedCategory = target.dataset.categoryName;
        this.setState({
          selectedCategory,
          menuList: localStore.get(`${selectedCategory}.menuList`, []),
        });
        this.updateMenuTitle(target.innerText);
      }
    });
  }

  /**
   * @param {State} nextState
   */
  setState(nextState) {
    this.#state = { ...this.#state, ...nextState };
    this.render();
    localStore.set(
      `${this.#state.selectedCategory}.menuList`,
      this.#state.menuList,
    );
  }

  render() {
    this.#menuList.replaceChildren(
      ...this.#state.menuList.map(
        ({ name, isSoldOut }) => new MenuItem(name, isSoldOut),
      ),
    );
    this.updateMenuCount();
  }

  appendMenuItem() {
    const menuName = this.#menuInput.value.trim();
    if (menuName) {
      this.setState({
        menuList: [
          ...this.#state.menuList,
          { name: menuName, isSoldOut: false },
        ],
      });
      this.#menuInput.value = "";
    }
  }

  /**
   * @param {number} index
   * @param {MenuItem} menuItem
   */
  editMenuItem(index, menuItem) {
    const menuName = window.prompt(
      "수정할 메뉴 이름을 입력하세요",
      menuItem.name,
    );
    if (menuName) {
      menuItem.name = menuName;
      this.setState({
        menuList: [
          ...this.#state.menuList.slice(0, index),
          {
            name: menuItem.name,
            isSoldOut: menuItem.isSoldOut,
          },
          ...this.#state.menuList.slice(index + 1),
        ],
      });
    }
  }

  /**
   * @param {number} index
   * @param {MenuItem} menuItem
   */
  toggleSoldOutMenuItem(index, menuItem) {
    menuItem.isSoldOut = !menuItem.isSoldOut;
    this.setState({
      menuList: [
        ...this.#state.menuList.slice(0, index),
        {
          name: menuItem.name,
          isSoldOut: menuItem.isSoldOut,
        },
        ...this.#state.menuList.slice(index + 1),
      ],
    });
  }

  /**
   * @param {number} index
   */
  removeMenuItem(index) {
    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      this.setState({
        menuList: [
          ...this.#state.menuList.slice(0, index),
          ...this.#state.menuList.slice(index + 1),
        ],
      });
    }
  }

  /**
   * @param {string} title
   */
  updateMenuTitle(title) {
    this.#menuTitle.textContent = `${title} 메뉴 관리`;
  }

  updateMenuCount() {
    const menuCount = this.#menuList.childElementCount;
    this.#menuCount.textContent = `총 ${menuCount}개`;
  }
}
