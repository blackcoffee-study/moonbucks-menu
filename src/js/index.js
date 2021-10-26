import { $ } from './utils/DOM.js'

const $nameInput = $('#espresso-menu-name');
const $submitButton = $('#espresso-menu-submit-button');
const $menuList = $('#espresso-menu-list');
const $menuForm = $('#espresso-menu-form');
const itemStorage = 'items';
let items = [];
let itemNum = 1;

function addMenu(e) {
    e.preventDefault();
    if ($nameInput.value.trim() === "") {
        return
    }

    saveItem()
    addTemplate($nameInput.value);
    countItem();
}

function saveItem() {
    localStorage.setItem(itemStorage, JSON.stringify(items));
}

function addTemplate(name) {
    const $menuItem = document.createElement('li');
    $menuItem.setAttribute("class", "espresso-menu-item d-flex items-center py-2"); // ... .classList.add()
    $menuItem.innerHTML = `
        <span class="w-100 pl-2 menu-name">${name}</span>
        <button type="button"class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button">
            품절
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button">
            수정
        </button>
        <button type="button" class="bg-gray-50 text-gray-500 text-sm menu-remove-button">
            삭제
        </button>`
    const itemsObj = {
        menu: name,
        id: itemNum
    }
    $menuItem.id = itemNum;
    items.push(itemsObj);
    saveItem(), itemNum++;

    $menuList.appendChild($menuItem);
    $nameInput.value = "";
}

function countItem() {
    const $menuCount = $('#menu-count');
    const count = items.length
    $menuCount.innerText = `총 ${count}개`
}

function soldoutItem(e) {
    const targetItem = e.target.parentNode.childNodes[1];
    if (targetItem.style.getPropertyValue("text-decoration") == "line-through") {
        targetItem.style.setProperty("text-decoration", "none");
        e.target.innerText = "품절";
    } else {
        targetItem.style.setProperty("text-decoration", "line-through");
        e.target.innerText = "개시";
    }
}

function editItem(e) {
    const li = e.target.parentNode;
    const newName = window.prompt('메뉴를 수정하세요');
    if (newName === null) {
        return;
    }
    li.childNodes[1].innerHTML = newName;
    saveItem();

}

function removeItem(e) {
    const li = e.target.parentNode;
    if (confirm("정말 삭제하시겠습니까?")) {
        li.remove();
    }
    const cleanStorage = items.filter(function (Obj) {
        return Obj.id !== parseInt(li.id)
    })
    items = cleanStorage;
    saveItem(), countItem();
}

function loadItem() {
    const loadItems = localStorage.getItem(itemStorage);
    if (loadItems !== null) {
        const parsedItem = JSON.parse(loadItems);
        parsedItem.forEach(load => addTemplate(load.menu));
    }
}

function init() {
    loadItem();
    countItem();
    $submitButton.addEventListener('click', addMenu);
    $menuForm.addEventListener('submit', addMenu);
    $menuList.addEventListener('click', function (e) {
        if (e.target.classList.contains("menu-sold-out-button")) {
            e.preventDefault();
            soldoutItem(e);
        } else if (e.target.classList.contains("menu-edit-button")) {
            e.preventDefault();
            editItem(e);
        } else if (e.target.classList.contains("menu-remove-button")) {
            e.preventDefault();
            removeItem(e);
        }
    })
}

init();
