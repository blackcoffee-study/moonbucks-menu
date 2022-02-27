import Component from './core/Component.js';
import { MenuHeader, MenuForm, MenuList, MenuNav } from './components/index.js';
import { $ } from './utils/index.js';
import { menuApi } from './utils/api.js';

export default class App extends Component {
  init() {
    this.state = this.props;
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
    const { menu, category, changeCategory, addMenu, updateMenu, deleteMenu, toggleSoldOut } = this;
    const $menuNav = $('[data-component="menu-nav"]');
    const $menuHeader = $('[data-component="menu-header"]');
    const $menuForm = $('[data-component="menu-form"]');
    const $menuList = $('[data-component="menu-list"]');

    new MenuNav($menuNav, { category, changeCategory: changeCategory.bind(this) });
    new MenuHeader($menuHeader, { category, menu });
    new MenuForm($menuForm, { category, addMenu: addMenu.bind(this) });
    new MenuList($menuList, {
      menu,
      updateMenu: updateMenu.bind(this),
      deleteMenu: deleteMenu.bind(this),
      toggleSoldOut: toggleSoldOut.bind(this),
    });
  }

  get menu() {
    return this.state.menu;
  }

  get category() {
    return this.state.category;
  }

  async addMenu(menuName) {
    if (!menuName.trim()) return;

    await menuApi.addMenu(this.category, menuName);

    this.setState({
      ...this.state,
      menu: await menuApi.getMenuListByCategory(this.category),
    });
  }

  async updateMenu(newMenuName, targetID) {
    await menuApi.updateMenu(this.category, targetID, newMenuName);

    this.setState({
      ...this.state,
      menu: await menuApi.getMenuListByCategory(this.category),
    });
  }

  async deleteMenu(targetID) {
    await menuApi.deleteMenu(this.category, targetID);

    this.setState({
      ...this.state,
      menu: await menuApi.getMenuListByCategory(this.category),
    });
  }

  async changeCategory(newCategory) {
    this.setState({
      menu: await menuApi.getMenuListByCategory(newCategory),
      category: newCategory,
    });
  }

  async toggleSoldOut(targetID) {
    await menuApi.toggleSoldOut(this.category, targetID);

    this.setState({
      ...this.state,
      menu: await menuApi.getMenuListByCategory(this.category),
    });
  }
}
