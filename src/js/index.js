// step1 요구사항 - 돔 조작과 이벤트 핸들링으로 메뉴 관리하기

const $menuNameInput = document.querySelector('#espresso-menu-name');
const $menuForm = document.querySelector('#espresso-menu-form');
const $menuList = document.querySelector('#espresso-menu-list');
const $munuCount = document.querySelector('.menu-count');
const $menuSubmitBtn = document.querySelector('#espresso-menu-submit-button');
const countMenuNum = () => {
  let menuNum = $menuList.childElementCount;
  $munuCount.innerHTML = `총 ${menuNum}개`;
  $menuNameInput.value = null;
};
const addFunc = () => {
  let name = $menuNameInput.value;
  let newMenuHTML = `<li class="menu-list-item d-flex items-center py-2">
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
  if (name === '') {
    return;
  } else {
    $menuList.insertAdjacentHTML('beforeend', newMenuHTML);
  }

  countMenuNum();
};

// 실행 함수
function App() {
  $menuForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $menuNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addFunc();
    }
  });

  $menuSubmitBtn.addEventListener('click', () => {
    addFunc();
  });

  $menuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-edit-button')) {
      let edit = e.target;
      let currentMenu = edit.closest('li');
      let targetName = currentMenu.querySelector('.menu-name');
      let editedMenu = prompt('어떤 메뉴로 변경하고 싶으신가요?');
      if (editedMenu === null) {
        return;
      } else {
        targetName.innerHTML = editedMenu;
      }
    }
  });

  $menuList.addEventListener('click', (e) => {
    if (e.target.classList.contains('menu-remove-button')) {
      if (!confirm('정말 삭제할까요?')) {
        return;
      } else {
        let currentMenu = e.target.closest('.menu-list-item');
        currentMenu.remove();
        countMenuNum();
      }
    }
  });
}

App();
