import Component from './component.js';
import { store } from '../index.js';
import { alertText } from '../constant/index.js';

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

  initFunc() {
    this.setState('menu', []);
    const $menuSubmitForm = document.getElementById('espresso-menu-form');

    this.addEvent($menuSubmitForm, 'submit', (e) => {
      e.preventDefault();
      this.addMenu();
    });
  }

  checkDuplication(newMenu) {
    return this.state.menu.find((menu) => menu.name === newMenu);
  }

  updateCount() {
    const $count = document.querySelector('.menu-count');
    $count.innerHTML = `총 ${store.count}개`;
  }

  addMenu() {
    const $menuInput = document.getElementById('espresso-menu-name');
    const newMenu = $menuInput.value;
    if (newMenu.replaceAll(' ', '') === '') {
      $menuInput.value = '';
      return;
    }

    if (this.checkDuplication(newMenu)) {
      alert(alertText.MENU_EXIST);
      $menuInput.value = '';
      return;
    }

    store.count += 1;
    $menuInput.value = '';
    this.setState('menu', [...this.state.menu, { name: newMenu }]);
  }

  updateMenu(target) {
    const name = this.makePrompt();
    if (this.checkDuplication(name)) {
      alert(alertText.MENU_EXIST);
      return;
    }
    const targetObj = this.state.menu.find((menu) => menu.name === target);
    if (!name || name.replaceAll(' ', '') === '' || !targetObj) return;
    targetObj.name = name;
    this.setState('menu', [...this.state.menu]);
  }

  deleteMenu(target) {
    if (!this.makeConfirmAlert(alertText.MENU_DELETE)) return;
    store.count -= 1;
    this.setState(
      'menu',
      this.state.menu.filter((menu) => menu.name !== target)
    );
  }

  makeHTML() {
    this.state.menu.forEach((menu) => {
      this.updateTemplate('{{name}}', menu.name);

      const $templateElement = this.getHTMLElement(this.renderTemplate);
      const $updateBtn = $templateElement.querySelector('.menu-edit-button');
      const $deleteBtn = $templateElement.querySelector('.menu-remove-button');

      this.addEvent($deleteBtn, 'click', () => {
        this.deleteMenu(menu.name);
      });

      this.addEvent($updateBtn, 'click', () => {
        this.updateMenu(menu.name);
      });

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
