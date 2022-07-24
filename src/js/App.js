import { select } from "./dom.js";
import MenuItem from "./MenuItem.js";

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

  constructor() {
    this.init();
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
      if (target.classList.contains("menu-edit-button")) {
        this.editMenuItem(menuItem);
      } else if (target.classList.contains("menu-remove-button")) {
        this.removeMenuItem(menuItem);
      }
    });
  }

  appendMenuItem() {
    if (!this.#menuInput.value.trim()) {
      return;
    }
    const menuItem = new MenuItem(this.#menuInput.value.trim());
    this.#menuList.appendChild(menuItem);
    this.#menuInput.value = "";
    this.updateMenuCount();
  }

  /**
   * @param {MenuItem} menuItem
   */
  editMenuItem(menuItem) {
    const newMenuName = window.prompt(
      "수정할 메뉴 이름을 입력하세요",
      menuItem.getAttribute("name"),
    );
    if (newMenuName) {
      menuItem.setAttribute("name", newMenuName);
    }
  }

  /**
   * @param {MenuItem} menuItem
   */
  removeMenuItem(menuItem) {
    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      menuItem.remove();
      updateMenuCount();
    }
  }

  updateMenuCount() {
    const menuCount = this.#menuList.children.length;
    select(".menu-count").textContent = `총 ${menuCount}개`;
  }
}
