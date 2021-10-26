import { $ } from "./utils/dom.js";

const menuItemsTemplate = (menuItems) =>
  menuItems
    .map(
      (menuItem) => `<li data-id=${
        menuItem.id
      } class="menu-list-item d-flex items-center py-2">
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
const menuNameInput = $("#espresso-menu-name");
const menuList = $("#espresso-menu-list");
const BASE_URL = "http://localhost:3000";

const ApiMethod = {
  async getAllMenuItemsFromServer() {
    const res = await fetch(`${BASE_URL}/api/category/${categoryName}/menu`);
    return res.json();
  },
  async postMenuItemToServer() {
    const res = await fetch(`${BASE_URL}/api/category/${categoryName}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: menuNameInput.value,
      }),
    });
    renderIfSuccessOrAlert(!res.ok, "추가 실패하였습니다.");
  },
  async putMenuItemNameToServer(id, inputMenuItemName) {
    const res = await fetch(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: inputMenuItemName }),
      }
    );
    renderIfSuccessOrAlert(!res.ok, "수정 실패하였습니다.");
  },
  async putMenuItemSoldoutToServer(id) {
    const res = await fetch(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}/soldout`,
      {
        method: "PUT",
      }
    );
    renderIfSuccessOrAlert(!res.ok, "품절 실패하였습니다.");
  },
  async deleteMenuItemToServer(id) {
    const res = await fetch(
      `${BASE_URL}/api/category/${categoryName}/menu/${id}`,
      {
        method: "DELETE",
      }
    );
    renderIfSuccessOrAlert(!res.ok, "삭제 실패하였습니다.");
  },
};

const menuCount = (count) => `총 ${count}개`;
const categoryNameTemplate = (categoryName) => `${categoryName} 메뉴 관리`;
const renderIfSuccessOrAlert = async (isFailed, message) => {
  menuNameInput.value = "";
  if (isFailed) {
    alert(message);
    return;
  }

  const menuItems = await ApiMethod.getAllMenuItemsFromServer();
  if (menuItems) {
    menuList.innerHTML = menuItemsTemplate(menuItems);
    $(".menu-count").innerText = menuCount(menuItems.length);
  }
};

const addMenuName = async () => {
  if (menuNameInput.value === "") {
    return;
  }
  await ApiMethod.postMenuItemToServer();
};

const editEventHandler = async (e) => {
  if (e.target.classList.contains("menu-edit-button")) {
    const menuItem = e.target.closest("li");
    const menuName = menuItem.querySelector(".menu-name");
    const inputMenuItemName = prompt("메뉴명을 입력하세요", menuName.innerText);
    await ApiMethod.putMenuItemNameToServer(
      menuItem.dataset.id,
      inputMenuItemName
    );
  }
};

const removeEventHandler = async (e) => {
  if (
    e.target.classList.contains("menu-remove-button") &&
    confirm("정말로 삭제하시겠습니까?")
  ) {
    const menuItem = e.target.closest("li");
    await ApiMethod.deleteMenuItemToServer(menuItem.dataset.id);
  }
};

const changeMenuName = async (e) => {
  if (e.target.classList.contains("cafe-category-name")) {
    categoryName = e.target.dataset.categoryName;
    $("#category-name-display").innerText = categoryNameTemplate(
      e.target.innerText
    );
    renderIfSuccessOrAlert(false);
  }
};

const toggleSoldOutEventHandler = async (e) => {
  if (e.target.classList.contains("menu-sold-out-button")) {
    const menuItem = e.target.closest("li");
    await ApiMethod.putMenuItemSoldoutToServer(menuItem.dataset.id);
  }
};

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

const startApp = () => {
  initEventListeners();
  renderIfSuccessOrAlert(false);
};

startApp();
