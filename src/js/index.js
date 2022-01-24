// step1 요구사항 구현을 위한 전략
// TODO 메뉴 추가
// - [ ] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [ ] 추가되는 메뉴의 마크업은 `<ul id="expresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [ ] 총 메뉴 갯수를  count하여 상단에 보여준다.
// - [ ] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.

//
const $ = (selector) =>document.querySelector(selector);

// document.querySelector() 괄호안헤 들어올 변수를 select에 담고 
// 변수 $에 대입함

function App(){
  console.log(`자바스크립트 연결됨`);

  // form태그가 엔터로인해 자동으로 submit되는걸 막기
  $(`#espresso-menu-form`)
  .addEventListener(`submit`, (e) => {
    e.preventDefault();
  });

  
  // 

  // document.querySelector('#asd')
  // .onclick = (e) => {
  //   e.preventDefault();
  // };

  // 

  // 메뉴의 이름을 입력받는건
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const espressoMenuName = $(`#espresso-menu-name`).value;
        // input에 입력된 value를 변수에담음

        const menuItemTemplate = (espressoMenuName) => {
        // 해당변수를 담은 li를 return 하는 함수를 만듦
        return  `
          <li class="menu-list-item d-flex items-center py-2">
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
      $(`#espresso-menu-list`).innerHTML = menuItemTemplate(espressoMenuName);
      console.log(menuItemTemplate(espressoMenuName));
    } 
  });

}; // App;

App();

// TODO 메뉴 수정
// - [ ] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 모달창이 뜬다.
// - [ ] 모달창에서 신규메뉴명을 입력 받고, 확인버튼을 누르면 메뉴가 수정된다.

// TODO 메뉴 삭제
// - [ ] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제 컨펌 모달창이 뜬다.
// - [ ] 확인 버튼을 클릭하면 메뉴가 삭제된다.
// - [ ] 총 메뉴 갯수를 count하여 상단에 보여준다.

