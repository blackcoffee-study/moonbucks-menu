import * as storageAPI from "./storage.js";
import * as API from "./api.js";

const $nav = document.querySelector("header > nav");
const $menuForm = document.querySelector("#menu-form");
const $nameInput = document.querySelector("#menu-name");
const $menuList = document.querySelector("#menu-list");
const $menuCount = document.querySelector(".menu-count");
const $menuHeading = document.querySelector(".heading > h2");

const CATEGORIES = ["espresso", "frappuccino", "blended", "teavana", "desert"];
let selectedCategory = "";
let menus = [];

const moonBucksApp = () => {
  selectCategory("espresso");

  $nav.addEventListener("click", handleNavigation);
  $menuForm.addEventListener("submit", handleSubmit);
};
moonBucksApp();

function handleNavigation(e) {
  e.stopPropagation();

  const $target = e.target;
  if (!$target.classList.contains("cafe-category-name")) return;

  const newCategoryName = $target.dataset.categoryName;
  if (!CATEGORIES.includes(newCategoryName)) return;

  selectCategory(newCategoryName);
}

function handleSubmit(e) {
  e.preventDefault();

  const newMenuName = $nameInput.value;
  if (!isValidMenuName(newMenuName)) return;

  API.createMenu(selectedCategory, newMenuName).then((newMenu) => {
    appendMenuItemElement(newMenu.id, newMenu.name, newMenu.isSoldOut);
    menus.push(newMenu);
    updateMenuCount();
    resetNameInput();
  });
}

function selectCategory(categoryName) {
  selectedCategory = categoryName;
  replaceMenuHeader(selectedCategory);
  loadMenus(selectedCategory);
}

/**
 * 전달받은 메뉴 이름의 유효성을 검사한다.
 * @param {string} menuName 메뉴 이름
 */
function isValidMenuName(menuName) {
  if (!menuName) return;
  const name = menuName.trim();

  if (name.length === 0) {
    alert("값을 입력해주세요.");
    return false;
  }

  return true;
}

/**
 * 전달받은 메뉴 이름으로 메뉴 아이템 엘리먼트를 생성한다.
 * @param {string} menuName 메뉴 이름
 * @param {boolean} soldOut 메뉴 품절 여부
 * @returns {HTMLLIElement} 메뉴 아이템 엘리먼트(`li`)
 */
function createMenuItemElement(menuId, menuName, soldOut) {
  const template = `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${
      soldOut ? "sold-out" : ""
    }">${menuName}</span>
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
    </li>`;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = template;

  const $menuItem = wrapper.firstElementChild;
  $menuItem.dataset.menuId = menuId;
  addEventToDeleteButton($menuItem);
  addEventToEditButton($menuItem);
  addEventToSoldOutButton($menuItem);

  return $menuItem;
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "삭제" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} $menuItem 메뉴 아이템 엘리먼트(`li`)
 */
function addEventToDeleteButton($menuItem) {
  const $removeButton = $menuItem.querySelector(".menu-remove-button");
  const $menuName = $menuItem.querySelector(".menu-name");

  $removeButton.addEventListener("click", (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      storageAPI.deleteMenu(selectedCategory, $menuName.textContent);
      $menuItem.remove();
      updateMenuCount();
    }
  });
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "수정" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} $menuItem 메뉴 아이템 엘리먼트(`li`)
 */
function addEventToEditButton($menuItem) {
  const $editButton = $menuItem.querySelector(".menu-edit-button");

  $editButton.addEventListener("click", (e) => {
    const $currentName = $menuItem.querySelector(".menu-name");
    const previousName = $currentName.textContent;
    const editedName = prompt("메뉴명을 수정하세요.", previousName);

    if (!isValidMenuName(editedName)) return;
    const menuId = $menuItem.dataset.menuId;
    API.updateMenuName(selectedCategory, menuId, editedName).then(
      (updatedMenu) => {
        $currentName.textContent = updatedMenu.name;
      }
    );
  });
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "품절" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} $menuItem 메뉴 아이템 엘리먼트(`li`)
 */
function addEventToSoldOutButton($menuItem) {
  const $soldOutButton = $menuItem.querySelector(".menu-sold-out-button");

  $soldOutButton.addEventListener("click", () => {
    const $menuName = $menuItem.querySelector("span.menu-name");
    $menuName.classList.toggle("sold-out");

    if ($menuName.classList.contains("sold-out")) {
      storageAPI.updateMenu(selectedCategory, $menuName.textContent, {
        name: $menuName.textContent,
        soldOut: true,
      });
    }
  });
}

/**
 * 전달받은 메뉴 정보로 메뉴 엘리먼트를 생성하여 메뉴 리스트에 추가한다.
 * @param {string} menuName - 메뉴 이름
 * @param {boolean} soldOut - 메뉴 품절 여부
 */
function appendMenuItemElement(menuId, menuName, soldOut = false) {
  const $menuItem = createMenuItemElement(menuId, menuName, soldOut);
  $menuList.appendChild($menuItem);
}

/**
 * 메뉴 이름 인풋값을 초기화한다.
 */
function resetNameInput() {
  if (!$nameInput) return;
  $nameInput.value = "";
}

/**
 * 메뉴 카운트를 현재 메뉴 아이템 개수로 갱신한다.
 */
function updateMenuCount() {
  const $menuItems = $menuList.querySelectorAll(".menu-list-item");
  $menuCount.textContent = `총 ${$menuItems.length}개`;
  console.log("Current Menus: ", menus);
}

/**
 * 메뉴 리스트에 있는 모든 메뉴 아이템 엘리먼트를 제거한다.
 */
function removeMenuItemElements() {
  if (!$menuList) return;

  while ($menuList.firstChild) {
    $menuList.removeChild($menuList.firstChild);
  }
}

/**
 * 전달 받은 카테고리 이름에 해당하는 메뉴들을 찾아 메뉴 리스트에 추가한다.
 * @param {string} categoryName
 */
function loadMenus(categoryName) {
  removeMenuItemElements();

  API.getMenusByCategory(categoryName).then((data) => {
    menus = data;
    for (let i = 0; i < menus.length; i++) {
      const menu = menus[i];
      appendMenuItemElement(menu.id, menu.name, menu.soldOut);
    }
    updateMenuCount();
  });
}

/**
 * 메뉴판 헤더 텍스트를 전달 받은 메뉴 이름으로 교체한다.
 * @param {string} categoryName
 */
function replaceMenuHeader(categoryName) {
  if (!CATEGORIES.includes(categoryName)) return;

  const heading = {
    espresso: "☕ 에스프레소",
    frappuccino: "🥤 프라푸치노",
    blended: "🍹 블렌디드",
    teavana: "🫖 티바나",
    desert: "🍰 디저트",
  };

  $menuHeading.textContent = `${heading[categoryName]} 메뉴 관리`;
}
