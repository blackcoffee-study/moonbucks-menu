// 현재 메뉴 상태를 관리하는 변수
const state = new MenuStatus([]);

const inputTag = document.getElementById("espresso-menu-name");
const menuForm = document.getElementById("espresso-menu-form");;
const menuList = document.getElementById("espresso-menu-list");
const menuCount = document.querySelector(".menu-count");


menuForm.addEventListener("submit", onSubmitForm);
menuList.addEventListener("click", onMenuClicked);

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

function onMenuClicked(e) {
	const menuListItem = e.target.closest(".menu-list-item");
	const menuListItemIndex = Number(menuListItem?.dataset.index);

	// event target이 메뉴 <li> 안에 있지 않다면 리턴
	if (!menuListItem) {
		return;
	}

	// 클릭된 메뉴 <li> 가 메뉴 리스트 UI 내부에 존재하지 않으면 리턴
	if (!menuList.contains(menuListItem)) {
		return;
	}

	// 현재 클릭된 event target이 <button>이 아니면 리턴
	if (e.target.tagName !== "BUTTON") {
		return;
	}

	switch (e.target.dataset.action) {
		case "edit":
			updateMenuName(menuListItemIndex);
			break;
		case "delete":
			removeMenuItem(menuListItemIndex);
			break;
		default:
			console.error(`Unexpected action: ${e.target.dataset.action}`);
			return;
	}
}

function getMenuListItemHTMLString(menu, index) {
	return `
<li class="menu-list-item d-flex items-center py-2" data-index=${index}>
	<span class="w-100 pl-2 menu-name">${menu.name}</span>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button" data-action="edit">
    	수정
  	</button>
  	<button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button" data-action="delete">
		삭제
  	</button>
</li>
`;
}

function renderMenuList() {
	// 기존에 menuList의 innerHTML에 존재하던 <li> 모두 제거
	while (menuList.firstChild) {
		menuList.firstChild.remove();
	}

	// 현재 state의 해당하는 Menu 배열을 불러와, 각각의 menu를 기반으로 <li> Element를 생성하여 menuList에 삽입
	state.getMenuList().forEach(
		(menu, index) => menuList.insertAdjacentHTML("beforeend", getMenuListItemHTMLString(menu, index))
	);

	menuCount.innerText = `총 ${state.getMenuCount()}개`;
}
