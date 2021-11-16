import Menu from './Menu.js';
import Store from '../store/store.js';
import { isStrEmpty } from '../util/util.js';
import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
  NOT_CHANGED,
} from '../config/config.js';

export default class MenuList {
  constructor(type) {
    this.type = type;
    this._store = new Store(type);
    this.menuItemList = [];

    this.loadMenuList();
  }

  loadMenuList() {
    const storage = this._store.getLocalStorage();
    const db = isStrEmpty(storage) ? [] : JSON.parse(storage);

    for (const menu of db) {
      const newMenu = new Menu(menu.name, menu.price, menu.isSoldOut);
      this.menuItemList.push(newMenu);
    }
  }

  addMenuItem(name, price) {
    if (this._findIndexByMenuName(name) > -1) {
      throw MENU_NAME_EXISTS;
    }

    const newMenu = new Menu(name, price);

    this.menuItemList.push(newMenu);
    this._save();

    return this.menuItemList.length - 1;
  }

  editMenuItem(id, name, price) {
    // 메뉴 리스트에서 이름 중복 체크
    let index = 0;

    for (const menuItem of this.menuItemList) {
      if (id !== index && menuItem.getName() === name) {
        console.log(id, index);
        throw MENU_NAME_EXISTS;
      }
      index++;
    }

    this.menuItemList[id].setName(name);
    this.menuItemList[id].setPrice(price);
    this._save();
  }

  removeMenuItem(id) {
    if (id < 0) {
      throw MENU_NAME_NOT_EXISTS;
    }
    this.menuItemList.splice(id, 1);
    this._save();
  }

  // setter, getter

  setType(type) {
    this.type = type;
  }

  setMenuSoldOut(id) {
    this.menuItemList[id].setIsSoldOut();
    this._save();
  }

  getType() {
    return this.type;
  }

  getMenuItemList() {
    return this.menuItemList;
  }

  getMenuCount() {
    return this.menuItemList.length;
  }

  // private method

  _save() {
    this._store.setLocalStorage(this.menuItemList);
  }

  _findIndexByMenuName(menuName) {
    let index = 0;

    for (const menuItem of this.menuItemList) {
      if (menuItem.getName() === menuName) {
        return index;
      }
      index++;
    }

    return -1;
  }
}
