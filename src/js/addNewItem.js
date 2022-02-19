import { menuList, userInputTag , beverageCategory, currentCategory } from './app.js';
import countMenuItems from './countMenuItems.js';
import localStorageHandler from './localHandle.js';

const addNewItem = () => {

    const template = beverageCategory[currentCategory].map((menuName, index) => {
    return `<li data-idx=${index} class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${menuName}</span>
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
  </li>`;
    }).join('')


    menuList.innerHTML = template
    userInputTag.value = '';
    countMenuItems();

    localStorageHandler.saveLocalStorage(beverageCategory)
};

export default addNewItem;