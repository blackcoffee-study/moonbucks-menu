const inputForm = document.querySelector('#espresso-menu-form');
const inputBtn = document.querySelector('#espresso-menu-submit-button');
const input = document.querySelector('#espresso-menu-name');
const menuList = document.querySelector('#espresso-menu-list');

function takeInput() {
    const inputValue = input.value;
    if (inputValue === '') {
        return;
    }
    input.value = '';
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
}

inputForm.addEventListener('submit', (event) => {
    event.preventDefault();
    takeInput();
});

inputBtn.addEventListener('click', takeInput);
