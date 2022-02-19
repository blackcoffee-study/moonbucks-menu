import { beverageCategory, currentCategory, menuList } from './app.js';
import countMenuItems from './countMenuItems.js';
import localStorageHandler from './localHandle.js';


const manageMenuItem = () => {

  menuList.addEventListener('click', (e) => {
    const selectedMenu = e.target.closest('li');
    const selectedMenunameTxt = selectedMenu.querySelector('span');
    const dataIdx = selectedMenu.dataset.idx
    
    if (e.target.classList.contains('menu-edit-button')) {
      const newMenuName = prompt('메뉴명을 수정하세요', selectedMenunameTxt.innerText);
      modifyMenuName(newMenuName ,dataIdx ,selectedMenunameTxt)
    }
    else if (e.target.classList.contains('menu-remove-button')) {
      deleteMenu(e, selectedMenu, dataIdx)
    }
    else if (e.target.classList.contains('menu-sold-out-button')){
      soldoutMenu(e, selectedMenunameTxt, dataIdx)
    }
    });
};

const modifyMenuName = (newMenuName ,dataIdx ,selectedMenunameTxt) =>{
  if (newMenuName) {
    selectedMenunameTxt.innerText = newMenuName;
    beverageCategory[currentCategory][dataIdx] = newMenuName
    localStorageHandler.saveLocalStorage(beverageCategory)
  }
}

const deleteMenu = (e, selectedMenu, dataIdx) =>{
  if (confirm('메뉴를 삭제하겠습니까?')) {
    selectedMenu.remove();                    
    beverageCategory[currentCategory].splice(dataIdx, 1)
    localStorageHandler.saveLocalStorage(beverageCategory)
    countMenuItems();
  }
}

const soldoutMenu = (e, selectedMenunameTxt, dataIdx) =>{
  selectedMenunameTxt.classList.toggle('sold-out')
}


export default manageMenuItem;