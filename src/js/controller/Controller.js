import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
  NOT_CHANGED,
} from '../config/config.js';

export default class Controller {
  constructor(menuList, view) {
    this.menuList = menuList;
    this.view = view;
    this.tester = 'test this';
    view.renderMenuItemList(menuList.menuItemList);
    view.updateMenuCount(menuList.getMenuCount());
  }

  addMenuName() {
    try {
      const menuName = this.view.getMenuInput();
      const trimmedMenuName = this._validateMenuName(menuName);
      let menuCount = 0;

      this.menuList.addMenuItem(trimmedMenuName);
      menuCount = this.menuList.getMenuCount();

      this.view.addMenuItem(trimmedMenuName);
      this.view.clearMenuInput();
      this.view.updateMenuCount(menuCount);
    } catch (err) {
      this.view.showAlert(err);
      this.view.clearMenuInput();
    }
  }

  editMenuName(e) {
    const currentMenuName = this.view.getCurrentMenuName(e);
    const newMenuName = this.view.getNewMenuName(e);

    if (newMenuName === null) {
      return;
    }

    const trimmedMenuName = this._validateMenuName(newMenuName);

    if (trimmedMenuName === currentMenuName) {
      throw NOT_CHANGED;
    }

    this.menuList.editMenuItem(currentMenuName, trimmedMenuName);

    this.view.updateMenuName(e, trimmedMenuName);
  }

  removeMenuName(e) {
    const targetMenuName = this.view.getCurrentMenuName(e);
    let menuCount = 0;

    this.menuList.removeMenuItem(targetMenuName);
    menuCount = this.menuList.getMenuCount();

    this.view.removeMenuItem(e);
    this.view.updateMenuCount(menuCount);
  }

  _validateMenuName(menuName) {
    const trimmedMenuName = menuName.trim();

    if (trimmedMenuName === '') {
      throw EMPTY_VALUE;
    }

    return trimmedMenuName;
  }
}
