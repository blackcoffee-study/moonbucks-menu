const menu_count = document.querySelector(".menu-count");
const espresso_menu_name = document.getElementById("espresso-menu-name");
const espresso_menu_form = document.getElementById("espresso-menu-form");
const espresso_menu_list = document.getElementById("espresso-menu-list");
let menu_remove_button;
let menu_edit_button;

let el = [];

espresso_menu_form.addEventListener("submit", (e) => {
  e.preventDefault();
  menu_count.textContent = `총 ${espresso_menu_list.childNodes.length + 1}개`;
  espresso_menu_list.insertAdjacentHTML(
    "afterbegin",
    `<li class="menu-list-item d-flex items-center py-2"><span class="w-100 pl-2 menu-name">${espresso_menu_name.value}</span><button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">수정</button><button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button"> 삭제 </button></li>`
  );
  const menu_name = document.querySelector(".menu-name");
  const menu_remove_button = document.querySelector(".menu-remove-button");
  const menu_edit_button = document.querySelector(".menu-edit-button");

  menu_remove_button.addEventListener("click", () => {
    if (confirm("정말로 삭제하시겠습니까?")) {
      menu_remove_button.parentElement.remove();
      menu_count.textContent = `총 ${
        espresso_menu_list.childNodes.length + 1 - 1
      }개`;
    }
  });

  menu_edit_button.addEventListener("click", () => {
    const str = window.prompt("수정할내용:", "");

    menu_name.textContent = str;
  });
});
