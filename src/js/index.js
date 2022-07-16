// 현재 메뉴 상태를 관리하는 변수
const state = new MenuStatus([]);

const inputTag = document.getElementById("espresso-menu-name");
const submitButton = document.getElementById("espresso-menu-submit-button");
const menuList = document.getElementById("espresso-menu-list");

function onInputKeyDown(e) {
    const inputValue = inputTag.value;
    const trimmedInputValueString = String(inputValue).trim();

    if (e.key === 'Enter') {
        addNewMenu(trimmedInputValueString);
        inputTag.value = '';
    }
}

function onSubmitButtonClicked(e) {
    const inputValue = inputTag.value;
	const trimmedInputValueString = String(inputValue).trim();

    addNewMenu(trimmedInputValueString);
    inputTag.value = "";
}

function addNewMenu(menuName) {
	const newMenu = new Menu(menuName);
	state.add(newMenu);
    renderMenuList();
}

function createMenuListItemElementStr(menu) {
    return `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${menu.name}</span>
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
}

function renderMenuList() {
    const menuLiTagStrList = state.getMenuList().map(
        (menu) => createMenuListItemElementStr(menu)
    );
    menuList.innerHTML = menuLiTagStrList.join("");
}


inputTag.addEventListener("keydown", onInputKeyDown);
submitButton.addEventListener("click", onSubmitButtonClicked);
