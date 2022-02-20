import  {$} from "./utils/dom.js";

const $menuForm = $("#espresso-menu-form");
const $menuInput = $("#espresso-menu-name");
const $btnSubmit = $("#espresso-menu-submit-button");
const $menuList = $("#espresso-menu-list");
const $numberOfMenu = $(".menu-count");

function countMenu() {
	let count = $menuList.childElementCount;
	$numberOfMenu.innerHTML = `총 ${count}개`;
}

function createNewMenu(name) {
	$menuList.innerHTML += `<li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
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
	countMenu();
}

function checkInput() {
	$menuInput.value.trim() && createNewMenu($menuInput.value);
	$menuInput.value = "";
}

function deleteMenu(e) {
	const menuLi = e.target.closest("li");
	if (confirm("정말로 삭제하시겠습니까?")) {
		$menuList.removeChild(menuLi);
		countMenu();
	}
}

function editMenu(e) {
	const menuName = e.target.previousElementSibling;
	const newName = prompt("어떤 이름으로 바꾸시겠습니까?");
	newName.trim() && (menuName.innerHTML = newName);
}

$btnSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	checkInput();
});

$menuForm.addEventListener("submit", (e) => {
	e.preventDefault();
	checkInput();
});

$menuList.addEventListener("click", (e) => {
	if (e.target.classList.contains("menu-remove-button")) return deleteMenu(e);
	if (e.target.classList.contains("menu-edit-button")) return editMenu(e);
});
