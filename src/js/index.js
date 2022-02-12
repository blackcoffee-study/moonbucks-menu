import { isEmpty } from "./utils/validate.js";

const espressoMenuForm = document.getElementById("espresso-menu-form");
const espressoMenuName = document.getElementById("espresso-menu-name");
const espressoMenuSubmitButton = document.getElementById(
  "espresso-menu-submit-button"
);
const espressoMenuList = document.getElementById("espresso-menu-list");
const menuCount = document.querySelector(".menu-count");

let espressoMenus = [];

const EDIT_INPUT = "메뉴명을 수정하세요.";
const DELETE_CHECK = "정말 삭제하시겠습니까?";

function addEspressoMenu(newEspresso) {
  const li = document.createElement("li");
  li.id = newEspresso.id;
  li.className = "menu-list-item d-flex items-center py-2";
  const span = setSpan(newEspresso);
  const editButton = setEditButton();
  const removeButton = setRemoveButton();
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  espressoMenuList.append(li);
  getMenuCount();
}

function setSpan(newEspresso) {
  const span = document.createElement("span");
  span.className = "w-100 pl-2 menu-name";
  span.innerText = newEspresso.menu;
  return span;
}

function setEditButton() {
  const editButton = document.createElement("button");
  editButton.className =
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
  editButton.setAttribute("type", "button");
  editButton.innerText = "수정";
  editButton.addEventListener("click", editMenuName);
  return editButton;
}

function setRemoveButton() {
  const removeButton = document.createElement("button");
  removeButton.className =
    "bg-gray-50 text-gray-500 text-sm menu-remove-button";
  removeButton.setAttribute("type", "button");
  removeButton.innerText = "삭제";
  removeButton.addEventListener("click", deleteMenu);
  return removeButton;
}

function handleToSubmitMenu(event) {
  event.preventDefault();
  const newEspressoMenu = isEmpty(espressoMenuName.value);
  espressoMenuName.value = "";
  if (!newEspressoMenu) return;
  const newEspressoObj = {
    menu: newEspressoMenu,
    id: Date.now(),
  };
  espressoMenus.push(newEspressoObj);
  addEspressoMenu(newEspressoObj);
}

espressoMenuForm.addEventListener("submit", handleToSubmitMenu);
espressoMenuSubmitButton.addEventListener("click", handleToSubmitMenu);

function editMenuName(event) {
  const li = event.target.parentElement;
  const span = li.children[0];
  let newMenuName = prompt(EDIT_INPUT, span.innerText);
  newMenuName = isEmpty(newMenuName);
  if (!newMenuName) return;
  espressoMenus.forEach((espressoMenu) => {
    if (espressoMenu.id == parseInt(li.id)) {
      espressoMenu.menu = newMenuName;
      span.innerText = newMenuName;
    }
  });
}

function deleteMenu(event) {
  const answer = confirm(DELETE_CHECK);
  if (answer) {
    const li = event.target.parentElement;
    espressoMenus = espressoMenus.filter(
      (espresso) => espresso.id !== parseInt(li.id)
    );
    li.remove();
    getMenuCount();
  }
}

function getMenuCount() {
  menuCount.innerHTML = `총 ${espressoMenus.length}개`;
}
