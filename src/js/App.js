import { $ } from "./utils/utils.js";
import { menuItemTemplate } from "./menuItemTemplate.js";

export default function MoonBucks() {
  const menuForm = $("#espresso-menu-form");
  const menuInput = $("#espresso-menu-name");
  const menuList = $("#espresso-menu-list");
  const menuCount = $(".menu-count");

  this.init = () => {
    setEventListener();
  };

  // EventListener
  const setEventListener = () => {
    menuForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (menuInput.value.trim()) addMenuItem(menuInput.value);
      else alert("메뉴 이름을 입력해주세요!");
      menuInput.value = "";
      countMenu();
    });

    menuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenu(e);
      }
      if (e.target.classList.contains("menu-edit-button")) {
        editMenu(e);
      }
      countMenu();
    });
  };

  // 메뉴 handle 함수
  const addMenuItem = (name) => {
    menuList.insertAdjacentHTML("afterbegin", menuItemTemplate(name));
  };

  const editMenu = (e) => {
    e.target.previousSibling.previousSibling.innerText = window.prompt(
      "메뉴를 수정해주세요",
      e.target.previousSibling.previousSibling.innerText
    );
  };

  const removeMenu = (e) => {
    if (window.confirm("메뉴를 삭제하시겠습니까?"))
      e.target.parentNode.remove();
  };

  const countMenu = () => {
    menuCount.innerText = `총 ${menuList.childElementCount}개`;
  };
}
