import { isBlank, isReduplicated } from "./utils/validate.js";
import { $ } from "./utils/dom.js";
import { MESSAGE, CATEGORY } from "./const/index.js";
import store from "./store/index.js";

function App() {
  this.currentCategory = CATEGORY[Object.keys(CATEGORY)[0]];
  this.menu = {};
  this.init = () => {
    Object.values(CATEGORY).forEach((category) => (this.menu[category] = []));
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListener();
  };
  const menuItemTemplate = (item, idx) => {
    return `
    <li 
      class="menu-list-item d-flex items-center py-2" data-menu-id=${idx}>
      <span class="${item.soldOut ? "sold-out" : ""}  w-100 pl-2 menu-name">${
      item.name
    }</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>
        `;
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item, idx) => menuItemTemplate(item, idx))
      .join("");
    $("#menu-list").innerHTML = template;
    updateMenuCount();
  };

  const updateMenuCount = () => {
    $(".menu-count").innerText = `총 ${
      this.menu[this.currentCategory].length
    } 개`;
  };

  const addMenuName = () => {
    const newMenuName = $("#menu-name").value.trim();
    $("#menu-name").value = "";
    if (isBlank(newMenuName)) return;
    if (isReduplicated(this.menu[this.currentCategory], newMenuName)) return;
    const newMenuObj = {
      name: newMenuName,
      soldOut: false,
    };
    this.menu[this.currentCategory].push(newMenuObj);
    store.setLocalStorage(this.menu);
    render();
  };

  const soldOutMenu = ($li) => {
    const menuId = $li.id;
    let soldOut = this.menu[this.currentCategory][menuId].soldOut;
    this.menu[this.currentCategory][menuId].soldOut = !soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const editMenuName = ($li) => {
    const $menuName = $li.querySelector(".menu-name");
    let editedMenuName = prompt(MESSAGE.EDIT_MENU, $menuName.textContent);
    const menuId = $li.dataset.menuId;
    if (editedMenuName) {
      editedMenuName = editedMenuName.trim();
    }
    if (isBlank(editedMenuName)) return;
    if (isReduplicated(this.menu[this.currentCategory], editedMenuName, menuId))
      return;
    this.menu[this.currentCategory][menuId].name = editedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuName = ($li) => {
    if (confirm(MESSAGE.CHECK_DELETE)) {
      const menuId = $li.dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const updateMenuList = ({ target }) => {
    const { classList } = target;
    const $li = target.parentElement;
    if (classList.contains("menu-sold-out-button")) soldOutMenu($li);
    else if (classList.contains("menu-edit-button")) editMenuName($li);
    else if (classList.contains("menu-remove-button")) removeMenuName($li);
  };

  const chooseCategory = ({ target }) => {
    const isCategoryButton = target.classList.contains("cafe-category-name");
    if (!isCategoryButton) return;
    this.currentCategory = target.dataset.categoryName;
    $("#category-title").textContent = `${target.textContent} 메뉴 관리 `;
    $("#menu-name").placeholder = `${target.textContent
      .trim()
      .slice(3)} 메뉴 이름`;
    render();
  };
  const initEventListener = () => {
    $("#menu-list").addEventListener("click", updateMenuList);

    $("#menu-form").addEventListener("submit", (e) => e.preventDefault());

    $("#menu-submit-button").addEventListener("click", addMenuName);

    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return;
      addMenuName();
    });

    $("nav").addEventListener("click", chooseCategory);
  };
}

const app = new App();
app.init();

// trim polyfill
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  };
}
