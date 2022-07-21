import { $ } from "../utils/dom.js";
import { MESSAGE } from "../constants/index.js";

const MenuList = () => {
  const $menuForm = $("#espresso-menu-form");
  const $menuInput = $(".input-field");
  const $menuCount = $(".menu-count");
  const $menuList = $("#espresso-menu-list");

  let menuData = [];

  const countMenu = () => {
    // 총 메뉴 갯수를 count하여 상단에 보여준다
    const count = $menuList.querySelectorAll("li").length;
    $menuCount.innerHTML = `총 ${count} 개`;
  };

  const drawMenu = (data) => {
    const menuItem = document.createElement("li");
    menuItem.className = "menu-list-item d-flex items-center py-2";
    menuItem.id = data.id;
    const menuItemName = document.createElement("span");
    // 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다
    menuItemName.className = data.isSoldOut
      ? "w-100 pl-2 menu-name sold-out"
      : "w-100 pl-2 menu-name";
    menuItemName.appendChild(document.createTextNode(data.name));
    const menuItemSoldOutButton = document.createElement("button");
    menuItemSoldOutButton.className =
      "bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button";
    menuItemSoldOutButton.onclick = (e) => soldOutMenu(e);
    menuItemSoldOutButton.appendChild(document.createTextNode("품절"));
    const menuItemUpdateButton = document.createElement("button");
    menuItemUpdateButton.className =
      "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
    // 메뉴의 수정 버튼을 눌러 메뉴 이름을 수정할 수 있다
    menuItemUpdateButton.onclick = (e) => updateMenu(e);
    menuItemUpdateButton.appendChild(document.createTextNode("수정"));
    const menuItemDeleteButton = document.createElement("button");
    menuItemDeleteButton.className =
      "bg-gray-50 text-gray-500 text-sm menu-remove-button";
    // 메뉴 삭제 버튼을 이용하여 메뉴를 삭제할 수 있다
    menuItemDeleteButton.onclick = (e) => deleteMenu(e);
    menuItemDeleteButton.appendChild(document.createTextNode("삭제"));
    menuItem.appendChild(menuItemName);
    menuItem.appendChild(menuItemSoldOutButton);
    menuItem.appendChild(menuItemUpdateButton);
    menuItem.appendChild(menuItemDeleteButton);
    $menuList.appendChild(menuItem);
  };

  const saveMenu = () => {
    localStorage.setItem("espresso", JSON.stringify(menuData));
  };

  const loadMenu = () => {
    const savedMenuData = localStorage.getItem("espresso");
    if (savedMenuData !== null) {
      const parsedData = JSON.parse(savedMenuData);
      parsedData.forEach(drawMenu);
      menuData = parsedData;
    }
  };

  const createMenu = (e) => {
    e.preventDefault();
    // 사용자 입력값이 빈 값이라면 추가되지 않는다
    if ($menuInput.value === "") return alert(MESSAGE.ALERT_CREATE);
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
    const currentName = target.parentElement.querySelector(".menu-name");
    // 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다
    const updateName = prompt(MESSAGE.PROMPT_UPDATE, currentName.innerHTML);
    if (updateName) {
      currentName.innerHTML = updateName;
      menuData.map((data) => {
        if (data.id === target.parentElement.id) data.name = updateName;
        return data;
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
    menuData.map((data) => {
      if (data.id === target.parentElement.id) {
        data.isSoldOut = !data.isSoldOut;
        target.parentElement.querySelector(".menu-name").className =
          data.isSoldOut
            ? "w-100 pl-2 menu-name sold-out"
            : "w-100 pl-2 menu-name";
      }
      return data;
    });
    saveMenu();
  };

  const init = () => {
    // localStorage에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다
    loadMenu();
    countMenu();
    // 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 또는 엔터키 입력으로 추가한다
    $menuForm.addEventListener("submit", createMenu);
  };

  init();
};

export default MenuList;
