import { qs, on } from '../helper.js';
import View from './View.js';

class EspressoView extends View {
  constructor() {
    super(qs('#app'));
    this.espressoMenuList = [];

    this.template = new Template();

    this.espressoForm = qs('#espresso-menu-form');
    this.espressoInput = qs('.input-field');
    this.espressoSubmitButton = qs('.input-submit');
    this.espressoMeueList = qs('#espresso-menu-list');
    this.espressoMenuCountText = qs('.menu-count');

    this.bindEvent();
  }

  bindEvent() {
    on(this.espressoForm, 'submit', (event) => this.addEspressoMenu(event));
    on(this.espressoSubmitButton, 'click', (event) => this.addEspressoMenu(event));
    on(this.espressoMeueList, 'click', ({ target }) => this.handleEspressoMenuEvent(target));
  }

  addEspressoMenu(event) {
    event.preventDefault();
    if (this.espressoInput.value !== '') {
      this.espressoMenuList.push(this.espressoInput.value);
      this.espressoMeueList.append(this.template.menuAddTemplate(this.espressoInput.value));
      this.espressoMenuCount();
    }
    this.espressoInput.value = '';
  }

  espressoMenuCount() {
    this.espressoMenuCountText.textContent = `총 ${this.espressoMenuList.length}개`;
  }

  handleEspressoMenuEvent(target) {
    if (target.classList.contains('menu-edit-button')) {
      this.editEspressoMenu(target);
    } else if (target.classList.contains('menu-remove-button')) {
      this.removeEspressoMenu(target);
    }
  }

  removeEspressoMenu(target) {
    if (confirm('삭제하시겠습니까?')) {
      target.closest('li').remove();
      this.espressoMenuList = this.espressoMenuList
        .filter((espressoMenu) => espressoMenu !== target.previousElementSibling.previousElementSibling.textContent);
      this.espressoMenuCount();
    }
  }

  editEspressoMenu(target) {
    const editEspressoMenuName = prompt('메뉴 이름을 입력해주세요');
    target.previousElementSibling.textContent = editEspressoMenuName;
  }
}

export default EspressoView;

class Template {
  menuAddTemplate(menuName) {
    const fragment = document.createElement('div');
    fragment.innerHTML = `
      <li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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
