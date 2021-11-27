import $ from '../utils/getDomElement';
import addMenuList from '../utils/addMenuList';
import setMenuCount from '../utils/setMenuCount';

const edit = (menuList, key) => {
    const curMenu = menuList[key];
    const editMenu = prompt('메뉴명을 수정하세요', curMenu);

    menuList[key] = editMenu ? editMenu : curMenu;

    addMenuList(menuList);
};

const del = (menuList, key) => {
    if (confirm('정말 삭제하시겠습니까?')) {
        menuList.splice(key, 1);
        addMenuList(menuList);
    }
};

export default function handleList(menuList) {
    const coffeeMenuList = $('#espresso-menu-list');

    coffeeMenuList.addEventListener('click', e => {
        const key = e.target.closest('li').getAttribute('key');

        if (e.target.classList.contains('menu-edit-button')) edit(menuList, key);
        else del(menuList, key);

        setMenuCount(menuList);
    });
}
