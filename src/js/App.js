import { select } from "./dom.js";
import MenuItem from "./MenuItem.js";

export default function App() {
  /** @type {HTMLFormElement} */
  const menuForm = select("#espresso-menu-form");

  /** @type {HTMLUListElement} */
  const menuList = select("#espresso-menu-list");

  /** @type {HTMLInputElement} */
  const menuInput = select("#espresso-menu-name");

  init();

  function init() {
    menuForm.addEventListener("submit", (event) => {
      event.preventDefault();
      appendMenuItem();
    });

    menuList.addEventListener("click", ({ target }) => {
      if (!target) return;
      const menuItem = target.closest("moon-menu-item");

      if (target.classList.contains("menu-edit-button")) {
        editMenuItem(menuItem);
      } else if (target.classList.contains("menu-remove-button")) {
        removeMenuItem(menuItem);
      }
    });
  }

  function appendMenuItem() {
    if (menuInput.value.trim()) {
      const menuItem = new MenuItem();
      menuItem.setAttribute("name", menuInput.value.trim());
      menuList.appendChild(menuItem);
      menuInput.value = "";
      updateMenuCount();
    }
  }

  /**
   * @param {MenuItem} menuItem
   */
  function editMenuItem(menuItem) {
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
  function removeMenuItem(menuItem) {
    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      menuItem.remove();
      updateMenuCount();
    }
  }

  function updateMenuCount() {
    const menuCount = menuList.children.length;
    select(".menu-count").textContent = `총 ${menuCount}개`;
  }
}
