// - [ ] [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)에 데이터를 저장하여 새로고침해도 데이터가 남아있게 한다.
// - [ ] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
//   - [ ] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 보이게 한다.
// - [ ] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 `sold-out` class를 추가하여 상태를 변경한다.
// - 품절 상태 메뉴의 마크업

// ```js
// <li class="menu-list-item d-flex items-center py-2">
//   <span class="w-100 pl-2 menu-name sold-out">${name}</span>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
//   >
//     품절
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
//   >
//     수정
//   </button>
//   <button
//     type="button"
//     class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
//   >
//     삭제
//   </button>
// </li>
// ```

import $ from './utils/selector.js';

function App() {
  const isEmptyString = (string) => {
    if (string === null) {
      return true;
    }
    if (string.trim() === '') {
      return true;
    }
    return false;
  };

  const updateMenuCount = () => {
    const menuCount = $('#espresso-menu-list').querySelectorAll('li').length;
    const $menuCount = $('.menu-count');
    const $menuName = $('#espresso-menu-name');
    $menuCount.innerText = `총 ${menuCount}개`;
    $menuName.value = '';
  };

  const addMenuName = () => {
    const espressoMenuName = $('#espresso-menu-name').value;
    console.log(espressoMenuName);
    if (isEmptyString(espressoMenuName)) {
      alert('값을 입력해주세요.');
      return;
    }

    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
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
    $('#espresso-menu-list').insertAdjacentHTML(
      'beforeend',
      menuItemTemplate(espressoMenuName)
    );
    updateMenuCount();
  };

  const updatedMenuName = (e) => {
    const $menuName = e.target.closest('li').querySelector('.menu-name');
    const updatedMenuName = prompt('메뉴명을 수정하세요.', $menuName.innerText);

    if (!isEmptyString(updatedMenuName)) {
      $menuName.innerText = updatedMenuName;
    }
  };

  const removeMenuName = (e) => {
    const menuList = e.target.closest('li');
    const menuName = menuList.querySelector('.menu-name').innerText;
    if (confirm(`${menuName} 메뉴를 정말 삭제하시겠습니까?`)) {
      menuList.remove();
      updateMenuCount();
    }
  };

  $('#espresso-menu-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addMenuName();
  });

  $('#espresso-menu-list').addEventListener('click', (e) => {
    const isTargetHasClass = (className) =>
      e.target.classList.contains(className);
    if (isTargetHasClass('menu-edit-button')) {
      updatedMenuName(e);
    }

    if (isTargetHasClass('menu-remove-button')) {
      removeMenuName(e);
    }
  });
}

App();
