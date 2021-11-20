import { $ } from "./utils.js";

export default class Menu {
  constructor() {
    this.$submitButton = $("#espresso-menu-submit-button");
    this.$espressoMenuList = $("#espresso-menu-list");
    this.$espressMenuInput = $("#espresso-menu-name");
    this.$menuCount = $(".menu-count");

    this.$submitButton.addEventListener("click", () => {
      this.addMenu();
    });

    this.$espressMenuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      this.addMenu();
    });

    $("#espresso-menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.$espressoMenuList.addEventListener("click", (e) => {
      if (e.target.classList.contains("menu-edit-button")) {
        this.editMenuName(e);
      }

      if (e.target.classList.contains("menu-remove-button")) {
        this.removeMenu(e);
      }
    });
  }

  removeMenu = (e) => {
    if (confirm("정말 삭제 하시겠어요?")) {
      e.target.closest("li").remove();
      this.updateMenuCount();
    }
  };

  updateMenuCount = () => {
    const menuCount = this.$espressoMenuList.querySelectorAll("li").length;
    this.$menuCount.innerText = `총 ${menuCount}개`;
  };

  setClickListener(onClick) {
    this.onClick = onClick;
    console.log("onClick");
    this.addMenu();
  }

  editMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const editedMenuName = prompt(
      "수정할 메뉴명을 입력해 주세요.",
      $menuName.innerText
    );
    $menuName.innerText = editedMenuName;
  };

  addMenu = () => {
    if (this.$espressMenuInput.value === "") {
      alert("값을 입력해 주세요.");
      return;
    }
    const espressMenuName = this.$espressMenuInput.value;
    this.$espressoMenuList.insertAdjacentHTML(
      "beforeend",
      this.menuItemTemplate(espressMenuName)
    );
    this.updateMenuCount();
    this.$espressMenuInput.value = "";
  };

  menuItemTemplate = (menuName) => {
    return `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${menuName}</span>
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
    </li>
    `;
  };
}
