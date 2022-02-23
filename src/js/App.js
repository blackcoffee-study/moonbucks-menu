import Component from './core/Component.js';
import { MenuHeader, MenuForm, MenuList, MenuNav } from './components/index.js';
import { $, generateID } from './utils/index.js';
import { INITIAL_STATE, INITIAL_RENDERING_MENU } from './constants/constants.js';

export default class App extends Component {
  init() {
    this.state = {
      menu: JSON.parse(localStorage.getItem('menu')) || INITIAL_STATE,
      category: INITIAL_RENDERING_MENU,
    };
  }

  template() {
    return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4" data-component="menu-nav"></header>
        <main class="mt-10 d-flex justify-center">
          <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between" data-component="menu-header"></div>
            <form id="menu-form" data-component="menu-form"></form>
            <ul id="menu-list" class="mt-3 pl-0" data-component="menu-list"></ul>
          </div>
        </main>
      </div>
    </div>
      `;
  }

  componentDidMount() {
    const { category, menuItems, changeCategory, addMenu, updateMenu, deleteMenu, toggleSoldOut } =
      this;
    const $menuNav = $('[data-component="menu-nav"]');
    const $menuHeader = $('[data-component="menu-header"]');
    const $menuForm = $('[data-component="menu-form"]');
    const $menuList = $('[data-component="menu-list"]');

    new MenuNav($menuNav, { category, changeCategory: changeCategory.bind(this) });
    new MenuHeader($menuHeader, { category, menuItems });
    new MenuForm($menuForm, { category, addMenu: addMenu.bind(this) });
    new MenuList($menuList, {
      menuItems,
      updateMenu: updateMenu.bind(this),
      deleteMenu: deleteMenu.bind(this),
      toggleSoldOut: toggleSoldOut.bind(this),
    });
  }

  setEvent() {
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('menu', JSON.stringify(this.menu));
    });
  }

  get menu() {
    return this.state.menu;
  }

  get category() {
    return this.state.category;
  }

  get menuItems() {
    return this.state.menu[this.state.category];
  }

  addMenu(menuName) {
    if (!menuName.trim()) return;

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: [
          ...this.menuItems,
          {
            id: generateID(this.menuItems),
            menuName,
            isSoldOut: false,
          },
        ],
      },
    });
  }

  updateMenu(newMenuName, targetID) {
    const updatedMenuItems = this.menuItems.map(menuItem =>
      menuItem.id === targetID ? { ...menuItem, menuName: newMenuName } : menuItem
    );

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: updatedMenuItems,
      },
    });
  }

  deleteMenu(targetID) {
    const deletedMenuItems = this.menuItems.filter(({ id }) => id !== targetID);

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: deletedMenuItems,
      },
    });
  }

  changeCategory(newCategory) {
    this.setState({
      ...this.state,
      category: newCategory,
    });
  }

  toggleSoldOut(targetID) {
    const soldOutMenuItems = this.menuItems.map(menuItem =>
      menuItem.id === targetID ? { ...menuItem, isSoldOut: !menuItem.isSoldOut } : menuItem
    );

    this.setState({
      ...this.state,
      menu: {
        ...this.menu,
        [this.category]: soldOutMenuItems,
      },
    });
  }
}
