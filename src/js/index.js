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
  // submit event일 경우 기본 동작 제어 -> 하지 않을 경우 새로고침 일어나게 된다.
  if (event.type === 'submit') event.preventDefault();
  // 입력 값 변수에 할당 -> 자주 쓸 것 같아서 따로 변수로 선언해놓음
  const menuName = $input.value;
  // 입력값 (공백제거 후) 빈값이면 함수 종료
  if (isEmptyValue(menuName)) return resetValue($input);
  // 메뉴 추가
  addMenu(menuName);
  // 입력값 리셋
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
