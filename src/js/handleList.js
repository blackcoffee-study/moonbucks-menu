import addMenuList from './module/addMenuList';
import $ from './module/getDom';

const edit = (menuList, key) => {
    // 상태값의 배열 리스트를 바꿔주고 반영
    const curMenu = menuList[key];
    menuList[key] = prompt('메뉴명을 수정하세요', curMenu);
    addMenuList(menuList);
};

const del = (menuList, key) => {
    // 반환된 키 값에 해당하는 것 삭제
    menuList.splice(key, 1);
    addMenuList(menuList);
};

export default function HandleList(menuList) {
    // 이벤트 위임으로 ul에 이벤트를 달아줌
    $('#espresso-menu-list').addEventListener('click', e => {
        // 클릭된 li 태그의 key 값을 가져옵니다.
        const key = e.target.closest('li').getAttribute('key');

        if (e.target.classList.contains('menu-edit-button')) edit(menuList, key);
        else del(menuList, key);
    });
}
