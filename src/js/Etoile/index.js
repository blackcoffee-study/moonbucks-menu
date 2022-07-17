import { validator } from '../utils/index.js';
import AppController from './controller/index.js';

export default class EtoileApp {
  $menuForm = document.getElementById('espresso-menu-form');
  $menuTextInput = document.getElementById('espresso-menu-name');
  $menuList = document.getElementById('espresso-menu-list');

  // initialize App
  constructor(categories) {
    this.appController = new AppController(categories);

    this.handleSubmitMenu = this.handleSubmitMenu.bind(this);
    this.handleEditMenu = this.handleEditMenu.bind(this);
    this.handleRemoveMenu = this.handleRemoveMenu.bind(this);

    this.attachListeners();
  }

  attachListeners() {
    this.$menuForm.addEventListener('submit', this.handleSubmitMenu);
  }

  handleEditMenu(id, name) {
    return this.appController.editMenu(id, name);
  }
  handleRemoveMenu() {
    return this.appController.deleteMenu();
  }

  handleCreateMenu(newMenuName) {
    let newMenuEntity;

    try {
      newMenuEntity = this.appController.addMenu({ name: newMenuName });
    } catch (error) {
      console.warn(error);
      return;
    }

    return newMenuEntity;
  }

  handleSubmitMenu(event) {
    event.preventDefault();

    const name = new FormData(event.target).get('espressoMenuName');

    const newMenu = this.handleCreateMenu(name);

    const newNode = new MenuItemNode({
      id: newMenu.id,
      name,
      onEdit: this.handleEditMenu,
      onRemove: this.handleRemoveMenu,
    });

    this.$menuList.append(newNode);

    this.$menuTextInput.value = '';
  }
}

class MenuItemNode {
  menuItemClassName = 'menu-list-item';
  menuItemEditButtonClassName = 'menu-edit-button';
  menuItemRemoveButtonClassName = 'menu-remove-button';
  menuItemNameClassName = 'menu-name';

  constructor({ id, name, onEdit, onRemove }) {
    const parsedDocument = new DOMParser().parseFromString(
      `<li class="${this.menuItemClassName} d-flex items-center py-2">
        <span class="w-100 pl-2 ${this.menuItemNameClassName}">${name}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 ${this.menuItemEditButtonClassName}"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm ${this.menuItemRemoveButtonClassName}"
        >
          삭제
        </button>
      </li>`,
      'text/html'
    );

    this.newListItemNode = parsedDocument.body.firstChild;

    const $menuItemEditButton = this.newListItemNode.querySelector(
      `.${this.menuItemEditButtonClassName}`
    );

    $menuItemEditButton.addEventListener('click', () => {
      const newName = prompt('새 이름을 입력하세요');

      validator.isEmptyString(newName);

      // should 'try' EDIT commands here?
      onEdit(id, newName);

      this.newListItemNode.querySelector(`.${this.menuItemNameClassName}`).textContent = newName;
    });

    const $menuItemRemoveButton = this.newListItemNode.querySelector(
      `.${this.menuItemRemoveButtonClassName}`
    );

    $menuItemRemoveButton.addEventListener('click', () => {
      const confirmResult = onRemove(id);

      if (!confirmResult) return;

      this.newListItemNode.remove();
    });

    return this.newListItemNode;
  }
}
