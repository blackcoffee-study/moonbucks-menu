import EtoileRepository from '../../repository/index.js';
import MenuEntity from '../../../model/Menu/index.js';

// service : 메뉴관리하는 실무자
export default class MenuService {
  constructor() {
    this.menuRepository = new EtoileRepository();
  }
  addMenu(category, menuDto) {
    const newMenu = new MenuEntity(menuDto);

    this.menuRepository.insert(category, newMenu);

    return newMenu;
  }
  getMenu(category) {
    return this.menuRepository.getAll(category);
  }
  editMenu(category, { id, name }) {
    this.menuRepository.update(category, { id, name });

    return name;
  }
}
