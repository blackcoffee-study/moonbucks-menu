import MenuInput from './component/MenuInput.js';
import MenuList from './component/MenuList.js';
import MenuNav from './component/MenuNav.js';
import MenuTitle from './component/MenuTitle.js';
import { $, $$ } from './utils.js';

export default class App {
  $target;
  constructor($target) {
    this.$target = $target;
    this.setup();
  }
  setup() {
    console.log('dfdf');
    this.mounted();
  }
  mounted() {
    this.menuNav = new MenuNav($('#menu-nav'), {});
    this.menuTitle = new MenuTitle($('#sub-title'), {});
    this.menuInput = new MenuInput($('#espresso-menu-form'), {});
    this.menuList = new MenuList($('#espresso-menu-list'), {});
  }
}
