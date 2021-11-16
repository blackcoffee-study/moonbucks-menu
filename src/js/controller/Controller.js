import MenuList from '../model/MenuList.js';
import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
  NOT_CHANGED,
  NOT_NUMBER,
  OUT_OF_PRICE_RANGE,
} from '../config/config.js';

export default class Controller {
  constructor(view) {
    this.menuList;
    this.view = view;

    this.loadMenuList('espresso');
  }

  loadMenuList(category) {
    this.menuList = new MenuList(category);

    this.view.renderMenuItemList(this.menuList.getMenuItemList());
    this.view.updateMenuCount(this.menuList.getMenuCount());
  }

  loadCategory(e) {
    const category = this.view.selectCategory(e);
    this.loadMenuList(category);
  }

  addMenuItem() {
    const { name, price } = this.view.getMenuInput();
    const trimmedName = this._validateMenuName(name);
    const trimmedPrice = this._validateMenuPrice(price);

    const id = this.menuList.addMenuItem(trimmedName, trimmedPrice);
    const menuCount = this.menuList.getMenuCount();

    this.view.addMenuItem(id, trimmedName, trimmedPrice);
    this.view.updateMenuCount(menuCount);
    this.view.clearMenuInput();
  }

  editMenuItem(e) {
    const menuId = this.view.getMenuId(e);
    const newName = this._validateMenuName(this.view.getNewMenuName(e));
    const newPrice = this._validateMenuPrice(this.view.getNewMenuPrice(e));

    this.menuList.editMenuItem(menuId, newName, newPrice);

    this.view.updateMenuItem(e, newName, newPrice);
  }

  removeMenuItem(e) {
    const menuId = this.view.getMenuId(e);
    let menuCount = 0;

    this.menuList.removeMenuItem(menuId);
    menuCount = this.menuList.getMenuCount();

    this.view.removeMenuItem(e);
    this.view.updateMenuCount(menuCount);
  }

  setMenuSoldOut(e) {
    const menuId = this.view.getMenuId(e);

    this.menuList.setMenuSoldOut(menuId);

    this.view.renderMenuItemList(this.menuList.menuItemList);
  }

  // private method

  _validateMenuName(name) {
    const trimmedName = name.trim();

    if (trimmedName === '') {
      throw EMPTY_VALUE;
    }

    return trimmedName;
  }

  _validateMenuPrice(price) {
    const trimmedPrice = price.trim();
    const re = /^\d+$/;

    if (!re.test(trimmedPrice)) {
      throw NOT_NUMBER;
    }

    const intPrice = parseInt(trimmedPrice);
    if (intPrice < 0 || intPrice > 999999) {
      throw OUT_OF_PRICE_RANGE;
    }

    return trimmedPrice;
  }
}
