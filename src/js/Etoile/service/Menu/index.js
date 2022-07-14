import EtoileRepository from '../../repository/index.js';

// service : 메뉴관리하는 실무자
export default class MenuService {
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
