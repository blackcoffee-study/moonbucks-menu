import { $, $All } from "./utils/dom.js";
import storage from "./utils/manageStorage.js";
import { store } from "./store/store.js";

const $menuForm = $("#espresso-menu-form");
const $menuInput = $("#espresso-menu-name");
const $btnSubmit = $("#espresso-menu-submit-button");
const $menuList = $("#espresso-menu-list");
const $numberOfMenu = $(".menu-count");
const $menuTitle = $(".menu-title");
const $menuCategory = $All(".cafe-category-name")

let menuType = 'espresso';
let id = 1;

const initItem = storage.getLocalStorage(menuType);

function setInitMenu(items){
  if (items !== null){
		items.forEach((item) => createNewMenu(item));
  }
}


function countMenu() {
	const count = $menuList.childElementCount;
	$numberOfMenu.innerHTML = `총 ${count}개`;
}

function setStorage(name){
  const item = {name, id}
  store[menuType].push(item);
  id += 1;
  storage.setLocalStorage(menuType);
  createNewMenu(item)
}

function createNewMenu(item) {
	$menuList.innerHTML += `<li class="menu-list-item d-flex items-center py-2" id=${item.id}>
  <span class="w-100 pl-2 menu-name">${item.name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
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
	$menuInput.value.trim() && setStorage($menuInput.value);
	$menuInput.value = "";
}

function soldOutMenu(e){
  const menuName = e.target.previousElementSibling;
  menuName.classList.toggle("sold-out");
}

function deleteMenu(e) {
	const menuLi = e.target.closest("li");
	if (confirm("정말로 삭제하시겠습니까?")) {
		store[menuType].filter(item => item.id !== +menuLi.id)
    storage.setLocalStorage(menuType);		
    $menuList.removeChild(menuLi);
		countMenu();
	}
}

function editMenu(e) {
	const menuLi = e.target.closest("li");
  const menuName = menuLi.children[0];
	const newName = prompt("어떤 이름으로 바꾸시겠습니까?");
  store[menuType].map(item => {
    if (item.id === +menuLi.id){
      item.name = newName;
    }
    console.log(store[menuType])
    storage.setLocalStorage(menuType);
  })
	newName.trim() && (menuName.innerText = newName);
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
  if (e.target.classList.contains("menu-sold-out-button")) return soldOutMenu(e);
	if (e.target.classList.contains("menu-remove-button")) return deleteMenu(e);
	if (e.target.classList.contains("menu-edit-button")) return editMenu(e);
});

function reset(item){
  $menuList.innerHTML = null;
  setInitMenu(item);
}

$menuCategory.forEach(category => {
  category.addEventListener("click", e => {
    $menuList.innerHTML= null;
    $menuTitle.innerText = `${e.target.innerText} 메뉴 관리`;
    menuType = category.dataset['category-name'];
    const item = storage.getLocalStorage(menuType);
    reset(item)
  })
})




function init(){
  setInitMenu(initItem);
}

init();