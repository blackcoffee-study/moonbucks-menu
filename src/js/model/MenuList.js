import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
  NOT_CHANGED,
} from '../config/config.js';

export default class MenuList {
  constructor(store) {
    this.store = store;
    const storage = this.store.getLocalStorage();

    if (storage === '' || storage === null) {
      this.menuItemList = [];
    } else {
      this.menuItemList = JSON.parse(this.store.getLocalStorage());
    }
  }

  addMenuItem(menuName) {
    if (this._findIndexByMenuName(menuName) > -1) {
      throw MENU_NAME_EXISTS;
    }

    this.menuItemList.push({ name: menuName, outOfStock: false });
    this.store.setLocalStorage(this.menuItemList);
  }

  editMenuItem(oldMenuName, newMenuName) {
    const targetIndex = this._findIndexByMenuName(oldMenuName);

    // 메뉴 리스트에서 이름 중복 체크
    let index = 0;

    for (const menuItem of this.menuItemList) {
      if (targetIndex !== index && menuItem.name === newMenuName) {
        throw MENU_NAME_EXISTS;
      }
      index++;
    }

    this.menuItemList[targetIndex].name = newMenuName;
    this.store.setLocalStorage(this.menuItemList);
  }

  removeMenuItem(menuName) {
    const targetIndex = this._findIndexByMenuName(menuName);
    if (targetIndex === -1) {
      throw MENU_NAME_NOT_EXISTS;
    }
    this.menuItemList.splice(targetIndex, 1);
    this.store.setLocalStorage(this.menuItemList);
  }

  getMenuCount() {
    return this.menuItemList.length;
  }

  _findIndexByMenuName(menuName) {
    let index = 0;

    for (const menuItem of this.menuItemList) {
      if (menuItem.name === menuName) {
        return index;
      }
      index++;
    }

    return -1;
  }
}
