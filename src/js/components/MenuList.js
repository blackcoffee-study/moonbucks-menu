import {
  $,
  $all,
  createCustomElement,
  createCustomButton,
} from "../utils/dom.js";
import { MESSAGE, CATEGORY } from "../constants/index.js";

const MenuList = (menuCategory, menuData) => {
  const $menuForm = $("#espresso-menu-form");
  const $menuInput = $(".input-field");
  const $menuCount = $(".menu-count");
  const $menuList = $("#espresso-menu-list");
  const $categoryName = $(".category-name");
  const $categoryButton = $all(".cafe-category-name");

  // 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다
  const changeCategory = ({ target }) => {
    const categoryName = target.dataset["categoryName"];
    switch (categoryName) {
      case "espresso":
        $categoryName.innerHTML = CATEGORY.ESPRESSO;
        break;
      case "frappuccino":
        $categoryName.innerHTML = CATEGORY.FRAPPUCCINO;
        break;
      case "blended":
        $categoryName.innerHTML = CATEGORY.BLENDED;
        break;
      case "teavana":
        $categoryName.innerHTML = CATEGORY.TEAVANA;
        break;
      case "dessert":
        $categoryName.innerHTML = CATEGORY.DESSERT;
        break;
    }
    menuCategory = categoryName;
    $menuList.textContent = "";
    $menuForm.reset();
    loadMenu();
    countMenu();
  };

  const countMenu = () => {
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    const count = $all(".menu-list-item").length;
    $menuCount.innerHTML = `총 ${count} 개`;
  };

  const drawMenu = (data) => {
    const menuItem = createCustomElement(
      "li",
      "menu-list-item d-flex items-center py-2"
    );
    const menuItemName = createCustomElement("span", "w-100 pl-2 menu-name");
    const menuItemSoldOutButton = createCustomButton(
      ["mr-1", "menu-sold-out-button"],
      (e) => soldOutMenu(e),
      "품절"
    );
    // 메뉴의 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다
    const menuItemUpdateButton = createCustomButton(
      ["mr-1", "menu-edit-button"],
      (e) => updateMenu(e),
      "수정"
    );
    // 메뉴 삭제 버튼을 이용하여 메뉴를 삭제할 수 있다
    const menuItemDeleteButton = createCustomButton(
      ["menu-remove-button"],
      (e) => deleteMenu(e),
      "삭제"
    );
    menuItem.id = data.id;
    // 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다
    if (data.isSoldOut) menuItemName.classList.add("sold-out");
    menuItemName.appendChild(document.createTextNode(data.name));
    menuItem.appendChild(menuItemName);
    menuItem.appendChild(menuItemSoldOutButton);
    menuItem.appendChild(menuItemUpdateButton);
    menuItem.appendChild(menuItemDeleteButton);
    $menuList.appendChild(menuItem);
  };

  const saveMenu = () => {
    localStorage.setItem(menuCategory, JSON.stringify(menuData));
  };

  const loadMenu = () => {
    const savedMenuData = localStorage.getItem(menuCategory);
    if (savedMenuData !== null) {
      const parsedData = JSON.parse(savedMenuData);
      parsedData.forEach(drawMenu);
      menuData = parsedData;
    } else menuData = [];
  };

  const createMenu = (e) => {
    e.preventDefault();
    // 사용자 입력값이 빈 값이라면 추가되지 않는다
    if ($menuInput.value.trim() === "") return alert(MESSAGE.ALERT_CREATE);
    const newMenu = {
      id: `${Date.now()}`,
      name: $menuInput.value,
      isSoldOut: false,
    };
    drawMenu(newMenu);
    menuData.push(newMenu);
    saveMenu();
    countMenu();
    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다
    $menuForm.reset();
  };

  const updateMenu = ({ target }) => {
    const $currentName = target.parentElement.querySelector(".menu-name");
    // 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다
    const updateName = prompt(MESSAGE.PROMPT_UPDATE, $currentName.innerHTML);
    if (updateName) {
      $currentName.innerHTML = updateName;
      menuData.find((data) => {
        if (data.id === target.parentElement.id) data.name = updateName;
      });
      saveMenu();
    }
  };

  const deleteMenu = ({ target }) => {
    // 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다
    if (confirm(MESSAGE.CONFIRM_DELETE)) {
      target.parentElement.remove();
      menuData = menuData.filter((data) => data.id !== target.parentElement.id);
      saveMenu();
      countMenu();
    }
  };

  const soldOutMenu = ({ target }) => {
    menuData.find((data) => {
      if (data.id === target.parentElement.id) {
        data.isSoldOut = !data.isSoldOut;
        target.parentElement
          .querySelector(".menu-name")
          .classList.toggle("sold-out");
      }
    });
    saveMenu();
  };

  const init = () => {
    // localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다
    loadMenu();
    countMenu();
    // 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다
    $menuForm.addEventListener("submit", createMenu);
    $categoryButton.forEach((e) => e.addEventListener("click", changeCategory));
  };

  init();
};

export default MenuList;
