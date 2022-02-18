import { menuList } from './app.js';
import countMenuItems from './countMenuItems.js';

const manageMenuItem = () => {
  menuList.addEventListener('click', (e) => {
    const selectedMenuname = e.target.closest('li').querySelector('span');
    if (e.target.classList.contains('menu-edit-button')) {
      const modifiedMenuName = prompt('메뉴명을 수정하세요', selectedMenuname.innerText);

      if (modifiedMenuName != null && modifiedMenuName.trim() != '') {
        selectedMenuname.innerText = modifiedMenuName;
      }
    } else if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('메뉴를 삭제하겠습니까?')) {
        e.target.closest('li').remove();
        countMenuItems();
      }
    }
  });
};
export default manageMenuItem;
