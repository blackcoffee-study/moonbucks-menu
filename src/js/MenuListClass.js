import PubSub from '../utils/observer.js';
import { domSelector } from '../utils/domSelect.js';
import { getLocalStorage } from '../utils/localStorage.js'

export default class MenuListClass {
  constructor() {
    this.menus = getLocalStorage('espresso')
    this.render()
    this.pubsub = PubSub;
    this.pubsub.sub('currentCategory', this.subHandler, this)
  }

  subHandler(category) {
    this.menus = getLocalStorage(category) || []
    this.render()
  }

  render() {
    const ul = domSelector('#espresso-menu-list')
    const $menuListItem = (name) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${name}</span>
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
        </li>
    `
    }
    ul.innerHTML = this.menus.map(menu => $menuListItem(menu)).join('')
  }
}