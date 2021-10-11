const menuForm = document.getElementById("espresso-menu-form");
const menuInput = menuForm.querySelector("input[name=espressoMenuName]");
const menuList = document.getElementById("espresso-menu-list");
const menuCount = document.querySelector(".menu-count");

function newMenuTemplate(name) {
  return `<li class="menu-list-item d-flex items-center py-2">
<span class="w-100 pl-2 menu-name">${name}</span>
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
`;
}

function countMenu() {
  const count = menuList.children.length;
  menuCount.textContent = `총 ${count}개`;
}

function clearInput(input) {
  input.value = "";
}

function inputValidate(input) {
  if (input.value === "") {
    return false;
  }
  return true;
}

function getInputValue(input) {
  const inputValue = input.value;
  return inputValue;
}

function createMenuElement(menuName) {
  const template = document.createElement("template");
  template.innerHTML = newMenuTemplate(menuName);
  const menuElement = template.content.cloneNode(true);
  menuElement
    .querySelector(".menu-edit-button")
    .addEventListener("click", editMenu);
  menuElement
    .querySelector(".menu-remove-button")
    .addEventListener("click", removeMenu);
  return menuElement;
}

function addMenu(e) {
  e.preventDefault();
  if (!inputValidate(menuInput)) {
    alert("메뉴를 작성해주세요!");
    return;
  }
  const menuName = getInputValue(menuInput);
  menuList.append(createMenuElement(menuName));
  countMenu();
  clearInput(menuInput);
}

function editMenu(e) {
  const menuItem = e.target.closest(".menu-list-item");
  const originalMenu = menuItem.querySelector(".menu-name");
  const editedMenu = getEditedMenu(originalMenu.textContent);
  originalMenu.textContent = editedMenu;
}

function getEditedMenu(originalMenu) {
  let editedMenu;
  while (true) {
    editedMenu = prompt("메뉴 이름을 수정해주세요.", originalMenu);
    if (editedMenu === "") {
      alert("메뉴를 작성해주세요!");
      continue;
    }
    break;
  }
  return editedMenu;
}

function removeMenu(e) {
  const confirm = window.confirm("정말 삭제하시겠습니까?");
  if (!confirm) return;
  e.target.closest(".menu-list-item").remove();
  countMenu();
}

menuForm.addEventListener("submit", addMenu);
