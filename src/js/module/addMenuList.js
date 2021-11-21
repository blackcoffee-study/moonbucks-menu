import getDom from './getDom';

const menuList = name => `
    <li class="menu-list-item d-flex items-center py-2">
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

export default function addMenuList(name) {
    getDom('#espresso-menu-list').innerHTML = menuList(name);
}
