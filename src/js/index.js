const $ = (selector) => document.querySelector(selector);
function App() {
  const addMenuItem = () => {
    const menuName = $('#espresso-menu-name').value;
    if (menuName === '') {
      alert('값을 입력하세요');
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
    $('.menu-count').innerHTML = `총 ${menuCount}개`;
  };

  const setMenuName = ($menuItem) => {
    const $menuName = $menuItem.querySelector('.menu-name');
    const setMenuName = window.prompt('수정할 메뉴이름 입력', $menuName.innerText);
    $menuName.innerText = setMenuName;
  };

  const removeMenuItem = ($menuItem) => {
    if (window.confirm('삭제 하시겠습니까?')) {
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
    }
    if (e.target.classList.contains('menu-remove-button')) {
      removeMenuItem($menuItem);
    }
  });
}

App();
