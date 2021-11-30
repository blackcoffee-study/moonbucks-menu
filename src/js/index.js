import {
  isInputEmpty,
  setInputEmpty,
  isDeleteBtn,
  isEditBtn,
  isSoldOutBtn,
  listTemplate,
  CATEGORIES,
  $,
  isExistMenu,
} from "./utils.js";

window.addEventListener("DOMContentLoaded", () => {
  new App();
});

class App {
  constructor() {
    this.localStroage = window.localStorage;

    this.state = {
      category: "espresso",
      menuList: this.localStroage.getItem("espresso"),
    };

    this.$menuInput = $("#menu-name");
    this.$menuForm = $("#menu-form");
    this.$submitBtn = $(".input-submit");
    this.$menuList = $("#menu-list");
    this.$nav = $("nav");
    this.$categoryTitle = $(".mt-1");
    this.$menuCount = $(".menu-count");

    this.render();
    this.eventBind();
  }

  eventBind() {
    this.$menuForm.addEventListener("submit", this.submitHandler.bind(this));
    this.$submitBtn.addEventListener("click", this.submitHandler.bind(this));
    this.$menuList.addEventListener("click", this.listClickHandler.bind(this));
    this.$nav.addEventListener("click", this.categoryHandler.bind(this));
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };
    this.render();
  }

  render() {
    this.renderCategoryTitle();
    this.renderCount();
    this.renderMenuList();
  }

  renderCategoryTitle() {
    this.$categoryTitle.textContent = `${
      CATEGORIES[this.state.category]
    } 메뉴 관리`;
  }

  renderCount() {
    this.$menuCount.textContent = `총 ${this.getMenuList().length}개`;
  }

  renderMenuList() {
    const menuListTemplate = this.getMenuList()
      .map((menu) => listTemplate(menu))
      .join("");
    this.$menuList.innerHTML = menuListTemplate;
  }

  submitHandler(e) {
    e.preventDefault();

    const menuList = this.getMenuList();

    if (isInputEmpty(this.$menuInput)) return;
    if (isExistMenu(menuList, this.$menuInput.value)) return;
    setInputEmpty(this.$menuInput);

    const newMenuList = [
      ...menuList,
      { menuName: this.$menuInput.value, soldOut: false },
    ];

    this.setMenuList(newMenuList);
    this.render();
  }

  categoryHandler(e) {
    if (e.target.classList.contains("cafe-category-name")) {
      const category = e.target.dataset.categoryName;
      this.setState({
        category: category,
        menuList: this.localStroage.getItem(category),
      });
    }
  }

  listClickHandler(e) {
    const $li = e.target.closest("li");
    const menuName = $li.querySelector("span").textContent;

    switch (true) {
      case isEditBtn(e):
        this.editList(menuName);
        break;
      case isDeleteBtn(e):
        this.deleteList(menuName);
        break;
      case isSoldOutBtn(e):
        this.soldOutList(menuName);
        break;
    }
  }

  soldOutList(soldOutMenuName) {
    const newMenuList = this.getMenuList().map((menu) => {
      if (menu.menuName === soldOutMenuName)
        return { menuName: soldOutMenuName, soldOut: !menu.soldOut };
      return menu;
    });
    this.setMenuList(newMenuList);
    this.render();
  }

  editList(editedMenuName) {
    const newMenuName = window.prompt("수정하시겠습니까?");
    if (editedMenuName) {
      const newMenuList = this.getMenuList().map((menu) => {
        if (menu.menuName === editedMenuName)
          return { menuName: newMenuName, soldOut: false };
        return menu;
      });
      this.setMenuList(newMenuList);
      this.render();
    }
  }

  deleteList(deletedMenName) {
    if (window.confirm("삭제하시겠습니까?")) {
      const newMenuList = this.getMenuList().filter(
        (menu) => menu.menuName !== deletedMenName
      );
      this.setMenuList(newMenuList);
      this.render();
    }
  }

  getMenuList() {
    return JSON.parse(this.localStroage.getItem(this.state.category)) || [];
  }

  setMenuList(newMenuList) {
    this.localStroage.setItem(this.state.category, JSON.stringify(newMenuList));
  }
}
