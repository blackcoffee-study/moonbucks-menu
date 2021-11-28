import { renderMenuTotalCount } from './render/renderMenuTotalCount.js';
import { renderMenuList } from './render/renderMenuList.js';
import { renderAll } from './render/index.js';
import { resetValue } from './util/resestValue.js';
import { isEmptyValue } from './util/validator.js';
import { category } from './util/store.js';
import { saveDataonLocalStorage } from './util/store.js';
import { loadData } from './util/store.js';
import { $ } from './util/selector.js';

const $submitButton = $(`#${category.name}-menu-submit-button`);
const $form = $(`#${category.name}-menu-form`);
const $ul = $(`#${category.name}-menu-list`);
const $input = $(`#${category.name}-menu-name`);
const $nav = $('nav');

// init
loadData();
renderAll();

// 메뉴 숫자 증가해주는 함수
const plusMenuCount = () => {
  category.menuTotalCount += 1;
  renderMenuTotalCount();
};

// 메뉴 숫자 감소해주는 함수
const minusMenuCount = () => {
  category.menuTotalCount -= 1;
  renderMenuTotalCount();
};

// 메뉴 추가 함수
const addMenu = (name) => {
  const newMenu = {
    name,
    isSoldout: false,
  };
  category.menus.push(newMenu);
  renderMenuList();
  saveDataonLocalStorage(category.name, category.menus);
  plusMenuCount();
};

const handleSubmit = (event) => {
  if (event.type === 'submit') event.preventDefault();
  const menuName = $input.value;
  if (isEmptyValue(menuName)) return resetValue($input);
  addMenu(menuName);
  resetValue($input);
};

// 메뉴 수정 함수
const editMenu = (targetIdx) => {
  const newMenu = prompt(
    '메뉴명을 수정해주세요',
    category.menus[targetIdx].name
  );
  if (newMenu === null) return;
  if (isEmptyValue(newMenu)) return alert('메뉴명을 입력해주세요!');
  category.menus[targetIdx].name = newMenu;
  saveDataonLocalStorage(category.name, category.menus);
  renderMenuList();
};

// 메뉴 삭제 함수
const removeMenu = (targetIdx) => {
  const res = confirm('정말 삭제하시겠습니까?');
  if (res) {
    category.menus = category.menus.filter((_, idx) => targetIdx !== idx);
  }
  minusMenuCount();
  saveDataonLocalStorage(category.name, category.menus);
  renderMenuList();
};

const toggleSoldout = (target, targetIdx) => {
  $('span', target).classList.toggle('sold-out');
  category.menus[targetIdx].isSoldout = !category.menus[targetIdx].isSoldout;
  saveDataonLocalStorage(category.name, category.menus);
};

const handleClick = (event) => {
  if (event.target.type !== 'button') return;
  const button = event.target;
  const targetLi = button.parentNode;
  const parentUl = targetLi.parentNode;
  const targetLiIdx = [...parentUl.children].indexOf(targetLi);
  if (button.classList.contains('menu-edit-button'))
    return editMenu(targetLiIdx);
  if (button.classList.contains('menu-remove-button'))
    return removeMenu(targetLiIdx);
  if (button.classList.contains('menu-sold-out-button'))
    return toggleSoldout(targetLi, targetLiIdx);
};

const changeAttributes = (newMenuCategory) => {
  const $input = $(`#${category.name}-menu-name`);
  const $label = $(`label[for="${category.name}-menu-name"]`);
  $submitButton.id = `${newMenuCategory}-menu-submit-button`;
  $form.id = `${newMenuCategory}-menu-form`;
  $ul.id = `${newMenuCategory}-menu-list`;
  $input.id = `${newMenuCategory}-menu-name`;
  $input.name = `${newMenuCategory}MenuName`;
  $label.setAttribute('for', `${newMenuCategory}-menu-name`);
};

const changeMenuCategory = (event) => {
  const target = event.target;
  if (target.nodeName === 'BUTTON') {
    const newMenuCategory = target.dataset.categoryName;
    changeAttributes(newMenuCategory);
    category.name = newMenuCategory;
    loadData();
    renderAll();
  }
};

// 이벤트 핸들러 등록
$submitButton.addEventListener('click', handleSubmit);
$form.addEventListener('submit', handleSubmit);
$ul.addEventListener('click', handleClick);
$nav.addEventListener('click', changeMenuCategory);
