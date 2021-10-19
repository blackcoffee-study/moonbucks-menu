import { $ } from "./utils/dom.js";
import store from "./store/index.js";

const menuItemsTemplate = (menuItems) =>
  menuItems
    .map(
      (
        menuItem,
        index
      ) => `<li data-index=${index} class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name ${menuItem.isSoldOut ? "sold-out" : ""} ">${
        menuItem.name
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
</li>`
    )
    .join("");

let categoryName = "espresso";
const categoryNameTemplate = (categoryName) => `${categoryName} 메뉴 관리`;

const menuNameInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");

const menuCount = (count) => `총 ${count}개`;

const render = () => {
  const menuItems = store.getStorage("menuItems")[categoryName] || [];
  if (menuItems) {
    menuList.innerHTML = menuItemsTemplate(menuItems);
    $(".menu-count").innerText = menuCount(menuItems.length);
  }
};

const addMenuName = () => {
  if (menuNameInput.value === "") {
    return;
  }

  let menuItems = store.getStorage("menuItems");
  menuItems[categoryName] = menuItems[categoryName] || [];

  menuItems[categoryName].push({
    name: menuNameInput.value,
    isSoldOut: false,
  });
  menuNameInput.value = "";

  store.setStorage("menuItems", menuItems);
  render();
};

const editEventHandler = (e) => {
  if (e.target.classList.contains("menu-edit-button")) {
    const menuItem = e.target.closest("li");
    const index = menuItem.dataset.index;
    const menuName = menuItem.querySelector(".menu-name");

    const menuItems = store.getStorage("menuItems");
    menuItems[categoryName] = menuItems[categoryName] || [];

    menuName.innerText = prompt("메뉴명을 입력하세요", menuName.innerText);
    menuItems[categoryName][index].name = menuName.innerText;

    store.setStorage("menuItems", menuItems);
  }
};

const removeEventHandler = (e) => {
  if (
    e.target.classList.contains("menu-remove-button") &&
    confirm("정말로 삭제하시겠습니까?")
  ) {
    const menuItem = e.target.closest("li");
    const index = menuItem.dataset.index;

    const menuItems = store.getStorage("menuItems");
    menuItems[categoryName] = menuItems[categoryName] || [];
    menuItems[categoryName].splice(index, 1);

    store.setStorage("menuItems", menuItems);
    render();
  }
};

const changeMenuName = (e) => {
  if (e.target.classList.contains("cafe-category-name")) {
    categoryName = e.target.dataset.categoryName;
    $("#category-name-display").innerText = categoryNameTemplate(
      e.target.innerText
    );
    render();
  }
};

const toggleSoldOutEventHandler = (e) => {
  if (e.target.classList.contains("menu-sold-out-button")) {
    const menuItems = store.getStorage("menuItems");
    const menuItem = e.target.closest("li");
    const index = menuItem.dataset.index;

    menuItems[categoryName] = menuItems[categoryName] || [];
    menuItems[categoryName][index].isSoldOut =
      !menuItems[categoryName][index].isSoldOut;

    store.setStorage("menuItems", menuItems);

    render();
  }
};

function initMenuItems() {
  const menuItems = store.getStorage("menuItems");
  if (menuItems) {
    menuItems[categoryName] = menuItems[categoryName] || [];
    return;
  }

  store.setStorage("menuItems", {
    espresso: [],
    latte: [],
    americano: [],
    mocha: [],
    cappuccino: [],
  });
}

const initEventListeners = () => {
  $("#espresso-menu-submit-button").addEventListener("click", function () {
    addMenuName();
  });

  $("#espresso-menu-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addMenuName();
  });

  $("#cafe-category").addEventListener("click", changeMenuName);

  menuList.addEventListener("click", editEventHandler);
  menuList.addEventListener("click", removeEventHandler);
  menuList.addEventListener("click", toggleSoldOutEventHandler);
};

function startApp() {
  initEventListeners();
  initMenuItems();
  render();
}

startApp();
