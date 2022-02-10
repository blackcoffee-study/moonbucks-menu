// TODO 메뉴 추가
// 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다 O
// 추가되는 메뉴는 <ul> 안에 삽입해야 한다.O
// 총 메뉴 갯수를 count하여 상단에 보여준다. O
// 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다. O
// 사용자 입력값이 빈 값이라면 추가되지 않는다. O

// TODO 메뉴 수정
// 메뉴의 수정 버튼을 누르면 브라우저에서 제공하는 prompt가 모달로 출력되게한다 O
// 모달창에서 메뉴 이름을 받고, 업데이트 된다. O

// TODO 메뉴 삭제
// 메뉴 삭제 버튼을 이용하여 메뉴 삭제할 수 있다. O
// 메뉴 삭제시 브라우저에서 제공하는 confirm 인터페이스를 활용한다. O

//메뉴
const menuNameInput = document.querySelector('#espresso-menu-name');
const menuNameBtn = document.querySelector('#espresso-menu-submit-button');
const menuNameLists = document.querySelector('#espresso-menu-list');
const menuNameList = document.querySelectorAll('#espresso-menu-list li');
const menuForm = document.querySelector('#espresso-menu-form');
const menuCountSpan = document.querySelector('.menu-count');
const menuCount = document.querySelectorAll('#espresso-menu-list li').length;
//모달
const warnModal = document.querySelector('.waring-modal-background');
const warnModalBtn = document.querySelector('.warning-modal-btn');
let updateModal = null;
let confirmModal = null;

//함수 정의

// menu templete
function createMenuDesc(event) {
  const newListDesc = document.createElement('li');
  const newListDescTitle = document.createElement('span');
  newListDescTitle.classList.add('menu-desc-title');
  const newDescPutBtn = document.createElement('button');
  newDescPutBtn.classList.add('menu-desc-put-btn');
  const newDescDeleteBtn = document.createElement('button');
  newDescDeleteBtn.classList.add('menu-desc-delete-btn');
  if (!menuNameInput.value) {
    warnModal.classList.add('show');
  } else {
    newListDescTitle.innerHTML = menuNameInput.value;
    newDescPutBtn.innerHTML = '수정';
    newDescDeleteBtn.innerHTML = '삭제';
    newListDesc.prepend(newListDescTitle);
    newListDesc.appendChild(newDescPutBtn);
    newListDesc.appendChild(newDescDeleteBtn);
    menuNameLists.append(newListDesc);
    menuNameInput.value = '';
  }
}
//Update Templete
function onUpdateModal(event) {
  for (
    let i = 0;
    i < document.querySelectorAll('.menu-desc-put-btn').length;
    i++
  ) {
    if (event.target == document.querySelectorAll('.menu-desc-put-btn')[i]) {
      updateModal = prompt('어떻게 바꾸시겠어요?☕', '별다방커피');
      document.querySelectorAll('.menu-desc-title')[i].innerHTML = updateModal;
    }
  }
}
//Delete Templete
function onDeleteMenu(event) {
  for (
    let i = 0;
    i < document.querySelectorAll('.menu-desc-delete-btn').length;
    i++
  ) {
    if (event.target == document.querySelectorAll('.menu-desc-delete-btn')[i]) {
      confirmModal = confirm('💥매뉴 삭제 후 복구는 불가능합니다!💥\n');
      if (confirmModal == true) {
        event.target.parentNode.remove();
        countMenuDesc();
      } else {
        return false;
      }
    }
  }
}
//count templete
function countMenuDesc() {
  for (
    let i = 0;
    i <= document.querySelectorAll('#espresso-menu-list li').length;
    i++
  ) {
    menuCountSpan.innerHTML = `총 ${i}개`;
  }
}

function onInputMenu(event) {
  event.preventDefault();
  createMenuDesc();
  countMenuDesc();
}

//// 함수 호출
menuNameBtn.addEventListener('click', onInputMenu);
menuForm.addEventListener('submit', onInputMenu);
warnModalBtn.addEventListener('click', () => {
  warnModal.classList.remove('show');
});
menuNameLists.addEventListener('click', onUpdateModal);
menuNameLists.addEventListener('click', onDeleteMenu);
