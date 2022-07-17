// 1주차 요구사항

// 추가
// #espresso-menu-name(input)에 값을 입력한 뒤 확인버튼 혹은 엔터키로 input안의 값을 메뉴로 추가한다.
// 메뉴 추가 후 input을 빈값으로 초기화한다.
// input값이 빈 값이라면 추가되지 않는다.
// 추가되는 내용은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입
// 메뉴 갯수를 +1 하여 상단에 보여준다.

// 수정
// 메뉴 수정버튼을 누르면 prompt에 수정할 내용을 입력한다.

// 삭제
// 메뉴 삭제 시 confirm을 이용해서 한번 더 확인해 준다.
// 메뉴 갯수를 -1 하여 상단에 보여준다.

// 알게된 것
// keydown	키가 눌렸을 때	keycode
// keypress	키가 눌린 상태일 때(연속적으로 실행됨.).	ASCII
// keyup	키 누름이 해제될 때	keycode
// childElementCount 하위요소 갯수 가져옴

function moonbucksApp() {
  // selector
  // espresso-menu-form 하위에 요소들이 존재
  const formElem = document.querySelector("#espresso-menu-form");
  const inputElem = document.querySelector("#espresso-menu-name");
  const submitElem = document.querySelector("#espresso-menu-submit-button");
  const listElem = document.querySelector("#espresso-menu-list");
  const menuCountElem = document.querySelector(".menu-count");

  // form요소의 기본 동작 초기화
  formElem.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 총 갯수
  const updateMenuTotalCount = () => {
    const menuTotalCount = listElem.childElementCount;
    menuCountElem.innerText = `총 ${menuTotalCount}개`;
  };

  // 메뉴 추가
  const addMenu = () => {
    // inputElem에 입력값이 없을 경우 알림창

    if (inputElem.value === "") {
      alert("값을 입력해 주세요.");
      return;
    }

    const menuItemMarkup = () => {
      return `<li class="menu-list-item d-flex items-center py-2">
                 <span class="w-100 pl-2 menu-name">${inputElem.value}</span>
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
    };
    listElem.insertAdjacentHTML("beforeend", menuItemMarkup());
    updateMenuTotalCount();
    inputElem.value = "";
  };

  // 메뉴 수정
  const editMenu = (e) => {
    const menuNameElem = e.target.closest("li").querySelector(".menu-name");
    const editName = prompt(
      "수정 할 메뉴명을 입력해 주세요.",
      menuNameElem.innerText
    );

    if (editName === "") {
      alert("빈 값은 입력할 수 없습니다.");
      return;
    }

    menuNameElem.innerText = editName;
  };

  // 메뉴 삭제
  const deleteMenu = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuTotalCount();
    }
  };

  inputElem.addEventListener("keypress", (e) => {
    // Enter 외 다른 입력은 리턴처리
    if (e.key !== "Enter") {
      return;
    }
    addMenu();
  });

  submitElem.addEventListener("click", addMenu);

  // 이벤트 위임 사용
  listElem.addEventListener("click", (e) => {
    // 수정 - prompt 사용
    if (e.target.classList.contains("menu-edit-button")) {
      editMenu(e);
    }

    // 삭제 - confirm 사용
    if (e.target.classList.contains("menu-remove-button")) {
      deleteMenu(e);
    }
  });
}

moonbucksApp();
