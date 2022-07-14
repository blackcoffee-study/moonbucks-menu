import MenuEntity from '../model/Menu/index.js';

// repository : 기본은 인메모리
class EtoileRepository {
  caches = new Map();

  insert(category, menu) {
    const set = this.caches.get(category) || new Set();
    set.add(menu);
    this.caches.set(category, set);
  }
  getAll(category) {
    return [...this.caches.get(category)];
  }
}

// service : 메뉴관리하는 실무자
class MenuService {
  constructor() {
    this.menuRepository = new EtoileRepository();
  }
  toggleActive() {}
  addMenu(category, menu) {
    this.menuRepository.insert(category, menu);
  }
  getMenu(category) {
    return this.menuRepository.getAll(category);
  }
}

// service: 얘는 맥락만 바꾸는 애라 get,set정도의 기능일듯?
class CategoryService {
  constructor(catergories) {
    this.catergories = catergories; // 이거 string[]로 들어와도 Record<key, Category>으로 관리해야할건데
    this.currentCategory = catergories[0];
  }
  getCurrent() {
    return this.currentCategory;
  }
  switch(category) {}
}

// controller : 제어권을 가진 점주
class AppController {
  constructor(catergories = defaultCategories) {
    this.categoryService = new CategoryService(catergories);
    this.menuService = new MenuService();
  }

  // all APIs
  // 메뉴를 표시해라
  getMenu() {
    const category = this.categoryService.getCurrent();

    return this.menuService.getMenu(category);
  }

  // 신메뉴 넣자
  addMenu(menuDto) {
    // validate
    const category = this.categoryService.getCurrent();
    const newMenu = new MenuEntity(menuDto);
    this.menuService.addMenu(category, menuDto);
    return newMenu;
  }
  // 그 메뉴 솔드아웃 처리하자
  toggleActive(id) {
    const category = this.categoryService.getCurrent();
    // validate
    this.menuService.toggleActive(category, id);
  }

  // 그 메뉴 이름이랑 사진 바꾸자, 가격도 올려!
  editMenu(id, particalMenuDto) {}

  // 그 메뉴 이제 팔지 말자
  deleteMenu(id) {}

  // 이제 다른 카테고리 보자
  switchCategory(category) {
    this.categoryService.switch(category);
    this.menuService.showMenu(category);
  }
}

export class EtoileApp {
  $menuForm = document.getElementById('espresso-menu-form');
  $menuTextInput = document.getElementById('espresso-menu-name');
  $menuList = document.getElementById('espresso-menu-list');

  // initialize App
  constructor(categories) {
    this.appController = new AppController(categories);

    this.attachListeners();
  }

  attachListeners() {
    this.$menuForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = new FormData(event.target).get('espressoMenuName');

      this.appController.addMenu({ name });

      const newNode = this.getMenuItemNode(name);
      this.$menuList.append(newNode);

      this.$menuTextInput.value = '';
    });
  }

  getMenuItemNode(name) {
    return new DOMParser().parseFromString(
      `<li class="menu-list-item d-flex items-center py-2"><span class="w-100 pl-2 menu-name">${name}</span><button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"> 수정 </button> <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">삭제</button></li>`,
      'text/html'
    ).body.firstChild;
  }
}
