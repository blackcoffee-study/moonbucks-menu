const elMenuForm = document.querySelector("#espresso-menu-form");
const elNameInput = document.querySelector("#espresso-menu-name");
const elMenuList = document.querySelector("#espresso-menu-list");
const elMenuCount = document.querySelector(".menu-count");

const moonBucks = () => {
  elMenuForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // 1. 유효성 검사
    const newMenuName = elNameInput.value;
    if (!isValidMenuName(newMenuName)) return;

    // 2. 메뉴 생성 및 이벤트 등록
    const elMenuItem = createMenuItemElement(newMenuName);
    addEditButtonEvent(elMenuItem);
    addRemoveButtonEvent(elMenuItem);

    // 3. 메뉴 추가 및 인풋 초기화
    addMenu(elMenuItem);
    resetNameInput();
  });
};
moonBucks();

/**
 * 전달받은 메뉴 이름의 유효성을 검사한다.
 * @param {string} menuName 메뉴 이름
 */
const isValidMenuName = (menuName) => {
  if (!menuName) return;
  const name = menuName.trim();

  if (name.length === 0) {
    alert("값을 입력해주세요.");
    return false;
  }

  return true;
};

/**
 * 전달받은 메뉴 이름으로 메뉴 아이템 엘리먼트를 생성한다.
 * @param {string} menuName 메뉴 이름
 * @returns {HTMLLIElement} 메뉴 아이템 엘리먼트(`li`)
 */
const createMenuItemElement = (menuName) => {
  const template = `<li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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
  return wrapper.firstElementChild;
};

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "삭제" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
const addRemoveButtonEvent = (elMenuItem) => {
  const elRemoveButton = elMenuItem.querySelector(".menu-remove-button");

  elRemoveButton.addEventListener("click", (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      elMenuItem.remove();
      updateMenuCount();
    }
  });
};

/**
 * 전달 받은 메뉴 아이템 엘리먼트에 "수정" 버튼 이벤트를 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
const addEditButtonEvent = (elMenuItem) => {
  const elEditButton = elMenuItem.querySelector(".menu-edit-button");

  elEditButton.addEventListener("click", (e) => {
    const elCurrentName = elMenuItem.querySelector(".menu-name");
    const editedName = prompt(
      "메뉴명을 수정하세요.",
      elCurrentName.textContent
    );

    if (!isValidMenuName(editedName)) return;
    elCurrentName.textContent = editedName;
  });
}

/**
 * 전달받은 메뉴 아이템 엘리먼트를 메뉴 리스트에 추가한다.
 * @param {HTMLLIElement} elMenuItem 메뉴 아이템 엘리먼트(`li`)
 */
const addMenu = (elMenuItem) => {
  elMenuList.appendChild(elMenuItem);
  updateMenuCount();
};

/**
 * 메뉴 이름 인풋값을 초기화한다.
 */
const resetNameInput = () => {
  if (!elNameInput) return;
  elNameInput.value = "";
};

/**
 * 메뉴 카운트를 현재 메뉴 아이템 개수로 갱신한다.
 */
const updateMenuCount = () => {
  const elMenuItems = elMenuList.querySelectorAll(".menu-list-item");
  elMenuCount.textContent = `총 ${elMenuItems.length}개`;
};
