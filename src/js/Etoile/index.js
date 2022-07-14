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

      this.appController.addMenu({ name });

      const newNode = this.getMenuItemNode(name);
      this.$menuList.append(newNode);

      this.$menuTextInput.value = '';
    });
  }

  getMenuItemNode(name) {
    return new DOMParser().parseFromString(
      `<li class="menu-list-item d-flex items-center py-2"><span class="w-100 pl-2 menu-name">${name}</span><button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"> 수정 </button> <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button></li>`,
      'text/html'
    ).body.firstChild;
  }
}
