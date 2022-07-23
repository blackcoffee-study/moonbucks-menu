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
	renderMenu();
}

function updateMenuListElementView(menuListItem, newMenu) {
	const menuNameSpan = menuListItem.querySelector("span");

	menuNameSpan.classList.toggle("sold-out", !newMenu.isPurchasable);
}

function toggleMenuPurchasable(menuListItem, index) {
	const currentMenu = state.getMenu(index);
	const updatedMenu = new Menu(currentMenu.name, !currentMenu.isPurchasable);

	// data update
	state.update(index, updatedMenu);

	// ui update
	updateMenuListElementView(menuListItem, updatedMenu);
}

function updateMenuName(menuListItem, index) {
	const newName = prompt("메뉴명을 수정하세요");
	const trimmedNewName = newName.trim();

	if (!trimmedNewName) {
		alert("값을 입력해주세요.");
		return;
	}
	// data update
	state.update(index, new Menu(trimmedNewName));

	// ui update
	// 메뉴 리스트 전체 render를 새로하는게 아닌, 
	// 변경이 발생한 해당 menu list item만 수정한다
	menuListItem.querySelector('span').innerText = trimmedNewName;
}

function removeMenuItem(menuListItem, index) {
	const isConfrimed = confirm("정말 삭제하시겠습니까?");

	if (!isConfrimed) {
		return;
	}
	// data update
	state.delete(index);

	// ui update
	// 메뉴 리스트 전체 render를 새로하는게 아닌,
	// 변경이 발생한 해당 menu list item만 삭제 후
	// 메뉴 개수 부분만 새로 render
	menuListItem.remove();
	renderMenuCount();
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
			updateMenuName(menuListItem, menuListItemIndex);
			break;
		case "delete":
			removeMenuItem(menuListItem, menuListItemIndex);
			break;
		case "toggle-purchasable":
			toggleMenuPurchasable(menuListItem, menuListItemIndex);
			break;
		default:
			console.error(`Unexpected action: ${e.target.dataset.action}`);
			return;
	}
}

function getMenuListItemHTMLString(menu, index) {
	const spanClassName = menu.isPurchasable
		? "w-100 pl-2 menu-name"
		: "w-100 pl-2 menu-name sold-out";

	return `
<li class="menu-list-item d-flex items-center py-2" data-index=${index}>
	<span class="${spanClassName}">${menu.name}</span>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button" data-action="toggle-purchasable">
		품절
 	</button>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button" data-action="edit">
    	수정
  	</button>
  	<button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button" data-action="delete">
		삭제
  	</button>
</li>
`;
}

function renderMenu() {
	renderMenuList();
	renderMenuCount();
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
}

function renderMenuCount() {
	menuCount.innerText = `총 ${state.getMenuCount()}개`;
}
