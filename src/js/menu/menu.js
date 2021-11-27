import { $ } from "../common/utils.js";
import MenuMessage from "./menuMessage.js";

export default class Menu {
  constructor(storage) {
    this.$submitButton = $("#espresso-menu-submit-button");
    this.$espressoMenuList = $("#espresso-menu-list");
    this.$espressMenuInput = $("#espresso-menu-name");
    this.$headingTitle = $(".heading").querySelector("h2");
    this.$menuCount = $(".menu-count");
    this.storage = storage;

    this.loadMenus(storage.datas);
    this.renderMessage(storage.key);

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
      const menuElem = e.target.closest("li");
      const selectedId = menuElem.getAttribute("data-id");

      if (e.target.classList.contains("menu-edit-button")) {
        const elem = e.target.closest("li").querySelector(".menu-name");
        const editedMenuName = prompt(
          "수정할 메뉴명을 입력해 주세요.",
          elem.innerText
        );
        this.storage.editMenuName(selectedId, editedMenuName);
        this.editMenuName(elem, editedMenuName);
      }

      if (e.target.classList.contains("menu-remove-button")) {
        this.storage.removeById(selectedId);
        this.removeMenu(menuElem);
      }
      if (e.target.classList.contains("menu-sold-out-button")) {
        this.storage.soldOutById(selectedId);
        this.toggleSoldOut(menuElem);
      }
    });
  }

  setupWithStorage = (storage) => {
    if (this.storage.key === storage.key) {
      return;
    }
    this.storage = storage;
    this.removeAllMenuNodes();
    this.renderMessage(storage.key);
    this.loadMenus(storage.datas);
  };

  loadMenus = (datas) => {
    datas.forEach((menu) => {
      this.$espressoMenuList.insertAdjacentHTML(
        "beforeend",
        this.menuItemTemplate(menu)
      );
    });
    this.updateMenuCount(datas.length);
  };

  addMenu = () => {
    const inputName = this.$espressMenuInput.value;
    if (!inputName.trim()) {
      return;
    }
    const addedMenu = this.storage.add(inputName);
    this.$espressoMenuList.insertAdjacentHTML(
      "beforeend",
      this.menuItemTemplate(addedMenu)
    );
    this.updateMenuCount(this.storage.datas.length);
    this.$espressMenuInput.value = "";
  };

  updateMenuCount = (menuCount) => {
    this.$menuCount.innerText = `총 ${menuCount}개`;
  };

  removeMenu = (elem) => {
    if (confirm("정말 삭제 하시겠어요?")) {
      elem.remove();
      this.updateMenuCount(this.storage.datas.length);
    }
  };

  editMenuName = (elem, editedMenuName) => {
    elem.innerText = editedMenuName;
  };

  toggleSoldOut = (elem) => {
    elem.querySelector(".menu-name").classList.toggle("sold-out");
  };

  removeAllMenuNodes = () => {
    const node = this.$espressoMenuList;
    node.querySelectorAll("*").forEach((n) => n.remove());
  };

  renderMessage = (storageKey) => {
    this.$headingTitle.innerText = MenuMessage[storageKey].title;
    this.$espressMenuInput.placeholder = MenuMessage[storageKey].placeholder;
  };

  menuItemTemplate = ({ id, menuName, soldOut }) => {
    return `<li data-id=${id} class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name ${
        soldOut ? "sold-out" : ""
      }">${menuName}</span>
      <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
    >
      품절
    </button>
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
