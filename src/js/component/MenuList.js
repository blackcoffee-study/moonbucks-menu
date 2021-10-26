import component from '../core/component.js';
//import { getMenuList } from '../store.js';
import { $,$$} from '../utils.js';

export default class MenuList extends component {
  setup() {
    this.$state = this.$props;
    //this.
    console.log(this.$state);
  }
  template() {
    const category = this.$props.category;
    const menuList = this.$state.$state;
    //console.log(menuList);
    //const menuList = getMenuList(category);
    return `
    ${menuList.map(item =>`
      <li data-id=${item.id} class="menu-list-item d-flex items-center py-2">
        <span id="menu-value" class="w-100 pl-2 menu-name ${item.isSoldOut?"sold-out" : ""}">${item.name}</span>
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
    const $deleteBtn  = $$('.menu-remove-button');
    $deleteBtn.forEach(element =>{
      element.addEventListener('click',(e)=>{
        this.$state.onDeleteMenu(e.target.dataset.id);
      })
    })

    const $soldoutBtn = $$('.menu-sold-out-button');
    $soldoutBtn.forEach(element => {
      element.addEventListener('click',(e)=>{
        this.$state.onSoldoutMenu(e.target.dataset.id);
      }) 
    })

    const $updateBtn = $$('.menu-edit-button');
    $updateBtn.forEach(element => {
      element.addEventListener('click',(e)=>{
        const value = $('#menu-value').innerText;
        const updateValue = prompt('수정할 내용을 입력해주세요', value);
        if(updateValue){
          this.$state.onUpdateMenu(e.target.dataset.id, {name :updateValue});
        }
      }) 
    })

  }
}
