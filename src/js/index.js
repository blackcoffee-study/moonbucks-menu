// 현재 메뉴 상태를 관리하는 변수
const state = new MenuStatus([]);

const inputTag = document.getElementById("espresso-menu-name");
const menuForm = document.getElementById("espresso-menu-form");;
const menuList = document.getElementById("espresso-menu-list");
const menuCount = document.getElementsByClassName("menu-count")[0];


menuForm.addEventListener("submit", onSubmitForm);

function onSubmitForm(e) {
	e.preventDefault();
	const inputString = String(inputTag.value).trim();
	// 사용자가 <input>에 메뉴명 입력 없이 "확인" 버튼 클릭 시 예외 처리시키는 부분
	if (!inputString) {
		alert("값을 입력해주세요.");
		return;
	}

	addNewMenu(inputString);
	inputTag.value = "";
}

function addNewMenu(menuName) {
	const newMenu = new Menu(menuName);
	state.add(newMenu);
	renderMenuList();
}

function updateMenuName(index) {
	const newName = prompt("메뉴명을 수정하세요");

	if (!newName) {
		alert("값을 입력해주세요.");
		return;
	}
	state.update(index, new Menu(newName.trim()));
	renderMenuList();
}

function removeMenuItem(index) {
	const isConfrimed = confirm("정말 삭제하시겠습니까?");
	
	if (!isConfrimed) {
		return;
	}

	state.delete(index);
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
	deleteButton.addEventListener("click", () => removeMenuItem(index));
	deleteButton.innerHTML = "삭제";

	li.insertAdjacentElement("beforeend", menuName);
	li.insertAdjacentElement("beforeend", editButton);
	li.insertAdjacentElement("beforeend", deleteButton);

	return li;
}

function renderMenuList() {
	// 기존에 menuList의 innerHtml에 존재하던 <li> 모두 제거
	while (menuList.firstChild) {
		menuList.firstChild.remove();
	}

	// 현재 state의 해당하는 Menu 배열을 불러와, 각각의 menu를 기반으로 <li> Element를 생성하여 menuList에 삽입
	state.getMenuList().forEach(
		(menu, index) => menuList.insertAdjacentElement("beforeend", createMenuListItemElement(menu, index))
	);

	menuCount.innerHTML = `총 ${state.getMenuCount()}개`;
}
