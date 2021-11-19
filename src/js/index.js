class Model {
  constructor() {
    this.menu = {
      espresso : JSON.parse(localStorage.getItem('espresso')) || [],
      frappuchino: JSON.parse(localStorage.getItem('frappuchino')) || [],
      blended: JSON.parse(localStorage.getItem('blended')) || [],
      teavana: JSON.parse(localStorage.getItem('teavana')) || [],
      dessert: JSON.parse(localStorage.getItem('dessert')) || [],
    };
    this.selectedTab = 'espresso';
  }

  bindMenuListChanged(handler) {
    this.menuObserver = handler;
  }

  onMenuChanged() {
    this.menuObserver(this.menu[this.selectedTab])
    localStorage.setItem(this.selectedTab, JSON.stringify(this.menu[this.selectedTab]))
  }

  addMenu(menuName) {
    this.menu[this.selectedTab].push({
      id: this.menu[this.selectedTab].length + 1,
      name: menuName,
    })

    this.onMenuChanged();
  }

  editMenu(menuId, editedName) {
    this.menu[this.selectedTab] = this.menu[this.selectedTab].map((menu) => {
      return menu.id === Number(menuId) ? { id: Number(menuId), name: editedName } : menu
    })

    this.onMenuChanged();
  }

  deleteMenu(menuId) {
    this.menu[this.selectedTab] = this.menu[this.selectedTab].filter((menu) => 
      menu.id !== Number(menuId)
    )

    this.onMenuChanged();
  }
}




class View {
  constructor() {
    this.input = document.querySelector('#espresso-menu-name');
    this.form = document.querySelector('#espresso-menu-form');
    this.menuList = document.querySelector('#espresso-menu-list');
    this.menuCount = document.querySelector('.menu-count');
  }

  get menuName() {
    return this.input.value;
  }

  resetInput() {
    return this.input.value = '';
  }
  
  getMenuElement(menuList) {
    return menuList.map((menu) =>
    `<li class="menu-list-item d-flex items-center py-2" data-menu-id=${menu.id}>
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

  renderMenuCount(menus) {
    this.menuCount.innerText = `총 ${menus.length}개`
  }
  
  bindAddMenu(handler) {
    this.form.addEventListener('submit', event => {
      event.preventDefault();

      const name = this.menuName;

      if (!name) { return window.alert('메뉴 이름을 입력해주세요.') }
      handler(name);
      this.resetInput();
    })
  }

  bindEditMenu(handler) {
    this.menuList.addEventListener('click', event => {
      if (event.target.name === 'edit') {
        const editedName = window.prompt('수정할 메뉴 이름을 입력해주세요');
        
        if (editedName) {
          const { menuId } = event.target.parentNode.dataset;
          handler(menuId, editedName)
        }
      }
    })
  }

  bindDeleteMenu(handler) {  
    this.menuList.addEventListener('click', event => {
      if (event.target.name === 'delete') {
        const deleteConfirm =  window.confirm('메뉴를 삭제하시겠습니까?');

        if (deleteConfirm) {
          const { menuId } = event.target.parentNode.dataset;
          handler(menuId);
        }
      }
    })
  }
}



class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.render(this.model.menu.espresso);

    this.view.bindAddMenu(this.handleAddMenu);
    this.view.bindEditMenu(this.handleEditMenu);
    this.view.bindDeleteMenu(this.handleDeleteMenu);

    this.model.bindMenuListChanged(this.render);
  }

  render = (menuList) => {
    this.view.renderMenuList(menuList);
    this.view.renderMenuCount(menuList);
  }

  handleAddMenu = (menuName) => {
    this.model.addMenu(menuName);
  }

  handleEditMenu = (id, editedName) => {
    this.model.editMenu(id, editedName);
  }

  handleDeleteMenu = (id) => {
    this.model.deleteMenu(id);
  }
}

const app = new Controller(new Model(), new View());
