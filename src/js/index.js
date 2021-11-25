import Store from "./menuStore.js";
import { $target, $targets } from "./selector.js";

class App {
  constructor() {
    this.Store = new Store();

    this.selectedGroup = this.Store.selectMenuGroup("espresso");

    this.navButtons = $targets(".cafe-category-name");
    this.handleNavClickButton();

    this.menuGroupWrap = $target(".wrapper");
    this.titleRender(this.selectedGroup);
    this.menuRender(this.selectedGroup);
    this.onSubmitMenu();
  }

  handleNavClickButton() {
    this.navButtons.forEach((button) => {
      const groupTitle = button.getAttribute("data-category-name");

      button.addEventListener("click", () => {
        this.selectedGroup = this.Store.selectMenuGroup(groupTitle);
        this.titleRender(this.selectedGroup);
        this.menuRender(this.selectedGroup);
      });
    });
  }

  onSubmitMenu() {
    const $form = this.menuGroupWrap.querySelector("#espresso-menu-form");
    $form.querySelector("#espresso-menu-submit-button").type = "submit";

    $form.addEventListener("submit", (e) => {
      e.preventDefault();
      const $input = e.target.querySelector(".input-field");
      const menuTitle = $input.value;
      if (!menuTitle) return;

      this.Store.addMenu(this.selectedGroup.title, menuTitle);
      this.menuRender(this.selectedGroup);
      this.titleRender(this.selectedGroup);
      $input.value = "";
    });
  }

  handleDeleteButton(_item) {
    const delBtn = _item.querySelector(".menu-remove-button");
    delBtn.addEventListener("click", () => {
      if (confirm("정말 삭제하시겠습니까?")) {
        this.Store.deleteMenu(
          this.selectedGroup.title,
          Number(_item.getAttribute("data-id"))
        );
        this.titleRender(this.selectedGroup);
        this.menuRender(this.selectedGroup);
      }
    });
  }

  handleEditButton(_item) {
    const editBtn = _item.querySelector(".menu-edit-button");
    editBtn.addEventListener("click", () => {
      const editName = window.prompt("메뉴명을 수정하세요");
      if (!editName) return alert("변경할 이름을 입력해주세요.");

      const menu = {
        id: Number(_item.getAttribute("data-id")),
        title: editName,
      };
      this.Store.editMenu(this.selectedGroup.title, menu);

      this.menuRender(this.selectedGroup);
    });
  }

  handleSoldOutButton(_item) {
    const soldOutBtn = _item.querySelector(".menu-sold-out-button");
    soldOutBtn.addEventListener("click", () => {
      const isSoldOut =
        _item.getAttribute("data-isSoldOut") === "true" ? true : false;

      const menu = {
        id: Number(_item.getAttribute("data-id")),
        isSoldOut: !isSoldOut,
      };
      this.Store.soldOutMenuCheck(this.selectedGroup.title, menu);

      this.menuRender(this.selectedGroup);
    });
  }

  handleBtnEventBind(_items) {
    _items.forEach((item) => {
      this.handleDeleteButton(item);
      this.handleEditButton(item);
      this.handleSoldOutButton(item);
    });
  }

  titleRender(_selected) {
    const $title = this.menuGroupWrap.querySelector(".heading");
    $title.innerHTML = `
      ${_selected.getTitle()}
      ${_selected.getMenusNum()}
    `;
  }

  menuRender(_selected) {
    const $menuList = this.menuGroupWrap.querySelector("#espresso-menu-list");

    $menuList.innerHTML = _selected.getMenuListItem().join("");

    const $items = $targets(".menu-list-item");
    this.handleBtnEventBind($items);
  }
}

new App();
