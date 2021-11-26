import { renderMenuCount } from './render/renderMenuCount.js';
import { renderMenuList } from './render/renderMenuList.js';
import { renderAll } from './render/index.js';
import { resetValue } from './util/resestValue.js';
import { isEmptyValue } from './util/validator.js';
import { currentData } from './util/store.js';
import { saveDataonLocalStorage } from './util/store.js';
import { $ } from './util/selector.js';

const $submitButton = $(`#${currentData.menuCategory}-menu-submit-button`);
const $form = $(`#${currentData.menuCategory}-menu-form`);
const $ul = $(`#${currentData.menuCategory}-menu-list`);
const $nav = $('nav');

// 초기
renderAll('espresso');

// 메뉴 숫자 증가해주는 함수
const plusMenuCount = () => {
  currentData.menuCount += 1;
  renderMenuCount(currentData.menuCount);
};

// 메뉴 숫자 감소해주는 함수
const minusMenuCount = () => {
  currentData.menuCount -= 1;
  renderMenuCount(currentData.menuCount);
};

// 메뉴 추가 함수
const addMenu = (name) => {
  currentData.menuList.push(name);
  renderMenuList(currentData.menuList);
  saveDataonLocalStorage(currentData.menuCategory, currentData.menuList);
  plusMenuCount();
};

const handleSubmit = (event) => {
  const $input = $('#espresso-menu-name');
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
    currentData.menuList[targetIdx]
  );
  if (isEmptyValue(newMenu)) return alert('메뉴명을 입력해주세요!');
  currentData.menuList[targetIdx] = newMenu;
  saveDataonLocalStorage(currentData.menuCategory, currentData.menuList);
  renderMenuList(currentData.menuList);
};

// 메뉴 삭제 함수
const removeMenu = (targetIdx) => {
  const res = confirm('정말 삭제하시겠습니까?');
  if (res) {
    currentData.menuList = currentData.menuList.filter(
      (_, idx) => targetIdx !== idx
    );
  }
  minusMenuCount();
  saveDataonLocalStorage(currentData.menuCategory, currentData.menuList);
  renderMenuList(currentData.menuList);
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
};

const changeIdTags = (newMenuCategory) => {
  const $input = $(`#${currentData.menuCategory}-menu-name`);
  const $label = $(`label[for="${currentData.menuCategory}-menu-name"]`);
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
    changeIdTags(newMenuCategory);
    renderAll(newMenuCategory);
    currentData.menuCategory = newMenuCategory;
  }
};

// 이벤트 핸들러 등록
$submitButton.addEventListener('click', handleSubmit);
$form.addEventListener('submit', handleSubmit);
$ul.addEventListener('click', handleClick);
$nav.addEventListener('click', changeMenuCategory);
