import { renderMenuCount } from "./renderMenuCount.js"
import { renderMenuList } from "./render/renderMenuList.js";
import { resetValue } from './util/resestValue.js'
import { $ } from './util/selector.js'

const $submitButton = $("#espresso-menu-submit-button");
const $input = $("#espresso-menu-name");
const $form = $("#espresso-menu-form");
const $ul = $("#espresso-menu-list");

// 상태값
const menuList = []
let menuCount = $ul.childNodes.length;

renderMenuCount(0)

// 메뉴 숫자 증가해주는 함수
const plusMenuCount = () => {
  menuCount += 1;
  renderMenuCount(menuCount)
};

// 메뉴 숫자 감소해주는 함수
const minusMenuCount = () => {
  menuCount -= 1;
  renderMenuCount(menuCount)
};


// 메뉴 추가 함수
const addMenu = (name) => {
  menuList.push(name);
  renderMenuList(menuList);
  // // 이벤트 리스너 할당
  // newMenuEditButton.addEventListener("click", handleEdit);
  // newMenuRemoveButton.addEventListener("click", handleRemove);
  plusMenuCount();
};

// 메뉴 등록 함수
const handleSubmit = (event) => {
  // submit event일 경우 기본 동작 제어 -> 하지 않을 경우 새로고침 일어나게 된다.
  if (event.type === "submit") event.preventDefault();
  // 입력 값 변수에 할당 -> 자주 쓸 것 같아서 따로 변수로 선언해놓음
  const menuName = $input.value;
  // 입력값 (공백제거 후) 빈값이면 함수 종
  if (menuName.trim() === "") return;
  // 메뉴 추가
  addMenu(menuName);
  // 입력값 리셋
  resetValue($input);
};

// 메뉴 수정 함수
const handleEdit = (event) => {
  // 어떤 것을 활용하여 span 태그를 찾을 지 궁금하네요
  const currentInputNode = event.target.previousSibling;
  const newText = prompt("메뉴명을 수정해주세요", currentInputNode.innerText);
  currentInputNode.innerText = newText;
};

// 메뉴 삭제 함수
const handleRemove = (event) => {
  const res = confirm("정말 삭제하시겠습니까?");
  if (res) {
    const targetNode = event.target.parentNode;
    targetNode.remove(targetNode);
  }
  minusMenuCount();
};

// 이벤트 핸들러 등록
$submitButton.addEventListener("click", handleSubmit);
$form.addEventListener("submit", handleSubmit);
