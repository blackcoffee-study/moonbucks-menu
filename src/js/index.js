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

  document.getElementById('espresso-menu-list').insertAdjacentHTML('afterbegin', template);
}

function inputHandler() {
  press_enter();
  press_inputBtn();

  control_menuItem();

  count_menuItems();
}

function press_inputBtn() {
  const submit_btn = document.getElementById('espresso-menu-submit-button');
  submit_btn.addEventListener('click', (e) => {
    const submit_btnVal = e.target.closest('div').querySelector('input').value;
    if (submit_btnVal != '') {
      add_newMenu(submit_btnVal);
      const menuName_input = document.getElementById('espresso-menu-name');
      menuName_input.value = '';
      count_menuItems();
    }
  });
}

function press_enter(e) {
  const menuName_input = document.getElementById('espresso-menu-name');

  document.getElementById('espresso-menu-form').addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && menuName_input.value != '') {
      e.preventDefault();
      add_newMenu(menuName_input.value);
      // 값 초기화
      menuName_input.value = '';
      count_menuItems();
    }
  });
}

// 아이템 버튼 관리
function control_menuItem() {
  const menuList = document.getElementById('espresso-menu-list');
  menuList.addEventListener('click', (e) => {
    // 수정
    const selectedMenuname = e.target.closest('li').querySelector('span');
    if (e.target.classList.contains('menu-edit-button')) {
      const modified_menuName = prompt('메뉴명을 수정하세요', selectedMenuname.innerText);
      if (modified_menuName != null && modified_menuName != '') {
        selectedMenuname.innerText = modified_menuName;
      }
    }
    // 삭제
    else if (e.target.classList.contains('menu-remove-button')) {
      if (confirm('메뉴를 삭제하겠습니까?')) {
        e.target.closest('li').remove();
        console.log(e.target.closest('li'));
        count_menuItems();
      }
    }
  });
}

function count_menuItems() {
  let countedNum = document.getElementById('espresso-menu-list').querySelectorAll('li').length;

  document.querySelector('.menu-count').innerText = `총 ${countedNum}개`;
}

inputHandler();
