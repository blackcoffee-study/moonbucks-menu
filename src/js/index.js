const $ = (selector) => {
  return document.querySelector(selector);
};

function App() {
  // init Variables
  const form = $("#espresso-menu-form");
  const list = $("#espresso-menu-list");
  const input = $("#espresso-menu-name");
  const btn = $("#espresso-menu-submit-button");
  const counter = $(".menu-count");

  // Event Handlers
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && input.value !== "") addMenuItem();
  });

  btn.addEventListener("click", () => {
    if (input.value === "") alert("값을 입력해주세요.");
    else if (input.value !== "") addMenuItem();
  });

  list.addEventListener("click", updateMenuItem);

  // Functions
  function addMenuItem() {
    const menuItemTemplate = `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${input.value}</span>
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
          </li>`;

    list.innerHTML += menuItemTemplate;
    input.value = "";

    updateMenuCount();
    input.focus(); // auto focusing
  }

  function updateMenuItem(e) {
    // update menu item
    if (e.target.classList.contains("menu-edit-button")) {
      const menuName = e.target.closest("li").querySelector(".menu-name");
      const rtn = prompt("수정할 메뉴명을 적어주세요.", menuName.innerText);

      if (menuName.innerText === rtn) alert("기존과 동일한 메뉴명입니다.");
      else if (rtn === null) alert("");
      e.target.closest("li").querySelector(".menu-name").innerText = rtn;
    }

    // remove menu item
    if (e.target.classList.contains("menu-remove-button")) {
      if (confirm("해당 메뉴를 삭제하시겠습니까?")) {
        list.removeChild(e.target.closest("li"));
        updateMenuCount();
      }
    }
  }

  function updateMenuCount() {
    const menuCount = list.querySelectorAll("li").length;
    counter.innerText = `총 ${menuCount} 개`;
  }
}

App();

//## 🎯 step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기
/*
// 메뉴 추가
- [x] input에 값을 입력받고 확인 버튼 누르면 메뉴 추가
- [x] input에 값을 입력받고 엔터키 버튼 누르면 메뉴 추가
- [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
- [x] 현재 메뉴 리스트의 개수를 세서 총 메뉴 개수 count 노출
- [x] 메뉴 추가 시 input 빈 값으로 초기화
- [x] 사용자 입력값이 빈 값이라면 추가하지 않음

// 메뉴 수정
- [x] 메뉴 수정 버튼 클릭 이벤트를 받고, 메뉴수정하는 모달창이 뜬다.
- [x] 모달 창에 input 값을 받고 확인 버튼을 누르면 메뉴 수정

// 메뉴 삭제
- [x] 메뉴 삭제 버튼 클릭 이벤트를 받고, confirm 모달창을 띄운다.
- [x] 모달창의 확인 버튼 누르면 메뉴 삭제
- [x] 총 메뉴 개수 count 노출

// CHECK
- [ ] 커밋 단위 나누기

// 추가 기능
- [x] item 추가 후 input auto focus 기능
- [ ] confirm 취소 시 공백메뉴 수정 제어

*/
