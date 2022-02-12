// Todo for Step 1-1
// - [x] 에스프레소 메뉴에 새로운 메뉴를 확인 버튼 추가한다.
// - [x] 에스프레소 메뉴에 새로운 메뉴를 엔터키 입력으로 추가한다.
// - [x] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.

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

    // 총 메뉴 갯수 업데이트
    updateMenuCount();
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
    // 총 메뉴 갯수 업데이트
    updateMenuCount();
  }
});

// Todo for Step 1-2
// - [x] 메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
// - [x] 메뉴 수정시 브라우저에서 제공하는 `prompt` 인터페이스를 활용한다.

document.querySelector("#espresso-menu-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-edit-button")) {
    const prevMenuName = e.target
      .closest("li")
      .querySelector(".menu-name").innerText;
    const updatedMenuName = prompt("수정할 값을 입력해주세요.", prevMenuName);
    e.target.closest("li").querySelector(".menu-name").innerText =
      updatedMenuName;
  }
});

// Todo for Step 1-3
// - [x] 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// - [x] 메뉴 삭제시 브라우저에서 제공하는 `confirm` 인터페이스를 활용한다.

document.querySelector("#espresso-menu-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("menu-remove-button")) {
    const menuName = e.target
      .closest("li")
      .querySelector(".menu-name").innerText;
    if (confirm(`${menuName}을(를) 삭제하시겠습니까?`)) {
      e.target.closest("li").remove();
      // 총 메뉴 갯수 업데이트
      updateMenuCount();
    }
  }
});

// Todo for Step 1-4
// - [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
function updateMenuCount() {
  const menuCount = document.querySelector(".menu-count");
  menuCount.innerText = `총 ${menuList.childElementCount}개`;
}
