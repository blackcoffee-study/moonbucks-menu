// TODO 메뉴 추가
//  메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다
// 추가되는 메뉴의 아래 마크업은
//<ul id="espresso-menu-list" class="mt-3 pl-0"></ul> 안에 삽입해야 한다.
//  총 메뉴 갯수를 count하여 상단에 보여준다
//     메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
//     사용자 입력값이 빈 값이라면 추가되지 않는다.

//변수
const menuNameInput = document.querySelector('#espresso-menu-name');
const menuNameBtn = document.querySelector('#espresso-menu-submit-button');
const menuNameList = document.querySelector('#espresso-menu-list');
const menuForm = document.querySelector('#espresso-menu-form');
const menuCountSpan = document.querySelector('.menu-count');
const menuCount = document.querySelectorAll('#espresso-menu-list li').length;
const checkEmpty = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//함수

//create ul list & button & list count
function createMenuDesc() {
  const newListDesc = document.createElement('li');
  const newDescPutBtn = document.createElement('button');
  const newDescDeleteBtn = document.createElement('button');

  if (!menuNameInput.value) {
    // 메뉴가 작성되는 것을 막아주세요
    // 그리고 왜 작성 되지 않는지 사용자에게 말해주세요
  }

  newListDesc.innerHTML = menuNameInput.value;
  newDescPutBtn.innerHTML = '수정';
  newDescDeleteBtn.innerHTML = '삭제';
  newListDesc.appendChild(newDescPutBtn);
  newListDesc.appendChild(newDescDeleteBtn);
  menuNameList.append(newListDesc);
  menuNameInput.value = '';
}
// count menu list
function countMenuDesc() {
  for (
    let i = 0;
    i <= document.querySelectorAll('#espresso-menu-list li').length;
    i++
  ) {
    menuCountSpan.innerHTML = `총 ${i}개`;
  }
}
//input event
function inputManu(event) {
  event.preventDefault();
  createMenuDesc();
  countMenuDesc();
}

//실행문
menuNameBtn.addEventListener('click', inputManu);
menuForm.addEventListener('submit', inputManu);

// TODO 메뉴 수정
// 메뉴의 수정 버튼을 눌러 메뉴 이름 수정(업데이트)하는 모달창이 뜬다.
// 모달창에서 메뉴 이름을 받고, 업데이트 된다.
// 메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

// TODO 메뉴 삭제
// 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다.
// 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다.
// 총 메뉴 갯수를 count하여 상단에 보여준다.
