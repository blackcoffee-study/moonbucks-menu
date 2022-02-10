import { qs, on } from '../helper.js';
import View from './View.js';

class EspressoView extends View {
  constructor() {
    super(qs('#app'));

    this.template = new Template();

    this.espressoForm = qs('#espresso-menu-form');
    this.espressoSubmitText = qs('.input-field');
    this.espressoSubmitButton = qs('.input-submit');

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
    if (this.espressoSubmitText.value !== '') {
      console.log(this.espressoSubmitText.value);
    }
    this.espressoSubmitText.value = '';
  }
}

export default EspressoView;

class Template {
  menuAddTemplate() {
    return `
    <li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${name}</span>
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
  }
}
