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
});