import Component from './Component.js';
import { ALERT_TEXT } from '../constant/index.js';
import {
  getLocalStorageItem,
  makeConfirmAlert,
  makePrompt,
} from '../utils/index.js';

export default class Menu extends Component {
  constructor(containerId, stateId) {
    const menuListTemplate = `<li class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name {{isSoldOut}}">{{name}}</span>
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
      </li>`;
    super(containerId, menuListTemplate, stateId);
    this.stateId = stateId;
  }

  init() {
    const storedState = getLocalStorageItem(this.stateId);
    if (storedState) {
      this.setState('menu', storedState.menu || []);
      this.setState('soldOut', storedState.soldOut || []);
      this.setState('count', storedState.count || 0);
    } else {
      this.setState('menu', []);
      this.setState('soldOut', []);
      this.setState('count', 0);
    }
  }

  clearEvents() {
    const $menuSubmitForm = document.getElementById('espresso-menu-form');
    const clone = $menuSubmitForm.cloneNode(true);

    clone.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addMenu();
    });

    $menuSubmitForm.parentNode.replaceChild(clone, $menuSubmitForm);
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

  setSoldOutMenu(target) {
    if (this.state.soldOut.includes(target)) {
      this.setState(
        'soldOut',
        this.state.soldOut.filter((menu) => menu !== target)
      );
    } else {
      this.setState('soldOut', [...this.state.soldOut, target]);
    }
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
    this.setState(
      'soldOut',
      this.state.soldOut.filter((menu) => menu !== target)
    );
  }

  makeHTML() {
    this.state.menu.forEach((menu) => {
      this.updateTemplate('name', menu.name);

      if (this.state.soldOut && this.state.soldOut.includes(menu.name)) {
        this.updateTemplate('isSoldOut', 'sold-out');
      } else {
        this.updateTemplate('isSoldOut', '');
      }

      const $templateElement = this.getHTMLElement(this.renderTemplate);

      $templateElement.addEventListener('click', ({ target }) => {
        if (!target) return;

        if (target.classList.contains('menu-remove-button')) {
          return this.deleteMenu(menu.name);
        }

        if (target.classList.contains('menu-edit-button')) {
          return this.updateMenu(menu.name);
        }

        if (target.classList.contains('menu-sold-out-button')) {
          this.setSoldOutMenu(menu.name);
        }
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
