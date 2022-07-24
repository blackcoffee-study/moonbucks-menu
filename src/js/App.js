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
   * @type {{menuList: string[]}}
   */
  #state = {
    menuList: localStore.get("menuList", []),
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
      }
    });
  }

  setState(nextState) {
    this.#state = { ...this.#state, ...nextState };
    this.render();
    localStore.set("menuList", this.#state.menuList);
  }

  render() {
    this.#menuList.replaceChildren(
      ...this.#state.menuList.map((menuName) => new MenuItem(menuName)),
    );
  }

  appendMenuItem() {
    const menuName = this.#menuInput.value.trim();
    if (menuName) {
      this.setState({
        menuList: [...this.#state.menuList, menuName],
      });
      this.#menuInput.value = "";
      this.updateMenuCount();
    }
  }

  /**
   * @param {number} index
   * @param {MenuItem} menuItem
   */
  editMenuItem(index, menuItem) {
    const menuName = window.prompt(
      "수정할 메뉴 이름을 입력하세요",
      menuItem.getAttribute("name"),
    );
    if (menuName) {
      menuItem.setAttribute("name", menuName);
      this.setState({
        menuList: [
          ...this.#state.menuList.slice(0, index),
          menuItem.getAttribute("name"),
          ...this.#state.menuList.slice(index + 1),
        ],
      });
    }
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
      this.updateMenuCount();
    }
  }

  updateMenuCount() {
    const menuCount = this.#menuList.childElementCount;
    select(".menu-count").textContent = `총 ${menuCount}개`;
  }
}
