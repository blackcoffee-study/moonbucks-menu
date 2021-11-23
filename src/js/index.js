import { $ } from "./utils/index.js";

const espressoMenuName = $("#espresso-menu-name");
const espressoMenuForm = $("#espresso-menu-form");
const espressoMenuSubmitButton= $("#espresso-menu-submit-button");
const espressoMenuList = $("#espresso-menu-list");

const menuNameSubmit = () => {
  espressoMenuForm.addEventListener("submit", (e) => { e.preventDefault() });
  espressoMenuName.addEventListener("keydown",(e)=>{if(e.key === "Enter") { addNewMenu() } });
  espressoMenuSubmitButton.addEventListener("click", addNewMenu)
}

const addNewMenu = () => {
  const menuName = espressoMenuName.value;
  if(menuName === "") return alert("값을 입력해주세요");
  espressoMenuList.insertAdjacentHTML("beforeend",menuListItemTemplate(menuName));
  espressoMenuName.value = "";
const menuListItemTemplate = (menuName) => {
  return `
  <li class="menu-list-item d-flex items-center py-2">
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
  </li>
  `
}

menuNameSubmit()