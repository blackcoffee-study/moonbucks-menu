const menuFormElement = document.querySelector("#espresso-menu-form");
const nameInputElement = menuFormElement.querySelector("#espresso-menu-name");
const menuListElement = document.querySelector("#espresso-menu-list");
const menuCountElement = document.querySelector(".menu-count");

menuFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  // 1. 메뉴 이름 유효성 검사
  const newMenuName = nameInputElement.value;
  if (!isValidMenuName(newMenuName)) return;
  
  // 2. 메뉴 엘리먼트 생성 및 이벤트 등록
  const menuElement = createMenuElement(newMenuName);
  const editButton = menuElement.querySelector(".menu-edit-button");
  const deleteButton = menuElement.querySelector(".menu-remove-button");
  
  editButton.addEventListener("click", (event) => {
    const menuName = menuElement.querySelector(".menu-name");

    const name = prompt("메뉴명을 수정하세요.", menuName.textContent);
    if (isValidMenuName(name)) {
      menuName.textContent = name;
    }
  })

  deleteButton.addEventListener("click", (event) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      menuElement.remove();
      refreshMenuCount();
    }
  })

  // 3. 메뉴 추가 및 초기화
  menuListElement.appendChild(menuElement);
  nameInputElement.value = "";
  refreshMenuCount();
});

/**
 * 메뉴 이름 유효성을 검사한다.
 * @param {string} menuName 
 */
const isValidMenuName = (menuName) => {
  const name = menuName.trim();

  if (name.length === 0) {
    alert("값을 입력해주세요.")
    return false;
  }

  return true;
};

/**
 * 메뉴 엘리먼트를 생성한다.
 * @param {string} menuName
 * @returns {HTMLLIElement} 메뉴 엘리먼트(`li`)
 */
const createMenuElement = (menuName) => {
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
  const placeholder = document.createElement("div");
  placeholder.innerHTML = template;
  return placeholder.firstElementChild;
};

/**
 * 메뉴 개수(`총 _개`)를 현재 아이템 개수로 갱신한다.
 */
const refreshMenuCount = () => {
  const menuItems = document.querySelectorAll(".menu-list-item");
  menuCountElement.textContent = `총 ${menuItems.length}개`;
}