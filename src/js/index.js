// 선택자를 선택하는 로직을 간소화해주기 위한 함수
const $ = (selector) => document.querySelector(selector);

const $button = $("#espresso-menu-submit-button");
const $input = $("#espresso-menu-name");
const $form = $("#espresso-menu-form");
const $ul = $("#espresso-menu-list");

// 매개 변수로 받은 선택자의 value를 리셋하는 함수
const resetValue = (selector) => {
  selector.value = "";
};

// 메뉴 추가 함수
const addMenu = (value) => {
  // li, span 태그 생성 및 스타일, innerText 추가
  const newMenuLi = document.createElement("li");
  const newMenuSpan = document.createElement("span");
  newMenuLi.classList.add("menu-list-item", "d-flex", "items-center", "py-2");
  newMenuSpan.classList.add("w-100", "pl-2", "menu-name");
  newMenuSpan.innerText = value;
  newMenuLi.appendChild(newMenuSpan);
  $ul.appendChild(newMenuLi);
};

const handleSubmit = (event) => {
  // 입력 값 변수에 할당 -> 자주 쓸 것 같아서 따로 변수로 선언해놓음
  const inputValue = $input.value;
  // 입력값 (공백제거 후) 빈값이면 함수 종료
  if (inputValue.trim() === "") return;
  // submit event일 경우 기본 동작 제어 -> 하지 않을 경우 새로고침 일어나게 된다.
  if (event.type === "submit") event.preventDefault();
  // 메뉴 추가
  addMenu(inputValue);
  // 입력값 리셋
  resetValue($input);
};

$button.addEventListener("click", handleSubmit);
$form.addEventListener("submit", handleSubmit);
