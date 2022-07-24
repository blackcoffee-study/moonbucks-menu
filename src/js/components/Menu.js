import Component from './Component.js';
import { ALERT_TEXT } from '../constant/index.js';
import { makeConfirmAlert, makePrompt } from '../utils/index.js';

export default class Menu extends Component {
  constructor(containerId) {
    const menuListTemplate = `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">{{name}}</span>
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
      </li>`;
    super(containerId, menuListTemplate);
  }

  init() {
    this.setState('menu', []);
    this.setState('count', 0);
    const $menuSubmitForm = document.getElementById('espresso-menu-form');

    $menuSubmitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addMenu();
    });

    this.container.addEventListener('click', ({ target }) => {
      if (!target) return;

      if (target.classList.contains('menu-remove-button')) {
        const menuItem =
          target.parentNode.querySelector('.menu-name').innerText;
        return this.deleteMenu(menuItem);
      }

      if (target.classList.contains('menu-edit-button')) {
        const menuItem =
          target.parentNode.querySelector('.menu-name').innerText;
        return this.updateMenu(menuItem);
      }
    });
  }

  checkDuplication(newMenu) {
    return this.state.menu.find((menu) => menu.name === newMenu);
  }

  updateCount() {
    const $count = document.querySelector('.menu-count');
    $count.textContent = `총 ${this.state.count}개`;
  }

  addMenu() {
    const $menuInput = document.getElementById('espresso-menu-name');
    const newMenu = $menuInput.value;
    if (newMenu.replaceAll(' ', '') === '') {
      $menuInput.value = '';
      return;
    }

    if (this.checkDuplication(newMenu)) {
      alert(ALERT_TEXT.MENU_EXIST);
      $menuInput.value = '';
      return;
    }

    $menuInput.value = '';
    this.setState('count', this.state.count + 1);
    this.setState('menu', [...this.state.menu, { name: newMenu }]);
  }

  updateMenu(target) {
    const newName = makePrompt(ALERT_TEXT.MENU_UPDATE);
    if (this.checkDuplication(newName)) {
      alert(ALERT_TEXT.MENU_EXIST);
      return;
    }
    const targetObj = this.state.menu.find((menu) => menu.name === target);
    if (!newName || newName.replaceAll(' ', '') === '' || !targetObj) return;
    targetObj.name = newName;
    this.setState('menu', [...this.state.menu]);
  }

  deleteMenu(target) {
    if (!makeConfirmAlert(ALERT_TEXT.MENU_DELETE)) return;
    this.setState('count', this.state.count - 1);
    this.setState(
      'menu',
      this.state.menu.filter((menu) => menu.name !== target)
    );
  }

  makeHTML() {
    this.state.menu.forEach((menu) => {
      this.updateTemplate('name', menu.name);

      const $templateElement = this.getHTMLElement(this.renderTemplate);

      this.htmlList.push($templateElement);
      this.resetRenderTemplate();
    });
  }

  render() {
    this.makeHTML();
    this.updateCount();
    this.updateView();
  }
}
