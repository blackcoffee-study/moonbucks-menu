const espressoMenuForm = document.getElementById("espresso-menu-form");
const espressoMenuName = document.getElementById("espresso-menu-name");
const espressoMenuSubmitButton = document.getElementById(
  "espresso-menu-submit-button"
);
const espressoMenuList = document.getElementById("espresso-menu-list");

let espressoMenus = [];

function addEspressoMenu(newEspresso) {
  const li = document.createElement("li");
  li.id = newEspresso.id;
  li.className = "menu-list-item d-flex items-center py-2";
  const span = document.createElement("span");
  span.className = "w-100 pl-2 menu-name";
  span.innerText = newEspresso.menu;
  const editButton = document.createElement("button");
  editButton.className =
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
  editButton.innerText = "수정";
  const removeButton = document.createElement("button");
  removeButton.className =
    "bg-gray-50 text-gray-500 text-sm menu-remove-button";
  removeButton.innerText = "삭제";
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  espressoMenuList.append(li);
}

function handleToSubmitMenu(event) {
  event.preventDefault();
  const newEspressoMenu = espressoMenuName.value.replace(/^\s*/, "");
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
