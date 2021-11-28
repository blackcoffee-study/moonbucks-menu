import {
  isInputEmpty,
  setInputEmpty,
  isDeleteBtn,
  isEditBtn,
  isSoldOutBtn,
  listTemplate,
  CATEGORIES,
  $,
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
    if (isInputEmpty(this.$menuInput)) return;
    const menuList = this.getMenuList();
    const newMenuList = [
      ...menuList,
      { menuName: this.$menuInput.value, soldOut: false },
    ];
    this.setMenuList(newMenuList);
    setInputEmpty(this.$menuInput);
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
    if (isEditBtn(e)) {
      this.editList(menuName);
    } else if (isDeleteBtn(e)) {
      this.deleteList(menuName);
    } else if (isSoldOutBtn(e)) {
      this.soldOutList(menuName);
    }
  }

  soldOutList(menuName) {
    const newMenuList = this.getMenuList().map((prevMenu) => {
      if (prevMenu.menuName === menuName)
        return { menuName: menuName, soldOut: !prevMenu.soldOut };
      return prevMenu;
    });
    this.setMenuList(newMenuList);
    this.render();
  }

  editList(menuName) {
    const newMenuName = window.prompt("수정하시겠습니까?");
    const newMenuList = this.getMenuList().map((prevMenuName) => {
      if (prevMenuName === menuName)
        return { menuName: newMenuName, soldOut: false };
      return prevMenu;
    });
    this.setMenuList(newMenuList);
    this.render();
  }

  getMenuList() {
    return JSON.parse(this.localStroage.getItem(this.state.category)) || [];
  }

  setMenuList(newMenuList) {
    this.localStroage.setItem(this.state.category, JSON.stringify(newMenuList));
  }

  deleteList(menuName) {
    if (window.confirm("삭제하시겠습니까?")) {
      const newMenuList = this.getMenuList().filter(
        (prevMenu) => prevMenu.menuName !== menuName
      );
      this.setMenuList(newMenuList);
      this.render();
    }
  }
}
