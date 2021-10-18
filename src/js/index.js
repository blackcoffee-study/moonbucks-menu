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
        <button type="button" id="espresso-menu-edit-button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
        </button>
        <button type="button" id="espresso-menu-remove-button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
        </button>
    `
    $espressoList.appendChild($menuItem);
    $espressoNameInput.value = "";

    const $espressoEdit = $('#espresso-menu-edit-button');
    const $espressoRemove = $('#espresso-menu-remove-button');
    $espressoEdit.addEventListener('click', function() {
        editItem($menuItem)
    });
    $espressoRemove.addEventListener('click', function() {
        removeItem($menuItem)
    });
}

function editItem(item) {
    const newName = window.prompt('메뉴를 수정하세요');

    if (newName === null) {
        return;
    }
    for (const child of item.childNodes) {
        if (child.classList && child.classList.contains('menu-name')) {
            child.innerText = newName;
        }
    }
    // 구현하기 너무 난해해서 [11기 Liz님]의 코드를 인용하였습니다 ㅜㅜㅜㅜ
}

function removeItem(item) {
    if (confirm("정말 삭제하시겠습니까?") == true) {
        $espressoList.removeChild(item)
    }
}

function init() {
    $espressoSubmitButton.addEventListener('click', addMenu);
    $espressoForm.addEventListener('submit', addMenu);
}

init();
