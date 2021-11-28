class View {
  input: HTMLInputElement;
  form: HTMLFormElement;
  menuList: HTMLUListElement;
  menuCount: HTMLSpanElement;
  categoryButtons;
  constructor() {
    this.input = document.querySelector("#espresso-menu-name");
    this.form = document.querySelector("#espresso-menu-form");
    this.menuList = document.querySelector("#espresso-menu-list");
    this.menuCount = document.querySelector(".menu-count");
    this.categoryButtons = document.querySelectorAll('button[data-category-name]');
  }

  get menuName() {
    return this.input.value;
  }

  resetInput() {
    return (this.input.value = "");
  }

  getMenuElement(menuList: Array<string>) {
    return menuList.map((menu, index) =>
      `<li class="menu-list-item d-flex items-center py-2" data-menu-id=${index}>
  <span class="w-100 pl-2 menu-name">${menu}</span>
  <button
  type="button"
  name="soldOut"
  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
>
  품절
</button>
  <button
  type="button"
  name="edit"
  class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
  수정
  </button>
  <button
  type="button"
  name="delete"
  class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
  삭제
  </button>
  </li>`
    )
      .join("");
  }

  renderMenuList(menus: Array<string>) {
    while (this.menuList.firstChild) {
      this.menuList.removeChild(this.menuList.firstChild);
    }

    if (!menus) {
      return;
    }

    const menuListElement = this.getMenuElement(menus);
    this.menuList.innerHTML = menuListElement;
  }

  renderMenuCount(menus: Array<string>) {
    if (!menus) { return this.menuCount.innerText = '총 0개' }
    this.menuCount.innerText = `총 ${menus.length}개`;
  }

  bindAddMenu(handler: Function) {
    this.form.addEventListener("submit", (event) => handler(event))
  }

  bindEditMenu(handler: Function) {
    this.menuList.addEventListener("click", (event) => handler(event))
  }

  bindDeleteMenu(handler: Function) {
    this.menuList.addEventListener("click", (event) => handler(event))
  }

  bindClickMenuTab(handler: Function) {
    this.categoryButtons.forEach((button) =>
      button.addEventListener("click", event => handler(event))
    )
  }

  bindSoldOutMenu(handler: Function) {
    this.menuList.addEventListener("click", event => handler(event))
  }
}

export default View;
