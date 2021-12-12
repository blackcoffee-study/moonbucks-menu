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
      .catch(() =>
        alert("Error: 품절 처리를 실패했습니다. 잠시후 다시 시도해 주세요.")
      );
  };

  toggleSoldOut = (elem) => {
    elem.querySelector(".menu-name").classList.toggle("sold-out");
  };

  editMenuName = (id, name, elem) => {
    this.storage
      .editMenuName(id, name)
      .then((elem.innerText = name))
      .catch(() =>
        alert("Error: 메뉴 수정을 실패했습니다. 잠시후 다시 시도해 주세요.")
      );
  };

  removeMenu = (id, name, elem) => {
    this.storage
      .remove(id, name)
      .then(() => {
        elem.remove();
        this.updateMenuCount();
      })
      .catch(() =>
        alert("Error: 메뉴 삭제를 실패했습니다. 잠시후 다시 시도해 주세요.")
      );
  };

  loadMenus = () => {
    this.storage
      .fetchAll()
      .then((menu) => this.renderMenus(menu))
      .catch(() => console.log("Error-loadMenus"));
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
    this.updateMenuCount();
  };

  addMenu = (inputName) => {
    if (!inputName.trim()) {
      return;
    }

    if (this.storage.isAlreadyExistName(inputName)) {
      alert("이미 존재하는 메뉴 이름 입니다");
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

  updateMenuCount = () => {
    const menuCount = this.storage.getMenuCount();
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
