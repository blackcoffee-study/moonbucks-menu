import { $ } from './utils/DOM.js'

const $nameInput = $('#espresso-menu-name');
const $submitButton = $('#espresso-menu-submit-button');
const $menuList = $('#espresso-menu-list');
const $menuForm = $('#espresso-menu-form');
let count = 0;

function addMenu(e) {
    e.preventDefault();
    if ($nameInput.value.trim() === "") {
        return
    }
    addTemplate();
    count++, countItem();
}

function addTemplate() {
    const $menuItem = document.createElement('li');
    $menuItem.setAttribute("class", "espresso-menu-item d-flex items-center py-2"); // ... .classList.add()
    $menuItem.innerHTML = `
        <span class="w-100 pl-2 menu-name">${$nameInput.value}</span>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
        </button>`
        
        $menuList.appendChild($menuItem);
        $nameInput.value = "";
}

function editItem(e) {
    const newName = window.prompt('메뉴를 수정하세요');

    if (newName === null) {
        return;
    }

    e.target.parentNode.childNodes[1].innerHTML = newName;
}

function removeItem(e) {
    if (confirm("정말 삭제하시겠습니까?")) {
        e.target.parentNode.remove();
    }
}

function countItem() {
    const $menuCount = $('#menu-count');
    $menuCount.innerText = `총 ${count}개`
}

function init() {
    $submitButton.addEventListener('click', addMenu);
    $menuForm.addEventListener('submit', addMenu);
    $menuList.addEventListener('click', function(e) {
        if (e.target.classList.contains("menu-edit-button")) {
            e.preventDefault();
            editItem(e);
        } else if (e.target.classList.contains("menu-remove-button")) {
            e.preventDefault();
            removeItem(e);
            count--, countItem();
        }
    })
}

init();
