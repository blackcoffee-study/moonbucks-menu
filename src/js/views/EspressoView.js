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

    this.bindEvent();
  }

  bindEvent() {
    on(this.espressoForm, 'submit', (event) => this.addEspressoMenu(event));
    on(this.espressoSubmitButton, 'click', (event) =>
      this.addEspressoMenu(event)
    );
  }

  addEspressoMenu(event) {
    event.preventDefault();
    if (this.espressoInput.value !== '') {
      this.espressoMenuList.push(this.espressoInput.value);
      this.espressoMeueList.append(
        this.template.menuAddTemplate(this.espressoInput.value)
      );
    }
    this.espressoInput.value = '';
    this.bindEspressoMenuEvent();
  }

  bindEspressoMenuEvent() {
    on(this.espressoMeueList, 'click', (event) =>
      this.handleEspressoMenuEvent(event)
    );
  }

  handleEspressoMenuEvent(event) {
    if (event.target.classList.contains('menu-edit-button')) {
      this.editEspressoMenu(event);
    } else if (event.target.classList.contains('menu-remove-button')) {
      this.removeEspressoMenu(event);
    }
  }

  removeEspressoMenu(event) {
    if (confirm('삭제하시겠습니까?')) {
      event.target.closest('li').remove();
    }
  }

  editEspressoMenu(event) {
    console.log(event);
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
