import { qs, on, emit, qsAll } from '../helper.js';
class MenuView  {
  constructor() {
    this.template = new Template();

    this.menuForm = qs('#espresso-menu-form');
    this.menuInput = qs('.input-field');
    this.menuSubmitButton = qs('.input-submit');
    this.menuListElement = qs('#espresso-menu-list');
    this.menuCountText = qs('.menu-count');

    this.bindEvent();

  }

  showMenuList(menuList) {
    this.menuListElement.innerHTML = "";
    if (menuList) {
      menuList
        .map((menu) => this.template.menuAddTemplate(menu.name))
        .map((menuTemplate) => this.menuListElement.append(menuTemplate));
      const menuNameList = qsAll('.menu-name');
      for (let i = 0; i < menuList.length; i++) {
        menuList[i].soldout === true
        ? menuNameList[i].classList.add('sold-out')
        : menuNameList[i].classList.remove('sold-out')
      }
    }

  }

  bindEvent() {
    on(this.menuForm, 'submit', (event) => this.addMenu(event));
    on(this.menuSubmitButton, 'click', (event) => this.addMenu(event));
    on(this.menuListElement, 'click', ({ target }) => this.handleMenuEvent(target));
  }

  addMenu(event) {
    event.preventDefault();
    const value = this.menuInput.value;
    emit(this.menuForm, '@addMenu', value);
    this.menuInput.value = '';
  }

  menuCount() {
    const menuListTemplete = qsAll('.menu-list-item');
    this.menuCountText.textContent = `총 ${menuListTemplete.length}개`;
  }

  handleMenuEvent(target) {
    if (target.classList.contains('menu-edit-button')) {
      this.editMenu(target);
    } else if (target.classList.contains('menu-remove-button')) {
      this.removeMenu(target);
    } else if (target.classList.contains('menu-sold-out-button')) {
      this.soldoutMenu(target);
    }
  }

  removeMenu(target) {
    if (confirm('삭제하시겠습니까?')) {
      const value = [...target.closest('li').childNodes].find((menu) => menu.className).textContent;
      emit(this.menuListElement, '@removeMenu', value);
      target.closest('li').remove();
    }
  }

  editMenu(target) {
    const editMenuName = prompt('메뉴 이름을 입력해주세요');
    const value = [...target.closest('li').childNodes].find((menu) => menu.className).textContent;
    editMenuName && emit(this.menuListElement, '@editMenu', [value, editMenuName]);
  }

  soldoutMenu(target) {
    const value = [...target.closest('li').childNodes].find((menu) => menu.className).textContent;
    emit(this.menuListElement, '@soldoutMenu', value);
  }
}
class Template {
  menuAddTemplate(menuName) {
    const fragment = document.createElement('div');
    fragment.innerHTML = `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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

    return fragment;
  }

}

export default MenuView;