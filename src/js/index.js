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

  $("#espresso-menu-list").addEventListener("click", (e) => {
    updateMenuItem(e);
    removeMenuItem(e);
  });

  const addMenuItem = () => {
    const espressoMenuName = $("#espresso-menu-name").value;
    if (espressoMenuName === "") {
      alert("값을 입력해주세요.");
      return;
    }
    $("#espresso-menu-list").innerHTML += getMenuItemTemplate(espressoMenuName);
    $("#espresso-menu-name").value = "";
    updateMenuCount();
  };

  const updateMenuItem = (e) => {
    if (e.target.classList.contains("menu-edit-button")) {
      const $menuName = e.target.closest("li").querySelector(".menu-name");
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }
  };

  const removeMenuItem = (e) => {
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("정말 삭제하시겠습니까?")) {
        e.target.closest("li").remove();
        updateMenuCount();
      }
    }
  };

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $("#menu-count").innerText = `총 ${menuCount}개`;
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
