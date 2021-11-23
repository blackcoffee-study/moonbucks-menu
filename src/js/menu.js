import { $ } from "./utils.js";

export default class Menu {
  titles = {
    espresso: "☕ 에스프레소 메뉴 관리",
    frappuccino: "🥤 프라푸치노 메뉴 관리",
    blended: "🍹 블렌디드 메뉴 관리",
    teavana: "🫖 티바나 메뉴 관리",
    desert: "🍰 디저트 메뉴 관리",
  };

  constructor(storage) {
    this.$submitButton = $("#espresso-menu-submit-button");
    this.$espressoMenuList = $("#espresso-menu-list");
    this.$espressMenuInput = $("#espresso-menu-name");
    this.$headingTitle = $(".heading").querySelector("h2");
    this.$menuCount = $(".menu-count");
    this.storage = storage;
    this.$headingTitle.innerText = this.titles[storage.key];
    this.loadMenus(storage.datas);

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
        const elem = e.target.closest("li");
        this.removeMenu(elem);
        this.storage.removeById(elem.getAttribute("data-index"));
      }
    });
  }

  setupWithStorage = (storage) => {
    if (this.storage.key === storage.key) {
      return;
    }
    this.storage = storage;
    this.clearMenus();
    this.$headingTitle.innerText = this.titles[storage.key];
    this.loadMenus(storage.datas);
  };

  clearMenus = () => {
    const node = this.$espressoMenuList;
    node.querySelectorAll("*").forEach((n) => n.remove());
  };

  loadMenus = (datas) => {
    console.log(datas.length);
    datas.forEach((menu) => {
      this.$espressoMenuList.insertAdjacentHTML(
        "beforeend",
        this.menuItemTemplate(menu.menuName, menu.id)
      );
    });
    this.updateMenuCount();
  };

  removeMenu = (elem) => {
    if (confirm("정말 삭제 하시겠어요?")) {
      elem.remove();
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
    // this.addLocalStorage(espressMenuName);
    this.storage.add(espressMenuName);
    this.$espressMenuInput.value = "";
  };

  menuItemTemplate = (menuName, id) => {
    return `<li data-index=${id} class="menu-list-item d-flex items-center py-2">
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
