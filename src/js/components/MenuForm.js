import Component from './component.js';
import { store } from '../index.js';

export default class MenuList extends Component {
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
  }

  updateCount() {
    const $count = document.querySelector('.menu-count');
    $count.innerHTML = `총 ${store.count}개`;
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

  updateMenu(target) {
    const name = this.makePrompt();
    if (!name || name.replace(' ', '') === '') return;
  }

  deleteMenu(target) {
    if (!this.makeConfirmAlert(`${target}메뉴를 삭제하시겠습니까?`)) return;
    this.setState(
      'menu',
      this.state.menu.filter((menu) => menu.name !== target)
    );
    this.render();
  }

  render() {
    this.makeHTML();
    this.updateCount();
    this.updateView();
  }
}
