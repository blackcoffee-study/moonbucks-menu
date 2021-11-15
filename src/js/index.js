import MenuList from './MenuList.js';
import {
  MENU_NAME_EXISTS,
  MENU_NAME_NOT_EXISTS,
  EMPTY_VALUE,
  NOT_CHANGED,
} from './config.js';

const $ = (id) => {
  return document.querySelector(id);
};

function App() {
  // const $menuForm = $('#espresso-menu-form');
  // const $menuInput = $('#espresso-menu-name');
  // const $menuSubmitButton = $('#espresso-menu-submit-button');
  // const $menuList = $('#espresso-menu-list');
  // const $menuCountSpan = $('.menu-count');

  const menuList = new MenuList();

  const updateMenuCount = () => {
    // const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    const menuCount = menuList.getMenuCount();
    $('.menu-count').innerText = `총 ${menuCount}개`;
  };

  const validateMenuName = (menuName) => {
    const trimmedMenuName = menuName.trim();

    if (trimmedMenuName === '') {
      throw EMPTY_VALUE;
    }

    return trimmedMenuName;
  };

  const menuItemTemplate = (menuName) => {
    return `
      <li class="menu-list-item d-flex items-center py-2">
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

  const addMenuName = () => {
    // 사용자 입력 검증
    const trimmedMenuName = validateMenuName($('#espresso-menu-name').value);

    menuList.addMenuItem(trimmedMenuName);

    // 메뉴 아이템 추가
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(trimmedMenuName),
    );

    $('#espresso-menu-name').value = '';
    updateMenuCount();
  };

  const editMenuName = (e) => {
    const $menuItem = e.target.closest('li');
    const $menuNameSpan = $menuItem.querySelector('.menu-name');
    const currentMenuName = $menuNameSpan.innerText;

    const updatedMenuName = prompt('수정할 메뉴 이름', currentMenuName);

    if (updatedMenuName === null) {
      return;
    }

    // 사용자 입력 검증
    const trimmedMenuName = validateMenuName(updatedMenuName);

    if (trimmedMenuName === currentMenuName) {
      throw NOT_CHANGED;
    }

    menuList.editMenuItem(currentMenuName, trimmedMenuName);

    $menuNameSpan.innerText = trimmedMenuName;
  };

  const removeMenuName = (e) => {
    const $menuItem = e.target.closest('li');
    const currentMenuName = $menuItem.querySelector('.menu-name').innerText;

    const removeConfirmResult = confirm(
      `"${currentMenuName}" 메뉴를 삭제하시겠습니까?`,
    );
    if (removeConfirmResult) {
      $menuItem.remove();
      alert('삭제되었습니다.');
      updateMenuCount();
    }
  };

  // 이벤트 리스터 등록
  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
  });

  $('#espresso-menu-name').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      try {
        addMenuName($('#espresso-menu-name').value);
      } catch (err) {
        alert(err);
        $('#espresso-menu-name').value = '';
      }
    }
  });

  $('#espresso-menu-submit-button').addEventListener('click', addMenuName);

  $('#espresso-menu-list').addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') {
      return;
    }

    try {
      if (e.target.classList.contains('menu-edit-button')) {
        editMenuName(e);
      } else if (e.target.classList.contains('menu-remove-button')) {
        removeMenuName(e);
      }
    } catch (err) {
      alert(err);
    }
  });
}

App();
