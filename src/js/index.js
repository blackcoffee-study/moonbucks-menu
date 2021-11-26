import { renderMenuCount } from './render/renderMenuCount.js';
import { renderMenuList } from './render/renderMenuList.js';
import { resetValue } from './util/resestValue.js';
import { isEmptyValue } from './util/validator.js';
import { $ } from './util/selector.js';

const $submitButton = $('#espresso-menu-submit-button');
const $form = $('#espresso-menu-form');
const $ul = $('#espresso-menu-list');

// 상태값
let menuList = [];
let menuCount = menuList.length;

renderMenuCount(0);

// 메뉴 숫자 증가해주는 함수
const plusMenuCount = () => {
  menuCount += 1;
  renderMenuCount(menuCount);
};

// 메뉴 숫자 감소해주는 함수
const minusMenuCount = () => {
  menuCount -= 1;
  renderMenuCount(menuCount);
};

// 메뉴 추가 함수
const addMenu = (name) => {
  menuList.push(name);
  renderMenuList(menuList);
  plusMenuCount();
};

// 메뉴 등록 함수
const handleSubmit = (event) => {
  const $input = $('#espresso-menu-name');
  if (event.type === 'submit') event.preventDefault();
  const menuName = $input.value;
  if (isEmptyValue(menuName)) return resetValue($input);
  addMenu(menuName);
  resetValue($input);
};

// 메뉴 수정 함수
const handleEdit = (targetIdx) => {
  const newText = prompt('메뉴명을 수정해주세요', menuList[targetIdx]);
  if (isEmptyValue(newText)) return alert('메뉴명을 입력해주세요!');
  menuList[targetIdx] = newText;
  renderMenuList(menuList);
};

// 메뉴 삭제 함수
const handleRemove = (targetIdx) => {
  const res = confirm('정말 삭제하시겠습니까?');
  if (res) {
    menuList = menuList.filter((_, idx) => targetIdx !== idx);
  }
  minusMenuCount();
  renderMenuList(menuList);
};

const handleClick = (event) => {
  if (event.target.type !== 'button') return;
  const button = event.target;
  const targetLi = button.parentNode;
  const parentUl = targetLi.parentNode;
  const targetLiIdx = [...parentUl.children].indexOf(targetLi);
  if (button.classList.contains('menu-edit-button'))
    return handleEdit(targetLiIdx);
  if (button.classList.contains('menu-remove-button'))
    return handleRemove(targetLiIdx);
};

// 이벤트 핸들러 등록
$submitButton.addEventListener('click', handleSubmit);
$form.addEventListener('submit', handleSubmit);
$ul.addEventListener('click', handleClick);
