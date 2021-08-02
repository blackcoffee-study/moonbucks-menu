import { $ } from "./utils/dom.js";

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    const $menuName = document.querySelector("#espresso-menu-name");
    const $menuList = document.querySelector("#espresso-menu-list");
    $menuList.insertAdjacentHTML("beforeend", template($menuName.value));
    $menuName.value = "";
  });

  $("#espresso-menu-name").addEventListener("keyup", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const $menuList = document.querySelector("#espresso-menu-list");
    const $menuName = document.querySelector("#espresso-menu-name");
    $menuList.insertAdjacentHTML("beforeend", template($menuName.value));
    $menuName.value = "";
  });

  $("#espresso-menu-list").addEventListener("click", (e) => {
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenu(e);
      return;
    }

    if (e.target.classList.contains("menu-edit-button")) {
      editMenu(e);
    }
  });

  const removeMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
    }
  };

  const editMenu = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    $menuName.innerText = prompt(
      "수정할 메뉴 이름을 입력해주세요",
      $menuName.innerText
    );
  };

  const template = (name) => {
    return `
    <li class="station-list-item d-flex items-center py-2">
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
  };
}

App();
