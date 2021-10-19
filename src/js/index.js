const $ = (arg) => document.querySelector(arg);
const menuItemTemplate = (
  name
) => `<li class="menu-list-item d-flex items-center py-2">
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

const menuList = $("#espresso-menu-list");
const menuName = $("#espresso-menu-name");
const menuCount = (count) => `총 ${count}개`;

function addMenuItem() {
  if (menuName.value === "") {
    return;
  }

  menuList.insertAdjacentHTML("beforeend", menuItemTemplate(menuName.value));
  menuName.value = "";
  $(".menu-count").innerText = menuCount(menuList.children.length);
}

function startApp() {
  $("#espresso-menu-submit-button").addEventListener("click", function () {
    addMenuItem();
  });

  $("#espresso-menu-form").addEventListener("submit", function (e) {
    e.preventDefault();
    addMenuItem();
  });

  menuList.addEventListener("click", function (e) {
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.closest("li").querySelector(".menu-name");
      menuName.innerText = prompt("메뉴명을 입력하세요", menuName.innerText);
    }
  });

  menuList.addEventListener("click", function (e) {
    if (
      e.target.classList.contains("menu-remove-button") &&
      confirm("정말로 삭제하시겠습니까?")
    ) {
      e.target.parentElement.remove();
      $(".menu-count").innerText = menuCount(menuList.children.length);
    }
  });
}

startApp();
