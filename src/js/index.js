class Model {
  constructor() {
    this.espressos = [];
    this.frappuccinos = [];
    this.blendeds = [];
    this.teavanas = [];
    this.desserts = [];
  }

  bindMenuListChanged(handler) {
    this.onMenuChanged = handler;
  }

  addMenu(menuName) {
    this.espressos.push({
      id: this.espressos.length + 1,
      name: menuName,
    })

    this.onMenuChanged(this.espressos);
  }
}

class View {
  constructor() {
    this.input = document.querySelector('#espresso-menu-name');
    this.form = document.querySelector('#espresso-menu-form');

    this.menuList = document.querySelector('#espresso-menu-list');

  }

  get menuName() {
    return this.input.value;
  }

  resetInput() {
    return this.input.value = '';
  }

  addMenu(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      const name = this.menuName;

      if (!name) { return window.alert('메뉴 이름을 입력해주세요.') }
      handler(name);
      this.resetInput();
    })
  }

  getMenuElement(menuList) {
    return menuList.map((menu) =>
      `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menu.name}</span>
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
      </li>`).join('')
  }

  renderMenuList(menus) {
    if (menus.length === 0) { return; }

    const menuListElement = this.getMenuElement(menus)
    this.menuList.innerHTML = menuListElement;
  }
}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.render(this.model.espressos);

    this.view.addMenu(this.handleAddMenu);
    this.model.bindMenuListChanged(this.render);
  }

  render = (menuList) => {
    this.view.renderMenuList(menuList);
  }

  handleAddMenu = (menuName) => {
    this.model.addMenu(menuName);
  }
}

const app = new Controller(new Model(), new View());