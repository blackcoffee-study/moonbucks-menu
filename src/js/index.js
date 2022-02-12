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

const countMenu = () => {
  menuCount.innerText = `총 ${menuList.childElementCount}개`;
};

menuForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (menuInput.value.trim()) addMenu();
  menuInput.value = "";
  countMenu();
});

menuList.addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-remove-button")) {
    if (window.confirm("메뉴를 삭제하시겠습니까?"))
      e.target.parentNode.remove();
  } else {
    e.target.previousSibling.previousSibling.innerText = window.prompt(
      "메뉴를 수정해주세요",
      e.target.previousSibling.previousSibling.innerText
    );
  }
  countMenu();
});
