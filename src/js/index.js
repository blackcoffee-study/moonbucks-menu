import { $, $$ } from "./utils/index.js";
import { getMenuItemTemplate } from "./utils/Template.js";

function App() {
  const addMenuItem = () => {
    const espressoMenuName = $("#menu-name").value;
    if (espressoMenuName === "") {
      alert("값을 입력해주세요.");
      return;
    }

    $("#menu-list").insertAdjacentHTML(
      "beforeend",
      getMenuItemTemplate(espressoMenuName)
    );
    $("#menu-name").value = "";
    updateMenuCount();
  };

  const updateMenuItem = (e) => {
    const $menuItemList = e.target.closest("li");
    const $menuName = $(".menu-name", $menuItemList);
    const updatedMenuName = prompt("메뉴명을 수정하세요", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuItem = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  const updateMenuCount = () => {
    const $menuList = $("#menu-list");
    const menuCount = $$("li", $menuList).length;
    $("#menu-count").innerText = `총 ${menuCount}개`;
  };

  $("#menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuItem();
  });

  $("#menu-submit-button").addEventListener("click", addMenuItem);

  $("#menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuItem(e);
    }
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuItem(e);
    }
  });
}

document.addEventListener("DOMContentLoaded", App);
