const menuForm = document.getElementById("espresso-menu-form");
const menuInput = document.getElementById("espresso-menu-name");
const menuList = document.getElementById("espresso-menu-list");
const submitBtn = document.getElementById("espresso-menu-submit-button");
const menuCount = document.querySelector(".menu-count");

const createMenuItem = (name) => {
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
    </li >`;
};

const addMenu = () => {
  createMenuItem(menuInput.value);
};

menuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addMenu();
  menuInput.value = "";
});
