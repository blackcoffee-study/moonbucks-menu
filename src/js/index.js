// Todo for Step1
// - [ ] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 추가한다.
// - [ ] 에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
// - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

const menuList = document.querySelector("#espresso-menu-list");
const addMenuForm = document.querySelector("#espresso-menu-form");
const addMenuBtn = addMenuForm.submit;
const addMenuInput = addMenuForm.espressoMenuName;

// 버튼으로 추가하기
addMenuBtn.addEventListener("click", (e) => {
  const name = addMenuForm.espressoMenuName.value;
  if (name != "") {
    menuList.insertAdjacentHTML(
      "beforeend",
      `
      <li class="menu-list-item d-flex items-center py-2">
    <span class="w-100 pl-2 menu-name">${name}</span>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>
      `
    );
    // Input 비우기
    addMenuForm.reset();
  }
});

// form태그가 자동으로 전송되는 것을 막기
addMenuForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// 엔터키 입력으로 추가하기
addMenuInput.addEventListener("keypress", (e) => {
  const name = addMenuForm.espressoMenuName.value;
  if (window.event.keyCode == 13 && name != "") {
    menuList.insertAdjacentHTML(
      "beforeend",
      `
    <li class="menu-list-item d-flex items-center py-2">
  <span class="w-100 pl-2 menu-name">${name}</span>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
  >
    수정
  </button>
  <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
  >
    삭제
  </button>
</li>
    `
    );
    // Input 비우기
    addMenuForm.reset();
  }
});
