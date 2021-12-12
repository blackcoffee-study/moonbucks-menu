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
        // this.storage.editMenuName(selectedId, editedMenuName);

        // console.log("변경할 이름", editedMenuName);
        // console.log("변경아이디", selectedId);
        this.editMenuNameStorage(selectedId, editedMenuName);
        this.editMenuName(elem, editedMenuName);
      }

      if (e.target.classList.contains("menu-remove-button")) {
        if (!confirm("정말 삭제 하시겠어요?")) {
          return;
        }
        this.removeStorage(selectedId, menuName);
        this.removeMenu(menuElem);
      }

      if (e.target.classList.contains("menu-sold-out-button")) {
        // this.storage.soldOutById(selectedId);
        this.soldOutStorage(selectedId, menuName);
        this.toggleSoldOut(menuElem);
      }
    });
  }

  soldOutStorage = (id, name) => {
    this.storage
      .soldOut(id, name)
      .then(console.log)
      .catch((error) => console.log("error", error));
  };

  editMenuNameStorage = (id, name) => {
    this.storage
      .editMenuName(id, name)
      .then(console.log)
      .catch((error) => console.log("error", error));
  };

  removeStorage = (id, name) => {
    this.storage
      .remove(id, name)
      .then(console.log)
      .catch((error) => console.log("error", error));
  };

  loadMenus = () => {
    this.storage
      .fetchAll()
      .then((menu) => this.renderMenus(menu))
      .catch((error) => console.log("error", error));
  };

  setupWithStorage = (storage) => {
    if (this.storage.key === storage.key) {
      return;
    }
    this.storage = storage;
    this.removeAllMenuNodes();
    this.renderMessage(storage.key);
    this.loadMenus();
  };

  renderMenus = (datas) => {
    console.log("renderMenus=", datas);
    datas.forEach((menu) => {
      this.createComponent(menu);
    });
    this.updateMenuCount(datas.length);
  };

  addMenu = (inputName) => {
    if (!inputName.trim()) {
      return;
    }
    const addedMenu = this.storage.add(inputName);
    this.createComponent(addedMenu);
    this.updateMenuCount(this.storage.datas.length);
    this.$menuInput.value = "";
  };

  updateMenuCount = (menuCount) => {
    this.$menuCount.innerText = `총 ${menuCount}개`;
  };

  removeMenu = (elem) => {
    elem.remove();
    const childCount = this.$menuList.childElementCount;
    this.updateMenuCount(childCount);
  };

  createComponent(menu) {
    const menuComponent = new MenuComponent(menu);
    menuComponent.attachTo(this.$menuList);
  }

  editMenuName = (elem, editedMenuName) => {
    elem.innerText = editedMenuName;
  };

  toggleSoldOut = (elem) => {
    elem.querySelector(".menu-name").classList.toggle("sold-out");
  };

  removeAllMenuNodes = () => {
    const node = this.$menuList;
    node.querySelectorAll("*").forEach((n) => n.remove());
  };

  renderMessage = (storageKey) => {
    this.$headingTitle.innerText = MenuMessage[storageKey].title;
    this.$menuInput.placeholder = MenuMessage[storageKey].placeholder;
  };
}
