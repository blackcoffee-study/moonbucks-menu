import * as storageAPI from "./storage.js";

const $nav = document.querySelector("header > nav");
const elMenuForm = document.querySelector("#espresso-menu-form");
const elNameInput = document.querySelector("#espresso-menu-name");
const elMenuList = document.querySelector("#espresso-menu-list");
const elMenuCount = document.querySelector(".menu-count");

const CATEGORIES = ["espresso", "frappuccino", "blended", "teavana", "desert"];
let selectedCategory = "";

const moonBucksApp = () => {
  selectedCategory = "espresso";
  initializeMenuElements(selectedCategory);

  // 카테고리 선택 이벤트
  $nav.addEventListener("click", (e) => {
    e.stopPropagation();

    const $target = e.target;
    if (!$target.classList.contains("cafe-category-name")) return;

    const newCategoryName = $target.dataset.categoryName;
    if (!CATEGORIES.includes(newCategoryName)) return;

    selectedCategory = newCategoryName;
    initializeMenuElements(selectedCategory);
    updateMenuCount();
  });

  // 메뉴 제출 이벤트
  elMenuForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newMenuName = elNameInput.value;
    if (!isValidMenuName(newMenuName)) return;

    storageAPI.createMenu(selectedCategory, newMenuName);
    appendMenuElement(newMenuName);

    updateMenuCount();
    resetNameInput();
  });
};
moonBucksApp();

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
function createMenuItemElement(menuName, soldOut) {
  const template = `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name ${soldOut ? 'sold-out' : ''}">${menuName}</span>
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
  addEventToDeleteButton($menuItem);
  addEventToEditButton($menuItem);
  addEventToSoldOutButton($menuItem);

  return $menuItem;
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "삭제" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
function addEventToDeleteButton(elMenuItem) {
  const elRemoveButton = elMenuItem.querySelector(".menu-remove-button");

  elRemoveButton.addEventListener("click", (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      elMenuItem.remove();
      updateMenuCount();
    }
  });
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "수정" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
function addEventToEditButton(elMenuItem) {
  const elEditButton = elMenuItem.querySelector(".menu-edit-button");

  elEditButton.addEventListener("click", (e) => {
    const elCurrentName = elMenuItem.querySelector(".menu-name");
    const editedName = prompt(
      "메뉴명을 수정하세요.",
      elCurrentName.textContent
    );

    // if (!isValidMenuName(editedName)) return;
    elCurrentName.textContent = editedName;
  });
}

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "품절" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
 function addEventToSoldOutButton($menuItem) {
  const $soldOutButton = $menuItem.querySelector(".menu-sold-out-button");

  $soldOutButton.addEventListener("click", () => {
    const $menuName = $menuItem.querySelector("span.menu-name");
    $menuName.classList.toggle("sold-out");

    if ($menuName.classList.contains("sold-out")) {
      storageAPI.updateMenu(
        selectedCategory,
        $menuName.textContent, 
        {
          name: $menuName.textContent,
          soldOut: true,
        }
      );
    }
  })
 }

/**
 * 전달받은 메뉴 이름으로 메뉴 엘리먼트를 생성하여 메뉴 리스트에 추가한다.
 * @param {string} menuName - 메뉴 이름
 * @param {boolean} soldOut - 메뉴 품절 여부
 */
function appendMenuElement(menuName, soldOut = false) {
  const $menuItem = createMenuItemElement(menuName, soldOut);
  elMenuList.appendChild($menuItem);
}

/**
 * 메뉴 이름 인풋값을 초기화한다.
 */
function resetNameInput() {
  if (!elNameInput) return;
  elNameInput.value = "";
}

/**
 * 메뉴 카운트를 현재 메뉴 아이템 개수로 갱신한다.
 */
function updateMenuCount() {
  const elMenuItems = elMenuList.querySelectorAll(".menu-list-item");
  elMenuCount.textContent = `총 ${elMenuItems.length}개`;
}

/**
 * 메뉴 리스트에 있는 모든 메뉴 아이템 엘리먼트를 제거한다.
 */
function removeMenuItemElements() {
  if (!elMenuList) return;

  while (elMenuList.firstChild) {
    elMenuList.removeChild(elMenuList.firstChild);
  }
}

/**
 * 전달받은 카테고리의 모든 메뉴 아이템 엘리먼트를 메뉴 리스트에 추가한다.
 * @param {string} categoryName
 */
function initializeMenuElements(categoryName) {
  removeMenuItemElements();
  
  const categoryMenus = storageAPI.loadMenuData()[categoryName];
  if (!categoryMenus) return;

  for (let i = 0; i < categoryMenus.length; i++) {
    const menu = categoryMenus[i];
    appendMenuElement(menu.name, menu.soldOut);
  }
}
