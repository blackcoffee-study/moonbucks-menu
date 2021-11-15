import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
} from './config.js';

export default class MenuList {
  constructor() {
    this.menuItemList = [];
  }

  addMenuItem(menuName) {
    if (this._checkMenuNameExist(menuName)) {
      throw MENU_NAME_EXISTS;
    }

    this.menuItemList.push(menuName);
  }

  editMenuItem(oldMenuName, newMenuName) {
    const targetIndex = this._findIndexByMenuName(oldMenuName);

    // TODO: 메뉴 리스트에서 이름 중복 체크
    let index = 0;
    this.menuItemList.some((menuName) => {
      if (targetIndex !== index && menuName === newMenuName) {
        throw MENU_NAME_EXISTS;
      }
      index++;
    });

    this.menuItemList[targetIndex] = newMenuName;
  }

  removeMenuItem(menuName) {
    const targetIndex = this._findIndexByMenuName(menuName);
    if (targetIndex === -1) {
      throw MENU_NAME_NOT_EXISTS;
    }
    this.menuItemList.splice(targetIndex, 1);
  }

  getMenuCount() {
    return this.menuItemList.length;
  }

  _checkMenuNameExist(menuName) {
    return new Set(this.menuItemList).has(menuName);
  }

  _findIndexByMenuName(menuName) {
    return this.menuItemList.indexOf(menuName);
  }
}
