import { $, createElement } from './utils/DOM.js';

const espressoMenuName = $('#espresso-menu-name');
const espressoMenuList = $('#espresso-menu-list');
const espressoMenuForm = $('#espresso-menu-form');
const addMenuButton = $('#espresso-menu-submit-button');
const allMenuCount = $('.menu-count');

const makeEspressoMenu = (menu) => {
    const menuContainer = createElement('li');
    const menuName = createElement('span');
    const editButton = createElement('button');
    const removeButton = createElement('button');

    menuContainer.className = 'menu-list-item d-flex items-center py-2';
    menuName.className = 'w-100 pl-2 menu-name';
    editButton.className =
        'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button';
    removeButton.className =
        'bg-gray-50 text-gray-500 text-sm menu-remove-button';

    menuName.innerText = menu;
    removeButton.innerText = '삭제';
    editButton.innerText = '수정';

    removeButton.addEventListener('click', removeEspressoMenu);
    editButton.addEventListener('click', editEspressoMenu);

    menuContainer.appendChild(menuName);
    menuContainer.appendChild(editButton);
    menuContainer.appendChild(removeButton);

    return menuContainer;
};

const addEspressoMenu = (event) => {
    event.preventDefault();
    if (!espressoMenuName.value) return;

    const newMenu = makeEspressoMenu(espressoMenuName.value);
    espressoMenuList.appendChild(newMenu);

    allMenuCount.innerText = `총 ${countMenu()}개`;
    espressoMenuName.value = '';
};

const removeEspressoMenu = (event) => {
    event.preventDefault();
    if (confirm('메뉴를 삭제할까요?')) {
        event.target.parentNode.remove();
        allMenuCount.innerText = `총 ${countMenu()}개`;
    }
};

const editEspressoMenu = (event) => {
    event.preventDefault();
    const newMenu = prompt('수정할 메뉴를 작성해주세요.');
    if (newMenu) {
        const menu = $('.menu-name', event.target.parentNode);
        menu.innerText = newMenu;
    }
};

const countMenu = () => espressoMenuList.children.length;

const initialize = () => {
    espressoMenuForm.addEventListener('submit', addEspressoMenu);
    addMenuButton.addEventListener('click', addEspressoMenu);
};

window.onload = () => initialize();
