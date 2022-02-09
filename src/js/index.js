const $ = (selector) => document.querySelector(selector);

const espressoMenuList = $('#espresso-menu-list');
const espressoMenuName = $('#espresso-menu-name');
const espressoMenuSubmitButton = $('#espresso-menu-submit-button');

espressoMenuSubmitButton.addEventListener('click', () => {
    if (espressoMenuName.value) {
        addMenuList(espressoMenuName.value);
        espressoMenuName.value = null;
    }
});


espressoMenuName.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        if (espressoMenuName.value) {
            addMenuList(espressoMenuName.value);
            espressoMenuName.value = null;
        }

        e.preventDefault();
    }
});

espressoMenuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
        const newMenuName = window.prompt('바꿀 메뉴이름은?');
        e.target.parentNode.querySelector('.menu-name').textContent = newMenuName;
    }
});

const addMenuList = (name) => {
    espressoMenuList.innerHTML += /*html*/`
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
    `
};