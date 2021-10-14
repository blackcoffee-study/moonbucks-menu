import { $ } from './utils/DOM.js'

const $espressoNameInput = $('#espresso-menu-name');
const $espressoSubmitButton = $('#espresso-menu-submit-button');
const $espressoList = $('#espresso-menu-list');
const $espressoForm = $('#espresso-menu-form');

function addMenu(event) {
    event.preventDefault();
    if ($espressoNameInput.value === "") { 
        return
    }
    else {
        addItem();
    }
}

function addItem() {
    const $menuItem = document.createElement('li');
    $menuItem.setAttribute("class", "espresso-menu-item d-flex items-center py-2");
    $menuItem.innerHTML = `
        <span class="w-100 pl-2 menu-name">${$espressoNameInput.value}</span>
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
    `
    $espressoList.appendChild($menuItem);

    $espressoNameInput.value = "";
}

function init() {
    $espressoSubmitButton.addEventListener('click', addMenu);
    $espressoForm.addEventListener('submit', addMenu);
}

init();
