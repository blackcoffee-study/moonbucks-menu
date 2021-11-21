import { domSelector, domSelectorAll } from './utils/domSelect.js';

const $menuListItem = (name) => {
  return `
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
}

const menuList = [];

const $menuInputForm = domSelector('#espresso-menu-form');
const $menuInput = domSelector('#espresso-menu-name');
const $menuList = domSelector('#espresso-menu-list');
const $menuCount = domSelector('.menu-count');

$menuInputForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = $menuInput.value
  if (value) {
    menuList.push(value)
    $menuInput.value = ''
    renderList()
    menuCount()
  }
})

const renderList = () => {
  const menuLists = menuList.map(menu => $menuListItem(menu)).join(' ');
  $menuList.innerHTML = menuLists;
  menuModify()
  menuDelete()
}

const menuCount = () => {
  const count = menuList.length
  $menuCount.innerText = `총 ${count}개`
}


const menuModify = () => {
  const $modifyBtn = domSelectorAll('.menu-edit-button');
  $modifyBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    const modifyValue = prompt('메뉴명을 수정하세요', menuList[i]);
    if (modifyValue) {
      menuList[i] = modifyValue
      renderList()
    }
  }))
}

const menuDelete = () => {
  const $deleteBtn = domSelectorAll('.menu-remove-button');
  $deleteBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    const userAnswer = confirm('정말 삭제하시겠습니까?');
    if (userAnswer) {
      menuList.splice(i, 1);
      renderList()
    }
  }))
}