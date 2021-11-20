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
  // li, span, button 태그 생성
  const newMenuLi = document.createElement("li");
  const newMenuSpan = document.createElement("span");
  const newMenuEditButton = document.createElement("button");
  const newMenuRemoveButton = document.createElement("button");
  // 스타일 추가
  newMenuLi.classList.add("menu-list-item", "d-flex", "items-center", "py-2");
  newMenuSpan.classList.add("w-100", "pl-2", "menu-name");
  newMenuEditButton.classList.add(
    "bg-gray-50",
    "text-gray-500",
    "text-sm",
    "mr-1",
    "menu-edit-button"
  );
  newMenuRemoveButton.classList.add(
    "bg-gray-50",
    "text-gray-500",
    "text-sm",
    "menu-remove-button"
  );
  // 텍스트 추가
  newMenuEditButton.innerText = "수정";
  newMenuRemoveButton.innerText = "삭제";
  newMenuSpan.innerText = value;

  newMenuLi.appendChild(newMenuSpan);
  newMenuLi.appendChild(newMenuEditButton);
  newMenuLi.appendChild(newMenuRemoveButton);

  $ul.appendChild(newMenuLi);
};

const handleSubmit = (event) => {
  // submit event일 경우 기본 동작 제어 -> 하지 않을 경우 새로고침 일어나게 된다.
  if (event.type === "submit") event.preventDefault();
  // 입력 값 변수에 할당 -> 자주 쓸 것 같아서 따로 변수로 선언해놓음
  const inputValue = $input.value;
  // 입력값 (공백제거 후) 빈값이면 함수 종
  if (inputValue.trim() === "") return;
  // 메뉴 추가
  addMenu(inputValue);
  // 입력값 리셋
  resetValue($input);
};

$button.addEventListener("click", handleSubmit);
$form.addEventListener("submit", handleSubmit);
