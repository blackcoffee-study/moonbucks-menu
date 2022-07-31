import Menu from '../model/Menu.js';
import MenuStatus from '../model/MenuStatus.js';
import {MenuTypeUtil} from '../model/MenuType.js';

// 현재 메뉴 상태를 관리하는 변수
const state = MenuStatus.loadOrCreateNewMenuStatus();

const inputTag = document.getElementById("espresso-menu-name");
const menuForm = document.getElementById("espresso-menu-form");;
const menuList = document.getElementById("espresso-menu-list");
const menuCount = document.querySelector(".menu-count");
const menuHeader = document.querySelector(".heading h2");
const menuTypeSelectButtonWrapper = document.querySelector("header nav");

menuForm.addEventListener("submit", onSubmitForm);
menuList.addEventListener("click", onMenuClicked);
menuTypeSelectButtonWrapper.addEventListener("click", onMenuTypeClicked);
document.addEventListener("DOMContentLoaded", renderMenu);

function onSubmitForm(e) {
	e.preventDefault();
	const inputString = inputTag.value?.trim();
	// 사용자가 <input>에 메뉴명 입력 없이 "확인" 버튼 클릭 시 예외 처리시키는 부분
	if (!inputString) {
		alert("값을 입력해주세요.");
		return;
	}

	addNewMenu(inputString);
	inputTag.value = "";
}

function addNewMenu(menuName) {
	const newMenu = new Menu(state.getSelectedMenuType(), menuName);
	state.add(newMenu);
	renderMenu();
}

function updateMenuListElementView(menuListItem, newMenu) {
	const menuNameSpan = menuListItem.querySelector(".menu-name");
	// 새로 생성된 메뉴 newMenu의 id 값으로 <li> 엘리먼트 data-id 속성 업데이트
	menuListItem.dataset.id = newMenu.id;
	// '품절' 관련 ui 업데이트
	menuNameSpan.classList.toggle("sold-out", newMenu.isSoldOut);
	// '메뉴 이름' 관련 ui 업데이트
	menuNameSpan.innerText = newMenu.name;
}

function toggleMenuSoldOut(menuListItem, menuId) {
	const currentMenu = state.getMenu(menuId);
	const updatedMenu = new Menu(state.getSelectedMenuType(), currentMenu.name, !currentMenu.isSoldOut);

	// data update
	state.update(menuId, updatedMenu);

	// ui update
	updateMenuListElementView(menuListItem, updatedMenu);
}

function updateMenuName(menuListItem, menuId) {
	const currentMenu = state.getMenu(menuId);
	const newName = prompt("메뉴명을 수정하세요");
	const trimmedNewName = newName.trim();

	if (!trimmedNewName) {
		alert("값을 입력해주세요.");
		return;
	}
	const updatedMenu = new Menu(state.getSelectedMenuType(), trimmedNewName, currentMenu.isSoldOut);
	
	// data update
	state.update(menuId, updatedMenu);

	// ui update
	updateMenuListElementView(menuListItem, updatedMenu);
}

function removeMenuItem(menuListItem, menuId) {
	const isConfirmed = confirm("정말 삭제하시겠습니까?");

	if (!isConfirmed) {
		return;
	}
	// data update
	state.delete(menuId);

	// ui update
	// 메뉴 리스트 전체 render를 새로하는게 아닌,
	// 변경이 발생한 해당 menu list item만 삭제 후
	// 메뉴 개수 부분만 새로 render
	menuListItem.remove();
	renderMenuCount();
}

function onMenuClicked(e) {
	const menuListItem = e.target.closest(".menu-list-item");
	const menuListItemId = menuListItem?.dataset.id;

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
			updateMenuName(menuListItem, menuListItemId);
			break;
		case "delete":
			removeMenuItem(menuListItem, menuListItemId);
			break;
		case "toggle-soldout":
			toggleMenuSoldOut(menuListItem, menuListItemId);
			break;
		default:
			console.error(`Unexpected action: ${e.target.dataset.action}`);
			return;
	}
}

function onMenuTypeClicked(e) {
	const clickedMenuTypeButton = e.target.closest(".cafe-category-name");

	// event target이 menuTypeSelectButtonWrapper 안에 있지 않다면 리턴
	if (!clickedMenuTypeButton) {
		return;
	}

	// 현재 클릭된 event target이 <button>이 아니면 리턴
	if (e.target.tagName !== "BUTTON") {
		return;
	}

	const clickedMenuType = e.target.dataset.categoryName;
	// 현재 클릭된 <button>의 "data-category-name" 속성에 할당된 값이 MenuType에 정의된 값이 아니라면 리턴
	if (!MenuTypeUtil.isMenuType(clickedMenuType)) {
		return;
	}

	state.setSelectedMenuType(clickedMenuType);
	renderMenu();
}

function getMenuListItemHTMLString(menu) {
	const soldOutStatusClassName = menu.isSoldOut ? "sold-out" : "";

	return `
<li class="menu-list-item d-flex items-center py-2" data-id=${menu.id}>
	<span class="w-100 pl-2 menu-name ${soldOutStatusClassName}">${menu.name}</span>
	<button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button" data-action="toggle-soldout">
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
	renderMenuHeader();
}

function renderMenuList() {
	// 기존에 menuList의 innerHTML에 존재하던 <li> 모두 제거
	while (menuList.firstChild) {
		menuList.firstChild.remove();
	}

	// 현재 state의 해당하는 Menu 배열을 불러와, 각각의 메뉴들을 renderMenuListItem 함수 호출
	state.getMenuList().forEach(renderMenuListItem);
}

function renderMenuListItem(menu) {
	// 입력받은 menu를 기반으로 <li> Element를 생성하여 menuList에 삽입
	menuList.insertAdjacentHTML("beforeend", getMenuListItemHTMLString(menu));
}

function renderMenuCount() {
	menuCount.innerText = `총 ${state.getMenuCount()}개`;
}

function renderMenuHeader() {
	const currentMenuTypeKorName = MenuTypeUtil.getMenuTypeKorName(state.getSelectedMenuType());
	menuHeader.innerText = `${currentMenuTypeKorName} 메뉴 관리`;
}
