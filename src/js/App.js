import { select } from "./dom.js";
import MenuItem from "./MenuItem.js";

export default function App() {
  /** @type {HTMLFormElement} */
  const menuForm = select("#espresso-menu-form");

  /** @type {HTMLUListElement} */
  const menuList = select("#espresso-menu-list");

  /** @type {HTMLInputElement} */
  const menuInput = select("#espresso-menu-name");

  /** @type {HTMLButtonElement} */
  const submitButton = select("#espresso-menu-submit-button");

  init();

  function init() {
    menuForm.addEventListener("submit", (event) => event.preventDefault());
    menuList.addEventListener("click", ({ target }) => {
      if (!target) return;
      const menuItem = target.closest("moon-menu-item");

      if (target.classList.contains("menu-edit-button")) {
        editMenuItem(menuItem);
      }
    });
    menuInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        appendMenuItem();
      }
    });
    submitButton.addEventListener("click", () => {
      appendMenuItem();
    });
  }

  function appendMenuItem() {
    if (menuInput.value.trim()) {
      const menu = new MenuItem();
      menu.setAttribute("name", menuInput.value);
      menuList.appendChild(menu);
      menuInput.value = "";
    }
  }

  function editMenuItem(menuItem) {
    const newMenuName = window.prompt(
      "수정할 메뉴 이름을 입력하세요",
      menuItem.getAttribute("name"),
    );
    if (newMenuName) {
      menuItem.setAttribute("name", newMenuName);
    }
  }
}
