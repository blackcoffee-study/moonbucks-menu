import Component from './core/Component.js';
import { MenuHeader, MenuForm, MenuList } from './components/index.js';
import { $, generateID } from './utils/index.js';

export default class App extends Component {
  init() {
    this.state = {
      menuItems: [],
    };
  }

  template() {
    return `
    <div class="heading d-flex justify-between" data-component="menu-header"></div>
    <form id="espresso-menu-form" data-component="menu-form"></form>
    <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list"></ul>
      `;
  }

  componentDidMount() {
    const { menuItems, addMenu, updateMenu, deleteMenu } = this;
    const $menuHeader = $('[data-component="menu-header"]');
    const $menuForm = $('[data-component="menu-form"]');
    const $menuList = $('[data-component="menu-list"]');

    new MenuHeader($menuHeader, { menuItems });
    new MenuForm($menuForm, { addMenu: addMenu.bind(this) });
    new MenuList($menuList, {
      menuItems,
      updateMenu: updateMenu.bind(this),
      deleteMenu: deleteMenu.bind(this),
    });
  }

  get menuItems() {
    return this.state.menuItems;
  }

  addMenu(menuName) {
    if (!menuName.trim()) return;

    this.setState({
      ...this.state,
      menuItems: [
        ...this.menuItems,
        {
          id: generateID(this.menuItems),
          menuName,
        },
      ],
    });
  }

  updateMenu(newMenuName, targetID) {
    const updatedMenuItems = this.menuItems.map(menuItem =>
      menuItem.id === targetID ? { ...menuItem, menuName: newMenuName } : menuItem
    );

    this.setState({
      ...this.state,
      menuItems: updatedMenuItems,
    });
  }

  deleteMenu(targetID) {
    const deletedMenuItems = this.menuItems.filter(({ id }) => id !== targetID);

    this.setState({
      ...this.state,
      menuItems: deletedMenuItems,
    });
  }
}
