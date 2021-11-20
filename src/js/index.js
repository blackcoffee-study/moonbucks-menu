// 선택자를 선택하는 로직을 간소화해주기 위한 함수
const $ = (selector) => document.querySelector(selector);

const $button = $("#espresso-menu-submit-button");
const $input = $("#espresso-menu-name");
const $form = $("#espresso-menu-form");

// 매개 변수로 받은 선택자의 value를 리셋
const resetValue = (selector) => {
  selector.value = "";
};

const handleClick = (event) => {
  console.log(event);
};

const handleSubmit = (event) => {
  event.preventDefault();
  resetValue($input);
};

$button.addEventListener("click", handleClick);
$form.addEventListener("submit", handleSubmit);
