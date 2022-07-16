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

function updateMenuName(i) {
	const newName = prompt("메뉴명을 수정하세요");

	if (!newName) {
		alert("값을 입력해주세요.");
		return;
	}
	state.update(i, new Menu(newName.trim()));
	renderMenuList();
}

function createMenuListItemElement(menu, index) {
	const li = document.createElement("li");
	li.className = "menu-list-item d-flex items-center py-2";

	const menuName = document.createElement("span")
	menuName.className = "w-100 pl-2 menu-name";
	menuName.innerHTML = menu.name;

	const editButton = document.createElement("button");
	editButton.type = "button"
	editButton.className = "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
	editButton.addEventListener("click", () => updateMenuName(index));
	editButton.innerHTML = "수정";

	const deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.className = "bg-gray-50 text-gray-500 text-sm menu-remove-button";
	deleteButton.innerHTML = "삭제";

	li.appendChild(menuName);
	li.appendChild(editButton);
	li.appendChild(deleteButton);

	return li;
}

function renderMenuList() {
	// 기존에 menuList의 innerHtml에 존재하던 <li> 모두 제거
	while (menuList.firstChild) {
		menuList.removeChild(menuList.firstChild);
	}

	// 현재 state의 해당하는 Menu 배열을 불러와, 각각의 menu를 기반으로 <li> Element를 생성하여 menuList에 삽입
	state.getMenuList().forEach(
		(menu, index) => menuList.appendChild(createMenuListItemElement(menu, index))
	);

	menuCount.innerHTML = `총 ${state.getMenuCount()}개`;
}

inputTag.addEventListener("keydown", onInputKeyDown);
submitButton.addEventListener("click", onSubmitButtonClicked);
