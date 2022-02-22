export {
  $,
  addMenuItem,
  modifyMenuItem,
  removeMenuItem,
  updateMenuCount,
  isContainedClass,
  isDuplicatedMenuName,
};

import { App } from "./index.js";

const $ = (selector) => {
  return document.querySelector(selector);
};

const addMenuItem = () => {
  if (isDuplicatedMenuName($menuNameInput.value)) {
    alert("이미 동일한 메뉴명이 있습니다.");
    $menuNameInput.value = "";
    $menuNameInput.focus();
    return;
  }
  if ($menuNameInput.value.trim() === "") {
    alert("공백 값을 입력하셨습니다.");
    $menuNameInput.value = "";
    $menuNameInput.focus();
    return;
  }
  const menuItemInfo = {
    menuName: $menuNameInput.value,
    category: this.currentCategory,
    status: "normal", // || sold-out
  };
  this.menuItems[this.currentCategory].push(menuItemInfo);
  setState(this.menuItems[this.currentCategory]);
  localStorage.setItem(
    this.currentCategory,
    JSON.stringify(this.menuItems[this.currentCategory])
  );
};

const modifyMenuItem = (e) => {
  const $listItem = e.target.closest("li");
  const $menuName = $listItem.querySelector(".menu-name");
  const newMenuName = prompt(
    "수정할 메뉴명을 적어주세요.",
    $menuName.textContent
  );

  if (newMenuName === $menuName.textContent) {
    alert("기존과 동일한 메뉴명입니다.");
  } else if (newMenuName === "") {
    alert("값을 입력해주세요.");
  } else if (newMenuName !== null) {
    this.menuItems[this.currentCategory][
      $listItem.dataset.id
    ].menuName = newMenuName;
    setState(this.menuItems[this.currentCategory]);
    localStorage.setItem(
      this.currentCategory,
      JSON.stringify(this.menuItems[this.currentCategory])
    );
  }
};

const removeMenuItem = (e) => {
  const $listItem = e.target.closest("li");
  if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
    this.menuItems[this.currentCategory].splice($listItem.dataset.id, 1);
    setState(this.menuItems[this.currentCategory]);
    localStorage.setItem(
      this.currentCategory,
      JSON.stringify(this.menuItems[this.currentCategory])
    );
  }
};

const updateMenuCount = () => {
  const menuCount = this.menuItems[this.currentCategory].length;
  $counter.textContent = `총 ${menuCount} 개`;
};

const isContainedClass = (className, e) => {
  if (e.target.classList.contains(className)) return true;
  else return false;
};

const isDuplicatedMenuName = (newMenuName) => {
  const duplicatedMenuItem = this.menuItems[this.currentCategory].find(
    (item) => {
      if (item.menuName == newMenuName) return item;
    }
  );
  if (duplicatedMenuItem) return true;
  return false;
};
