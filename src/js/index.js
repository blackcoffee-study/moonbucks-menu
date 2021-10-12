const inputEspressoMenu = document.getElementById('espresso-menu-name');
const espressoMenuForm = document.getElementById('espresso-menu-form');
const espressoMenuList = document.getElementById('espresso-menu-list');
const addMenuButton = document.getElementById('espresso-menu-submit-button');
const allMenuCount = document.querySelector('.menu-count');

const makeEspressoMenu = (menu) => {
    const container = document.createElement('li');
    const name = document.createElement('span');
    const editButton = document.createElement('button');
    const removeButton = document.createElement('button');

    container.className = 'menu-list-item d-flex items-center py-2';
    name.className = 'w-100 pl-2 menu-name';
    editButton.className =
        'bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button';
    removeButton.className =
        'bg-gray-50 text-gray-500 text-sm menu-remove-button';

    name.innerText = menu;
    removeButton.innerText = '삭제';
    editButton.innerText = '수정';

    removeButton.addEventListener('click', removeEspressoMenu);
    editButton.addEventListener('click', editEspressoMenu);

    container.appendChild(name);
    container.appendChild(editButton);
    container.appendChild(removeButton);

    return container;
};

const addEspressoMenu = (event) => {
    event.preventDefault();
    if (!inputEspressoMenu.value) return;

    const newMenu = makeEspressoMenu(inputEspressoMenu.value);
    espressoMenuList.appendChild(newMenu);

    allMenuCount.innerText = `총 ${countMenu()}개`;
    inputEspressoMenu.value = '';
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
        const menu = event.target.parentNode.querySelector('.menu-name');
        menu.innerText = newMenu;
    }
};

const countMenu = () => espressoMenuList.children.length;

espressoMenuForm.addEventListener('submit', addEspressoMenu);
addMenuButton.addEventListener('click', addEspressoMenu);
