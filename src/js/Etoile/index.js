import AppController from './controller/index.js';

export default class EtoileApp {
  $menuForm = document.getElementById('espresso-menu-form');
  $menuTextInput = document.getElementById('espresso-menu-name');
  $menuList = document.getElementById('espresso-menu-list');

  // initialize App
  constructor(categories) {
    this.appController = new AppController(categories);

    this.attachListeners();
  }

  attachListeners() {
    this.$menuForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = new FormData(event.target).get('espressoMenuName');

      const newMenuEntity = this.appController.addMenu({ name });

      const newNode = new MenuItemNode({
        id: newMenuEntity.id,
        name,
        onEdit: this.appController.editMenu,
      });

      this.$menuList.append(newNode);

      this.$menuTextInput.value = '';
    });
  }
}

class MenuItemNode {
  menuItemClassName = 'menu-list-item';
  menuItemEditButtonClassName = 'menu-edit-button';
  menuItemRemoveButtonClassName = 'menu-remove-button';
  menuItemNameClassName = 'menu-name';

  constructor({ id, name, onEdit }) {
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
      const newName = onEdit(id);
      this.newListItemNode.querySelector(`.${this.menuItemNameClassName}`).textContent = newName;
    });

    return this.newListItemNode;
  }
}
