import { $ } from "../common/utils.js";
import { MenuComponent } from "./component.js";
import MenuMessage from "./menuMessage.js";

export default class Menu {
  constructor(storage) {
    this.$submitButton = $("#menu-submit-button");
    this.$menuList = $("#menu-list");
    this.$menuInput = $("#menu-name");
    this.$headingTitle = $(".heading").querySelector("h2");
    this.$menuCount = $(".menu-count");
    this.storage = storage;

    this.loadMenus();
    this.renderMessage(storage.getCategory());

    this.$submitButton.addEventListener("click", () => {
      this.addMenu(this.$menuInput.value);
    });

    this.$menuInput.addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }
      this.addMenu(this.$menuInput.value);
    });

    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    this.$menuList.addEventListener("click", (e) => {
      const menuElem = e.target.closest("li");
      const selectedId = menuElem.getAttribute("data-id");
      const menuName = menuElem.querySelector(".menu-name").innerText;

      if (e.target.classList.contains("menu-edit-button")) {
        const elem = e.target.closest("li").querySelector(".menu-name");
        const editedMenuName = prompt(
          "수정할 메뉴명을 입력해 주세요.",
          elem.innerText
        );
        if (!editedMenuName) {
          return;
        }
        this.editMenuName(selectedId, editedMenuName, elem);
      }

      if (e.target.classList.contains("menu-remove-button")) {
        if (!confirm("정말 삭제 하시겠어요?")) {
          return;
        }
        this.removeMenu(selectedId, menuName, menuElem);
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        this.soldOut(selectedId, menuName, menuElem);
      }
    });
  }

  soldOut = (id, name, elem) => {
    this.storage
      .soldOut(id, name)
      .then(() => {
        this.toggleSoldOut(elem);
      })
      .catch((error) => console.log("error", error));
  };

  toggleSoldOut = (elem) => {
    elem.querySelector(".menu-name").classList.toggle("sold-out");
  };

  editMenuName = (id, name, elem) => {
    this.storage
      .editMenuName(id, name)
      .then((elem.innerText = name))
      .catch((error) => console.log("error", error));
  };

  removeMenu = (id, name, elem) => {
    this.storage
      .remove(id, name)
      .then(() => {
        elem.remove();
        this.updateMenuCount();
      })
      .catch((error) => console.log("error", error));
  };

  loadMenus = () => {
    this.storage
      .fetchAll()
      .then((menu) => this.renderMenus(menu))
      .catch((error) => console.log("error", error));
  };

  setupWithStorage = (storage) => {
    if (this.storage.getCategory() === storage.getCategory()) {
      return;
    }
    this.storage = storage;
    this.removeAllMenuNodes();
    this.renderMessage(storage.getCategory());
    this.loadMenus();
  };

  renderMenus = (datas) => {
    datas.forEach((menu) => {
      this.createComponent(menu);
    });
    this.updateMenuCount(datas.length);
  };

  addMenu = (inputName) => {
    if (!inputName.trim()) {
      return;
    }
    this.storage
      .add(inputName)
      .then((menu) => {
        this.createComponent(menu);
        this.updateMenuCount();
        this.$menuInput.value = "";
      })
      .catch((error) => console.log("error", error));
  };

  updateMenuCount = (menuCount = this.$menuList.childElementCount) => {
    this.$menuCount.innerText = `총 ${menuCount}개`;
  };

  createComponent(menu) {
    const menuComponent = new MenuComponent(menu);
    menuComponent.attachTo(this.$menuList);
  }

  removeAllMenuNodes = () => {
    const node = this.$menuList;
    node.querySelectorAll("*").forEach((n) => n.remove());
  };

  renderMessage = (storageKey) => {
    this.$headingTitle.innerText = MenuMessage[storageKey].title;
    this.$menuInput.placeholder = MenuMessage[storageKey].placeholder;
  };
}
