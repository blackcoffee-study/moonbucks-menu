import Component from './core/Component.js';
import MenuHeader from './components/MenuHeader.js';
import MenuForm from './components/MenuForm.js';
import MenuList from './components/MenuList.js';
import { $ } from './utils/dom.js';

export default class App extends Component {
  init() {
    this.state = {
      menuItems: [],
    };
  }

  template() {
    return `
    <div class="heading d-flex justify-between" data-component="menu-header"></div>
    <form id="espresso-menu-form" data-component="menu-form"></form>
    <ul id="espresso-menu-list" class="mt-3 pl-0" data-component="menu-list"></ul>
      `;
  }

  // 렌더가 된 이후에 여기서 호출해서 보내줌
  componentDidMount() {
    const $menuHeader = $('[data-component="menu-header"]');
    const $menuForm = $('[data-component="menu-form"]');
    const $menuList = $('[data-component="menu-list"]');

    new MenuHeader($menuHeader, this.state.menuItems);
    new MenuForm($menuForm);
    new MenuList($menuList);
  }

  // 이벤트들을 설정해서 내려주어야함
}
