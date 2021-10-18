import Component from './root/Component.js';
import MenuList from './MenuList.js';
import { LOAD_MENU_REQUEST } from '../constants/index.js';

export default class Management extends Component {
  initialized() {
    this._category = this._store.getState()['currentCategory'];
    this._store.dispatch({
      type: LOAD_MENU_REQUEST,
      category: this._category,
    });
    const { currentCategoryText, menuCount } = this._store.getState();
    this._currentCategoryText = currentCategoryText || '에스프레소';
    this._menuCount = menuCount;
  }

  template() {
    return `
    <div class="wrapper bg-white p-10">
      <div class="heading d-flex justify-between">
        <h2 class="mt-1">${this._currentCategoryText} 메뉴 관리</h2>
        <span class="mr-2 mt-4 menu-count">총 ${this._menuCount}개</span>
      </div>
      <form id="espresso-menu-form">
        <div class="d-flex w-100">
          <label for="espresso-menu-name" class="input-label" hidden>
            ${this._currentCategoryText} 메뉴 이름
          </label>
          <input type="text" id="espresso-menu-name" name="espressoMenuName" class="input-field"
            placeholder="${this._currentCategoryText} 메뉴 이름" autocomplete="off" />
          <button type="button" name="submit" id="espresso-menu-submit-button"
            class="input-submit bg-green-600 ml-2">
            확인
          </button>
        </div>
      </form>
      <ul id="espresso-menu-list" class="mt-3 pl-0"></ul>
    </div>
    `;
  }

  mount() {
    const $inputItem = this._utils.$('#espresso-menu-name');
    const $menuAddButton = this._utils.$('#espresso-menu-submit-button');
    const $list = this._utils.$('#espresso-menu-list');
    let menuList = new MenuList($list);
    $inputItem.addEventListener('keydown', event => {
      if (event.key !== 'Enter') return;
      if (!$inputItem.value) return;
      event.preventDefault();
      menuList.addItem($inputItem.value);
      $inputItem.value = '';
    });

    $menuAddButton.addEventListener('click', event => {
      event.preventDefault();
      if (!$inputItem.value) return;
      menuList.addItem($inputItem.value);
      $inputItem.value = '';
    });

    $list.addEventListener('click', event => {
      const { target } = event;
      event.preventDefault();
      if (target.matches('.menu-edit-button')) {
        let $span = target.previousSibling.previousSibling;

        let targetItemIndex = $span.getAttribute('key');
        let targetItemText = $span.textContent;

        menuList.editedItem(+targetItemIndex, targetItemText);
      } else if (target.matches('.menu-remove-button')) {
        let $span =
          target.previousSibling.previousSibling.previousSibling
            .previousSibling;

        let targetItemIndex = $span.getAttribute('key');

        menuList.deletedItem(+targetItemIndex);
      } else if (target.matches('.menu-sold-out-button')) {
        let $span = target.previousSibling.previousSibling;
        $span.classList.toggle('sold-out');
      }
    });
  }
}
