export default class Store {
  constructor() {
    this.menuGroups = [
      new EspressoMenuGroup(),
      new FrappuccinoMenuGroup(),
      new BlendedMenuGroup(),
      new TeavanaMenuGroup(),
      new DessertMenuGroup(),
    ];
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
      return;
    }

    menus.push({
      id: menus[menus.length - 1].id + 1,
      title: _menuTitle,
      isSoldOut: false,
    });
  }

  deleteMenu(_groupTitle, _menuId) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.filter((menu) => menu.id !== _menuId);
  }

  editMenu(_groupTitle, _menu) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.map((menu) => {
      if (menu.id === _menu.id) {
        menu.title = _menu.title;
      }
      return menu;
    });
  }

  soldOutMenuCheck(_groupTitle, _menu) {
    const group = this.selectMenuGroup(_groupTitle);

    group.menus = group.menus.map((menu) => {
      if (menu.id === _menu.id) {
        menu.isSoldOut = _menu.isSoldOut;
      }
      return menu;
    });
  }
}

class MenuGroupBase {
  constructor() {
    this.menus = [];
  }

  getTitle() {}
  getMenusNum() {
    return `<span class="mr-2 mt-4 menu-count">총 ${this.menus.length}개</span>`;
  }
  getMenuListItem() {
    if (!this.menus.length) return [];

    const $menuItems = this.menus.map((menu) => {
      const { id, isSoldOut, title } = menu;
      return `
      <li data-id=${id} 
          data-isSoldOut=${isSoldOut} 
          class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${
          isSoldOut ? "sold-out" : ""
        }">${title}</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;
    });

    return $menuItems;
  }
}

class EspressoMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "espresso";
  }

  getTitle() {
    return `<h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>`;
  }
}

class FrappuccinoMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "frappuccino";
    this.menus = [];
  }

  getTitle() {
    return `<h2 class="mt-1">🥤 프라프치노 메뉴 관리</h2>`;
  }
}

class BlendedMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "blended";
  }

  getTitle() {
    return `<h2 class="mt-1">🍹 블렌디드 메뉴 관리</h2>`;
  }
}

class TeavanaMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "teavana";
  }

  getTitle() {
    return `<h2 class="mt-1">🫖 티바나 메뉴 관리</h2>`;
  }
}

class DessertMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "desert";
  }

  getTitle() {
    return `<h2 class="mt-1">🍰 디저트 메뉴 관리</h2>`;
  }
}
