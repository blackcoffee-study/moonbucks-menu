import { $ } from "./utils/utils.js";
import { menuItemTemplate } from "./menuItemTemplate.js";
import { store } from "./store.js";

export default function MoonBucks() {
  const menuForm = $("#espresso-menu-form");
  const menuInput = $("#espresso-menu-name");
  const menuList = $("#espresso-menu-list");
  const menuCount = $(".menu-count");
  const menuType = $("nav");
  const menuTypeHeading = $(".heading");

  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    dessert: [],
  };

  this.currentType = "espresso";

  this.init = () => {
    setEventListener();
    if (store.getItem()) {
      this.menu = store.getItem();
    }
    if (this.menu) render();
  };

  // render
  const render = () => {
    menuList.innerHTML = "";
    this.menu[this.currentType].map((item) => {
      menuList.innerHTML += menuItemTemplate(item.name);
    });
    countMenu();
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
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldoutMenu(e);
      }
      countMenu();
    });

    menuType.addEventListener("click", (e) => {
      const isButton = e.target.classList.contains("cafe-category-name");
      if (isButton) {
        this.currentType = e.target.dataset.categoryName;
        menuTypeHeading.querySelector(
          "h2"
        ).innerText = `${this.currentType} 메뉴 관리`;
        render();
      }
    });
  };

  // 메뉴 handle 함수
  const addMenuItem = (name) => {
    this.menu[this.currentType].push({ name });
    store.setItem(this.menu);
    render();
  };

  const editMenu = (e) => {
    const oldMenu = e.target.closest("li").querySelector(".menu-name");
    const newMenuName = window.prompt("메뉴를 수정해주세요", oldMenu.innerText);
    this.menu[this.currentType].map((item, idx) => {
      if (item.name === oldMenu.innerText) {
        this.menu[this.currentType][idx].name = newMenuName;
      }
    });
    store.setItem(this.menu);
    oldMenu.innerText = newMenuName;
  };

  const removeMenu = (e) => {
    if (window.confirm("메뉴를 삭제하시겠습니까?")) {
      const selectedMenu = e.target.parentNode;
      selectedMenu.remove();
      this.menu[this.currentType] = this.menu[this.currentType].filter(
        (item) =>
          item.name !== selectedMenu.querySelector(".menu-name").innerText
      );
      store.setItem(this.menu);
    }
  };

  const soldoutMenu = (e) => {
    const spanClassList = e.target.closest("li").childNodes[1].classList;
    if (spanClassList.contains("sold-out")) {
      spanClassList.remove("sold-out");
    } else {
      spanClassList.add("sold-out");
    }
  };

  const countMenu = () => {
    menuCount.innerText = `총 ${menuList.childElementCount}개`;
  };
}
