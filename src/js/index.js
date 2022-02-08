//  메뉴의 수정 버튼을 눌러 메뉴 이름 수정할 수 있다.
//  메뉴 수정시 브라우저에서 제공하는 prompt 인터페이스를 활용한다.

//  총 메뉴 갯수를 count하여 상단에 보여준다.

// input이 두개 되는 부분의 변수명 통일하기

function add_newMenu(name) {
  const template = `<li class="menu-list-item d-flex items-center py-2">
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
  </li>`;

  document.getElementById('espresso-menu-list').innerHTML = template;
}

function inputHandler() {
  press_enter();
  press_inputBtn();

  control_menuItem();
}

function press_inputBtn() {
  const submit_btn = document.getElementById('espresso-menu-submit-button');
  submit_btn.addEventListener('click', (e) => {
    const submit_btnVal = e.target.closest('div').querySelector('input').value;
    if (submit_btnVal != '') {
      add_newMenu(submit_btnVal);
      const menuName_input = document.getElementById('espresso-menu-name');
      menuName_input.value = '';
    }
  });
}

function press_enter() {
  const menuName_input = document.getElementById('espresso-menu-name');
  menuName_input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && e.target.value != '') {
      const new_menuName = e.target.value;
      add_newMenu(new_menuName);
      // 값 초기화
      menuName_input.value = '';
    }
  });
}

function control_menuItem() {
  const menuList = document.getElementById('espresso-menu-list');
  menuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      const modified_menuName = prompt('수정하실 값을 입력해주세요');
    } else if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('메뉴를 삭제하겠습니까?')) {
        e.target.closest('li').remove();
        console.log(e.target.closest('li'));
      }
    }
  });
  // menu-edit-button
  // menu-remove-button
}

inputHandler();
