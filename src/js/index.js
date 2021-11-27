import { renderMenuCount } from './render/renderMenuCount.js';
import { renderMenuList } from './render/renderMenuList.js';
import { renderAll } from './render/index.js';
import { resetValue } from './util/resestValue.js';
import { isEmptyValue } from './util/validator.js';
import { currentMenuData } from './util/store.js';
import { saveDataonLocalStorage } from './util/store.js';
import { $ } from './util/selector.js';

const $submitButton = $(`#${currentMenuData.menuCategory}-menu-submit-button`);
const $form = $(`#${currentMenuData.menuCategory}-menu-form`);
const $ul = $(`#${currentMenuData.menuCategory}-menu-list`);
const $input = $(`#${currentMenuData.menuCategory}-menu-name`);
const $nav = $('nav');

// 초기
renderAll('espresso');

// 메뉴 숫자 증가해주는 함수
const plusMenuCount = () => {
  currentMenuData.menuTotalCount += 1;
  renderMenuCount(currentMenuData.menuTotalCount);
};

// 메뉴 숫자 감소해주는 함수
const minusMenuCount = () => {
  currentMenuData.menuTotalCount -= 1;
  renderMenuCount(currentMenuData.menuTotalCount);
};

// 메뉴 추가 함수
const addMenu = (name) => {
  const newMenu = {
    name,
    isSoldout: false,
  };
  currentMenuData.menuList.push(newMenu);
  renderMenuList(currentMenuData.menuList);
  saveDataonLocalStorage(
    currentMenuData.menuCategory,
    currentMenuData.menuList
  );
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
    currentMenuData.menuList[targetIdx].name
  );
  if (newMenu === null) return;
  if (isEmptyValue(newMenu)) return alert('메뉴명을 입력해주세요!');
  currentMenuData.menuList[targetIdx].name = newMenu;
  saveDataonLocalStorage(
    currentMenuData.menuCategory,
    currentMenuData.menuList
  );
  renderMenuList(currentMenuData.menuList);
};

// 메뉴 삭제 함수
const removeMenu = (targetIdx) => {
  const res = confirm('정말 삭제하시겠습니까?');
  if (res) {
    currentMenuData.menuList = currentMenuData.menuList.filter(
      (_, idx) => targetIdx !== idx
    );
  }
  minusMenuCount();
  saveDataonLocalStorage(
    currentMenuData.menuCategory,
    currentMenuData.menuList
  );
  renderMenuList(currentMenuData.menuList);
};

const toggleSoldout = (target, targetIdx) => {
  $('span', target).classList.toggle('sold-out');
  currentMenuData.menuList[targetIdx].isSoldout =
    !currentMenuData.menuList[targetIdx].isSoldout;
  saveDataonLocalStorage(
    currentMenuData.menuCategory,
    currentMenuData.menuList
  );
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
  const $input = $(`#${currentMenuData.menuCategory}-menu-name`);
  const $label = $(`label[for="${currentMenuData.menuCategory}-menu-name"]`);
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
    renderAll(newMenuCategory);
    currentMenuData.menuCategory = newMenuCategory;
  }
};

// 이벤트 핸들러 등록
$submitButton.addEventListener('click', handleSubmit);
$form.addEventListener('submit', handleSubmit);
$ul.addEventListener('click', handleClick);
$nav.addEventListener('click', changeMenuCategory);
