import { CategoryService, MenuService } from '../service/index.js';

// controller : 제어권을 가진 점주
export default class AppController {
  constructor(catergories = defaultCategories) {
    this.categoryService = new CategoryService(catergories);
    this.menuService = new MenuService();

    this.editMenu = this.editMenu.bind(this);
    this.deleteMenu = this.deleteMenu.bind(this);
  }

  // all APIs
  // 메뉴 목록 조회하기
  getMenu() {
    const category = this.categoryService.getCurrent();

    return this.menuService.getMenu(category);
  }

  // 신메뉴 넣자
  addMenu(menuDto) {
    // validate
    const category = this.categoryService.getCurrent();
    const newMenu = this.menuService.addMenu(category, menuDto);

    return newMenu;
  }

  // 그 메뉴 솔드아웃 처리하자
  toggleActive(id) {
    const category = this.categoryService.getCurrent();
    // validate
    this.menuService.toggleActive(category, id);
  }

  // 그 메뉴 이름이랑 사진 바꾸자, 가격도 올려!
  editMenu(id) {
    const category = this.categoryService.getCurrent();

    const name = prompt('새 이름을 입력하세요');
    // validate
    this.menuService.editMenu(category, { id, name });

    return name;
  }

  // 그 메뉴 이제 팔지 말자
  deleteMenu(id) {
    const category = this.categoryService.getCurrent();

    const confirmResult = confirm('정말 삭제하겠다고요? 이거 매출 견인하는 상품이에욧!');

    if (confirmResult) {
      this.menuService.deleteMenu(category, { id });
    }

    return confirmResult;
  }

  // 이제 다른 카테고리 보자
  switchCategory(category) {
    this.categoryService.switch(category);
    this.menuService.showMenu(category);
  }
}
