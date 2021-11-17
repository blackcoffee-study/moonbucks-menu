import { $ } from "./utils/index.js";

function App() {
  $("#espresso-menu-form").addEventListener("submit", (e) =>
    e.preventDefault()
  );

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuItem();
  });

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuItem();
  });

  const addMenuItem = () => {
    const espressoMenuName = $("#espresso-menu-name").value;
    if (espressoMenuName === "") {
      alert("값을 입력해주세요.");
      return;
    }
    $("#espresso-menu-list").innerHTML += getMenuItemTemplate(espressoMenuName);
    $("#espresso-menu-name").value = "";
  };

  const getMenuItemTemplate = (menuItem) => {
    return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuItem}</span>
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
