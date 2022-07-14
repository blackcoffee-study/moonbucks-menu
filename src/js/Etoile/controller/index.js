import { CategoryService, MenuService } from '../service/index.js';
import MenuEntity from '../../model/Menu/index.js';

// controller : 제어권을 가진 점주
export default class AppController {
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
