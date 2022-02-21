import { emit, on, qs } from "../helper.js";

class MenuView {
  constructor() {
    this.menuListElement = qs('nav');
    this.menuHeader = qs('.heading');


    this.bindEvent();
  }

  bindEvent() {
    on(this.menuListElement, 'click', (event) => this.handleMenuClick(event));
  }

  handleMenuClick(event) {
    this.menuHeader.childNodes[1].textContent = `${event.target.textContent} 메뉴 관리`;
    const value = event.target.dataset.categoryName;
    emit(this.menuListElement, '@menuClick', value);
  }

}

export default MenuView;