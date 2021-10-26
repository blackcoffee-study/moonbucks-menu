import { $ } from './util/index.js';
import MenuList from './components/MenuList.js';

const $inputItem = $('#espresso-menu-name');
const $menuAddButton = $('#espresso-menu-submit-button');
const $list = $('#espresso-menu-list');

let menuList = new MenuList($list);

window.addEventListener('keypress', event => {
  if (event.key === 'Enter') event.preventDefault();
});

$inputItem.addEventListener('keypress', event => {
  if (event.key !== 'Enter') return;
  if (!$inputItem.value) return;
  event.preventDefault();
  menuList.addItem($inputItem.value, setMenuCount);
  $inputItem.value = '';
});

$menuAddButton.addEventListener('click', event => {
  event.preventDefault();
  if (!$inputItem.value) return;
  menuList.addItem($inputItem.value, setMenuCount);
  $inputItem.value = '';
});

$list.addEventListener('click', event => {
  const { target } = event;
  event.preventDefault();
  if (target.matches('.menu-edit-button')) {
    let $span = target.previousSibling.previousSibling;

    let targetItemIndex = $span.getAttribute('key');
    let targetItemText = $span.textContent;

    menuList.updatedItem(+targetItemIndex, targetItemText, setMenuCount);
  } else if (target.matches('.menu-remove-button')) {
    let $span =
      target.previousSibling.previousSibling.previousSibling.previousSibling;

    let targetItemIndex = $span.getAttribute('key');

    menuList.deletedItem(+targetItemIndex, setMenuCount);
  }
});

const setMenuCount = count => {
  const $menuCount = $('.menu-count');
  $menuCount.innerHTML = `총 ${count}개`;
};
