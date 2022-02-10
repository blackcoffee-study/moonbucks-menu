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
  editButton.setAttribute("type", "button");
  editButton.innerText = "수정";
  editButton.addEventListener("click", editMenuName);
  const removeButton = document.createElement("button");
  removeButton.className =
    "bg-gray-50 text-gray-500 text-sm menu-remove-button";
  removeButton.setAttribute("type", "button");
  removeButton.innerText = "삭제";
  li.appendChild(span);
  li.appendChild(editButton);
  li.appendChild(removeButton);
  espressoMenuList.append(li);
}

function handleToSubmitMenu(event) {
  event.preventDefault();
  const newEspressoMenu = espressoMenuName.value;
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
  let newMenuName = prompt("메뉴명을 수정하세요.");
  if (newMenuName) {
    newMenuName = newMenuName.replace(/^\s*/, "");
  }
  if (!newMenuName) return;
  espressoMenus.forEach((espressoMenu) => {
    if (espressoMenu.id == parseInt(li.id)) {
      espressoMenu.menu = newMenuName;
      const span = li.children[0];
      span.innerText = newMenuName;
    }
  });
}
