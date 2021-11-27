import $ from './getDomElement';

const menuListTemplate = (name, idx) => `
    <li class="menu-list-item d-flex items-center py-2" key=${idx}>
        <span class="w-100 pl-2 menu-name sold-out">${name}</span>
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
`;

export default function applyMenuList(menuList) {
    $('#espresso-menu-list').innerHTML = menuList.map((e, i) => menuListTemplate(e, i)).join('');
}
