import { qs, on, emit, qsAll } from '../helper.js';
class EspressoView  {
  constructor() {
    this.template = new Template();

    this.espressoForm = qs('#espresso-menu-form');
    this.espressoInput = qs('.input-field');
    this.espressoSubmitButton = qs('.input-submit');
    this.espressoMenuListElement = qs('#espresso-menu-list');
    this.espressoMenuCountText = qs('.menu-count');

    this.bindEvent();

  }

  showEspressoMenu(espressoMenuList) {
    this.espressoMenuListElement.innerHTML = "";
    espressoMenuList
      .map((espressoMenu) => this.template.menuAddTemplate(espressoMenu))
      .map((espressoMenuTemplate) => this.espressoMenuListElement.append(espressoMenuTemplate));
  }

  bindEvent() {
    on(this.espressoForm, 'submit', (event) => this.addEspressoMenu(event));
    on(this.espressoSubmitButton, 'click', (event) => this.addEspressoMenu(event));
    on(this.espressoMenuListElement, 'click', ({ target }) => this.handleEspressoMenuEvent(target));
  }

  addEspressoMenu(event) {
    event.preventDefault();
    const value = this.espressoInput.value;
    emit(this.espressoForm, '@addEspressoMenu', value);
    this.espressoInput.value = '';
  }

  espressoMenuCount() {
    const espressoMenuList = qsAll('.menu-list-item');
    this.espressoMenuCountText.textContent = `총 ${espressoMenuList.length}개`;
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
      const value = [...target.closest('li').childNodes].find((espressoMenu) => espressoMenu.className).textContent;
      emit(this.espressoMenuListElement, "@removeEspressoMenu", value);
      target.closest('li').remove();
    }
  }

  editEspressoMenu(target) {
    const editEspressoMenuName = prompt('메뉴 이름을 입력해주세요');
    const value = [...target.closest('li').childNodes].find((espressoMenu) => espressoMenu.className).textContent;
    editEspressoMenuName && emit(this.espressoMenuListElement, "@editEspressoMenu", [value, editEspressoMenuName]);
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