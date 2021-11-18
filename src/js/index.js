class Model {
  constructor() {
    this.state = {
      espresso : [],
      frappuchino: [],
      blended: [],
      teavana: [],
      dessert: [],
      selectedTab: 'espresso',
    }
  }

  bindMenuListChanged(handler) {
    this.onMenuChanged = handler;
  }

  addMenu(menuName) {
    const { selectedTab } = this.state;

    this.state[selectedTab].push({
      id: this.state[selectedTab].length + 1,
      name: menuName,
    })

    this.onMenuChanged(this.state[selectedTab]);
  }

  deleteMenu(id) {
    const { selectedTab } = this.state;

    this.state[selectedTab] = this.state[selectedTab].filter((menu) => 
      menu.id !== Number(id)
    )

    this.onMenuChanged(this.state[selectedTab]);
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
      `<li class="menu-list-item d-flex items-center py-2" data-id=${menu.id}>
        <span class="w-100 pl-2 menu-name">${menu.name}</span>
        <button
          type="button"
          name="edit"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          name="delete"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`).join('')
  }

  renderMenuList(menus) {
    while (this.menuList.firstChild) {
      this.menuList.removeChild(this.menuList.firstChild);
    }

    if (menus.length === 0) { return; }

    const menuListElement = this.getMenuElement(menus)
    this.menuList.innerHTML = menuListElement;
  }

  bindDeleteMenu(handler) {  
    this.menuList.addEventListener('click', event => {
      if (event.target.name === 'delete') {
        const deleteConfirm =  window.confirm('메뉴를 삭제하시겠습니까?');
        
        if (deleteConfirm) {
          const { id } = event.target.parentNode.dataset;
          handler(id);
        }
      }
    })
  }
}



class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.render(this.model.state.espresso);

    this.view.addMenu(this.handleAddMenu);
    this.view.bindDeleteMenu(this.handleDeleteMenu);

    this.model.bindMenuListChanged(this.render);
  }

  render = (menuList) => {
    this.view.renderMenuList(menuList);
  }

  handleAddMenu = (menuName) => {
    this.model.addMenu(menuName);
  }

  handleDeleteMenu = (id) => {
    this.model.deleteMenu(id);
  }
}

const app = new Controller(new Model(), new View());