class MenuGroupBase {
  constructor() {
    this.title = "";
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

  saveMenuGroupInLocalStorage = () => {
    const { title, menus } = this;

    window.localStorage.setItem(this.title, JSON.stringify({ title, menus }));
  };

  loadMenuGroupFromLocalStorage = () => {
    const loadedData = JSON.parse(window.localStorage.getItem(this.title));
    if (!loadedData) return;

    this.title = loadedData.title;
    this.menus = loadedData.menus;
  };
}

export class EspressoMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "espresso";
  }

  getTitle() {
    return `<h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>`;
  }
}

export class FrappuccinoMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "frappuccino";
  }

  getTitle() {
    return `<h2 class="mt-1">🥤 프라프치노 메뉴 관리</h2>`;
  }
}

export class BlendedMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "blended";
  }

  getTitle() {
    return `<h2 class="mt-1">🍹 블렌디드 메뉴 관리</h2>`;
  }
}

export class TeavanaMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "teavana";
  }

  getTitle() {
    return `<h2 class="mt-1">🫖 티바나 메뉴 관리</h2>`;
  }
}

export class DessertMenuGroup extends MenuGroupBase {
  constructor() {
    super();
    this.title = "desert";
  }

  getTitle() {
    return `<h2 class="mt-1">🍰 디저트 메뉴 관리</h2>`;
  }
}
