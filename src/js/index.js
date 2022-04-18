// $는 자바스크립트에서 html 엘리먼츠를 가지고 올때 관용적으로 사용하는 표현이다.
const $ = (selector) => document.querySelector(selector);
const store = {
  // 로컬스토리지 셋터
  setLocalStorage(menu) {
    // 로컬스토리지에는 문자열로만 저장할 수 있다. (객체 불가능) => 문자열로 파싱해줘야 한다.
    // JSON.stringify 메서드로 객체를 JSON 문자열로 파싱 할 수 있다.
    //                    key,  value
    localStorage.setItem("menu", JSON.stringify(menu));
  },

  // 로컬스토리지 겟터
  getLocalStorage() {
    // 문자열로 저장된 메뉴를 가져올때는 객체로 가져와야 하기 때문에 문자열에서 다시 객체로 파싱해준다.
    return JSON.parse(localStorage.getItem("menu"));
  },
};

function App() {
  // 상태는 변하는 데이터, 이 앱에서 변하는 것이 무엇인가 - 메뉴명
  // 메뉴 데이터가 변하는 시점은 ? - addMenuName, removeMenuName
  // 데이터 선언 및 초기화
  this.menu = [];

  this.init = () => {
    if (store.getLocalStorage().length > 1) {
      this.menu = store.getLocalStorage();
    }
    render();
  };

  const render = () => {
    const template = this.menu
      .map((menuItem, index) => {
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${menuItem.name}</span>
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
      })
      .join("");
    // 메뉴의 갯수 만큼 ['<li></li>', '<li></li>'] 이런식으로 만들어주고 있음
    //
    // console.log(menuItemtemplate, "menuItemtemplate");
    // 자바스크립트에서 작성한 html 스크립트를 HTML태그에 삽입해주는 메서드 innteHTML
    // $("#espresso-menu-list").innerHTML = menuItemtemplate(espressoMenuName);

    // 단순히 innerHTML을 하면 기존의 태그가 계속 새로 덮어씌어진다. 방지하기 위한 메서드 insertAdjacentHTML 사용

    $("#espresso-menu-list").innerHTML = template;

    // const 변수 = li 갯수 카운트
    // const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    // $(".menu-count").innerText = `총 ${menuCount} 개`;
    updateMenuCount();
  };

  // 함수명은 보통 동사를 앞에 쓴다.
  // 메뉴 카운팅
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  // 메뉴 추가
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      // 입력받은 값이 빈값이라면 메뉴에 추가되면 안된다.
      alert("값을 입력해주세요.");
      return;
    }
    const espressoMenuName = $("#espresso-menu-name").value;
    console.log(espressoMenuName, "espressoMenuName");
    // 메뉴에 추가
    this.menu.push({ name: espressoMenuName });

    // 상태가 변경된 즉시 로컬스토리지에 추가
    store.setLocalStorage(this.menu);

    render();
    // 변경된 메뉴를 기준으로

    // input 박스 초기화
    $("#espresso-menu-name").value = "";
  };

  // 삭제
  const removeMenuName = (e) => {
    // 확인 버튼 누르면 true 리턴
    // 취소 버튼 누르면 false를 리턴한다.
    if (confirm("정말 삭제하시겠습니까?")) {
      // 삭제할 메뉴 id를 가져온다.
      const menuId = e.target.closest("li").dataset.menuId;

      // menuId에 해당하는 객체 아이템을 1개 만큼 삭제
      this.menu.splice(menuId, 1);

      store.setLocalStorage(this.menu);

      // li태그를 통으로 삭제해야한다.
      e.target.closest("li").remove();

      updateMenuCount();
    }
  };

  //메뉴 수정
  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    // prompt로 모달 창 생성 첫번째 인자는 모달창에 띄워 줄 메세지, 두번째 인자는 입력창의 defualt값
    console.log(e);
    const $menuName = e.target.closest("li").querySelector(".menu-name");

    // 기본적으로 prompt 모달창에 입력하고 확인을 누르면 String 값으로 리턴해준다.
    // prompt("메뉴명을 수정하세여.", menuName);

    // 이런식으로 변수에 리턴한 String값을 담을 수 있다.
    const updatedMenuName = prompt("메뉴명을 수정하세여.", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  // 이벤트 위임
  // 최초 앱 실행 시 메뉴가 존재하지 않기 때문에 li 태그 안의 버튼 수정, 삭제 버튼도 존재하지
  // 않는다. html 태그로도 존재하지 않기 때문에 수정, 삭제 버튼에 클릭 이벤트를 바로 줄 수는
  // 없고 대신 그들의 상위 엘리먼츠인 espresso-menu-list에 클릭 이벤트를 위임한다.
  $("#espresso-menu-list").addEventListener("click", (e) => {
    // 수정하기
    // classList는 e.target의 클래스들을 배열처럼 가져온다.
    // contains는 배열안에 해당 클래스가 존재하는지 확인
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    // 삭제하기
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그는 기본적으로 엔터키를 눌렀을 때 자동으로 submit이 발생하도록 브라우저에서 지원하기 때문에
  // 강제로 form 태그의 엔터키 감지를 막아줘야한다.
  // 엔터를 눌렀을 시 form의 submit을 막아주는 메서드
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 클릭 버튼 눌렀을 시
  // $("#espresso-menu-submit-button").addEventListener("click", addMenuName());  함수명 뒤에 ()를 붙이면 함수의 호출에 해당함으로 ()를 빼는 것이 좋다.
  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

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

// 그냥 App()으로 호출 시 this로 가르킨 변수가 Cannot set properties of undefined 오류를 발생한다.
// this의 값은 현재 위치에 있는 함수를 호출한 객체를 뜻하며
// 일반함수에서는 this는 window를
// 메소드 내부에서는 메소드를 포함하는 객체를 가르킨다.
// App();

// new로 생성자를 만들경우 this는 생성자에서 새로 만들어질 변수를 가르킨다.
// https://velog.io/@ghdtjrrl94/JS-%EC%A7%80%EC%8B%9D2.-%ED%99%94%EC%82%B4%ED%91%9C-%ED%95%A8%EC%88%98%EC%99%80-this-new
const app = new App();
app.init();
