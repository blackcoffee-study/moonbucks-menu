const menuForm = document.querySelector("#espresso-menu-form");
const menuInput = document.querySelector("#espresso-menu-name");
const btnSubmit= document.querySelector("#espresso-menu-submit-button");
const menuList = document.querySelector("#espresso-menu-list");
const btnDelete = document.querySelector('.menu-remove-button');
const btnEdit = document.querySelector('.menu-edit-button');

function createNewMenu(name){
	menuList.innerHTML += `<li class="menu-list-item d-flex items-center py-2">
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
</li>`;
}

btnSubmit.addEventListener("click", (e) => {
	e.preventDefault();
	menuInput.value.trim() && createNewMenu(menuInput.value);
	menuInput.value = "";
});

menuForm.addEventListener("submit", (e) => {
	e.preventDefault();
	menuInput.value.trim() && createNewMenu(menuInput.value)
	menuInput.value=''
});
