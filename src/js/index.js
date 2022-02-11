const menuForm = document.querySelector("#espresso-menu-form");
const menuInput = document.querySelector("#espresso-menu-name");
const btnSubmit= document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector("#espresso-menu-list");

menuForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const menuName = menuInput.value;
	const newList = document.createElement("li");
	const menuSpan = document.createElement("span");
	const btnEdit = document.createElement("button");
	const btnDelete = document.createElement("button");

  menuSpan.className += "w-100 pl-2 menu-name";
  btnEdit.className +=
    "bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button";
  btnDelete.className +=
    "bg-gray-50 text-gray-500 text-sm menu-remove-button";
  newList.className += "menu-list-item d-flex items-center py-2";
});