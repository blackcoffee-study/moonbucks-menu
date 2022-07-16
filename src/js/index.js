// 현재 메뉴 상태를 관리하는 변수
const state = new MenuStatus([]);

const inputTag = document.getElementById("espresso-menu-name");
const submitButton = document.getElementById("espresso-menu-submit-button");
const menuList = document.getElementById("espresso-menu-list");
const menuCount = document.getElementsByClassName("menu-count")[0];

function onInputKeyDown(e) {
	const inputValue = inputTag.value;
	const trimmedInputValueString = String(inputValue).trim();

	if (e.key === "Enter" && !e.isComposing) {
		// 사용자가 <input>에 메뉴명 입력 없이 "Enter" 입력 시 예외 처리시키는 부분
		if (!trimmedInputValueString) {
			alert("값을 입력해주세요.");
			return;
		}
		addNewMenu(trimmedInputValueString);
		inputTag.value = "";
	}
}

function onSubmitButtonClicked(e) {
	const inputValue = inputTag.value;
	const trimmedInputValueString = String(inputValue).trim();

	// 사용자가 <input>에 메뉴명 입력 없이 "확인" 버튼 클릭 시 예외 처리시키는 부분
	if (!inputValue) {
		alert("값을 입력해주세요.");
		return;
	}

	addNewMenu(trimmedInputValueString);
	inputTag.value = "";
}

function addNewMenu(menuName) {
	const newMenu = new Menu(menuName);
	state.add(newMenu);
	renderMenuList();
}

function createMenuListItemElementStr(menu) {
	return `
<li class="menu-list-item d-flex items-center py-2">
	<span class="w-100 pl-2 menu-name">${menu.name}</span>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button>
</li>`;
}

function renderMenuList() {
	const menuLiTagStrList = state.getMenuList().map(
		(menu) => createMenuListItemElementStr(menu)
	);
	menuList.innerHTML = menuLiTagStrList.join("");
	menuCount.innerHTML = `총 ${state.getMenuCount()}개`;
}

inputTag.addEventListener("keydown", onInputKeyDown);
submitButton.addEventListener("click", onSubmitButtonClicked);
