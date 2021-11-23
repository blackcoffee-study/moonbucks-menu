import $ from './getDom';
import setMenuCount from './setMenuCount';

const menuListTemplate = (name, idx) => `
    <li class="menu-list-item d-flex items-center py-2" key=${idx}>
        <span class="w-100 pl-2 menu-name">${name}</span>
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

export default function addMenuList(menuList) {
    // menuList에 있는 배열의 요소들을 innerHTML에 넣습니다.
    $('#espresso-menu-list').innerHTML = menuList.map((e, i) => menuListTemplate(e, i)).join('');
}
