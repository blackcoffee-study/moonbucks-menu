/**
 * step1 요구사항 구현을 위한 전략
 * [x] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
 * [x] 메뉴의 이름을 입력 받고 확인 버튼을 클릭하면 메뉴 추가를 한다.
 * [x] 추가되는 메뉴의 아래 마크업은 <ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
 * [x] 총 메뉴 갯수를 count하여 상단에 보여준다.
 * [x] 메뉴가 추가되면 input박스의 값은 초기화 되어야한다.
 * [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
 */

// $는 자바스크립트에서 html 엘리먼츠를 가지고 올때 관용적으로 사용하는 표현이다.
const $ = (selector) => document.querySelector(selector);

function App() {
  // form 태그는 기본적으로 엔터키를 눌렀을 때 자동으로 submit이 발생하도록 브라우저에서 지원하기 때문에
  // 강제로 form 태그의 엔터키 감지를 막아줘야한다.
  // 엔터를 눌렀을 시 form의 submit을 막아주는 메서드
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      // 입력받은 값이 빈값이라면 메뉴에 추가되면 안된다.
      alert("값을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    console.log(espressoMenuName, "espressoMenuName");
    const menuItemtemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    console.log(menuItemtemplate, "menuItemtemplate");
    // 자바스크립트에서 작성한 html 스크립트를 HTML태그에 삽입해주는 메서드 innteHTML
    // $("#espresso-menu-list").innerHTML = menuItemtemplate(espressoMenuName);

    // 단순히 innerHTML을 하면 기존의 태그가 계속 새로 덮어씌어진다. 방지하기 위한 메서드 insertAdjacentHTML 사용

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemtemplate(espressoMenuName)
    );

    // const 변수 = li 갯수 카운트
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;

    // input 박스 초기화
    $("#espresso-menu-name").value = "";
  };

  // 클릭 버튼 눌렀을 시
  $("#espresso-menu-submit-button").addEventListener("click", (event) => {
    // 재사용되는 부분 메서드화
    addMenuName();
  });

  // 메뉴의 이름을 입력 받아야한다.

  // 엘리먼트를 찾는 메서드
  // 키업 펑션 사용 시
  $("#espresso-menu-name").addEventListener("keypress", (event) => {
    if (event.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

// App호출//
App();
