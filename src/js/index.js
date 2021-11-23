import {
  espressoMenuName,
  espressoMenuForm, 
  espressoMenuSubmitButton, 
  espressoMenuList, 
  menuCount
} from "./utils/elements.js";


const menuNameSubmit = () => {
  espressoMenuForm.addEventListener("submit", (e) => { e.preventDefault() });
  espressoMenuName.addEventListener("keydown",(e) => { 
    if(e.key === "Enter") { addNewMenu() } 
  });
  espressoMenuSubmitButton.addEventListener("click", addNewMenu)
}

const addNewMenu = () => {
  const menuName = espressoMenuName.value;
  if(menuName === "") return alert("값을 입력해주세요");
  espressoMenuList.insertAdjacentHTML("beforeend", menuListItemTemplate(menuName));
  espressoMenuName.value = "";
  updateMenuCount();
}

const updateMenuCount = () => { 
  const count = espressoMenuList.querySelectorAll("li").length;
  menuCount.innerText = `총 ${count}개`;
}

const updateMenu = () => { 
  espressoMenuList.addEventListener("click", (e) => {
    if(e.target.classList.contains("menu-edit-button")) {
      const clickedMenuItem = e.target.closest("li").querySelector(".menu-name");
      const updateMenuName = prompt("메뉴명을 수정하세요", clickedMenuItem.innerText);
      clickedMenuItem.innerText = updateMenuName;
    }
  });
}
const removeMenu = () => { 
  espressoMenuList.addEventListener("click", (e) => {
    if(e.target.classList.contains("menu-remove-button")) {
      const clickedMenuItem = e.target.closest("li");
      const remove = confirm("정말 삭제하시겠습니까?");
      if(remove) {
        clickedMenuItem.remove();
        updateMenuCount();
      };
    }
  });
};

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

menuNameSubmit();
updateMenu();
removeMenu();