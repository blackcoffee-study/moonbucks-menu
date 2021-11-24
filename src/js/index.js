import { espressoMenuForm, menuNameInput, submitButton, espressoMenuList } from "./utils/elements.js";
import { menuListItemTemplate } from "./utils/menuListItemTemplate.js";
import menuListItemTemplate from "./utils/menuListItemTemplate.js";
import { updateMenuCount } from "./utils/updateMenuCount.js";

const menuNameSubmit = () => {
  espressoMenuForm.addEventListener("submit", (e) => { e.preventDefault() });
  menuNameInput.addEventListener("keydown",(e) => { 
    if(e.key === "Enter") { addNewMenu() } 
  });
  submitButton.addEventListener("click", addNewMenu)
}

const addNewMenu = () => {
  const menuName = menuNameInput.value;
  if(menuName === "") return alert("값을 입력해주세요");
  espressoMenuList.insertAdjacentHTML("beforeend", menuListItemTemplate(menuName));
  menuNameInput.value = "";
  updateMenuCount();
}

const editMenu = (e) => { 
  const clickedMenuItem = e.target.closest("li").querySelector(".menu-name");
  const updateMenuName = prompt("메뉴명을 수정하세요", clickedMenuItem.innerText);
  clickedMenuItem.innerText = updateMenuName;
}

const removeMenu = (e) => { 
  const clickedMenuItem = e.target.closest("li");
  const remove = confirm("정말 삭제하시겠습니까?");
  if(remove) {
    clickedMenuItem.remove();
    updateMenuCount();
  }
}

espressoMenuList.addEventListener("click", (e) => {
  if(e.target.classList.contains("menu-edit-button")) {
    editMenu(e);
  }
  if(e.target.classList.contains("menu-remove-button")) {
    removeMenu(e);
  }
});

menuNameSubmit();