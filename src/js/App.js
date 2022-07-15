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
}
