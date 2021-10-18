import {
  CREATE_MENU_REQUEST,
  DELETE_MENU_REQUEST,
  UPDATE_MENU_REQUEST,
} from '../constants/index.js';
import Component from './root/Component.js';

export default class MenuList extends Component {
  initialized() {
    this._category = this._store.getState()['currentCategory'];
    this.items = this._store.getState()[this._category] || [];
  }

  template() {
    return `
    ${this.items
      .map((item, index) => {
        return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name" key=${index}>${item}</span>
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
        </li>
        `;
      })
      .join('')}
    `;
  }

  getItems() {
    return this.items;
  }

  get itemCount() {
    return this.items.length;
  }

  /**
   * @param {Array} item
   * @TODO 현재 설계가 의존성이 너무 뒤범벅이라 서비스 로직은 DB 연결 후 분리
   */
  addItem(item) {
    this.items = [item, ...this.items];
    this._store.dispatch({
      type: CREATE_MENU_REQUEST,
      category: this._category,
      data: this.items,
    });
  }

  /**
   * @param {Number} index
   * @param {Text} text
   * @TODO 현재 설계가 의존성이 너무 뒤범벅이라 서비스 로직은 DB 연결 후 분리
   */
  editedItem(index, text) {
    let editedItem = prompt('메뉴 이름을 수정하시겠어요?', text) ?? text;
    this.items[index] = editedItem;
    this._store.dispatch({
      type: UPDATE_MENU_REQUEST,
      category: this._category,
      data: this.items,
    });
  }

  /**
   * @param {Number} index
   * @TODO 현재 설계가 의존성이 너무 뒤범벅이라 서비스 로직은 DB 연결 후 분리
   */
  deletedItem(index) {
    if (!confirm('메뉴를 삭제하시겠어요?')) return;
    this.items = this.items.filter((item, i) => i !== index);
    this._store.dispatch({
      type: DELETE_MENU_REQUEST,
      category: this._category,
      data: this.items,
    });
  }
}
