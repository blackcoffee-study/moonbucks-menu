const $ = (selector) => document.querySelector(selector);
const REQUIRED_TEXT = '값을 입력하세요';
const UPDATE_NAME_INPUT_TEXT = '수정할 메뉴이름 입력';
const DELETE_TEXT = '삭제 하시겠습니까?';

function App() {
  const addMenuItem = () => {
    const menuName = $('#espresso-menu-name').value;
    if (!menuName) {
      alert(REQUIRED_TEXT);
      return;
    }
    const menuItemTemplate = (menuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menuName}</span>
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

    $('#espresso-menu-list').insertAdjacentHTML('afterbegin', menuItemTemplate(menuName));
    $('#espresso-menu-name').value = '';
    updateCount();
  };

  const updateCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    $('.menu-count').textContent = `총 ${menuCount}개`;
  };

  const setMenuName = ($menuItem) => {
    const $menuName = $menuItem.querySelector('.menu-name');
    const updatedMenuName = window.prompt(UPDATE_NAME_INPUT_TEXT, $menuName.innerText);

    if (updatedMenuName === '') {
      alert(REQUIRED_TEXT);
      setMenuName($menuItem);
      return;
    }

    if (!updatedMenuName) return;

    $menuName.textContent = updatedMenuName;
  };

  const removeMenuItem = ($menuItem) => {
    if (window.confirm(DELETE_TEXT)) {
      $menuItem.remove();
      updateCount();
    }
  };

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuItem);

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    addMenuItem();
  });

  $('#espresso-menu-list').addEventListener('click', (e) => {
    const $menuItem = e.target.closest('li');
    if (e.target.classList.contains('menu-edit-button')) {
      setMenuName($menuItem);
      return;
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuItem($menuItem);
      return;
    }
  });
}

App();
