import { $ } from "./utils.js";

export default class Menu {
  constructor(storageKey) {
    // 키값이 무엇인지에 따라서, localStorage에서 키에 해당하는 값을 가져와 배열 초기화
    this.storage = window.localStorage;
    this.storageKey = storageKey;

    this.$submitButton = $("#espresso-menu-submit-button");
    this.$espressoMenuList = $("#espresso-menu-list");
    this.$espressMenuInput = $("#espresso-menu-name");
    this.$menuCount = $(".menu-count");

    const fetchDatas = JSON.parse(localStorage.getItem(storageKey));
    if (fetchDatas) {
      this.datas = fetchDatas;
    } else {
      this.datas = [];
    }
    console.log(this.datas);
    this.loadMenus(this.datas);

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

  loadMenus = (datas) => {
    datas.forEach((menu) => {
      this.$espressoMenuList.insertAdjacentHTML(
        "beforeend",
        this.menuItemTemplate(menu.menuName)
      );
      this.updateMenuCount();
    });
  };

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
    const espressMenuName = this.$espressMenuInput.value;
    if (espressMenuName === "") {
      alert("값을 입력해 주세요.");
      return;
    }
    this.$espressoMenuList.insertAdjacentHTML(
      "beforeend",
      this.menuItemTemplate(espressMenuName)
    );
    this.updateMenuCount();
    this.addLocalStorage(espressMenuName);
    this.$espressMenuInput.value = "";
  };

  addLocalStorage(menuName) {
    const menuData = { menuName: menuName, soldOut: false };
    const arr = JSON.parse(localStorage.getItem(this.storageKey));
    const updatedArr = [...arr, menuData];
    this.storage.setItem(this.storageKey, JSON.stringify(updatedArr));
    console.log(JSON.parse(localStorage.getItem(this.storageKey)));
  }

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
