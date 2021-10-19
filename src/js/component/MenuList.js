import component from '../core/component.js';
import { getMenuList } from '../store.js';
import { $$} from '../utils.js';

export default class MenuList extends component {
  setup() {
    this.$state = this.$props;
  }
  template() {
    let category;
    if(this.$state.$state == undefined){
      category =this.$state.category;
    }else{
      category = this.$state.$state.category
    }
   
    const menuList = getMenuList(category);
    return `
    ${menuList.map(item =>`
      <li data-id=${item.id} class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${!item.isSoldout?"sold-out" : ""}">${item.name}</span>
          <button
           data-id=${item.id}
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
          >
            품절
          </button>
          <button
           data-id=${item.id}
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
            수정
          </button>
          <button
          data-id=${item.id}
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
            삭제
          </button>
      </li>`).join('')}
    `
  }

  mounted(){
    const soldoutBtn  = $$('.menu-remove-button');
    soldoutBtn.forEach(element =>{
      element.addEventListener('click',(e)=>{
      this.$state.onDeleteMenu(category, e.target.dataset.id);
    })
  })
  }
}
