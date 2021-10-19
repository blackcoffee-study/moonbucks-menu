import component from '../core/component.js';
import { getMenuList } from '../store.js';

export default class MenuList extends component {
  setup() {
    this.$state = this.$props.$state;
    console.log(this.$state);
  }
  template() {
    const menuList = getMenuList(this.$state.category);
    console.log(menuList);
    return `
    ${menuList.map(item =>`
      <li data-id=${item.id} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${!item.isSoldout?"sold-out" : ""}">${item.name}</span>
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
      </li>`).join('')}
    `
  }

  mounted(){
    
  }
}
