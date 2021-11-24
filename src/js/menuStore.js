import {
  EspressoMenuGroup,
  FrappuccinoMenuGroup,
  BlendedMenuGroup,
  TeavanaMenuGroup,
  DessertMenuGroup,
} from "./menuGroups.js";

export default class Store {
  constructor() {
    this.menuGroups = [
      new EspressoMenuGroup(),
      new FrappuccinoMenuGroup(),
      new BlendedMenuGroup(),
      new TeavanaMenuGroup(),
      new DessertMenuGroup(),
    ];
    this.menuGroups.forEach((group) => group.loadMenuGroupFromLocalStorage());
  }

  selectMenuGroup(_groupTitle) {
    const seletedGroup = this.menuGroups.filter(
      (group) => group.title === _groupTitle
    )[0];

    return seletedGroup;
  }

  addMenu(_groupTitle, _menuTitle) {
    const group = this.selectMenuGroup(_groupTitle);

    const { menus } = group;

    if (!menus.length) {
      menus.push({
        id: 1,
        title: _menuTitle,
        isSoldOut: false,
      });
    } else {
      menus.push({
        id: menus[menus.length - 1].id + 1,
        title: _menuTitle,
        isSoldOut: false,
      });
    }
    group.saveMenuGroupInLocalStorage();
  }

  deleteMenu(_groupTitle, _menuId) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.filter((menu) => menu.id !== _menuId);
    group.saveMenuGroupInLocalStorage();
  }

  editMenu(_groupTitle, _menu) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.map((menu) => {
      if (menu.id === _menu.id) {
        menu.title = _menu.title;
      }
      return menu;
    });
    group.saveMenuGroupInLocalStorage();
  }

  soldOutMenuCheck(_groupTitle, _menu) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.map((menu) => {
      if (menu.id === _menu.id) {
        menu.isSoldOut = _menu.isSoldOut;
      }
      return menu;
    });
    group.saveMenuGroupInLocalStorage();
  }
}
