const $ = (selector) => document.querySelector(selector);

const menuForm = $('#espresso-menu-form');
const menuSubmitBtn = $('#espresso-menu-submit-button');
const menuName = $('#espresso-menu-name');
const menuList = $('#espresso-menu-list');
const menuCount = $('.menu-count');

function getMenuName() {
    const inputValue = menuName.value;
    if (inputValue === '') {
        return;
    }
    menuName.value = '';
    addMenu(inputValue);
}

function addMenu(name) {
    const menu = document.createElement('li');
    menu.setAttribute('class', 'menu-list-item d-flex items-center py-2');
    menu.innerHTML = `
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
        </button>`;
    menuList.appendChild(menu);
    displayMenuCount();
}

function editMenu(menu) {
    const newName = window.prompt('메뉴명을 수정해주세요');
    if (newName === null || newName === '') {
        return;
    }
    for (const child of menu.childNodes) {
        if (child.classList && child.classList.contains('menu-name')) {
            child.innerText = newName;
        }
    }
}

function deleteMenu(menu) {
    if (!window.confirm('정말 삭제하시겠습니까?')) {
        return;
    }
    menuList.removeChild(menu);
    displayMenuCount();
}

function displayMenuCount() {
    menuCount.innerText = `총 ${menuList.childElementCount}개`;
}

menuForm.addEventListener('submit', (event) => {
    event.preventDefault();
    getMenuName();
});

menuSubmitBtn.addEventListener('click', getMenuName);

menuList.addEventListener('click', (event) => {
    const targetBtn = event.target;
    if (targetBtn.tagName !== 'BUTTON') {
        return;
    }
    const targetMenu = targetBtn.closest('li');
    if (targetBtn.classList.contains('menu-edit-button')) {
        editMenu(targetMenu);
    }
    if (targetBtn.classList.contains('menu-remove-button')) {
        deleteMenu(targetMenu);
    }
});
